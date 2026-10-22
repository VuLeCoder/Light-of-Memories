import type { LevelDefinition } from './types';
import type { Language } from '../i18n';
import type { StoryLine } from '../earth-dialogue';
export const lapLanh = {
  id: 'lap-lanh', label: 'Apollo 11', portrait: `${import.meta.env.BASE_URL}images/portraits/lap-lanh.webp`, memoryCount: 3,
  text: {
    vi: { friend: 'Bạn Lấp Lánh', enter: 'Đến gặp Lấp Lánh', chapter: '02 · Bạn Lấp Lánh', intro: 'Bạn là ngôi sao rơi xuống đây à?', reply: 'Đố bạn đoán được mình làm gì đấy!', invitation: 'Tìm gặp Lấp Lánh, lau bụi, khôi phục mô hình phản xạ và đo khoảng cách đến Trái Đất.', memory: 'Kỷ niệm cùng Lấp Lánh' },
    en: { friend: 'Sparkle', enter: 'Meet Sparkle', chapter: '02 · A sparkling friend', intro: 'Are you a fallen star?', reply: 'Can you guess what I do?', invitation: 'Find Sparkle, clean the dust, restore a reflector model and measure the distance to Earth.', memory: 'Memories with Sparkle' },
  },
} as const satisfies LevelDefinition;
export type SparklePhase = 'meeting' | 'dust-photo' | 'cleaning-intro' | 'clean-photo' | 'cleaning' | 'route' | 'search-intro' | 'search' | 'memories-intro' | 'memories' | 'arrival' | 'dialogue' | 'mirrors' | 'distance' | 'ending' | 'complete' | 'repair-intro' | 'repair' | 'ranging-intro' | 'ranging' | 'farewell' | 'finished';
export interface SparkleProgress { phase: SparklePhase; turn: number; mirrors: boolean[]; distance: number; completedOnce: boolean; observations: number[]; photos: number[]; keepsakes: number[]; repairAngles: number[]; measured: boolean; calculation: boolean }
export const freshSparkle = (): SparkleProgress => ({ phase: 'route', turn: 0, repairAngles: [1, 2, 0], measured: false, calculation: false, mirrors: [false, false], distance: 300000, completedOnce: false, observations: [], photos: [], keepsakes: [] });
export function readSparkle(value: unknown): SparkleProgress {
  const p = value as Partial<SparkleProgress> | null;
  const fresh = freshSparkle();
  if (!p || !['meeting','dust-photo','cleaning-intro','clean-photo','cleaning','search-intro','search','memories-intro','memories','route','arrival','dialogue','mirrors','distance','ending','complete','repair-intro','repair','ranging-intro','ranging','farewell','finished'].includes(p.phase ?? '')) return fresh;
  // Older saves beyond cleaning resume at the current stopping point.
  const pastCleaning = ['dialogue', 'mirrors', 'distance', 'memories-intro', 'memories', 'ending', 'complete'].includes(p.phase!);
  return { phase: pastCleaning ? 'clean-photo' : p.phase!, turn: Number.isInteger(p.turn) ? Math.max(0, Math.min(6, p.turn!)) : 0,
    repairAngles: [0, 1, 2].map((_, i) => Number.isInteger(p.repairAngles?.[i]) && p.repairAngles![i] >= 0 && p.repairAngles![i] < 3 ? p.repairAngles![i] : fresh.repairAngles[i]), measured: p.measured === true, calculation: p.calculation === true,
    mirrors: [p.mirrors?.[0] === true, p.mirrors?.[1] === true], distance: typeof p.distance === 'number' && Number.isFinite(p.distance) ? Math.max(250000, Math.min(450000, Math.round(p.distance / 1000) * 1000)) : fresh.distance,
    observations: cleanIds(p.observations), photos: cleanIds(p.photos), keepsakes: pastCleaning ? [0, 1] : cleanIds(p.keepsakes).filter(id => id < 2),
    completedOnce: p.completedOnce === true || p.phase === 'complete' || p.phase === 'finished' };
}
function cleanIds(value: unknown): number[] { return Array.isArray(value) ? [...new Set(value.filter((n): n is number => Number.isInteger(n) && n >= 0 && n < 3))] : []; }
const lines = (prefix: string, entries: [StoryLine['speaker'], string][]): StoryLine[] => entries.map(([speaker,text], i) => ({ id: `${prefix}-${i}`, speaker, text }));
export function sparkleRouteLines(language: Language) {
  return lines('sparkle-route', language === 'vi' ? [
    ['narrator', 'Cuội ngoảnh lại chào Mắt Tròn. Qua một gờ đất, điểm sáng khuất đi rồi lại lóe lên khi Cuội đổi góc nhìn.'],
    ['narrator', 'Cuội mở bản đồ, tiếp tục chuyến đi đến Biển Yên Tĩnh. Ở đó, một tiếng gọi vang lên giữa những gờ đất: “Đố bạn tìm được mình!”'],
  ] : [
    ['narrator', 'Cuội looks back to wave to Round Eyes. Beyond a ridge, the glint disappears, then returns as Cuội changes position.'],
    ['narrator', 'Cuội opens the map and continues the journey to the Sea of Tranquility. There, a voice calls from beyond the ridges: “Can you find me?”'],
  ]);
}
export function sparkleChallengeLines(language: Language) {
  return lines('sparkle-search', language === 'vi' ? [
    ['narrator', 'Phía bên kia những hố nhỏ, một điểm sáng đang lấp lánh trên bụi xám.'],
    ['cuoi', 'Có ai đang chờ mình ở đó nhỉ? Mình sẽ tìm lối đi vòng qua những hố này để đến gần hơn!'],
  ] : [
    ['narrator', 'Beyond the small craters, a point of light glitters in the gray dust.'],
    ['cuoi', 'Is someone waiting there? I will find a way around these craters to get closer!'],
  ]);
}

