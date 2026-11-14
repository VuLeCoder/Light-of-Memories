import { remembrance } from '../../story/remembrance';
import type { Language } from '../../i18n';
import type { StoryLine } from '../../story/types';

export function sparkleEndingDialogue(language: Language) {
  const vi = language === 'vi';
  const intro: StoryLine[] = [{ id: 'sparkle-ending-intro', speaker: 'lapLanh', text: vi
    ? 'Đúng rồi, khoảng 384.000 ki-lô-mét! Số đã làm tròn cho dễ tính; khoảng cách thật thay đổi theo quỹ đạo Mặt Trăng. Giờ mình cùng xem hai ảnh: tấm nào trước, tấm nào sau?'
    : 'That is right, about 384,000 kilometres! The numbers are rounded for easy calculation; the real distance changes along the Moon’s orbit. Now look at our two pictures: which comes first?' }];
  const outro: StoryLine[] = [
    { id: 'sparkle-ending-thanks', speaker: 'lapLanh', text: vi ? remembrance.vi.request : remembrance.en.request },
    { id: 'sparkle-ending-star', speaker: 'cuoi', text: vi ? `${remembrance.vi.reply} Chiếc đèn sáng thêm rồi!` : `${remembrance.en.reply} The lantern is brighter now!` },
    { id: 'sparkle-ending-goodbye', speaker: 'lapLanh', text: vi ? 'Cảm ơn Cuội! Nhờ bạn nhớ đến mình, mình thấy lại có ích. Nhìn những vòng gợn trên bụi kia: chúng gợi đến Tai Thính, người bạn rất hay lắng nghe ở Đại Dương Bão. Đi gặp bạn ấy và kể chuyện của mình nhé!' : 'Thank you, Cuội! Being remembered makes me feel useful again. Those ripples in the dust remind me of Sharp Ear, a very good listener in the Ocean of Storms. Go and tell our friend my story!' },
  ];
  return { intro, outro };
}

export function sparkleEndingStories(language: Language) {
  const vi = language === 'vi';
    const stories = vi ? [
      'Tấm này trước nhé: các phi hành gia Apollo 11 đặt mình xuống mặt đất khi mình còn gấp lại. Sau đó, họ mở mình ra và chỉnh đúng hướng. Lúc ấy mình mới thật sự bắt đầu làm việc!',
      'Đây là mình khi đã mở ra. Mình là Lấp Lánh, bảng gương Apollo 11, được đặt ở Biển Yên Tĩnh năm 1969. Nhiều khối kính nhỏ giúp mình trả ánh sáng về nguồn, không cần pin hay động cơ. Mình đã được nhớ!',
    ] : [
      'This picture comes first: the Apollo 11 astronauts set me down while I was still folded. Then they opened me and aimed me the right way. That was when I could really begin my work!',
      'Here I am opened out. I am Twinkle, the Apollo 11 reflector, placed in the Sea of Tranquility in 1969. My little glass blocks return light to its source with no batteries or motors. I have been remembered!',
    ];
  return stories;
}
