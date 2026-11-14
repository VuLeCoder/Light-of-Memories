import { portraits } from '../assets';
import type { LevelDefinition } from './types';
export const taiThinh = {
  id: 'tai-thinh', label: 'Apollo 12', portrait: portraits.taiThinh.url, memoryCount: 3,
  text: {
    vi: { friend: 'Apollo 12 — Tai Thính', enter: 'Đến gặp Tai Thính', chapter: '03 · Bạn Tai Thính', intro: 'Ai đang lắng nghe dưới lòng đất?', reply: 'Bạn bước nhẹ thôi nhé.', invitation: 'Theo những gợn rung tới cụm thiết bị Apollo 12 tại Đại Dương Bão.', memory: 'Kỷ niệm cùng Tai Thính' },
    en: { friend: 'Apollo 12 — Keen Ears', enter: 'Meet Keen Ears', chapter: '03 · Keen Ears', intro: 'Who is listening beneath the ground?', reply: 'Gentle steps, please.', invitation: 'Follow the ripples to the Apollo 12 instruments in the Ocean of Storms.', memory: 'Memories with Keen Ears' },
  },
} as const satisfies LevelDefinition;