export const sparkleKeepsakes = [
  { src: `${import.meta.env.BASE_URL}images/memories/lap-lanh/reflector-on-moon.webp`,
    vi: { title: 'Lấp Lánh giữa bụi trăng', description: 'Một bảng gương nhỏ nằm trên mặt đất Mặt Trăng, bên những dấu giày và thiết bị của chuyến thám hiểm. Cuội giữ bức ảnh này để nhớ lần đầu gặp Lấp Lánh.' },
    en: { title: 'Sparkle in the lunar dust', description: 'A small reflector rests on the Moon beside bootprints and exploration equipment. Cuội keeps this picture to remember meeting Sparkle.' } },
  { src: `${import.meta.env.BASE_URL}images/memories/lap-lanh/reflector-closeup.webp`,
    vi: { title: 'Những ô gương lấp lánh', description: 'Nhìn gần, bảng phản xạ có nhiều ô kính nhỏ. Chúng giúp đưa ánh sáng trở về phía nguồn mà không cần pin hay động cơ.' },
    en: { title: 'Sparkling glass panels', description: 'Up close, the reflector has many small glass elements. They return light toward its source without batteries or motors.' } },
] as const;

export function sparkleMeetingLines(language: Language, cleaningIntro = false) {
  return lines(cleaningIntro ? 'sparkle-cleaning-intro' : 'sparkle-first-meeting', language === 'vi' ? cleaningIntro ? [
    ['cuoi', 'Mình cất ảnh rồi nhé! Nhưng sao những ô kính của bạn tối thế?'],
    ['lapLanh', 'Bụi phủ lên mình mất rồi. Bạn giúp mình lau nhẹ những ô kính nhé?'],
    ['cuoi', 'Để mình giúp bạn sáng trở lại!'],
  ] : [
    ['cuoi', 'Mình tìm thấy bạn rồi! Bạn là điểm sáng phía sau những hố kia à?'],
    ['lapLanh', 'Đố bạn đoán được mình là ai! Mình là bảng gương phản xạ laser của Apollo 11. Bạn cứ gọi mình là Lấp Lánh nhé!'],
    ['cuoi', 'Chào Lấp Lánh! Bạn bám bụi nhiều quá.'],
    ['lapLanh', 'Mình ở đây lâu rồi mà! Tặng bạn một bức ảnh để nhớ cuộc gặp hôm nay nhé.'],
  ] : cleaningIntro ? [
    ['cuoi', 'I have kept your picture! Why are your glass panels so dark?'],
    ['lapLanh', 'I am covered in dust. Could you gently wipe my glass panels?'],
    ['cuoi', 'Let me help you shine again!'],
  ] : [
    ['cuoi', 'I found you! Were you the glint beyond those craters?'],
    ['lapLanh', 'Can you guess who I am? I am the Apollo 11 laser reflector. You can call me Sparkle!'],
    ['cuoi', 'Hello, Sparkle! You are so dusty.'],
    ['lapLanh', 'I have been here a long time! Here is a picture to remember our meeting.'],
  ]);
}


