import { text } from '../../book/types';

// Stable page identities; insert photos by id rather than persisting page indexes.
export const taiThinhBook = [
  { id: 'intro', unlock: 'chapter', title: text('Tai Thính — Người bạn thích lắng nghe', 'Sharp Ear — A friend who loves to listen'), body: text('Tai Thính khoác tấm áo bạc, nằm thấp sát đất và rất thích lắng nghe. Cuội vừa nhón chân tới, bạn đã thì thầm: “Suỵt… bước nhẹ thôi nhé!” Trông im im vậy mà bạn có cả kho chuyện muốn kể. Ghé chào nào, biết đâu một nhịp rung tí xíu sẽ mở đầu cho một tình bạn thật to!', 'Sharp Ear wears a silver coat, nestles close to the ground and loves to listen. As Cuội tiptoes closer, this friend whispers, “Shh… gentle steps, please!” Behind that quiet manner is a whole collection of stories waiting to be told. Come say hello: a tiny tremor might be the start of a big friendship!') },
  { id: 'devices', unlock: 't01', title: text('Apollo 12 · ALSEP', 'Apollo 12 · ALSEP'), body: text('Thí nghiệm địa chấn thụ động (PSE) thuộc cụm ALSEP Apollo 12, đo rung động và độ nghiêng của đất để nghiên cứu bên trong Mặt Trăng.\n\nTrạm trung tâm ALSEP phân phối điện, xử lý dữ liệu và liên lạc với Trái Đất qua ăng-ten.\n\nMáy đo từ trường bề mặt Mặt Trăng (LSM) đo từ trường tại chỗ. Các thiết bị nối với trạm bằng cáp.', 'Apollo 12’s Passive Seismic Experiment (PSE) measured ground vibrations and tilt to study the lunar interior.\n\nThe ALSEP Central Station supplied power, processed data and radioed Earth. Cables linked the instruments to it.\n\nThe Lunar Surface Magnetometer (LSM) measured the local magnetic field.') },
  { id: 'sensor', unlock: 't02', title: text('Lắng nghe bằng phép đo', 'Listening through measurements'), body: text('Thí nghiệm địa chấn thụ động (PSE) Apollo 12 có ba địa chấn kế chu kỳ dài, đo chuyển động theo một hướng đứng và hai hướng ngang. Một địa chấn kế chu kỳ ngắn đo chuyển động theo hướng đứng.\n\nCác phép đo giúp nghiên cứu cấu trúc và hoạt động bên trong Mặt Trăng.', 'Apollo 12’s Passive Seismic Experiment (PSE) had three long-period seismometers measuring one vertical and two horizontal directions. A short-period seismometer measured vertical motion.\n\nThese measurements helped scientists study the Moon’s internal structure and seismic activity.') },
  { id: 'sources', unlock: 't02', title: text('Nguồn rung ở đâu?', 'Where did it begin?'), body: text('Đọc ghi chú trước khi ghép nhãn cho từng bản ghi. Nguồn nằm trong Mặt Trăng, hay có mảnh đá từ không gian va xuống?\n\nNếu ghi chú nghi ngờ vỏ bọc hoặc cáp co giãn vì nóng lạnh, hãy chọn nhóm nhiễu cần kiểm tra. Đừng chỉ đoán theo hình đường sóng!', 'Read the notes before matching each record to a label. Is the source inside the Moon, or does a rock from space hit the surface?\n\nIf the notes suggest the cover or cable expanding and contracting with temperature, choose noise to investigate. Do not guess from the wave shape alone!') },
  { id: 'noise', unlock: 't02', title: text('Khi thiết bị cần được kiểm tra', 'When an instrument needs checking'), body: text('PSE Apollo 12 ghi nhận những nhiễu địa chấn trong ngày Mặt Trăng, đặc biệt gần bình minh và hoàng hôn.\n\nChúng được cho là liên quan đến sự co giãn của tấm phủ Mylar tráng nhôm hoặc cáp nối với trạm trung tâm khi nhiệt độ thay đổi. Đây là nguyên nhân được nghi ngờ, chưa phải kết luận chắc chắn.', 'Apollo 12’s PSE recorded seismic disturbances during the lunar day, especially near sunrise and sunset.\n\nThey were thought to result from expansion and contraction of the aluminized Mylar shroud or the cable to the central station as temperatures changed. This was a suspected cause, rather than a firm conclusion.') },
  { id: 'impact', unlock: 't03', title: text('Một cú va chạm có chủ đích', 'A planned impact'), body: text('Ngày 20/11/1969, sau khi phi hành đoàn trở lại mô-đun chỉ huy, tầng bay lên của mô-đun đổ bộ Apollo 12 được cho va xuống Mặt Trăng, cách trạm địa chấn khoảng 60 km.\n\nPSE ghi lại rung động. Biết vị trí va chạm, khối lượng và vận tốc của tầng tàu giúp các nhà khoa học tính năng lượng va chạm và kiểm tra đáp ứng của địa chấn kế.', 'On November 20, 1969, after the crew returned to the command module, Apollo 12’s lunar module ascent stage was deliberately crashed into the Moon, about 60 km from the seismic station.\n\nPSE recorded the shaking. The known impact location, mass and speed let scientists calculate the impact energy and study the seismometers’ response.') },
  { id: 'ringing', unlock: 't03', title: text('Đọc đường sóng và thời gian', 'Reading the trace and time'), body: text('Tìm đường sóng tăng dần rồi suy giảm chậm, thay vì tắt ngay sau cú va chạm.\n\nĐọc trục thời gian theo phút. Trên biểu đồ thử thách, tín hiệu còn sau mốc 55 phút: hãy đối chiếu mốc này với các lựa chọn thời lượng.', 'Look for the trace that builds and then fades slowly, rather than stopping soon after impact.\n\nRead the time axis in minutes. On the challenge graph, the signal continues past 55 minutes. Compare this mark with the duration choices.') },
  { id: 'rhythm', unlock: 't04', title: text('Đếm nhịp và khoảng nghỉ', 'Beats and pauses'), body: text('Xem nhịp mẫu: hai nhịp gần nhau, nghỉ dài, rồi thêm một nhịp.\n\nSo sánh cả số nhịp lẫn khoảng nghỉ để chọn phiến đá giống mẫu. Cuội có thể xem lại mẫu nhiều lần trước khi chọn.', 'Watch the sample: two close beats, a long pause, then one more beat.\n\nCompare both the number of beats and the pauses to find the matching stone. Cuội can replay the sample as often as needed before choosing.') },
  { id: 'legacy', unlock: 'farewell', title: text('PSE Apollo 12 · Câu chuyện có thật', 'Apollo 12 PSE · The real story'), body: text('Ngày 19/11/1969, phi hành gia Apollo 12 triển khai PSE tại Đại Dương Bão, trong cụm thiết bị ALSEP.\n\nThiết bị ghi rung động để nghiên cứu bên trong Mặt Trăng. Trạm trung tâm truyền dữ liệu về Trái Đất.\n\nNgày 30/9/1977, PSE được đưa về chế độ chờ khi các trạm ALSEP ngừng hoạt động. Dữ liệu được lưu trong các bộ sưu tập khoa học của NASA.', 'On November 19, 1969, Apollo 12 astronauts deployed PSE in the Ocean of Storms as part of ALSEP.\n\nIt recorded ground vibrations to study the lunar interior. The central station relayed data to Earth.\n\nOn September 30, 1977, PSE was put on standby as the ALSEP stations shut down. Its data are archived in NASA’s scientific collections.') },
] as const;

