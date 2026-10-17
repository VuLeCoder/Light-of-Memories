export type SceneId = 'earth' | 'moon';
export const scenes = {
  earth: {
    number: '01', tab: 'Hiên nhà', title: 'Đêm Rằm · Câu chuyện An và bà',
    subtitle: 'Một hiên nhà nhỏ. Một đêm trăng tròn.',
    description: 'An và bà dưới mái hiên đêm Trung Thu. Cảnh thử dùng tư thế nghỉ từ sprite sheet gốc.',
    characters: ['an', 'ba'],
  },
  moon: {
    number: '02', tab: 'Mặt Trăng', title: 'Dưới bóng Cây Đa',
    subtitle: 'Phía bên kia của một câu chuyện.',
    description: 'Cuội bên gốc đa và chiếc ghế đá. Cây, ghế và mặt đất là các lớp riêng để bổ sung tương tác ở lượt sau.',
    characters: ['cuoi', 'cayDa'],
  },
} as const;
