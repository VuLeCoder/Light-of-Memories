import type { LevelDefinition } from '../types';
export const lapLanh = {
  id: 'lap-lanh', label: 'Apollo 11', portrait: `${import.meta.env.BASE_URL}images/portraits/lap-lanh.webp`, memoryCount: 3,
  text: {
    vi: { friend: 'Apollo 11 — Lấp Lánh', enter: 'Đến gặp Lấp Lánh', chapter: '02 · Bạn Lấp Lánh', intro: 'Bạn là ngôi sao rơi xuống đây à?', reply: 'Đố bạn đoán được mình làm gì đấy!', invitation: 'Tìm gặp Lấp Lánh, lau bụi, khôi phục mô hình phản xạ và đo khoảng cách đến Trái Đất.', memory: 'Kỷ niệm cùng Lấp Lánh' },
    en: { friend: 'Apollo 11 — Twinkle', enter: 'Meet Twinkle', chapter: '02 · A sparkling friend', intro: 'Are you a fallen star?', reply: 'Can you guess what I do?', invitation: 'Find Twinkle, clean the dust, restore a reflector model and measure the distance to Earth.', memory: 'Memories with Twinkle' },
  },
} as const satisfies LevelDefinition;