// Sources listed in docs/references.md; these apply only to companion content.
export const taiThinhReferences = {
  alsep: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C',
  pse: 'https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1969-099C-03',
  data: 'https://nssdc.gsfc.nasa.gov/nmc/dataset/query.action?spacecraftName=Apollo+12+Lunar+Module+%2F+ALSEP&experimentName=Passive+Seismic+Experiment+%28PSE%29',
} as const;

export const taiThinhBookSources: Record<typeof taiThinhBook[number]['id'], string | null> = {
  intro: null,
  devices: taiThinhReferences.alsep,
  sensor: taiThinhReferences.pse,
  sources: null,
  noise: taiThinhReferences.pse,
  impact: taiThinhReferences.alsep,
  ringing: null,
  rhythm: null,
  legacy: taiThinhReferences.pse,
};

// Book-only captions: receiving and recalling these photos in the game stay unchanged.
export const taiThinhPhotoBook = {
  pse: {
    title: text('PSE Apollo 12 · Tấm phủ cách nhiệt', 'Apollo 12 PSE · The thermal shroud'),
    caption: text('PSE Apollo 12 sau khi được triển khai ngày 19/11/1969. Tấm phủ Mylar tráng nhôm bao quanh thiết bị và vùng đất sát chân, giúp kiểm soát nhiệt độ.', 'Apollo 12’s PSE after deployment on November 19, 1969. An aluminized Mylar shroud covers the instrument and nearby ground to help control its temperature.'),
    source: taiThinhReferences.pse,
  },
  station: {
    title: text('Apollo 12 · PSE và trạm trung tâm ALSEP', 'Apollo 12 · PSE and the ALSEP Central Station'),
    caption: text('PSE ở tiền cảnh, trạm trung tâm ALSEP ở phía sau, ngày 19/11/1969. Cáp nối các thiết bị với trạm; trạm phân phối điện, nhận lệnh và truyền dữ liệu về Trái Đất.', 'PSE in the foreground and the ALSEP Central Station behind it on November 19, 1969. Cables link the instruments to the station, which distributes power, receives commands and transmits data to Earth.'),
    source: taiThinhReferences.alsep,
  },
  magnetometer: {
    title: text('Apollo 12 · Máy đo từ trường LSM', 'Apollo 12 · The LSM magnetometer'),
    caption: text('Máy đo từ trường bề mặt Mặt Trăng (LSM) với ba cần ở tiền cảnh. Phía sau, Pete Conrad lắp ăng-ten trạm trung tâm ngày 19/11/1969. LSM đo từ trường tại bề mặt Mặt Trăng.', 'The three-armed Lunar Surface Magnetometer (LSM) is in the foreground. Behind it, Pete Conrad sets up the central station’s antenna on November 19, 1969. LSM measured the magnetic field at the lunar surface.'),
    source: taiThinhReferences.alsep,
  },
} as const;