export const sparkleRepairSolution = [0, 1, 2];
export const sparkleRepairUnlocked = (p: SparkleProgress) => p.keepsakes.includes(1);
export const sparkleRangingUnlocked = (p: SparkleProgress) => ['ranging-intro', 'ranging', 'farewell', 'finished'].includes(p.phase) || p.measured;
export function sparkleScienceLines(language: Language, phase: 'repair-intro' | 'ranging-intro' | 'farewell') {
  const vi = language === 'vi';
  return lines(`sparkle-${phase}`, phase === 'repair-intro' ? vi ? [
    ['lapLanh', 'Sạch rồi! Đố bạn biết ánh sáng tìm đường về nhà bằng cách nào?'],
    ['cuoi', 'Để mình mở sách xem nhé! Có một mô hình góc gương ở đây.'],
    ['lapLanh', 'Ba mặt phản xạ trong mô hình bị xáo trộn rồi. Bạn giúp mình sắp lại nhé! Ngoài đời, những ô kính của mình nằm cố định và chẳng cần động cơ đâu.'],
  ] : [
    ['lapLanh', 'All clean! Can you guess how light finds its way home?'],
    ['cuoi', 'Let me open the book! There is a corner reflector model here.'],
    ['lapLanh', 'The model’s three reflecting faces are mixed up. Can you restore them? My real glass elements are fixed and need no motors.'],
  ] : phase === 'ranging-intro' ? vi ? [
    ['lapLanh', 'Tia sáng đã quay về phía nguồn rồi! Giờ mình cùng gửi một lời chào đến Trái Đất nhé.'],
    ['cuoi', 'Mình sẽ biết Trái Đất cách đây bao xa bằng cách nào?'],
    ['lapLanh', 'Trạm dưới Trái Đất sẽ gửi tia sáng lên và đo thời gian nhận lại. Sách của bạn vừa có thêm manh mối đấy!'],
  ] : [
    ['lapLanh', 'The light returned toward its source! Let us say hello to Earth.'],
    ['cuoi', 'How can we find out how far away Earth is?'],
    ['lapLanh', 'A station on Earth sends a pulse and times its return. Your book has a new clue!'],
  ] : vi ? [
    ['cuoi', 'Khoảng 384.000 ki-lô-mét! Hóa ra một lời chào bằng ánh sáng cũng đo được quãng đường xa đến thế.'],
    ['lapLanh', 'Mình nhỏ thôi, chẳng cần pin, nhưng vẫn giúp các nhà khoa học đo khoảng cách. Đố bạn đoán được mình còn làm việc bao lâu nữa!'],
    ['narrator', 'Cuội cất những manh mối vào sách. Giữa bụi trăng yên lặng, Lấp Lánh lại chờ một lời chào từ Trái Đất.'],
  ] : [
    ['cuoi', 'About 384,000 kilometres! A greeting made of light can measure such a long journey.'],
    ['lapLanh', 'I am small and need no batteries, yet I help scientists measure distances. Can you guess how much longer I will work?'],
    ['narrator', 'Cuội keeps the clues in the book. In the quiet lunar dust, Sparkle waits for another greeting from Earth.'],
  ]);
}
