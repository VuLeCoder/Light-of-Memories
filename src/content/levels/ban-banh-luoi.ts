import { portraits } from '../assets';
import type { LevelDefinition } from './types';

export const banBanhLuoi = {
  id: 'ban-banh-luoi', label: 'Apollo 17', portrait: portraits.banhLuoi.url, memoryCount: 2,
  text: {
    vi: { friend: 'Apollo 17 — Bánh Lưới', enter: 'Gặp Bánh Lưới · Bản xem trước', chapter: '04 · Bạn Bánh Lưới', intro: 'Ai để lại những dấu bánh xe?', reply: 'Tác phẩm của mình đấy!', invitation: 'Theo ánh đèn tới thung lũng Taurus–Littrow, nơi chiếc xe Apollo 17 đỗ yên.', memory: 'Kỷ niệm cùng Bánh Lưới' },
    en: { friend: 'Apollo 17 — Mesh Wheels', enter: 'Meet Mesh Wheels · Preview', chapter: '04 · Mesh Wheels', intro: 'Who left these rover tracks?', reply: 'That was my work!', invitation: 'Follow the lantern to Taurus–Littrow, where the Apollo 17 rover remains parked.', memory: 'Memories with Mesh Wheels' },
  },
} as const satisfies LevelDefinition;
