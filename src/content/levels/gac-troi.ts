import type { LevelDefinition } from './types';
export const gacTroi = {
  id: 'gac-troi', label: 'LRO', portrait: `${import.meta.env.BASE_URL}images/portraits/gac-troi.webp`, memoryCount: 3,
  text: {
    vi: { friend: 'LRO — Gác Trời', enter: 'Gặp Gác Trời', chapter: '03 · Bạn Gác Trời', intro: 'Một chấm sáng trên cao…', reply: 'Mình là Gác Trời, tàu LRO đang bay quanh Mặt Trăng.', invitation: 'Cùng nhìn lại những nơi đã qua để tìm đường đến bên chị Hằng.', memory: 'Kỷ niệm cùng Gác Trời' },
    en: { friend: 'LRO — Sky Watcher', enter: 'Meet Sky Watcher', chapter: '03 · Sky Watcher', intro: 'A light high above…', reply: 'I am Sky Watcher, the LRO spacecraft orbiting the Moon.', invitation: 'Look back at the places you visited to find a way to Hằng.', memory: 'Memories with Sky Watcher' },
  },
} as const satisfies LevelDefinition;
