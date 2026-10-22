type Point = { x: number; y: number };
const unit = (v: Point): Point => { const length = Math.hypot(v.x, v.y); return { x: v.x / length, y: v.y / length }; };
const minus = (a: Point, b: Point): Point => ({ x: a.x - b.x, y: a.y - b.y });
const cross = (a: Point, b: Point) => a.x * b.y - a.y * b.x;
export const mirrorCenters: Point[] = [{ x: 170, y: 150 }, { x: 280, y: 65 }, { x: 390, y: 150 }];
const source = { x: 65, y: 150 };
const receiver = { x: 65, y: 184 };
const route = [source, ...mirrorCenters, receiver];
// Reflecting across the tangent bisects the incoming and outgoing directions.
export function mirrorRotation(index: number, state: number): number {
  const incoming = unit(minus(route[index + 1], route[index]));
  const outgoing = unit(minus(route[index + 2], route[index + 1]));
  return Math.atan2(incoming.y + outgoing.y, incoming.x + outgoing.x) * 180 / Math.PI + (state - index) * 45;
}
export function traceSparkleLight(angles: number[]) {
  const points: Point[] = [source];
  const hits: number[] = [];
  let origin = source;
  let direction = { x: 1, y: 0 };
  let returned = false;
  for (let bounce = 0; bounce < 12; bounce++) {
    const edges = [
      direction.x > 0 ? (446 - origin.x) / direction.x : direction.x < 0 ? (14 - origin.x) / direction.x : Infinity,
      direction.y > 0 ? (229 - origin.y) / direction.y : direction.y < 0 ? (17 - origin.y) / direction.y : Infinity,
    ];
    let distance = Math.min(...edges.filter(n => n > .001));
    let target = -1;
    for (let i = 0; i < mirrorCenters.length; i++) {
      const radians = mirrorRotation(i, angles[i]) * Math.PI / 180;
      const segment = { x: Math.cos(radians) * 44, y: Math.sin(radians) * 44 };
      const start = { x: mirrorCenters[i].x - segment.x / 2, y: mirrorCenters[i].y - segment.y / 2 };
      const denominator = cross(direction, segment);
      if (Math.abs(denominator) < 1e-8) continue;
      const delta = minus(start, origin);
      const t = cross(delta, segment) / denominator;
      const u = cross(delta, direction) / denominator;
      if (t > .001 && t < distance && u >= 0 && u <= 1) { distance = t; target = i; }
    }
    if (direction.x < -.001) {
      const t = (receiver.x - origin.x) / direction.x;
      if (t > .001 && t < distance && Math.abs(origin.y + t * direction.y - receiver.y) <= 10) {
        points.push({ x: receiver.x, y: origin.y + t * direction.y }); returned = true; break;
      }
    }
    origin = { x: origin.x + distance * direction.x, y: origin.y + distance * direction.y };
    points.push(origin);
    if (target < 0) break;
    hits.push(target);
    const radians = mirrorRotation(target, angles[target]) * Math.PI / 180;
    const tangent = { x: Math.cos(radians), y: Math.sin(radians) };
    const dot = direction.x * tangent.x + direction.y * tangent.y;
    direction = { x: 2 * dot * tangent.x - direction.x, y: 2 * dot * tangent.y - direction.y };
  }
  return { points, hits, returned, success: returned && new Set(hits).size === 3 };
}
