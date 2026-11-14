import { portraits } from '../assets';
import type { LevelDefinition } from './types';

export const surveyor = {
  id: 'surveyor',
  label: 'Surveyor 3',
  portrait: portraits.matTron.url,
  memoryCount: 3,
  text: {
    "vi": {
      "friend": "Surveyor 3 — Mắt Tròn",
      "enter": "Đến gặp Mắt Tròn",
      "chapter": "01 · Đánh thức ký ức Mắt Tròn",
      "intro": "Chào bạn! Mình là Cuội. Mình đang tìm chị Hằng.",
      "reply": "Mình chưa gặp chị ấy. Mình là Surveyor 3. Cứ gọi mình là Mắt Tròn nhé!",
      "invitation": "Cuội giúp mình tìm lại ba bức ảnh nhé: lần mình đến Mặt Trăng, những rãnh đất mình đào và hai người khách ghé thăm.",
      "memory": "Ba mảnh ký ức"
    },
    "en": {
      "friend": "Surveyor 3 — Round Eyes",
      "enter": "Meet Round Eyes",
      "chapter": "01 · Awakening Round Eyes’ memories",
      "intro": "Hello! I am Cuội. I am looking for Hằng.",
      "reply": "I have not seen her. I am Surveyor 3. You can call me Round Eyes!",
      "invitation": "Will you help me find three photos? They show my landing, the little trenches I dug, and two visitors.",
      "memory": "Three memories"
    }
  },
} as const satisfies LevelDefinition;
