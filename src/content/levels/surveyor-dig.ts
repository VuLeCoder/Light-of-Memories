import type { Language } from '../i18n';
import type { SurveyorEvent } from './surveyor-progress';

// Artistic exploration layout, not surveyed coordinates of the historical site.
export const digSites: { id: SurveyorEvent; x: number; y: number }[] = [
  { id: 'arrive', x: 595, y: 455 },
  { id: 'work', x: 825, y: 365 },
  { id: 'visit', x: 295, y: 290 },
];
export const memoryPhotos = {
  arrive: `${import.meta.env.BASE_URL}assets/surveyor-footpad.jpg`,
  work: `${import.meta.env.BASE_URL}assets/surveyor-trenches.jpg`,
  visit: `${import.meta.env.BASE_URL}assets/surveyor-apollo12.jpg`,
};
export const digCopy = {
  vi: {
    title: 'T02 · Tìm ba bức ảnh ký ức', book: 'Sổ tay khảo sát', open: 'Gợi ý',
    read: 'Ghi nhớ điểm cần kiểm tra', ready: 'Đã ghi nhớ gợi ý', digKey: 'Nhấn E để đào', lockedClue: 'Ghi nhớ gợi ý trước để đọc gợi ý tiếp theo.', dig: 'Đào ký ức', digging: 'Cuội đang đào…',
    controls: 'Mũi tên / WASD: di chuyển gần–xa, trái–phải. Hoặc chạm mặt đất để đi tới. E: đào ảnh ký ức.',
    hint: 'Nhấn E để đào ảnh ký ức. Nếu cần gợi ý, hãy mở sách.',
    empty: 'Chưa thấy ảnh ở đây. Thử chỗ khác nhé!',
    touchControls: 'Chạm mặt đất để Cuội đi tới. Nhấn E trên bàn phím để đào. Cần giúp thì mở sách nhé!',
    touchHint: 'Nhấn E để tìm ảnh. Nếu cần gợi ý, hãy mở sách.',
    unread: 'Có dấu vết ở đây. Cuội có thể đào ngay hoặc xem gợi ý trong sách.',
    continue: 'Tiếp tục tìm ảnh', finish: 'Ghép ba ảnh thành nhật ký', found: 'Ảnh đã tìm thấy',
    fiction: 'Cuội đào tìm ảnh là chuyện tưởng tượng. Mắt Tròn và các sự kiện trong ảnh là có thật.',
    clues: {
      arrive: 'Đi sang bên trái Mắt Tròn, ở vùng đất gần phía trước. Tìm hai vết lõm hình bầu dục cạnh nhau. Đó là dấu chân tàu để lại khi chạm đất.',
      work: 'Đi xa hơn về bên phải Mắt Tròn. Tìm những rãnh đất dài nằm cạnh nhau. Chiếc xẻng đã đào những rãnh này.',
      visit: 'Đi lên vùng đất xa phía trái. Tìm dấu chân dẫn về phía Mắt Tròn. Hai vị khách từng đi qua đó.',
    },
    names: { arrive: 'Dấu chân Mắt Tròn', work: 'Những rãnh đất nhỏ', visit: 'Dấu bước chân' },
    descriptions: {
      arrive: 'Tháng 4 năm 1967, Mắt Tròn đến Mặt Trăng. Tàu đã tự chụp lại phần chân của mình sau khi chạm đất.',
      work: 'Mắt Tròn dùng xẻng đào những rãnh nhỏ để tìm hiểu đất. Bức ảnh này được phi hành gia chụp năm 1969. Những rãnh đất có từ năm 1967 vẫn còn đó.',
      visit: 'Tháng 11 năm 1969, hai phi hành gia Pete Conrad và Alan Bean đến thăm Mắt Tròn. Họ mang máy ảnh, đầu xẻng và vài bộ phận về Trái Đất để nghiên cứu.',
    },
  },
  en: {
    title: 'T02 · Find three memory photos', book: 'Field notebook', open: 'Hint',
    read: 'Remember this location', ready: 'Clue noted', digKey: 'Press E to dig', lockedClue: 'Note the previous clue to read the next one.', dig: 'Dig for a memory', digging: 'Cuội is digging…',
    controls: 'Arrows / WASD: move left, right, closer and farther. Or tap the ground to walk there. E: dig for memory photos.',
    hint: 'Press E to dig for memory photos. Open the book if you need a clue.',
    empty: 'No photo here. Try another spot!',
    touchControls: 'Tap the ground to walk there. Press E on your keyboard to dig. Open the book if you need help!',
    touchHint: 'Press E to find photos. Open the book if you need a clue.',
    unread: 'There is a trace here. You can dig now or check the book for a clue.',
    continue: 'Keep looking', finish: 'Arrange the photos into a journal', found: 'Photos found',
    fiction: 'Cuội digging for photos is make-believe. Round Eyes and the events in the photos are real.',
    clues: {
      arrive: 'Look left of Round Eyes, near the front. Find two oval marks side by side. The spacecraft made them when it touched the ground.',
      work: 'Walk farther away, to the right of Round Eyes. Find long marks in the soil, side by side. The scoop dug them.',
      visit: 'Walk to the far ground on the left. Find footprints leading toward Round Eyes. Two visitors once walked there.',
    },
    names: { arrive: 'Round Eyes’ foot marks', work: 'Little soil trenches', visit: 'Astronaut footprints' },
    descriptions: {
      arrive: 'Round Eyes reached the Moon in April 1967. It took this photo of its own foot after touching the ground.',
      work: 'Round Eyes used its scoop to dig little trenches. Astronauts took this photo in 1969. The trenches from 1967 were still there.',
      visit: 'Two astronauts, Pete Conrad and Alan Bean, visited in November 1969. They took the camera, scoop and a few other parts back to Earth to study.',
    },
  },
};
export const digText = (language: Language) => digCopy[language];
