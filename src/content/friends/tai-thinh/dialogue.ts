import type { Language } from '../../i18n';
import type { StoryLine } from '../../story/types';
import { taiThinhPhotos } from '../../assets';

// Authored M0 content; opening integrated in M2, challenges follow in M3–M7. Sources: docs/references.md.
const text = (vi: string, en: string) => ({ vi, en });
const line = (id: string, speaker: StoryLine['speaker'], vi: string, en: string) => ({ id: `tai-thinh-${id}`, speaker, ...text(vi, en) });

export const taiThinhIdentity = {
  id: 'tai-thinh', chapter: '03', scene: '05',
  name: text('Tai Thính', 'Sharp Ear'),
  subtitle: text('Bí mật những rung động của Mặt Trăng', 'The Moon’s quiet tremors'),
  location: text('Đại Dương Bão · Apollo 12', 'Ocean of Storms · Apollo 12'),
} as const;

export const taiThinhScript = {
  route: [
    line('route-01', 'narrator', "Rời Biển Yên Tĩnh với hai cánh sao đã sáng, Cuội lần theo những vòng gợn nhẹ trên bụi xám, đi thật chậm và thật khẽ.", "Leaving the Sea of Tranquility with two star points lit, Cuội follows faint ripples across the grey dust, walking slowly and softly."),
    line('route-02', 'narrator', "Những vòng gợn dẫn đến ba thiết bị: một chiếc có ăng-ten, một chiếc chìa ba cần dài, và một chiếc thấp, tròn, khoác áo bạc.", "The ripples lead to three instruments: one with an antenna, one with three long arms, and a low, round one in a silver cloak."),
    line('route-03', 'cuoi', "Xin chào. Có ai ở đây không?", "Hello. Is anyone here?"),
  ],
  arrival: [
    line('arrival-01', 'narrator', "Một giọng nhỏ, ngập ngừng cất lên giữa ba thiết bị.", "A small, hesitant voice comes from among the three instruments."),
    line('arrival-02', 'taiThinh', "Bạn… nói nhỏ thôi được không? Mình nghe rõ hơn khi xung quanh thật yên.", "Could you… speak quietly, please? I hear better when everything around me is very still."),
    line('arrival-03', 'cuoi', "Xin lỗi! Mình là Cuội. Còn bạn là ai? Có ba món đồ, mình không biết bạn là món nào.", "Sorry! I am Cuội. Who are you? There are three things here, and I do not know which one you are."),
    line('arrival-04', 'taiThinh', "Bạn nhìn kỹ rồi tự đoán nhé. Mình hơi ngại khi bị nhận nhầm.", "Have a good look and guess. I get a little shy when people mix me up."),
  ],
  meeting: [
    line('meeting-01', 'cuoi', "Là bạn rồi!… Ôi, mình lại nói to quá.", "It is you!… Oh, I was too loud again."),
    line('meeting-02', 'taiThinh', "Đúng rồi. Mình là Tai Thính. Tên đầy đủ là PSE, nghĩa là “thí nghiệm địa chấn thụ động”. Nghe khó nhớ nhỉ?", "That is right. I am Sharp Ear. My full name is PSE, meaning “Passive Seismic Experiment”. Hard to remember, is it not?"),
    line('meeting-03', 'cuoi', "Bạn làm việc gì vậy?", "What do you do?"),
    line('meeting-04', 'taiThinh', "Mình đo những chuyển động rất nhỏ của mặt đất, khẽ đến mức không ai cảm thấy.", "I measure tiny movements of the ground, so small that nobody could feel them."),
    line('meeting-05', 'cuoi', "Nhưng Mặt Trăng làm gì có không khí để truyền tiếng động?", "But the Moon has no air to carry sound?"),
    line('meeting-06', 'taiThinh', "Đúng thế. Mình không nghe bằng tai, mà cảm nhận mặt đất rung. Mình thích gọi đó là “lắng nghe”, thế thôi.", "You are right. I do not hear with ears; I feel the ground shaking. I like to call it “listening”, that is all."),
    line('meeting-07', 'taiThinh', "Mình còn giữ một bức ảnh ngày được đặt xuống đây. Cuội xem cùng mình nhé?", "I still have a picture from the day I was set down here. Will you look at it with me, Cuội?"),
  ],
  recordsIntro: [
    line('records-01', 'taiThinh', "Mình có cuốn sổ ghi những lần mặt đất rung. Nhưng lâu quá rồi, các thẻ chú giải bị lẫn. Bạn xếp lại giúp mình nhé?", "I have a notebook of times the ground shook. But it was so long ago that the note cards got mixed up. Could you sort them out?"),
    line('records-02', 'cuoi', "Mình sẽ đọc kỹ từng thẻ. Chỉ nhìn đường sóng thì chưa đủ, phải không?", "I will read each card carefully. Looking at the wavy line is not enough, is it?"),
    line('records-03', 'taiThinh', "Đúng thế, phải đọc cả ghi chú nữa. Các đường sóng này mình vẽ cho dễ chơi thôi, không phải số liệu thật đâu.", "That is right; read the notes too. I drew these waves to make this easier to play. They are not my real data."),
  ],
  afterRecords: [
    line('after-records-01', 'taiThinh', "Các nhãn đúng rồi! Những nhịp đều như tiếng máy thì mình nghi là do chính mình.", "The labels are right! Those even beats, like a machine ticking, may come from me."),
    line('after-records-02', 'taiThinh', "Gần lúc Mặt Trời mọc và lặn, người ta thấy nhiễu lạ, nghi do vỏ bọc hay cáp co giãn vì nóng lạnh. Chưa chắc đâu, nên cần kiểm tra.", "Near sunrise and sunset, people saw odd disturbances. They suspected the cover or cable stretching and shrinking with heat and cold. It was uncertain, so it needed checking."),
    line('after-records-03', 'taiThinh', "Đây là ảnh thứ hai: mình ở phía trước, trạm trung tâm ở phía sau. Mình ít nói, nhưng có bạn bên cạnh thì cũng ấm.", "Here is the second picture: I am in front, with the central station behind. I do not talk much, but it is warm to have friends beside me."),
  ],
  ringingIntro: [
    line('ringing-01', 'taiThinh', "Có một ngày mình nhớ nhất: 20 tháng 11 năm 1969, hôm sau ngày mình được đặt xuống.", "There is one day I remember best: 20 November 1969, the day after I was set down."),
    line('ringing-02', 'taiThinh', "Sau khi các phi hành gia rời đi, người ta cho tầng bay lên của tàu đổ bộ Apollo 12 va xuống Mặt Trăng. Mình ghi lại rung động đó. Đường nào là của mình nhỉ?", "After the astronauts left, the Apollo 12 lunar module’s ascent stage was sent into the Moon. I recorded the shaking. Which line do you think is mine?"),
  ],
  afterRinging: [
    line('after-ringing-01', 'cuoi', "Hơn năm mươi lăm phút!", "More than fifty-five minutes!"),
    line('after-ringing-02', 'taiThinh', "Đúng rồi. Có tài liệu ghi hơn 55 phút, có tài liệu ghi khoảng 50 phút. Dù thế nào cũng là rất lâu.", "Correct. Some accounts say more than 55 minutes, others about 50. Either way, it was a very long time."),
    line('after-ringing-03', 'cuoi', "Sao lâu vậy? Mặt Trăng giống một cái chuông à?", "Why so long? Is the Moon like a bell?"),
    line('after-ringing-04', 'taiThinh', "Không đâu, Mặt Trăng không rỗng như chuông. Đá vụn làm rung động tản ra nhiều hướng rồi mất đi thật chậm. “Ngân vang” là cách nói cho dễ hình dung thôi.", "No, the Moon is not hollow like a bell. Broken rock scatters the shaking in many directions, and it fades very slowly. “Ringing” is just a way to picture it."),
  ],
  rhythmIntro: [
    line('rhythm-01', 'taiThinh', "Còn một điều nữa, Cuội ơi. Ký ức của mình nằm sau một phiến đá. Phiến đá chỉ mở khi bạn nhớ đúng nhịp.", "One more thing, Cuội. My memories are behind a stone slab. It only opens when you remember the right rhythm."),
    line('rhythm-02', 'cuoi', "Hai nhịp gần nhau… nghỉ thật lâu… rồi thêm một nhịp. Mình sẽ xem kỹ nhịp mẫu.", "Two beats close together… a long pause… then one more. I will watch the sample carefully."),
  ],
  afterRhythm: [
    line('after-rhythm-01', 'taiThinh', "Phiến đá mở rồi! Trong ảnh cuối có bạn ba cần và chú Pete Conrad đang lắp ăng-ten. Nhìn ảnh, mình nhớ là mình chưa bao giờ ở một mình.", "The slab is open! The last picture shows my three-armed friend and Pete Conrad fitting an antenna. It reminds me that I was never alone."),
    line('after-rhythm-02', 'cuoi', "Đủ ba bức ảnh rồi. Mình cùng xem lại: áo bạc trước, trạm trung tâm tiếp theo, rồi bạn ba cần nhé.", "All three pictures are here. Let us look back: the silver cloak first, the central station next, then your three-armed friend."),
  ],
  memoriesIntro: [
    line('memories-01', 'taiThinh', "Cảm ơn Cuội. Mình cùng xem ba bức ảnh theo thứ tự ấy để câu chuyện không bị lẫn nhé.", "Thank you, Cuội. Let us look through the three pictures in that order so my story does not get mixed up."),
  ],
  farewell: [
    line('farewell-01', 'taiThinh', "Mình làm việc đến ngày 30 tháng 9 năm 1977, rồi các thiết bị được tắt. Những gì mình ghi vẫn lưu trên Trái Đất để các nhà khoa học còn đọc.", "I worked until 30 September 1977, when the instruments were switched off. My records are still kept on Earth for scientists to read."),
    line('farewell-02', 'taiThinh', "Xin đừng quên tên mình.", "Please do not forget my name."),
    line('farewell-03', 'cuoi', "Mình nhớ bạn rồi. Mình sẽ kể lại câu chuyện của bạn.", "I remember you now. I will tell your story."),
    line('farewell-04', 'taiThinh', "Cảm ơn bạn đã chịu lắng nghe. Ít ai để ý những phép đo nhỏ như mình, nhưng nhờ chúng, người ta hiểu thêm về một nơi rất xa.", "Thank you for being willing to listen. Hardly anyone notices small measurements like mine, but they help people understand a place very far away."),
    line('farewell-05', 'taiThinh', "Bạn nhìn kìa, một vệt sáng nhỏ trải dài trên bụi như sợi chỉ bạc. Bạn hãy mang ánh sáng này và đi theo nó nhé.", "Look, a tiny line of light stretches across the dust like a silver thread. Take this light with you and follow it."),
    line('farewell-06', 'cuoi', "Cánh sao thứ ba sáng rồi! Tạm biệt Tai Thính. Mình sẽ bước theo vệt sáng để tìm người bạn đang chờ.", "The third star point is shining! Goodbye, Sharp Ear. I will follow the light to find the friend who is waiting."),
  ],
} as const;

