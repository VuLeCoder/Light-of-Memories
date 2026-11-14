import { remembrance } from '../../story/remembrance';
import type { Language } from '../../i18n';
import type { StoryLine } from '../../story/types';
export const endingCopy = {
  vi: {
    title: 'Câu chuyện của Mắt Tròn', labels: ['Lần đầu chạm đất', 'Đôi mắt và chiếc xẻng', 'Những người bạn ghé thăm'],
    stories: [
      'Mình đến Mặt Trăng vào tháng Tư năm 1967. Mình chạm đất, nảy lên hai lần rồi mới nằm yên. Nhìn này, chân tàu đã để lại dấu trên đất!',
      'Mình gửi về hơn sáu nghìn tấm ảnh và dùng chiếc xẻng để thử đất cho những người đến sau. Các rãnh đào năm 1967 vẫn còn khi được chụp lại năm 1969.',
      'Tháng 11/1969, Pete và Alan đến thăm, mang máy ảnh và vài bộ phận về nghiên cứu. Một phần mình đã về nhà, phần còn lại ở đây.',
    ],
    captions: ['Chân đế Surveyor 3 · 1967 · NASA', 'Rãnh khảo sát năm 1967, được chụp lại năm 1969 · NASA', 'Pete Conrad bên Surveyor 3 · 1969 · NASA'],
    before: 'Trang trước', next: 'Trang tiếp', return: 'Trở lại bên Mắt Tròn', listen: 'Nghe Mắt Tròn kể', carry: 'Mang theo ánh sáng',
    route: 'Về lộ trình', replay: 'Xem lại đoạn kết', playAgain: 'Chơi lại', reward: 'Kỷ niệm đầu tiên · Chiếc đèn đã sáng thêm',
    distant: 'Đi đến điểm sáng phía xa để trở về lộ trình.', journal: 'Ba bức ảnh đã được lưu trong sổ tay của Cuội.', unavailable: 'Ảnh tư liệu chưa tải được.', retry: 'Tải lại ảnh',
    intro: [
      { id: 'ending-intro-0', speaker: 'matTron', text: 'Những bức ảnh… giờ đã trở về đúng chỗ rồi.' },
      { id: 'ending-intro-1', speaker: 'cuoi', text: 'Bạn nhớ hai người từng đến thăm bạn chưa?' },
      { id: 'ending-intro-2', speaker: 'matTron', text: 'Mình nhớ rồi. Ban đầu mình buồn khi các bộ phận được mang đi. Nhưng chỉ cần có ai nhớ, mình không bao giờ thật sự một mình. Để mình kể Cuội nghe nhé.' },
    ],
    outro: [
      { id: 'ending-outro-0', speaker: 'matTron', text: remembrance.vi.request },
      { id: 'ending-outro-1', speaker: 'cuoi', text: `${remembrance.vi.reply} Một cánh sao sáng rồi!` },
      { id: 'ending-outro-2', speaker: 'cuoi', text: 'Kìa, phía xa có một điểm sáng! Không biết còn ai đang đợi mình nhỉ?' },
      { id: 'ending-outro-3', speaker: 'matTron', text: 'Đó là bạn mình, bạn ấy thích chơi với ánh sáng. Đến gặp bạn ấy nhé, Cuội. Và kể bạn ấy nghe chuyện của mình nữa!' },
    ],
  },
  en: {
    title: 'Round Eye’ story', labels: ['The first touchdown', 'A camera and a scoop', 'Visitors on the Moon'],
    stories: [
      'I reached the Moon in April 1967. I bounced twice before coming to rest. Look! My feet left marks in the soil.',
      'I sent back more than six thousand pictures and used my scoop to test the ground for later visitors. Trenches dug in 1967 were still there when photographed in 1969.',
      'In November 1969, Pete and Alan visited and took my camera and some parts home to study. Part of me went home, and part stayed here.',
    ],
    captions: ['Surveyor 3 footpad · 1967 · NASA', 'Trenches dug in 1967, photographed in 1969 · NASA', 'Pete Conrad beside Surveyor 3 · 1969 · NASA'],
    before: 'Previous page', next: 'Next page', return: 'Return to Round Eye', listen: 'Listen to the story', carry: 'Carry the light',
    route: 'View the route', replay: 'Replay the ending', playAgain: 'Play again', reward: 'First memory · The lantern is brighter',
    distant: 'Walk to the distant light to return to the route.', journal: 'All three photographs are now in Cuội’s notebook.', unavailable: 'The archive photo could not load.', retry: 'Retry photo',
    intro: [
      { id: 'ending-intro-0', speaker: 'matTron', text: 'The photographs… they are all back in the right places.' },
      { id: 'ending-intro-1', speaker: 'cuoi', text: 'Do you remember the two people who came to visit you?' },
      { id: 'ending-intro-2', speaker: 'matTron', text: 'I do. At first I was sad when my parts were taken away. But as long as someone remembers me, I am never truly alone. Let me tell you, Cuội.' },
    ],
    outro: [
      { id: 'ending-outro-0', speaker: 'matTron', text: remembrance.en.request },
      { id: 'ending-outro-1', speaker: 'cuoi', text: `${remembrance.en.reply} One star point is shining!` },
      { id: 'ending-outro-2', speaker: 'cuoi', text: 'Look, a light in the distance! I wonder who else is waiting for me?' },
      { id: 'ending-outro-3', speaker: 'matTron', text: 'That is my friend. She loves playing with light. Go and meet her, Cuội. And tell her my story too!' },
    ],
  },
} as const satisfies Record<Language, { intro: readonly StoryLine[]; outro: readonly StoryLine[] } & Record<string, unknown>>;

