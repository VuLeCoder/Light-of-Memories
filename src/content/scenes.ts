export type SceneId = 'earth' | 'moon';
export const scenes = {
  earth: {
    number: '01',
    characters: ['an', 'ba'],
  },
  moon: {
    number: '02',
    characters: ['cuoi', 'cayDa'],
  },
} as const;