export type TaiThinhScriptId = keyof typeof taiThinhScript;
export const taiThinhDialogue = (language: Language, group: TaiThinhScriptId): StoryLine[] =>
  taiThinhScript[group].map(row => ({ id: row.id, speaker: row.speaker, text: row[language] }));

export const taiThinhDevices = [
  { id: 'pse', label: text('Thiết bị A', 'Instrument A'), name: text('Địa chấn kế PSE', 'PSE seismometer'),
    clue: text('Thân thấp, có tấm phủ bạc trải quanh chân. Mình cảm nhận chuyển động rất nhỏ của mặt đất.', 'A low body with a silver blanket around its base. I sense tiny movements of the ground.'),
    wrong: text('Hãy tìm thiết bị cảm nhận chuyển động của mặt đất.', 'Look for the instrument that senses ground movement.') },
  { id: 'station', label: text('Thiết bị B', 'Instrument B'), name: text('Trạm trung tâm', 'Central station'),
    clue: text('Chiếc hộp có cột ăng-ten cao. Mình nhận lệnh và gửi dữ liệu giữa các thiết bị với Trái Đất.', 'A box with a tall antenna mast. I receive commands and relay data between the instruments and Earth.'),
    wrong: text('Ăng-ten giúp gửi dữ liệu. Ai mới là người đo rung động?', 'The antenna helps send data. Which instrument measures tremors?') },
  { id: 'magnetometer', label: text('Thiết bị C', 'Instrument C'), name: text('Máy đo từ trường', 'Magnetometer'),
    clue: text('Ba cần vươn ra, mỗi đầu có một bộ cảm biến. Mình nghiên cứu từ trường quanh đây.', 'Three arms extend out, each with a sensor at its tip. I study the magnetic field here.'),
    wrong: text('Ba cảm biến này nghiên cứu từ trường. Hãy xem lại công dụng của hai bạn còn lại.', 'These three sensors study magnetic fields. Check what the other two instruments do.') },
] as const;

