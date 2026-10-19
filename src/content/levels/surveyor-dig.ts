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
    title: 'T02 · Tìm ba bức ảnh ký ức', book: 'Sổ tay khảo sát', open: 'Xem gợi ý trong sách',
    read: 'Ghi nhớ điểm cần kiểm tra', ready: 'Đã ghi nhớ gợi ý', dig: 'Đào ký ức', digging: 'Cuội đang đào…',
    controls: 'Mũi tên / WASD: di chuyển gần–xa, trái–phải. Hoặc chạm mặt đất để đi tới.',
    hint: 'Hãy mở sổ tay, đọc dấu vết rồi tìm điểm tương ứng trên mặt đất.',
    unread: 'Có dấu vết ở đây. Hãy tìm mô tả trong sổ tay trước khi đào.',
    continue: 'Tiếp tục tìm ảnh', finish: 'Ghép ba ảnh thành nhật ký', found: 'Ảnh đã tìm thấy',
    fiction: 'Đào ảnh là tình tiết tưởng tượng; các ảnh và sự kiện dựa trên tư liệu NASA.',
    clues: {
      arrive: 'Ở vùng đất gần phía trước, bên trái chân Mắt Tròn, tìm hai vết lõm bầu dục cạnh nhau. Chân đế từng để lại dấu khi tàu chạm đất.',
      work: 'Đi xa hơn về bên phải Mắt Tròn. Tìm những rãnh dài song song trên đất — dấu vết của dụng cụ khảo sát.',
      visit: 'Đi lên vùng đất xa phía trái. Tìm một chuỗi dấu chân dẫn về phía Mắt Tròn, nơi những người bạn từng đi qua.',
    },
    names: { arrive: 'Dấu chân đế', work: 'Rãnh khảo sát', visit: 'Dấu bước chân' },
    descriptions: {
      arrive: 'Tháng 4/1967, Surveyor 3 hạ cánh trên Mặt Trăng. Ảnh chân đế do chính tàu chụp ghi lại dấu tích của lần chạm đất.',
      work: 'Sau khi hạ cánh, Surveyor 3 dùng xẻng đào rãnh và thử tính chất đất. Ảnh Apollo 12 chụp năm 1969 cho thấy những rãnh đào còn lại từ năm 1967.',
      visit: 'Tháng 11/1969, Pete Conrad và Alan Bean của Apollo 12 đến thăm. Họ mang máy ảnh, xẻng và một số bộ phận về Trái Đất nghiên cứu.',
    },
  },
  en: {
    title: 'T02 · Find three memory photos', book: 'Field notebook', open: 'Read the book clues',
    read: 'Remember this location', ready: 'Clue noted', dig: 'Dig for a memory', digging: 'Cuội is digging…',
    controls: 'Arrows / WASD: move left, right, closer and farther. Or tap the ground to walk there.',
    hint: 'Open the notebook, read the traces and find the matching place on the ground.',
    unread: 'There is a trace here. Find its description in the notebook before digging.',
    continue: 'Keep looking', finish: 'Arrange the photos into a journal', found: 'Photos found',
    fiction: 'Digging up photos is fictional; the photographs and events come from NASA records.',
    clues: {
      arrive: 'On the near ground, to the left of Round Eyes’ feet, find two oval impressions side by side. The footpad left traces as the spacecraft touched down.',
      work: 'Walk farther away to the right of Round Eyes. Look for parallel grooves in the soil — traces of the soil sampler.',
      visit: 'Walk toward the far ground on the left. Find a trail of footprints leading toward Round Eyes, where visitors once walked.',
    },
    names: { arrive: 'Footpad impressions', work: 'Sampler trenches', visit: 'Astronaut footprints' },
    descriptions: {
      arrive: 'In April 1967, Surveyor 3 landed on the Moon. Its own photograph of a footpad records traces of the touchdown.',
      work: 'After landing, Surveyor 3 dug trenches and tested the soil. This Apollo 12 photograph from 1969 shows trenches left by the lander in 1967.',
      visit: 'In November 1969, Apollo 12 astronauts Pete Conrad and Alan Bean visited. They brought the camera, scoop and other parts back to Earth for study.',
    },
  },
};
export const digText = (language: Language) => digCopy[language];
