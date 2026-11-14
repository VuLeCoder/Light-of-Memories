import type { Language } from '../../i18n';
import type { StoryLine } from '../../story/types';
const lines = (prefix: string, entries: [StoryLine['speaker'], string][]): StoryLine[] => entries.map(([speaker,text], i) => ({ id: `${prefix}-${i}`, speaker, text }));
export function sparkleRouteLines(language: Language) {
  return lines('sparkle-route', language === 'vi' ? [
    ['narrator', 'Cuội theo điểm sáng nhấp nháy, đi qua những miền thật xa để đến Biển Yên Tĩnh. Gọi là biển, nhưng nơi đây không có một giọt nước.'],
    ['narrator', 'Bụi dưới chân dần mịn và bằng phẳng hơn. Phía trước, điểm sáng lúc lóe lên như sao, lúc khuất đi như đang trốn tìm.'],
  ] : [
    ['narrator', 'Cuội follows the blinking light across distant lands to the Sea of Tranquility. It is called a sea, but there is not a single drop of water.'],
    ['narrator', 'The dust grows finer and flatter underfoot. Ahead, the light flares like a star, then disappears as if playing hide-and-seek.'],
  ]);
}
export function sparkleChallengeLines(language: Language) {
  return lines('sparkle-search', language === 'vi' ? [
    ['narrator', 'Những cái hố lớn nhỏ nằm rải rác trên bụi xám. Cuội đến gần một mép hố rồi vội lùi lại.'],
    ['cuoi', 'Mình sẽ đi vòng qua những hố này để đến chỗ điểm sáng kia!'],
  ] : [
    ['narrator', 'Craters of different sizes dot the gray dust. Cuội approaches one rim, then quickly steps back.'],
    ['cuoi', 'I will go around these craters to reach that light!'],
  ]);
}

export function sparkleMeetingLines(language: Language, cleaningIntro = false) {
  return lines(cleaningIntro ? 'sparkle-cleaning-intro' : 'sparkle-first-meeting', language === 'vi' ? cleaningIntro ? [
    ['lapLanh', 'Bụi phủ kín mình rồi, Cuội ạ. Ánh sáng khó vào, khó ra. Bạn giúp mình lau nhé?'],
    ['cuoi', 'Mình cất ảnh vào sách rồi. Giờ mình sẽ lau từng ô kính cho bạn!'],
    ['lapLanh', 'Cảm ơn Cuội! Nhẹ tay nhé, nhột quá, hi hi!'],
  ] : [
    ['lapLanh', 'Ê! Bắt được bạn rồi nhé!'],
    ['cuoi', 'Bạn là ai mà tinh nghịch thế?'],
    ['lapLanh', 'Mình là Lấp Lánh! Tên đầy đủ là Laser Ranging Retroreflector, gọi tắt là LRRR, bảng gương phản xạ laser của Apollo 11. Nhưng mình thích tên Lấp Lánh hơn!'],
    ['cuoi', 'Mình là Cuội, đang đi tìm chị Hằng. Mình cần những người bạn thắp sáng chiếc đèn ông sao này.'],
    ['lapLanh', 'Mắt Tròn đã thắp một cánh rồi! Mình sẽ giúp, nhưng đố bạn: mình không tự phát sáng, chỉ làm ánh sáng quay về. Mình là ai?'],
    ['cuoi', 'Là… một tấm gương?'],
    ['lapLanh', 'Gần đúng! Đây là phần thưởng nhé: ảnh mình khi đã mở ra, đứng thẳng, nhìn lên trời. Còn bây giờ, bạn nhìn xem… bụi phủ mờ cả rồi!'],
  ] : cleaningIntro ? [
    ['lapLanh', 'I am covered in dust, Cuội. Light has trouble getting in and out. Would you wipe me clean?'],
    ['cuoi', 'Your picture is safe in my book. Now I will wipe each glass square for you!'],
    ['lapLanh', 'Thank you, Cuội! Gently, please. That tickles, hee hee!'],
  ] : [
    ['lapLanh', 'Hey! Caught you!'],
    ['cuoi', 'Who are you, being so playful?'],
    ['lapLanh', 'I am Twinkle! My full name is Laser Ranging Retroreflector, or LRRR, the Apollo 11 laser reflector panel. But I like Twinkle better!'],
    ['cuoi', 'I am Cuội, looking for Hằng. I need friends to light up this star lantern.'],
    ['lapLanh', 'Round Eye has lit one point already! I will help, but first a riddle: I make no light myself, yet I make light come back. What am I?'],
    ['cuoi', 'A… mirror?'],
    ['lapLanh', 'Close! Here is your prize: a picture of me opened out, standing upright, facing the sky. But look at me now… all dull with dust!'],
  ]);
}