export const taiThinhRecords = [
  { id: 'inside', answer: 'moonquake', waveform: 'emergent', title: text('Bản ghi A', 'Record A'),
    clue: text('Ghi chú nghiên cứu: nguồn rung được xác định ở bên trong Mặt Trăng; không có vật rơi xuống trong tình huống này.', 'Research note: the source is located inside the Moon; nothing hits the surface in this example.'),
    feedback: text('Nguồn rung ở trong Mặt Trăng: đây là động đất Mặt Trăng.', 'The source is inside the Moon: this is a moonquake.') },
  { id: 'impact', answer: 'meteoroid', waveform: 'impact', title: text('Bản ghi B', 'Record B'),
    clue: text('Ghi chú tình huống: một mảnh đá từ không gian va xuống bề mặt, làm đất rung lên.', 'Scenario note: a rock from space hits the surface and makes the ground shake.'),
    feedback: text('Vật từ không gian va xuống: đây là va chạm thiên thạch.', 'An object from space hits the surface: this is a meteoroid impact.') },
  { id: 'electronics', answer: 'noise', waveform: 'square', title: text('Bản ghi C', 'Record C'),
    clue: text('Ghi chú kỹ thuật: những nhịp đều như tiếng máy xuất hiện gần lúc Mặt Trời mọc và lặn. Nghi do vỏ bọc hoặc cáp co giãn vì nóng lạnh; cần kiểm tra thêm.', 'Technical note: regular, machine-like beats appear near sunrise and sunset. The cover or cable may expand and contract with heat and cold; further checks are needed.'),
    feedback: text('Đây là nhiễu cần kiểm tra; chưa thể coi là rung động từ bên trong Mặt Trăng hay do thiên thạch.', 'This is noise to investigate; it cannot yet be treated as a moonquake or meteoroid impact.') },
] as const;

