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
    bodies: ['','Trước khi đưa người lên Mặt Trăng, các nhà khoa học muốn biết mặt đất ở đó như thế nào. Mắt Tròn dùng xẻng đào những rãnh nhỏ để tìm hiểu đất. Nhờ vậy, họ có thêm thông tin để chuẩn bị cho những chuyến tàu sau.', 'Tháng 11 năm 1969, hai phi hành gia Pete Conrad và Alan Bean đến thăm Mắt Tròn. Họ mang máy ảnh, đầu xẻng và vài bộ phận về Trái Đất để nghiên cứu. Phần còn lại của Mắt Tròn vẫn ở trên Mặt Trăng.'],
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
    bodies: ['', 'Before people went to the Moon, scientists wanted to know what its ground was like. Round Eyes used a scoop to dig little trenches. This helped scientists prepare for later Moon trips.', 'In November 1969, two astronauts named Pete Conrad and Alan Bean visited Round Eyes. They took its camera, scoop and a few other parts back to Earth to study. The rest of Round Eyes stayed on the Moon.'],
    photo: 'Pete Conrad beside Surveyor 3, November 1969. Photo: NASA.', newEntry: 'A new journal entry is available whenever you want to turn the page.',
  },
};
export function challengeLines(language: Language, timeline: boolean): StoryLine[] {
  const vi = language === 'vi';
  const texts = timeline ? (vi ? ['Mình đến Mặt Trăng, chụp ảnh và đào đất.', 'Hơn hai năm sau, hai vị khách đến thăm mình!', 'Họ mang vài bộ phận của mình về Trái Đất để tìm hiểu.', 'Mình sẽ xếp các bức ảnh theo thứ tự câu chuyện nhé!'] : ['I reached the Moon, took pictures, and dug the soil.', 'More than two years later, two visitors came to see me!', 'They took some of my parts back to Earth to study.', 'I will put the photos in story order!']) : (vi ? ['Mình có thể giúp bạn tìm lại ký ức không?', 'Chiếc xẻng thật của mình đã về Trái Đất rồi. Mình tặng Cuội chiếc xẻng ký ức để tìm ba bức ảnh nhé!', 'Cuội có thể đào ở bất cứ đâu. Nhấn E để đào nhé! Nếu cần giúp, hãy mở sách xem gợi ý theo thứ tự.'] : ['Can I help you find your memories?', 'My real scoop went back to Earth. Here is a magic memory scoop to help you find three photos!', 'You can dig anywhere. Press E to dig! If you need help, read the book clues in order.']);
  return texts.map((text, i) => ({ id: `${timeline ? 't03' : 't02'}-${i}`, speaker: timeline ? i === 3 ? 'cuoi' : 'matTron' : i === 0 ? 'cuoi' : 'matTron', text }));
}
