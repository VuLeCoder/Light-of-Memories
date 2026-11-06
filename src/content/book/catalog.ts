import { impactAlt, impactCredit, impactPhoto, impactSource } from '../levels/gac-troi-impact';
import { gacMemories } from '../levels/gac-troi-matching';
import { gacImage } from '../levels/gac-troi-images';
import { bookArchiveImages, realWorldPages } from './real-world';
import { text, type BookBlock, type BookChapter, type BookPage, type BookSource, type BookText, type ContentKind } from './types';
import { introCopy } from './intro-copy';
import { journeyCopy } from './journey-copy';
import { surveyorPlayCopy } from './surveyor-copy';
import { clueCopy } from './sparkle-copy';
import { digCopy, memoryPhotos } from '../levels/surveyor-dig';
import { challengeCopy } from '../levels/surveyor-challenges';
import { sparkleKeepsakes } from '../levels/lap-lanh';
import { gacTroiOrbitBook } from '../levels/gac-troi-content';
import { portraits } from '../assets';

const source = (url: string, review = false): BookSource => ({ url, status: review ? 'needs-review' : 'recorded' });
const surveyorSource = source('https://science.nasa.gov/mission/surveyor-3/', true);
const reflectorSource = source('https://www.jpl.nasa.gov/news/apollo-11-experiment-still-going-strong-after-35-years/');
const rangingSource = source('https://www.nasa.gov/missions/laser-beams-reflected-between-earth-and-moon-boost-science/');
const a11Photos = source('https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/images11.html');
const pages: BookPage[] = [];
function page(id: string, chapter: BookChapter, title: BookText): BookPage {
  const result: BookPage = { id, chapter, title, blocks: [] }; pages.push(result); return result;
}
function block(p: BookPage, key: string, kind: ContentKind, body: BookText, section: string, order: number, sources: readonly BookSource[] = [], extra: Partial<BookBlock> = {}) {
  const result: BookBlock = { id: `${p.id}.${key}`, kind, text: body, section, order, sources, ...extra };
  (p.blocks as BookBlock[]).push(result); return result;
}
const friendNames = { matTron: 'Round Eyes', lapLanh: 'Sparkle' } as const;
const portrait = (p: BookPage, key: keyof typeof friendNames, section: string) => block(p, 'portrait', 'fiction', text(`Nhân vật ${portraits[key].name} trong câu chuyện Cuội.`, `An imagined character in Cuội’s story: ${friendNames[key]}.`), section, 0, [], { image: { src: portraits[key].url, alt: text(`Minh họa ${portraits[key].name}`, `Illustration of ${friendNames[key]}`) } });
/** Explicit bilingual boundaries: fail loudly if editing the source invalidates a split. */
function split(body: BookText, vi: string, en: string): [BookText, BookText] {
  const a = body.vi.indexOf(vi), b = body.en.indexOf(en);
  if (a < 0 || b < 0) throw new Error(`Book split needs review: ${vi} / ${en}`);
  return [text(body.vi.slice(0, a).trim(), body.en.slice(0, b).trim()), text(body.vi.slice(a).trim(), body.en.slice(b).trim())];
}
const overview = page('overview', 'overview', text(journeyCopy.vi.book, journeyCopy.en.book));
block(overview, 'guide', 'fiction', text(journeyCopy.vi.guide, journeyCopy.en.guide), 'A0', 0, [], { readingText: text('Cuội đi tìm chị Hằng với chiếc đèn ông sao. Quyển sách kể về Mắt Tròn, Lấp Lánh và Gác Trời.', 'Cuội searches for Hằng with his star lantern. This book tells the stories of Round Eyes, Sparkle and Sky Watcher.') });
block(overview, 'reading-guide', 'game', text('Trong trò chơi, hoàn thành câu chuyện trước để mở cuộc gặp tiếp theo: Mắt Tròn, Lấp Lánh, rồi Gác Trời. Ảnh và gợi ý được thêm vào sách khi chơi. Bản đọc này chứa đủ nội dung, gồm cả gợi ý và đáp án trong phụ lục.', 'In the game, finish each story to unlock the next encounter: Round Eyes, Sparkle, then Sky Watcher. Photos and clues are added to the book during play. This reading edition includes all content, including hints and answers in the appendix.'), 'A0', 1);
const surveyor = page('surveyor', 'surveyor', text('Mắt Tròn — Surveyor 3', 'Round Eyes — Surveyor 3'));
block(surveyor, 'intro', 'fiction', introCopy.surveyorIntro, 'A1', -1); portrait(surveyor, 'matTron', 'A1');
block(surveyor, 'notebook-guide', 'game', text('Sổ tay có ba gợi ý tìm ảnh. Ghi nhớ gợi ý hiện tại hoặc tìm được ảnh tương ứng sẽ mở gợi ý tiếp theo. Các vị trí và việc Cuội đào ảnh thuộc màn chơi, không phải tọa độ khảo sát lịch sử.', 'The notebook has three photo clues. Noting the current clue or finding its photo opens the next clue. The locations and Cuội digging for photos belong to the game, not a historical site survey.'), 'A1', 1);
const tools = page('surveyor-b01', 'surveyor', text(challengeCopy.vi.titles[0], challengeCopy.en.titles[0]));
block(tools, 'tools', 'fact', text(surveyorPlayCopy.vi.bookBody, surveyorPlayCopy.en.bookBody), 'C1.2', 0, [surveyorSource]);
for (const [index, id] of (['arrive', 'work', 'visit'] as const).entries()) {
  const title = text(digCopy.vi.names[id], digCopy.en.names[id]);
  const clue = page(`clue-${id}`, 'surveyor', title);
  block(clue, 'clue', 'game', text(digCopy.vi.clues[id], digCopy.en.clues[id]), `A1.${index + 1}`, 0, [], { diagram: `clue-${id}` });
  const photo = page(`photo-${id}`, 'surveyor', title);
  block(photo, 'photo', 'fact', text(digCopy.vi.descriptions[id], digCopy.en.descriptions[id]), `C1.${index + 1}`, 10, [surveyorSource], { image: { src: memoryPhotos[id], alt: title } });
}
const sparkle = page('lap-lanh', 'apollo11', text('Lấp Lánh — Apollo 11', 'Sparkle — Apollo 11'));
block(sparkle, 'intro', 'fiction', introCopy.sparkleIntro, 'A2', -1); portrait(sparkle, 'lapLanh', 'A2');
sparkleKeepsakes.forEach((photo, i) => {
  const p = page(`sparkle-photo-${i}`, 'apollo11', text(photo.vi.title, photo.en.title));
  block(p, 'photo', 'fact', text(photo.vi.description, photo.en.description), 'C2.1', i === 1 ? 10 : 20, [a11Photos], { image: { src: photo.src, alt: p.title, credit: 'NASA', code: i === 0 ? 'AS11-40-5952' : 'AS11-40-5945', date: '1969' } });
});
const repair = page('sparkle-repair-clue', 'apollo11', clueCopy.repairTitle);
block(repair, 'model', 'game', clueCopy.model, 'A2.1', 0, [], { diagram: 'corner' });
block(repair, 'reflection', 'fact', clueCopy.reflection, 'C2.2', 0, [reflectorSource]);
block(repair, 'prisms', 'game', clueCopy.prisms, 'A2.1', 1);
const ranging = page('sparkle-ranging-clue', 'apollo11', clueCopy.rangingTitle);
block(ranging, 'round-trip', 'fact', clueCopy.roundTrip, 'C2.3', 0, [rangingSource], { diagram: 'ranging', readingText: text('Trạm trên Trái Đất gửi xung laser đến gương phản xạ trên Mặt Trăng và đo thời gian cả lượt đi lẫn lượt về. Hình minh họa không theo tỉ lệ.', 'An Earth station sends a laser pulse to the lunar reflector and measures its round-trip travel time. The illustration is not to scale.') });
block(ranging, 'formula', 'fact', clueCopy.formula, 'C2.3', 1, [rangingSource]);
block(ranging, 'data', 'game', text(`${clueCopy.speedLabel.vi}: ${clueCopy.speed.vi}. ${clueCopy.timeLabel.vi}: ${clueCopy.time.vi}.`, `${clueCopy.speedLabel.en}: ${clueCopy.speed.en}. ${clueCopy.timeLabel.en}: ${clueCopy.time.en}.`), 'A2.2', 0);
block(ranging, 'answer', 'game', clueCopy.answer, 'A2.2', 1, [], { reveal: 'hint' });
const [gameNote, distanceNote] = split(clueCopy.note, 'Khoảng cách thật', 'The real distance');
block(ranging, 'rounded', 'game', gameNote, 'A2.2', 2);
block(ranging, 'distance', 'fact', distanceNote, 'C2.3', 2, [rangingSource]);