export const taiThinhRecordLabels = [
  { id: 'moonquake', label: text('Động đất Mặt Trăng', 'Moonquake') },
  { id: 'meteoroid', label: text('Va chạm thiên thạch', 'Meteoroid impact') },
  { id: 'noise', label: text('Nhiễu cần kiểm tra', 'Noise to investigate') },
] as const;

// Absolute beat starts in milliseconds. A is 3 evenly spaced beats; B matches;
// C has only 2 beats. The same data must drive animation, marks and narration.
export const taiThinhRhythm = {
  sample: [0, 500, 1800],
  options: [
    { id: 'a', beats: [0, 900, 1800], description: text('Ba nhịp cách đều nhau.', 'Three evenly spaced beats.') },
    { id: 'b', beats: [0, 500, 1800], description: text('Hai nhịp gần nhau, nghỉ dài, một nhịp.', 'Two close beats, a long pause, one beat.') },
    { id: 'c', beats: [0, 1800], description: text('Một nhịp, nghỉ dài, một nhịp.', 'One beat, a long pause, one beat.') },
  ],
  correct: 'b', pulseMs: 220, durationMs: 2500,
} as const;

export const taiThinhTaskCopy = {
  t01: { title: text('Ai đang lắng nghe?', 'Who is listening?'), goal: text('Tìm thiết bị đo rung động của mặt đất.', 'Find the instrument that measures ground movement.') },
  t02: { title: text('Tai Thính đã nghe thấy gì?', 'What did Sharp Ear detect?'), goal: text('Đọc manh mối rồi ghép ba bản ghi với nhãn.', 'Read the clues, then match each record to a label.') },
  t03: { title: text('Vì sao Mặt Trăng ngân vang?', 'Why does the Moon ring?'), goal: text('Chọn bản ghi tiếp tục lâu sau cú va chạm.', 'Choose the record that continues long after impact.') },
  t04: { title: text('Cánh cửa của những rung động', 'The door of rhythms'), goal: text('Tìm phiến đá có nhịp giống mẫu.', 'Find the stone whose rhythm matches the sample.') },
  graphOptions: [text('A · Tắt nhanh', 'A · Fades quickly'), text('B · Tăng dần rồi tắt chậm', 'B · Builds, then fades slowly')],
  durationOptions: [text('Vài giây', 'A few seconds'), text('Hơn 55 phút', 'More than 55 minutes'), text('Nhiều ngày', 'Many days')],
  correctGraph: 1, correctDuration: 1,
  graphNote: text('Minh họa, cùng thang 0–60 phút; không phải bản ghi NASA. Hoạt ảnh được tua nhanh.', 'Illustration, shared 0–60 minute scale; not NASA data. Animation is sped up.'),
  recordNote: text('Bản ghi minh họa. Cần đọc cả manh mối, không chỉ nhìn đường sóng.', 'Illustrated records. Read the clues as well as the wave shapes.'),
  graphWrong: text('Hãy xem đường nào vẫn còn rung sau mốc 55 phút.', 'Look for the trace that is still moving after 55 minutes.'),
  durationWrong: text('Bản ghi kéo dài gần một giờ. Hãy đối chiếu mốc 55 phút.', 'The record lasts nearly an hour. Compare it with the 55-minute mark.'),
  recordWrong: text('Nhãn chưa khớp. Nguồn rung ở trong Trăng, từ vật rơi xuống, hay là nhiễu cần kiểm tra?', 'That label does not fit. Is the source inside the Moon, an impact, or noise that needs checking?'),
  rhythmWrong: text('Hãy đếm hai nhịp gần nhau, khoảng nghỉ dài, rồi nhịp cuối.', 'Count two close beats, a long pause, then the final beat.'),
  rhythmDescription: text('Hai nhịp gần nhau — nghỉ dài — một nhịp.', 'Two close beats — long pause — one beat.'),
  fiction: text('Cuội, lời nói của thiết bị và cánh cửa ký ức thuộc câu chuyện tưởng tượng.', 'Cuội, the talking instruments and the memory door belong to the imagined story.'),
  inspect: text('Xem manh mối', 'Inspect clue'), confirm: text('Chọn thiết bị này', 'Choose this instrument'),
  hint: text('Gợi ý', 'Hint'), sample: text('Xem nhịp mẫu', 'Watch the sample'),
  replayRhythm: text('Xem lại nhịp', 'Replay rhythm'), choose: text('Chọn nhịp này', 'Choose this rhythm'),
  keepPhoto: text('Cất ảnh và tiếp tục', 'Keep the photo and continue'),
  next: text('Tiếp tục', 'Continue'), back: text('Trang trước', 'Previous page'),
  replayEnding: text('Xem lại đoạn kết', 'Replay the ending'), playAgain: text('Chơi lại', 'Play again'), route: text('Về lộ trình', 'View the route'),
  photoError: text('Chưa tải được ảnh tư liệu.', 'The archive photograph could not load.'), retry: text('Tải lại ảnh', 'Retry photo'),
  stageAlt: text('Cảnh Đại Dương Bão: Cuội bên trái, PSE ở giữa, trạm trung tâm phía sau và máy đo từ trường bên phải.', 'Ocean of Storms scene: Cuội on the left, PSE in the centre, central station behind, magnetometer on the right.'),
} as const;

