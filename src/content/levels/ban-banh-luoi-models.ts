// Fixed educational models, not Apollo engineering limits.
// Design contract and verification cases: docs/done/Game4_Apollo_17.md.

export const banBanhLuoiRoute = {
  size: 6,
  lm: [1, 1],
  stops: {
    A: [2, 3],
    B: [3, 3]
  },
  craters: [
    [2, 2],
    [4, 2],
    [4, 3]
  ],
  slopes: [
    [3, 2],
    [3, 4]
  ],
  batteryLimit: 12,
  walkLimit: 4,
  cases: {
    solution: [
      [1, 1],
      [1, 2],
      [1, 3],
      [2, 3],
      [3, 3],
      [3, 2],
      [3, 1],
      [2, 1],
      [1, 1]
    ],
    reverse: [
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 2],
      [3, 3],
      [2, 3],
      [1, 3],
      [1, 2],
      [1, 1]
    ],
    walkOnlyFailure: [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 4],
      [3, 4],
      [3, 3],
      [2, 3],
      [1, 3],
      [1, 2],
      [1, 1]
    ],
    batteryOnlyFailure: [
      [1, 1],
      [2, 1],
      [1, 1],
      [2, 1],
      [1, 1],
      [1, 2],
      [1, 3],
      [2, 3],
      [3, 3],
      [3, 2],
      [3, 1],
      [2, 1],
      [1, 1]
    ]
  }
} as const;

export const banBanhLuoiCamera = {
  coordinateSystem: "x right, y up; educational units, not metres; angle from positive x",
  positions: {
    A: [120, 30],
    B: [520, 30],
    C: [260, 30]
  },
  rock: {
    left: 180,
    right: 220,
    bottom: 0,
    top: 190
  },
  descentStage: {
    left: 570,
    right: 630,
    bottom: 0,
    top: 60
  },
  required: {
    left: 580,
    right: 620,
    bottom: 60,
    top: 240
  },
  ascentStageStart: {
    left: 580,
    right: 620,
    bottom: 60,
    top: 110
  },
  fovDegrees: 40,
  minAngle: 0,
  maxAngle: 80,
  angleStep: 1,
  initialAngle: 0,
  edgeToleranceDegrees: 0.1,
  previewDurationSeconds: 5,
  cases: [
    {
      spot: "A",
      angle: 20,
      expected: "blocked"
    },
    {
      spot: "B",
      angle: 40,
      expected: "tooClose"
    },
    {
      spot: "C",
      angle: 0,
      expected: "low"
    },
    {
      spot: "C",
      angle: 13,
      expected: "low"
    },
    {
      spot: "C",
      angle: 14,
      expected: "correct"
    },
    {
      spot: "C",
      angle: 20,
      expected: "correct"
    },
    {
      spot: "C",
      angle: 24,
      expected: "correct"
    },
    {
      spot: "C",
      angle: 25,
      expected: "high"
    },
    {
      spot: "C",
      angle: 80,
      expected: "high"
    }
  ]
} as const;

export const banBanhLuoiModels = { route: banBanhLuoiRoute, camera: banBanhLuoiCamera } as const;
