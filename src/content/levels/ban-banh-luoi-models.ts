// Fixed educational models, not Apollo engineering limits.
// Design contract and verification cases: docs/done/Game4_Apollo_17.md.

export const banBanhLuoiRoute = {
  columns: 6,
  rows: 5,
  lm: [1, 1],
  stops: {
    A: [1, 3],
    B: [3, 1]
  },
  // The central crater separates the two station branches. Players can circle
  // its lower/right rim or retrace the flat branches through the LM junction.
  craters: [[2, 2], [4, 2], [4, 4]],
  slopes: [[3, 2], [2, 4]],
  batteryLimit: 12,
  walkLimit: 4,
  cases: {
    flat: [[1,1], [1,2], [1,3], [1,2], [1,1], [2,1], [3,1], [2,1], [1,1]],
    flatDetour: [[1,1], [1,2], [1,3], [2,3], [1,3], [1,2], [1,1], [2,1], [3,1], [2,1], [1,1]],
    central: [[1,1], [2,1], [3,1], [3,2], [3,3], [2,3], [1,3], [1,2], [1,1]],
    solution: [[1,1], [1,2], [1,3], [2,3], [3,3], [3,2], [3,1], [2,1], [1,1]],
    reverse: [[1,1], [2,1], [3,1], [3,2], [3,3], [2,3], [1,3], [1,2], [1,1]],
    walkOnlyFailure: [[1,1], [1,2], [1,3], [2,3], [3,3], [4,3], [3,3], [3,2], [3,1], [2,1], [1,1]],
    batteryOnlyFailure: [[1,1], [2,1], [1,1], [2,1], [1,1], [1,2], [1,3], [2,3], [3,3], [3,2], [3,1], [2,1], [1,1]]
  }
} as const;

/** Coordinates for the historical liftoff illustration, not a challenge. */
export const banBanhLuoiLaunch = {
  descentStage: { left: 570, right: 630, bottom: 0, top: 60 },
  required: { left: 580, right: 620, bottom: 60, top: 240 },
  ascentStageStart: { left: 580, right: 620, bottom: 60, top: 110 },
  previewDurationSeconds: 5,
} as const;
