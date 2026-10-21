import type { Language } from '../i18n';
import type { StoryLine } from '../earth-dialogue';
export const challengeCopy = {
  vi: {
    soilTitle: 'T02 · Đào tìm ảnh ký ức', timelineTitle: 'T03 · Ghép nhật ký Mắt Tròn',
    soilPrompt: 'Chọn cách tìm hiểu đất dưới chân tàu.',
    choices: ['Dùng xẻng kiểm tra đất', 'Chụp ảnh Trái Đất trên bầu trời', 'Gửi lời chào về nhà'],
    wrong: 'Việc đó thú vị đấy. Nhưng lần này mình cần tìm hiểu mặt đất.',
    simulation: 'Mô phỏng đơn giản', soilResult: 'Khảo sát đất giúp các nhà khoa học chuẩn bị cho tàu đến sau.',
    timelinePrompt: 'Bấm các thẻ theo thứ tự câu chuyện. Bấm một thẻ đã xếp để lấy ra và thử lại.',
    events: { arrive: 'Robot đến Mặt Trăng', work: 'Robot chụp ảnh và khảo sát đất', visit: 'Phi hành gia đến thăm, mang một số bộ phận về nghiên cứu' },
    slots: ['Đầu tiên', 'Tiếp theo', 'Sau đó'], check: 'Ghép trang nhật ký', hint: 'Mắt Tròn cần đến nơi trước khi làm việc. Các vị khách đến sau.',
    nextSoil: 'Nhận dụng cụ và tìm ảnh', nextTimeline: 'Tiếp tục · Cuộc gặp đáng nhớ', begin: 'Bắt đầu thử thách',
    complete: 'Ba mảnh ký ức đã sáng!', thanks: 'Cảm ơn Cuội đã nhớ câu chuyện của mình.', promise: 'Mình sẽ nhớ tên bạn và kể lại chuyến đi của bạn.',
    reward: 'Cánh sao đầu tiên đã sáng · 1/5 người bạn',
    titles: ['Đôi mắt và chiếc xẻng', 'Vì sao phải khảo sát trước?', 'Cuộc ghé thăm không bị lãng quên'],
    bodies: ['','Trước khi đưa con người đến Mặt Trăng, các nhà khoa học cần tìm hiểu mặt đất. Surveyor 3 đào và kiểm tra đất để giúp đánh giá khả năng mặt đất chịu được trọng lượng tàu Apollo. Một lần đào không có nghĩa mọi nơi đều an toàn để đáp xuống.', 'Tháng 11/1969, Pete Conrad và Alan Bean của Apollo 12 đến thăm Surveyor 3. Họ mang máy ảnh, chiếc xẻng và một số bộ phận về Trái Đất để nghiên cứu môi trường Mặt Trăng. Phần tàu còn lại vẫn ở trên Mặt Trăng.'],
    photo: 'Pete Conrad bên Surveyor 3, tháng 11/1969. Ảnh: NASA.', newEntry: 'Nhật ký có mục mới; bạn có thể lật sách để đọc.',
  },
  en: {
    soilTitle: 'T02 · Dig for memory photos', timelineTitle: 'T03 · Restore the journal',
    soilPrompt: 'Choose how to study the ground beneath the lander.',
    choices: ['Use the scoop to test the soil', 'Photograph Earth in the sky', 'Send a greeting home'],
    wrong: 'That sounds interesting! But this time we need to study the ground.',
    simulation: 'Simplified simulation', soilResult: 'Studying the soil helped scientists prepare for landers that would arrive later.',
    timelinePrompt: 'Choose the cards in story order. Select a placed card to remove it and try again.',
    events: { arrive: 'The robot arrives on the Moon', work: 'The robot takes pictures and studies the soil', visit: 'Astronauts visit and bring some parts home for research' },
    slots: ['First', 'Next', 'Then'], check: 'Complete the journal page', hint: 'Round Eyes must arrive before starting work. The visitors come later.',
    nextSoil: 'Receive a tool and find photos', nextTimeline: 'Continue · A memorable visit', begin: 'Start the challenge',
    complete: 'All three memories are shining!', thanks: 'Thank you for remembering my story, Cuội.', promise: 'I will remember your name and share your journey.',
    reward: 'The first star point is shining · 1/5 friends',
    titles: ['A camera and a scoop', 'Why study the ground first?', 'A visit to remember'],
    bodies: ['', 'Before sending people to the Moon, scientists needed to understand its surface. Surveyor 3 dug and tested the soil to help assess whether it could support an Apollo lander. One dig does not mean every place is safe for landing.', 'In November 1969, Apollo 12 astronauts Pete Conrad and Alan Bean visited Surveyor 3. They brought its camera, scoop and some other parts back to Earth to study the lunar environment. The rest of the spacecraft remains on the Moon.'],
    photo: 'Pete Conrad beside Surveyor 3, November 1969. Photo: NASA.', newEntry: 'A new journal entry is available whenever you want to turn the page.',
  },
};
export function challengeLines(language: Language, timeline: boolean): StoryLine[] {
  const vi = language === 'vi';
  const texts = timeline ? (vi ? ['Mình đã chụp ảnh, khảo sát, rồi im lặng khi đêm dài đến.', 'Khoảng hai năm rưỡi sau, hai vị khách đến thăm!', 'Một vài bộ phận của mình được mang về nhà để nghiên cứu.', 'Mình giúp bạn xếp lại câu chuyện nhé!'] : ['I took pictures and studied the soil, then fell silent as the long night began.', 'About two and a half years later, two visitors came!', 'Some of my parts were taken home for research.', 'Let me help put your story in order!']) : (vi ? ['Mình có thể giúp bạn tìm lại ký ức không?', 'Tớ tặng cậu chiếc xẻng ký ức. Ba bức ảnh đang chờ ở những dấu vết trên mặt đất.', 'Tới gần dấu vết rồi nhấn E để đào ảnh, không cần theo thứ tự. Nếu bí, hãy mở sách để đọc và ghi nhớ lần lượt các gợi ý.'] : ['Can I help you recover your memories?', 'Take this memory scoop. Three photographs await among the traces on the ground.', 'Walk near a trace and press E to dig, in any order. If you need help, open the notebook and note its clues one at a time.']);
  return texts.map((text, i) => ({ id: `${timeline ? 't03' : 't02'}-${i}`, speaker: timeline ? i === 3 ? 'cuoi' : 'matTron' : i === 0 ? 'cuoi' : 'matTron', text }));
}
