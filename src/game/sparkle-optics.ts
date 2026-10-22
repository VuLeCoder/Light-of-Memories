export type Point = { x: number; y: number };
const cross = (a: Point, b: Point) => a.x * b.y - a.y * b.x;
export const cornerPivot = { x: 320, y: 135 };
export const laserSource = { x: 65, y: 115 };
export const laserReceiver = { x: 65, y: 155, halfHeight: 12 };
export const normalizeRotation = (angle: number) => ((angle + 180) % 360 + 360) % 360 - 180;
export function cornerMirrors(rotation: number) {
  return [135, 225].map(base => {
    const radians = (base + rotation) * Math.PI / 180;
    const tangent = { x: Math.cos(radians), y: Math.sin(radians) };
    return { start: cornerPivot, end: { x: cornerPivot.x + tangent.x * 105, y: cornerPivot.y + tangent.y * 105 }, tangent };
  });
}

// Intersect finite mirror segments, then reflect v across the surface tangent:
// v' = 2(v · tangent)tangent - v. No target-dependent ray directions.
export function traceSparkleLight(rotation: number) {
  const mirrors = cornerMirrors(rotation);
  const points: Point[] = [laserSource];
  const hits: number[] = [];
  let origin: Point = laserSource;
  let direction = { x: 1, y: 0 };
  let returned = false;
  for (let bounce = 0; bounce < 4; bounce++) {
    const edges = [
      direction.x > 0 ? (446 - origin.x) / direction.x : direction.x < 0 ? (14 - origin.x) / direction.x : Infinity,
      direction.y > 0 ? (255 - origin.y) / direction.y : direction.y < 0 ? (17 - origin.y) / direction.y : Infinity,
    ];
    let distance = Math.min(...edges.filter(n => n > .00001));
    let target = -1;
    for (const [i, mirror] of mirrors.entries()) {
      const segment = { x: mirror.end.x - mirror.start.x, y: mirror.end.y - mirror.start.y };
      const denominator = cross(direction, segment);
      if (Math.abs(denominator) < 1e-8) continue;
      const delta = { x: mirror.start.x - origin.x, y: mirror.start.y - origin.y };
      const t = cross(delta, segment) / denominator;
      const u = cross(delta, direction) / denominator;
      if (t > .00001 && t < distance && u >= 0 && u <= 1) { distance = t; target = i; }
    }
    if (direction.x < -.00001) {
      const t = (laserReceiver.x - origin.x) / direction.x;
      if (t > .00001 && t < distance && Math.abs(origin.y + t * direction.y - laserReceiver.y) <= laserReceiver.halfHeight) {
        points.push({ x: laserReceiver.x, y: origin.y + t * direction.y }); returned = true; break;
      }
    }
    origin = { x: origin.x + distance * direction.x, y: origin.y + distance * direction.y };
    points.push(origin);
    // At the joint there is no unique surface normal; do not invent a bounce.
    if (target < 0 || Math.hypot(origin.x - cornerPivot.x, origin.y - cornerPivot.y) < .00001) break;
    hits.push(target);
    const tangent = mirrors[target].tangent;
    const dot = direction.x * tangent.x + direction.y * tangent.y;
    direction = { x: 2 * dot * tangent.x - direction.x, y: 2 * dot * tangent.y - direction.y };
  }
  const reversed = Math.abs(direction.x + 1) < 1e-7 && Math.abs(direction.y) < 1e-7;
  return { points, hits, returned, direction, success: returned && hits.length === 2 && new Set(hits).size === 2 && reversed };
}
