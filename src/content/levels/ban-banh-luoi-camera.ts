import { banBanhLuoiCamera as model } from './ban-banh-luoi-models';
export const cameraSpots = Object.keys(model.positions) as CameraSpot[];
export type CameraSpot = keyof typeof model.positions;
type Point = readonly [number, number];
type Box = { left: number; right: number; bottom: number; top: number };
export const boxCorners = (b: Box): Point[] => [[b.left,b.bottom], [b.right,b.bottom], [b.right,b.top], [b.left,b.top]];
export const cameraAngleTo = (origin: Point, point: Point) => Math.atan2(point[1]-origin[1], point[0]-origin[0])*180/Math.PI;
export function angularBounds(origin: Point, box: Box) {
  const angles = boxCorners(box).map(p => cameraAngleTo(origin,p));
  return { low: Math.min(...angles), high: Math.max(...angles) };
}
// Convex hull of the origin and target rectangle forms the entire sight region.
function sightHull(points: Point[]): Point[] {
  const sorted = [...points].sort((a,b) => a[0]-b[0] || a[1]-b[1]);
  const cross = (a: Point,b: Point,c: Point) => (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
  const half = (list: Point[]) => { const hull: Point[] = []; for (const p of list) { while (hull.length>1 && cross(hull[hull.length-2],hull[hull.length-1],p)<=0) hull.pop(); hull.push(p); } return hull; };
  return [...half(sorted).slice(0,-1), ...half(sorted.reverse()).slice(0,-1)];
}
// Separating axes: touching an obstacle also blocks the view.
export function sightBlocked(origin: Point, target: Box, obstacle: Box): boolean {
  const hull = sightHull([origin,...boxCorners(target)]), rock = boxCorners(obstacle);
  const axes: Point[] = [[1,0],[0,1], ...hull.map((p,i) => { const q=hull[(i+1)%hull.length]; return [p[1]-q[1],q[0]-p[0]] as Point; })];
  return axes.every(axis => {
    const a = hull.map(p => p[0]*axis[0]+p[1]*axis[1]), b = rock.map(p => p[0]*axis[0]+p[1]*axis[1]);
    return Math.max(...a)>=Math.min(...b) && Math.max(...b)>=Math.min(...a);
  });
}
export function analyseCamera(spot: CameraSpot | null, angle: number) {
  if (!spot) return 'none';
  const origin = model.positions[spot], bounds = angularBounds(origin,model.required);
  if (sightBlocked(origin, model.required, model.rock)) return 'blocked';
  const half = model.fovDegrees/2+model.edgeToleranceDegrees;
  if (bounds.high-bounds.low>2*half) return 'tooClose';
  if (angle+half<bounds.high) return 'low';
  if (angle-half>bounds.low) return 'high';
  return 'correct';
}
export function readCameraAngle(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? Math.max(model.minAngle,Math.min(model.maxAngle,Math.round(value))) : model.initialAngle;
}
