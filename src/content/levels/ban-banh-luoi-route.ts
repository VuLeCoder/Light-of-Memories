import { banBanhLuoiRoute as model } from './ban-banh-luoi-models';

export type RouteCell = readonly [number, number];
export const sameCell = (a: RouteCell, b: RouteCell) => a[0] === b[0] && a[1] === b[1];
export const routeCells: RouteCell[] = Array.from({ length: model.size ** 2 }, (_, i) => [i % model.size + 1, Math.floor(i / model.size) + 1]);
export const isRouteCell = (v: unknown): v is RouteCell => Array.isArray(v) && v.length === 2 && v.every(n => Number.isInteger(n) && n >= 1 && n <= model.size);
export const isCrater = (cell: RouteCell) => model.craters.some(c => sameCell(c, cell));
export const isSlope = (cell: RouteCell) => model.slopes.some(c => sameCell(c, cell));
export const entryCost = (cell: RouteCell) => isSlope(cell) ? 2 : 1;
export function checkRouteStep(from: RouteCell, to: RouteCell): 'blocked' | 'notAdjacent' | null {
  if (!isRouteCell(to)) return 'notAdjacent';
  if (isCrater(to)) return 'blocked';
  return Math.abs(from[0] - to[0]) + Math.abs(from[1] - to[1]) === 1 ? null : 'notAdjacent';
}
const key = (cell: RouteCell) => cell.join(',');
// Breadth-first search follows shared edges around craters. Walking ignores slope cost.
const walkDistances = new Map<string, number>([[key(model.lm), 0]]);
const queue: RouteCell[] = [model.lm];
for (let i = 0; i < queue.length; i++) {
  const cell = queue[i];
  for (const neighbour of routeCells) {
    if (checkRouteStep(cell, neighbour) || walkDistances.has(key(neighbour))) continue;
    walkDistances.set(key(neighbour), walkDistances.get(key(cell))! + 1);
    queue.push(neighbour);
  }
}
export const walkDistance = (cell: RouteCell) => walkDistances.get(key(cell)) ?? Infinity;
export function analyseRoute(cells: readonly RouteCell[]) {
  let battery = 0;
  const steps = cells.map((cell, index) => {
    if (index) battery += entryCost(cell);
    const walk = walkDistance(cell);
    return { cell, index, battery, walk, overBattery: battery > model.batteryLimit, overWalk: walk > model.walkLimit };
  });
  const valid = cells.length > 0 && sameCell(cells[0], model.lm) && cells.every((cell, index) => isRouteCell(cell) && !isCrater(cell) && (!index || !checkRouteStep(cells[index - 1], cell)));
  const missing = (['A', 'B'] as const).filter(stop => !cells.some(c => sameCell(c, model.stops[stop])));
  const home = cells.length > 1 && sameCell(cells[cells.length - 1], model.lm);
  const overBattery = steps.find(s => s.overBattery);
  const overWalk = steps.find(s => s.overWalk);
  return { steps, battery, missing, home, overBattery, overWalk, valid,
    correct: valid && !missing.length && home && !overBattery && !overWalk };
}
/** Keep a continuous draft, including over-budget steps. Discard only its damaged suffix. */
export function readRouteCells(value: unknown): RouteCell[] {
  const result: RouteCell[] = [model.lm];
  if (!Array.isArray(value) || !isRouteCell(value[0]) || !sameCell(value[0], model.lm)) return result;
  for (const cell of value.slice(1)) {
    if (!isRouteCell(cell) || checkRouteStep(result[result.length - 1], cell)) break;
    result.push([cell[0], cell[1]]);
  }
  return result;
}
