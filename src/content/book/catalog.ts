import { restoredFriendPages } from './restored-friends';
import { banyanLegend } from '../story/remembrance';
import { extendedPages } from './extended';
import { bookFrontCover } from './front-cover';
import { endingPages } from './ending';
import { impactAlt, impactCredit, impactPhoto, impactSource } from '../friends/gac-troi/challenges/impact';
import { bookArchiveImages, realWorldPages, surveyorToolsPage } from './real-world';
import { text, type BookBlock, type BookChapter, type BookPage, type BookSource, type BookText, type ContentKind } from './types';
import { introCopy } from './intro-copy';
import { journeyCopy } from './journey-copy';
import { clueCopy } from '../friends/lap-lanh/book-copy';
import { digCopy } from '../friends/surveyor/challenges/excavation';
import { memoryPhotos } from '../friends/surveyor/images';
import { challengeCopy } from '../friends/surveyor/challenges/journal';
import { sparkleFactualPages, sparkleIntroTitle } from './sparkle-pages';
import { gacTroiOrbitBook } from '../friends/gac-troi/book-copy';
import { portraits } from '../assets';

const source = (url: string, review = false): BookSource => ({ url, status: review ? 'needs-review' : 'recorded' });
const surveyorSource = source('https://science.nasa.gov/mission/surveyor-3/', true);
const reflectorSource = source('https://www.jpl.nasa.gov/news/apollo-11-experiment-still-going-strong-after-35-years/');
const rangingSource = source('https://www.nasa.gov/missions/laser-beams-reflected-between-earth-and-moon-boost-science/');
const pages: BookPage[] = [];
function page(id: string, chapter: BookChapter, title: BookText): BookPage {
  const result: BookPage = { id, chapter, title, blocks: [] }; pages.push(result); return result;
}
function block(p: BookPage, key: string, kind: ContentKind, body: BookText, section: string, order: number, sources: readonly BookSource[] = [], extra: Partial<BookBlock> = {}) {
  const result: BookBlock = { id: `${p.id}.${key}`, kind, text: body, section, order, sources, ...extra };
  (p.blocks as BookBlock[]).push(result); return result;
}
const friendNames = { matTron: 'Round Eye', lapLanh: 'Twinkle' } as const;
const portrait = (p: BookPage, key: keyof typeof friendNames, section: string) => block(p, 'portrait', 'fiction', text(`Nhân vật ${portraits[key].name} trong câu chuyện Cuội.`, `An imagined character in Cuội’s story: ${friendNames[key]}.`), section, 0, [], { publication: 'main', image: { src: portraits[key].url, alt: text(`Minh họa ${portraits[key].name}`, `Illustration of ${friendNames[key]}`) } });
/** Explicit bilingual boundaries: fail loudly if editing the source invalidates a split. */
function split(body: BookText, vi: string, en: string): [BookText, BookText] {
  const a = body.vi.indexOf(vi), b = body.en.indexOf(en);
  if (a < 0 || b < 0) throw new Error(`Book split needs review: ${vi} / ${en}`);
  return [text(body.vi.slice(0, a).trim(), body.en.slice(0, b).trim()), text(body.vi.slice(a).trim(), body.en.slice(b).trim())];
}
const overview = page('overview', 'overview', text(journeyCopy.vi.book, journeyCopy.en.book));
block(overview, 'guide', 'fiction', text(journeyCopy.vi.guide, journeyCopy.en.guide), 'A0', 0, [], { publication: 'main', readingText: text('Cuội đi tìm chị Hằng với chiếc đèn ông sao. Quyển sách kể về Mắt Tròn, Lấp Lánh, Tai Thính, Bánh Lưới và Gác Trời.', 'Cuội searches for Hằng with his star lantern. This book tells the stories of Round Eye, Twinkle, Sharp Ear, Mesh Wheels and Sky Watcher.') });
block(overview, 'reading-guide', 'game', text('Trong trò chơi, hoàn thành câu chuyện trước để mở cuộc gặp tiếp theo: Mắt Tròn, Lấp Lánh, Tai Thính, Bánh Lưới, rồi Gác Trời. Ảnh và gợi ý được thêm vào sách khi chơi.', 'In the game, finish each story to unlock the next encounter: Round Eye, Twinkle, Sharp Ear, Mesh Wheels, then Sky Watcher. Photos and clues are added to the book during play.'), 'A0', 1);
block(overview, 'banyan-legend', 'fiction', banyanLegend, 'A0', 2);
const surveyor = page('surveyor', 'surveyor', text('Surveyor 3', 'Surveyor 3'));
block(surveyor, 'intro', 'fiction', introCopy.surveyorIntro, 'A1', -1, [], { publication: 'main' }); portrait(surveyor, 'matTron', 'A1');
block(surveyor, 'notebook-guide', 'game', text('Sổ tay có ba gợi ý tìm ảnh. Ghi nhớ gợi ý hiện tại hoặc tìm được ảnh tương ứng sẽ mở gợi ý tiếp theo. Các vị trí và việc Cuội đào ảnh thuộc màn chơi, không phải tọa độ khảo sát lịch sử.', 'The notebook has three photo clues. Noting the current clue or finding its photo opens the next clue. The locations and Cuội digging for photos belong to the game, not a historical site survey.'), 'A1', 1);
const tools = page('surveyor-b01', 'surveyor', text(challengeCopy.vi.titles[0], challengeCopy.en.titles[0]));
block(tools, 'tools', 'fact', text(surveyorToolsPage.paragraphs.map(p => p.vi).join(' '), surveyorToolsPage.paragraphs.map(p => p.en).join(' ')), 'C1.2', 0, surveyorToolsPage.sources.map(url => source(url)));
for (const [index, id] of (['arrive', 'work', 'visit'] as const).entries()) {
  const title = text(digCopy.vi.names[id], digCopy.en.names[id]);
  const clue = page(`clue-${id}`, 'surveyor', title);
  block(clue, 'clue', 'game', text(digCopy.vi.clues[id], digCopy.en.clues[id]), `A1.${index + 1}`, 0, [], { diagram: `clue-${id}` });
  const photo = page(`photo-${id}`, 'surveyor', title);
  block(photo, 'photo', 'fact', text(digCopy.vi.descriptions[id], digCopy.en.descriptions[id]), `C1.${index + 1}`, 10, [surveyorSource], { image: { src: memoryPhotos[id], alt: title } });
}
const surveyorPhotos = page('surveyor-photos', 'surveyor', text('Ba dấu mốc của Surveyor 3', 'Three moments of Surveyor 3'));
for (const [index, id] of (['arrive', 'work', 'visit'] as const).entries()) {
  block(surveyorPhotos, id, 'fact', text(
    ['Tháng 4/1967: Surveyor 3 chụp chân tàu sau khi hạ cánh.', 'Xẻng đào rãnh khảo sát đất năm 1967; ảnh chụp năm 1969.', 'Tháng 11/1969: Apollo 12 đến thăm Surveyor 3.'][index],
    ['April 1967: Surveyor 3 photographed its footpad after landing.', 'Soil-test trenches dug in 1967, photographed in 1969.', 'November 1969: Apollo 12 visited Surveyor 3.'][index]
  ), `C1.${index + 1}`, index, [surveyorSource], { image: { src: memoryPhotos[id], alt: text(digCopy.vi.names[id], digCopy.en.names[id]), credit: 'NASA' } });
}
const sparkle = page('lap-lanh', 'apollo11', sparkleIntroTitle);
block(sparkle, 'intro', 'fiction', introCopy.sparkleIntro, 'A2', -1, [], { publication: 'main' }); portrait(sparkle, 'lapLanh', 'A2');
for (const [i, entry] of sparkleFactualPages.entries()) {
  const p = page(entry.id, entry.chapter, entry.title);
  const refs = entry.sources.map(url => source(url));
  block(p, 'photo', 'fact', entry.caption, entry.section, 0, refs, { image: { src: entry.image!, alt: entry.caption, credit: 'NASA', code: i === 0 ? 'AS11-40-5945' : 'AS11-40-5952', date: '1969' } });
  entry.paragraphs.forEach((body, index) => block(p, `body-${index}`, 'fact', body, entry.section, index + 1, refs));
}
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
 if (entry.image) block(p, 'photo', 'fact', entry.caption, entry.section, 30, entry.sources.map(url => source(url)), { image: { src: entry.image, alt: entry.caption, credit: entry.caption.en } });
 entry.paragraphs.forEach((body, i) => block(p, `body-${i}`, 'fact', body, entry.section, 31 + i, entry.sources.map(url => source(url))));
}

