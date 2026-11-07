import type { RabbitStop } from './gac-troi-rabbit';

export type RabbitRock = { id: string; x: number; y: number; width: number; height: number; shape: 'flat' | 'split' | 'round' | 'point'; vi: string; en: string };
const rocks: RabbitRock[] = [
  { id: 'flat', x: 310, y: 396, width: 105, height: 58, shape: 'flat', vi: 'tảng đá bẹt bên trái', en: 'the flat rock on the left' },
  { id: 'split', x: 555, y: 391, width: 100, height: 86, shape: 'split', vi: 'tảng đá có khe ở giữa', en: 'the split rock in the middle' },
  { id: 'round', x: 750, y: 421, width: 112, height: 71, shape: 'round', vi: 'tảng đá tròn bên phải', en: 'the round rock on the right' },
  { id: 'point', x: 440, y: 485, width: 103, height: 72, shape: 'point', vi: 'tảng đá nhọn ở phía trước', en: 'the pointed rock in front' },
];
/** Stable scene coordinates shared by artwork, interaction and guide descriptions. */
export const rabbitTrailLayouts = Object.fromEntries((['slope', 'rock', 'banyan'] as const).map((stop, index) => {
  const arrangements = [
    [[310,396],[555,391],[750,421],[440,485]],
    [[260,470],[680,400],[465,390],[790,484]],
    [[710,415],[325,390],[480,480],[215,470]],
  ];
  const placed = rocks.map((rock, i) => ({ ...rock, x: arrangements[index][i][0], y: arrangements[index][i][1],
    vi: `tảng đá ${({flat:'bẹt',split:'có khe',round:'tròn',point:'nhọn'} as const)[rock.shape]} ${arrangements[index][i][0]<350?'bên trái':arrangements[index][i][0]>600?'bên phải':'ở giữa'}`,
    en: `the ${{flat:'flat',split:'split',round:'round',point:'pointed'}[rock.shape]} rock ${arrangements[index][i][0]<350?'on the left':arrangements[index][i][0]>600?'on the right':'in the middle'}`,
  }));
  const rabbitRock = placed[[2, 1, 0][index]];
  const giftRock = placed[[0, 3, 2][index]];
  return [stop, {
    rocks: placed,
    rabbit: { x: rabbitRock.x, y: rabbitRock.y + 24, vi: `đôi tai trắng sau ${rabbitRock.vi}`, en: `white ears behind ${rabbitRock.en}` },
    gift: { x: giftRock.x + giftRock.width * .32, y: giftRock.y + 12 },
    rabbitRock: rabbitRock.id, giftRock: giftRock.id,
  }];
})) as Record<RabbitStop, { rocks: RabbitRock[]; rabbit: { x: number; y: number; vi: string; en: string }; gift: { x: number; y: number }; rabbitRock: string; giftRock: string }>;