export function sparkleScienceLines(language: Language, phase: 'repair-intro' | 'ranging-intro' | 'farewell') {
  const vi = language === 'vi';
  return lines(`sparkle-${phase}`, phase === 'repair-intro' ? vi ? [
    ['lapLanh', 'Ảnh vừa rồi chụp lúc mình mới được đặt xuống, còn gấp như cuốn sách chưa mở. Nó có trước bức ảnh đầu tiên đấy. Mình chỉ nằm chờ thôi.'],
    ['cuoi', 'Bạn chờ gì vậy?'],
    ['lapLanh', 'Chờ được mở ra và chỉnh hướng về Trái Đất để làm việc! Giờ bạn thử mô hình hai chiếc gương nhé.'],
    ['lapLanh', 'Gương một đứng yên. Bạn xoay gương hai để tia sáng chạm cả hai gương, rồi trở về qua khe nhận ở trạm nhé!'],
  ] : [
    ['lapLanh', 'That picture shows me just set down, still folded like an unopened book. It comes before your first picture. All I could do was wait.'],
    ['cuoi', 'Wait for what?'],
    ['lapLanh', 'To be opened and aimed toward Earth so I could work! Now try this two-mirror model.'],
    ['lapLanh', 'Mirror one stays still. Turn mirror two so the light hits both mirrors, then returns through the station’s receiving slit!'],
  ] : phase === 'ranging-intro' ? vi ? [
    ['lapLanh', 'Đúng rồi! Hai gương vuông góc, 90°, giúp tia quay ngược hướng đi vào. Trong mô hình, lệch sang 89° hay 91° là tia trượt khỏi khe rồi!'],
    ['cuoi', 'Nhưng bạn cũng chỉ có hai mặt gương như thế à?'],
    ['lapLanh', 'Không đâu! Đó là mô hình cho dễ chơi. Mình có nhiều khối kính, mỗi khối có ba mặt vuông góc như góc trong chiếc hộp, giúp trả ánh sáng về nguồn.'],
    ['lapLanh', 'Ở Trái Đất, người ta gửi lên một xung laser. Mình không tự phát tia sáng, chỉ nhận rồi trả về. Họ đo thời gian từ lúc gửi đến lúc nhận lại.'],
    ['cuoi', 'Vậy mình tính khoảng cách bằng cách nào?'],
    ['lapLanh', 'Đồng hồ chỉ 2,56 giây cho cả đi lẫn về. Ánh sáng đi khoảng 300.000 ki-lô-mét mỗi giây. Bạn thử tính nhé, sách có thêm manh mối đấy!'],
  ] : [
    ['lapLanh', 'That is it! With the mirrors at right angles, 90°, light returns in the opposite direction. In this model, at 89° or 91° it misses the slit!'],
    ['cuoi', 'But do you only have two mirror faces like these?'],
    ['lapLanh', 'No! That is a model for playing. I have many glass blocks, each with three faces at right angles like the inside corner of a box, returning light to its source.'],
    ['lapLanh', 'People on Earth send up a laser pulse. I make no light myself, just catch it and send it back. They time it from sending to receiving.'],
    ['cuoi', 'So how do we calculate the distance?'],
    ['lapLanh', 'The clock reads 2.56 seconds for the round trip. Light travels about 300,000 kilometres each second. Have a go! Your book has a new clue.'],
  ] : vi ? [
    ['cuoi', 'Ba trăm tám mươi bốn nghìn ki-lô-mét! Một chớp ánh sáng mà đo được khoảng cách xa đến thế!'],
    ['lapLanh', 'Đúng rồi! Số đã làm tròn cho dễ tính; khoảng cách thật thay đổi theo quỹ đạo Mặt Trăng. Đó là lời chào từ Trái Đất, và mình chào lại.'],
    ['narrator', 'Cuội mở lại hai bức ảnh: chiếc hộp còn gấp trước, bảng gương đã mở sau.'],
  ] : [
    ['cuoi', 'Three hundred and eighty-four thousand kilometres! A tiny flash can measure such a great distance!'],
    ['lapLanh', 'That is right! The numbers are rounded for easy calculation; the real distance changes along the Moon’s orbit. Earth says hello, and I say hello back.'],
    ['narrator', 'Cuội opens the pictures again: the folded box first, the open reflector second.'],
  ]);
}

export const sparkleHoleWarningLines = (language: Language): StoryLine[] => [{ id: 'sparkle-hole-warning', speaker: 'cuoi', text: language === 'vi' ? 'Hố này sâu quá, mình đi vào là ngã, đau lắm.' : 'This crater is so deep. If I walk in, I will fall and hurt myself.' }];