const orbit = page(gacTroiOrbitBook.id, 'lro', gacTroiOrbitBook.title);
block(orbit, 'intro', 'fiction', gacTroiOrbitBook.body, 'A5', 0, [], { publication: 'main', image: { src: portraits.gacTroi.url, alt: text('Minh họa bạn Gác Trời', 'Illustration of Sky Watcher') } });

const sites = page('gac-book-sites', 'lro', text('Bốn người bạn, ba vùng đất', 'Four friends, three places'));
[
  text('Lấp Lánh — Apollo 11 · Biển Yên Tĩnh', 'Twinkle — Apollo 11 · Sea of Tranquility'),
  text('Mắt Tròn — Apollo 12 · Đại Dương Bão', 'Round Eye — Apollo 12 · Ocean of Storms'),
  text('Tai Thính — Apollo 12 · Đại Dương Bão', 'Sharp Ear — Apollo 12 · Ocean of Storms'),
  text('Bánh Lưới — Apollo 15 · Hadley–Apennine', 'Mesh Wheels — Apollo 15 · Hadley–Apennine'),
].forEach((body, i) => block(sites, `friend-${i}`, 'game', body, 'A5.1', i, []));
block(sites, 'how', 'game', text('Chọn thẻ người bạn, xem các vùng ảnh rồi ghép vào vùng phù hợp. Các cặp đúng luôn được giữ lại.', 'Choose a friend, browse the pictures, then match them to a place. Correct pairs stay in place.'), 'A5.1', 1, []);
const impact = page('gac-book-impact', 'lro', text('Một dấu vết mới', 'A new trace'));
block(impact, 'compare', 'game', text('Mời Cuội làm thám tử Mặt Trăng! Hai ảnh trông như sinh đôi, nhưng có một chi tiết vừa “lẻn” vào. Tinh mắt lên nào: vùng 1, 2 hay 3 có dấu vết mới?', 'Time to be a Moon detective, Cuội! These pictures look like twins, but one detail has sneaked in. Keep your eyes peeled: which area has a new mark — 1, 2 or 3?'), 'A5.2', 0, []);
block(impact, 'hint', 'game', text('Đáp án: vùng 2.', 'Answer: area 2.'), 'A5.2', 1, [], { reveal: 'hint' });
const impactStory = page('gac-book-impact.story', 'lro', text('Chớp sáng và chiếc hố', 'A flash and a crater'));
block(impactStory, 'crater', 'fact', text('Ngày 17/3/2013, NASA ghi được chớp sáng do một thiên thể nhỏ va vào Biển Mưa trên Mặt Trăng. Vài tháng sau, nhóm camera LROC của tàu LRO so sánh ảnh trước và sau, tìm thấy hố mới rộng khoảng 18 mét.', 'On 17 March 2013, NASA recorded a flash as a small space rock struck the Moon’s Mare Imbrium. Months later, the LRO camera team compared before-and-after images and found a new crater about 18 metres wide.'), 'C5.3', 0, [source(impactSource)], { image: { src: impactPhoto('after'), alt: impactAlt.after, credit: impactCredit } });
block(impactStory, 'ejecta', 'fact', text('Vật chất bắn ra tạo những vệt dài vài kilômét quanh hố. Những cặp ảnh như vậy giúp phát hiện các thay đổi trên bề mặt Mặt Trăng.', 'Ejected material formed rays several kilometres long around the crater. Such image pairs reveal changes on the lunar surface.'), 'C5.3', 1, [source(impactSource)]);

