import { portraits } from '../../assets';
import type { LevelDefinition } from '../types';

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
      "reply": "Mình là Surveyor 3, cứ gọi mình là Mắt Tròn nhé! Mình từng thấy một vệt sáng xa, nhưng không biết có phải chị Hằng không.",
      "invitation": "Cuội giúp mình tìm lại ba bức ảnh nhé: lần mình đến Mặt Trăng, những rãnh đất mình đào và hai người khách ghé thăm.",
      "memory": "Ba mảnh ký ức"
    },
    "en": {
      "friend": "Surveyor 3 — Round Eye",
      "enter": "Meet Round Eye",
      "chapter": "01 · Awakening Round Eye’ memories",
      "intro": "Hello! I am Cuội. I am looking for Hằng.",
      "reply": "I am Surveyor 3. Call me Round Eye! I once saw a soft glow far away, but I don’t know whether it was Hằng.",
      "invitation": "Will you help me find three photos? They show my landing, the little trenches I dug, and two visitors.",
      "memory": "Three memories"
    }
  },
} as const satisfies LevelDefinition;
