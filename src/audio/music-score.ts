/** Original pentatonic nursery-rhyme scores. Times and durations are quarter-note beats. */
export type MusicMood = 'home' | 'surveyor' | 'sparkle' | 'watcher' | 'reunion';
export type MusicInstrument = 'flute' | 'tranh' | 'bau' | 'trung';
export interface MusicNote {
  midi: number;
  duration: number;
  instrument: MusicInstrument;
  volume: number;
}
interface MusicScore {
  beat: number;
  /** Eighth-note grid: 256 steps = 32 bars of 4/4. */
  steps: readonly (readonly MusicNote[])[];
}
type Motif = readonly [number, number, number, number, number, number];
// Six-note calls leave space for a short instrumental answer in each two-bar cell.
const rhythms = [
  [[0, .75], [2, .4], [3, .4], [4, .75], [6, .75], [8, 1.4]],
  [[0, .75], [2, .75], [4, .4], [5, .4], [6, .75], [8, 1.4]],
  [[0, .4], [1, .4], [2, .75], [4, .75], [6, .75], [8, 1.4]],
  [[0, .75], [2, .4], [3, .4], [4, .75], [6, .75], [10, 1.4]],
] as const;
function compose(bpm: number, lead: MusicInstrument, response: MusicInstrument,
  motifs: readonly Motif[], roots: readonly number[], gentle = false): MusicScore {
  const steps: MusicNote[][] = Array.from({ length: 256 }, () => []);
  const add = (step: number, midi: number, duration: number, instrument: MusicInstrument, volume: number) => {
    steps[step].push({ midi, duration, instrument, volume });
  };
  // Four eight-bar phrases, each with call/repeat/variation/cadence.
  for (let cell = 0; cell < 16; cell++) {
    const phrase = Math.floor(cell / 4), part = cell % 4;
    const motif = motifs[part === 0 || part === 1 ? phrase : (phrase + (part === 2 ? 1 : 0)) % motifs.length];
    const rhythm = rhythms[gentle ? (part === 3 ? 3 : 1) : part];
    const start = cell * 16;
    motif.forEach((midi, n) => {
      const [offset, duration] = rhythm[n];
      add(start + offset, midi, gentle ? duration * 1.12 : duration, lead,
        (gentle ? .19 : .22) * (n === 0 ? 1 : n === 5 ? .88 : .94));
    });
    // A brief answer, with the last cell resolving to the opening tonic.
    const answer = part === 3 ? motifs[0][0] : motif[4];
    add(start + 12, answer, .55, response, .105);
    add(start + 14, part === 3 ? answer : motif[5], .65, response, .085);
    const root = roots[phrase];
    for (let bar = 0; bar < 2; bar++) {
      const at = start + bar * 8;
      add(at, root, gentle ? 1.3 : .8, gentle ? 'bau' : 'tranh', .09);
      add(at + 4, root + 7, .55, 'tranh', .065);
      add(at + 2, root + 12, .32, 'trung', gentle ? .035 : .055);
      if (!gentle) add(at + 6, root + 7, .3, 'trung', .045);
    }
  }
  return { beat: 60 / bpm, steps };
}
const homeMotifs: readonly Motif[] = [
  [72, 74, 76, 79, 76, 74], [76, 79, 81, 79, 76, 72],
  [79, 76, 74, 72, 74, 76], [74, 76, 74, 72, 67, 72],
];
export const musicScores: Record<MusicMood, MusicScore> = {
  home: compose(96, 'flute', 'tranh', homeMotifs, [48, 53, 48, 55]),
  surveyor: compose(108, 'trung', 'tranh', [
    [62, 64, 67, 69, 67, 62], [67, 69, 74, 69, 67, 64],
    [69, 67, 64, 62, 64, 67], [64, 67, 64, 62, 57, 62],
  ], [50, 43, 50, 45]),
  sparkle: compose(112, 'tranh', 'flute', [
    [74, 79, 76, 79, 81, 79], [79, 81, 84, 81, 79, 76],
    [81, 79, 76, 74, 76, 79], [76, 79, 76, 74, 72, 74],
  ], [50, 48, 55, 50]),
  watcher: compose(88, 'flute', 'bau', [
    [67, 69, 72, 74, 72, 69], [72, 74, 76, 74, 72, 67],
    [74, 72, 69, 67, 69, 72], [69, 72, 69, 67, 64, 67],
  ], [43, 48, 43, 50], true),
  reunion: compose(100, 'flute', 'tranh', [
    homeMotifs[0], [76, 79, 81, 84, 81, 79],
    [79, 81, 79, 76, 74, 76], [74, 76, 79, 76, 74, 72],
  ], [48, 53, 55, 48]),
};

export function selectMusicMood(scene: {
  menuOpen: boolean; hangOpen: boolean; inSurveyor: boolean; inSparkle: boolean; inGacTroi: boolean;
}): MusicMood {
  if (scene.menuOpen) return 'home';
  if (scene.hangOpen) return 'reunion';
  if (scene.inSurveyor) return 'surveyor';
  if (scene.inSparkle) return 'sparkle';
  if (scene.inGacTroi) return 'watcher';
  return 'home';
}