for (const [id, photo] of Object.entries(bookArchiveImages)) {
 const p = pages.find(p => p.id === id)!;
 const fact = p.blocks.find(b => b.kind === 'fact')!;
 block(p, 'archive-photo', 'fact', photo.caption, fact.section, 20, fact.sources, { image: { src: photo.src, alt: photo.caption, credit: 'NASA' } });
}

for (const entry of realWorldPages) {
 const p = page(entry.id, entry.chapter, entry.title);
 block(p, 'photo', 'fact', entry.caption, entry.section, 30, entry.sources.map(url => source(url)), { image: { src: entry.image, alt: entry.caption, credit: 'NASA' } });
 entry.paragraphs.forEach((body, i) => block(p, `body-${i}`, 'fact', body, entry.section, 31 + i, entry.sources.map(url => source(url))));
}

const orbit = page(gacTroiOrbitBook.id, 'lro', gacTroiOrbitBook.title);
block(orbit, 'observation', 'fact', text('LRO là tàu bay quanh Mặt Trăng. Hệ máy ảnh LROC ghi ảnh bề mặt để các nhà khoa học nghiên cứu. Ảnh cho thấy nhiều dấu vết, nhưng những vật quá nhỏ không hiện rõ.', 'LRO travels around the Moon. Its LROC camera system photographs the surface for scientists to study. Pictures reveal many traces, but very small objects cannot be seen clearly.'), 'C5.1', 0, gacTroiOrbitBook.sources.map(url => source(url)));
block(orbit, 'signal', 'fiction', text('Gác Trời nói chuyện qua đèn là nhân vật trong truyện. Cuội vẫn ở trên mặt đất; cảnh quỹ đạo là minh họa không theo tỉ lệ.', 'Sky Watcher speaking through the lantern is part of the story. Cuội stays on the ground; the orbit scene is an illustration, not to scale.'), 'A5', 0, [], { image: { src: portraits.gacTroi.url, alt: text('Minh họa bạn Gác Trời', 'Illustration of Sky Watcher') } });

