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
      "intro": "Bạn là ai mà đứng đây một mình thế?",
      "reply": "Mình là Surveyor 3. Cứ gọi mình là Mắt Tròn nhé!",
      "invitation": "Cuội giúp mình tìm lại ba mảnh ký ức nhé: lần hạ cánh, những rãnh khảo sát và cuộc gặp lại.",
      "memory": "Ba mảnh ký ức"
    },
    "en": {
      "friend": "Surveyor 3 — Round Eyes",
      "enter": "Meet Round Eyes",
      "chapter": "01 · Awakening Round Eyes’ memories",
      "intro": "Who are you, standing here all alone?",
      "reply": "I am Surveyor 3. You can call me Round Eyes!",
      "invitation": "Will you help me find three memories: my landing, my soil studies and a visit from friends?",
      "memory": "Three memories"
    }
  },
} as const satisfies LevelDefinition;