export const taiThinhMemories = [
  { id: 'pse', code: 'AS12-47-6916', date: '1969-11-19', credit: 'NASA · Alan Bean', src: taiThinhPhotos.pse, receiveAfter: 't01',
    title: text('Tấm phủ bạc của Tai Thính', 'Sharp Ear’ silver blanket'),
    caption: text('Ngày 19 tháng 11 năm 1969, các phi hành gia Apollo 12 đặt Tai Thính trên Mặt Trăng. Tấm phủ bạc trải quanh chân giúp hạn chế thay đổi nhiệt độ.', 'On 19 November 1969, the Apollo 12 astronauts placed Sharp Ear on the Moon. The silver blanket around its base helped reduce temperature changes.'),
    receipt: text('Đây là mình ngày 19 tháng 11 năm 1969, do chú Alan Bean chụp. Tấm áo bạc giúp mình đỡ nóng, đỡ lạnh. Đêm ở đây lạnh lắm.', 'This is me on 19 November 1969, photographed by Alan Bean. The silver cloak keeps me from getting too hot or cold. The nights here are very cold.'),
    recall: text('Mình là PSE, mọi người gọi là Tai Thính. Ngày 19 tháng 11 năm 1969, mình được đặt ở Đại Dương Bão, trong bộ thiết bị ALSEP của Apollo 12.', 'I am PSE, and everyone calls me Sharp Ear. On 19 November 1969, I was set down in the Ocean of Storms as part of Apollo 12’s ALSEP equipment.'),
    alt: text('Địa chấn kế PSE hình trụ thấp, với tấm phủ bạc nhăn trải rộng trên mặt đất.', 'A low cylindrical PSE seismometer with a wide crinkled silver thermal blanket on the ground.') },
  { id: 'station', code: 'AS12-47-6918', date: '1969-11-19', credit: 'NASA · Alan Bean', src: taiThinhPhotos.station, receiveAfter: 't02',
    title: text('Những người bạn cùng làm việc', 'Working together'),
    caption: text('Tai Thính ở phía trước, trạm trung tâm ở phía sau. Các thiết bị được nối với nhau để gửi những phép đo về Trái Đất. Ảnh được chụp ngày 19 tháng 11 năm 1969.', 'Sharp Ear is in front, with the central station behind. The instruments were connected to send measurements to Earth. This photo was taken on 19 November 1969.'),
    receipt: text('Hôm ấy mình và các bạn được đặt cạnh nhau. Mình ở phía trước, trạm trung tâm ở phía sau. Có bạn bên cạnh thì cũng ấm.', 'My friends and I were set down together that day. I am in front, with the central station behind me. It is warm to have friends beside me.'),
    recall: text('Mình đo những rung động rất nhỏ của mặt đất. Trạm trung tâm giúp gửi những phép đo về Trái Đất để mọi người nghiên cứu.', 'I measure tiny movements of the ground. The central station helped send those measurements to Earth for scientists to study.'),
    alt: text('PSE với tấm phủ bạc ở tiền cảnh; trạm trung tâm ALSEP tách riêng ở phía sau.', 'The PSE and silver skirt in the foreground, with the separate ALSEP central station behind.') },
  { id: 'magnetometer', code: 'AS12-47-6921', date: '1969-11-19', credit: 'NASA · Alan Bean', src: taiThinhPhotos.magnetometer, receiveAfter: 't04',
    title: text('Mỗi bạn một công việc', 'A different job for each friend'),
    caption: text('Ngày 19 tháng 11 năm 1969, phi hành gia Pete Conrad lắp ăng-ten cho trạm trung tâm. Phía trước là máy đo từ trường với ba cần vươn ra. Mỗi thiết bị có một công việc riêng.', 'On 19 November 1969, astronaut Pete Conrad fitted the central station’s antenna. The three-armed magnetometer is in front. Each instrument had its own job.'),
    receipt: text('Bạn ba cần là máy đo từ trường. Phía sau, chú Pete Conrad đang lắp ăng-ten. Nhìn ảnh này, mình nhớ là mình chưa bao giờ ở một mình.', 'The three-armed friend is the magnetometer. Behind it, Pete Conrad is fitting an antenna. This picture reminds me that I was never alone.'),
    recall: text('Trong ảnh cuối là bạn ba cần và chú Pete lắp ăng-ten. Ngày hôm sau, 20 tháng 11 năm 1969, mình ghi lại rung động kéo dài từ cú va chạm của tầng bay lên Apollo 12.', 'The last picture shows my three-armed friend and Pete fitting the antenna. The next day, 20 November 1969, I recorded the long-lasting shaking from the Apollo 12 ascent stage’s impact.'),
    alt: text('Máy đo từ trường có ba cần ở tiền cảnh; phi hành gia Pete Conrad đứng bên trạm trung tâm ở phía xa.', 'A three-armed magnetometer in the foreground, with astronaut Pete Conrad at the distant central station.') },
] as const;