const sites = page('gac-book-sites', 'lro', text('Hai người bạn, hai vùng đất', 'Two friends, two places'));
block(sites, 'hint', 'game', text('Lấp Lánh ở vùng Apollo 11, Biển Yên Tĩnh. Mắt Tròn ở vùng Apollo 12, Đại Dương Bão.', 'Sparkle is in the Apollo 11 area, the Sea of Tranquility. Round Eyes is in the Apollo 12 area, the Ocean of Storms.'), 'A5.1', 0, []);
block(sites, 'how', 'game', text('Chọn thẻ người bạn, xem các vùng ảnh rồi ghép vào vùng phù hợp. Các cặp đúng luôn được giữ lại. Ghép đúng một bạn để mở câu chuyện và ảnh của bạn ấy ở những trang tiếp theo.', 'Choose a friend, browse the pictures, then match them to a place. Correct pairs stay in place. Each match opens that friend’s story and picture on the following pages.'), 'A5.1', 1, []);
for (const memory of gacMemories) {
  const photo = gacImage(memory.image);
  const p = page(`gac-memory-${memory.id}`, 'lro', memory.title);
  const sources = [source(photo.sourcePage)];
  if (memory.id === 'lap-lanh') sources.push(source('https://ilrs.gsfc.nasa.gov/missions/satellite_missions/current_missions/ap11_general.html'));
  block(p, 'story', 'fact', memory.story, 'C5.2', 0, sources);
  block(p, 'picture', 'fact', memory.caption, 'C5.2', 1, [source(photo.sourcePage)], { image: { src: photo.src, alt: photo.alt, credit: photo.credit } });
}

