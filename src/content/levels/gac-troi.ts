import type { LevelDefinition } from './types';
export const gacTroi = {
  id: 'gac-troi', label: 'LRO', portrait: `${import.meta.env.BASE_URL}images/portraits/gac-troi.webp`, memoryCount: 3,
  text: {
    vi: { friend: 'LRO — Gác Trời', enter: 'Gặp Gác Trời', chapter: '05 · Bạn Gác Trời', intro: 'Một chấm sáng trên cao…', reply: 'Mình là Gác Trời, tàu LRO đang bay quanh Mặt Trăng.', invitation: 'Cuội đã đến điểm hẹn. Những thử thách đang được chuẩn bị.', memory: 'Kỷ niệm cùng Gác Trời' },
    en: { friend: 'LRO — Sky Watcher', enter: 'Meet Sky Watcher', chapter: '05 · Sky Watcher', intro: 'A light high above…', reply: 'I am Sky Watcher, the LRO spacecraft orbiting the Moon.', invitation: 'Cuội has reached the meeting point. The challenges are being prepared.', memory: 'Memories with Sky Watcher' },
  },
} as const satisfies LevelDefinition;