const light = page('gac-book-light', 'lro', text('Ánh sáng và bóng tối', 'Light and shadow'));
block(light, 'observations', 'fact', text('Gần cực Mặt Trăng, Mặt Trời ở thấp trên đường chân trời. Thành hố có thể che ánh nắng, khiến một số vùng đáy hố nằm trong bóng tối vĩnh viễn. Các nhà khoa học dùng nhiều ảnh và dữ liệu địa hình để nghiên cứu những vùng này.', 'Near the lunar poles, the Sun stays low on the horizon. Crater walls can block sunlight, leaving some crater floors in permanent shadow. Scientists use many images and terrain data to study these regions.'), 'C5.4', 0, [source('https://science.nasa.gov/resource/shackleton-craters-illuminated-rim-shadowed-interior/')]);
block(light, 'map', 'fact', text('Bản đồ chiếu sáng cực nam được ghép từ ảnh của camera LROC trên tàu Lunar Reconnaissance Orbiter (LRO). Ở giữa là hố Shackleton, rộng khoảng 19 km; cực nam Mặt Trăng nằm gần vị trí 9 giờ trên vành hố.', 'This south pole illumination map was assembled from images taken by the Lunar Reconnaissance Orbiter Camera (LROC). Shackleton crater, about 19 km across, is at the centre; the lunar south pole lies near the nine o’clock position on its rim.'), 'C5.4', 1, [source('https://science.nasa.gov/resource/illumination-map-of-the-moons-south-pole/')], { image: { src: `${import.meta.env.BASE_URL}images/memories/gac-troi/south-pole-illumination.png`, alt: text('Bản đồ chiếu sáng cực nam Mặt Trăng từ ảnh LROC', 'Lunar south pole illumination map from LROC imagery'), credit: 'NASA/GSFC/Arizona State University' } });

/** Full inventory; no progress, React, DOM or save access. Browser visibility stays in the UI. */
export const bookPages: readonly BookPage[] = [bookFrontCover, ...pages, ...restoredFriendPages, ...extendedPages, ...endingPages].map(page => ({ ...page, blocks: page.blocks.filter(block => block.kind !== 'fiction' || page.id === gacTroiOrbitBook.id) }));
export const getBookPage = (id: string | null) => bookPages.find(p => p.id === (id ?? 'overview'));