const impact = page('gac-book-impact', 'lro', text('Một dấu vết mới', 'A new trace'));
block(impact, 'compare', 'fact', text('Hai ảnh cùng một vùng giúp tìm thay đổi nhỏ. Ảnh trước: 12/02/2012; ảnh sau: 28/07/2013.', 'Two pictures of the same place help reveal small changes. Before: 12 Feb 2012; after: 28 Jul 2013.'), 'C5.3', 0, [source(impactSource)]);
block(impact, 'hint', 'game', text('Nhìn vùng 2 ở cả hai ảnh, gần nhóm hố nhỏ. Hình gợi ý đánh dấu một vùng rộng để đối chiếu.', 'Look at area 2 in both pictures, beside the small craters. The hint marks a broad area to compare.'), 'A5.2', 0, [], { reveal: 'hint', image: { src: impactPhoto('before'), alt: text('Ảnh trước va chạm với khung gợi ý rộng gần giữa ảnh.', 'Before the impact, with a broad hint box near the middle.'), credit: impactCredit, annotation: 'hint', date: '2012-02-12' } });
const impactStory = page('gac-book-impact.story', 'lro', text('Chớp sáng và chiếc hố', 'A flash and a crater'));
block(impactStory, 'crater', 'fact', text('Chớp sáng ngày 17/03/2013 được quan sát từ Trái Đất. Ảnh LRO sau đó giúp xác định hố mới khoảng 18 m. Đây là va chạm tự nhiên.', 'The flash on 17 Mar 2013 was observed from Earth. Later LRO images helped identify a new crater about 18 m wide. This was a natural impact.'), 'C5.3', 1, [source(impactSource), source('https://www.nasa.gov/solar-system/nasas-lro-spacecraft-finds-march-17-2013-impact-crater-and-more/')], { image: { src: impactPhoto('after'), alt: impactAlt.answer, credit: impactCredit, annotation: 'answer', date: '2013-07-28' } });

const light = page('gac-book-light', 'lro', text('Ánh sáng và bóng tối', 'Light and shadow'));
block(light, 'observations', 'fact', text('Dữ liệu LRO giúp nghiên cứu vùng sáng và vùng tối gần cực Mặt Trăng. Bản đồ chiếu sáng PIA13720 tổng hợp nhiều lần quan sát, không phải hai giờ trong câu đố.', 'LRO data helps study light and shadow near the lunar poles. Illumination map PIA13720 combines many observations; it does not show the puzzle’s two moments.'), 'C5.4', 0, [source('https://science.nasa.gov/photojournal/south-pole-illumination-map/')]);
block(light, 'hint', 'game', text('So từng nhánh ở cả hai lúc; giữ lối còn nhìn rõ, rồi nhớ điểm mốc. Hai lần quan sát không chứng minh một lối luôn sáng hoặc đủ mọi điều kiện an toàn. Bản đồ chơi là sáng tác.', 'Compare each branch at both moments; keep the visible path and remember its landmark. Two observations do not prove a path is always lit or safe in every way. The game map is imagined.'), 'A5.3', 0, [], { reveal: 'hint' });
const map = page('gac-book-map', 'lro', text('Bản đồ trong đèn', 'The map in the lantern'));
block(map, 'landmarks', 'fiction', text('Triền đất thấp → đá có khe → bóng cây đa. Ánh đèn có khung và quai, ở gần mặt đất. Đây là điểm mốc trong truyện, không phải bản đồ đến một địa điểm NASA.', 'Low slope → split rock → banyan shadow. The lantern has a frame and handle, close to the ground. These are story landmarks, not directions to a NASA site.'), 'A5.3', 1, [], { diagram: 'gac-map' });

/** Full inventory; no progress, React, DOM or save access. Browser visibility stays in the UI. */
export const bookPages: readonly BookPage[] = pages;
export const getBookPage = (id: string | null) => bookPages.find(p => p.id === (id ?? 'overview'));
export function getBookBlock(id: string): BookBlock {
  const found = bookPages.flatMap(p => p.blocks).find(b => b.id === id);
  if (!found) throw new Error(`Unknown book block: ${id}`);
  return found;
}
