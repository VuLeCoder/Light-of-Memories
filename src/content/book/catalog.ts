import { bookArchiveImages, realWorldPages } from './real-world';
import { text, type BookBlock, type BookChapter, type BookPage, type BookSource, type BookText, type ContentKind } from './types';
import { introCopy } from './intro-copy';
import { journeyCopy } from './journey-copy';
import { surveyorPlayCopy } from './surveyor-copy';
import { clueCopy } from './sparkle-copy';
import { digCopy, memoryPhotos } from '../levels/surveyor-dig';
import { challengeCopy } from '../levels/surveyor-challenges';
import { sparkleKeepsakes } from '../levels/lap-lanh';
import { taiThinhBook, taiThinhBookSources, taiThinhMemories } from '../levels/tai-thinh-content';
import { banBanhLuoiBook, banBanhLuoiCopy } from '../levels/ban-banh-luoi-content';
import { banBanhLuoiMemories } from '../levels/ban-banh-luoi-memories';
import { portraits } from '../assets';

const source = (url: string, review = false): BookSource => ({ url, status: review ? 'needs-review' : 'recorded' });
const surveyorSource = source('https://science.nasa.gov/mission/surveyor-3/', true);
const reflectorSource = source('https://www.jpl.nasa.gov/news/apollo-11-experiment-still-going-strong-after-35-years/');
const rangingSource = source('https://www.nasa.gov/missions/laser-beams-reflected-between-earth-and-moon-boost-science/');
const a11Photos = source('https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/images11.html');
const a12Photos = source('https://apollojournals.org/alsj/a12/images12.html');
const a17History = source('https://www.nasa.gov/history/50-years-ago-apollo-17-lands-at-taurus-littrow/');
const pages: BookPage[] = [];
function page(id: string, chapter: BookChapter, title: BookText): BookPage {
  const result: BookPage = { id, chapter, title, blocks: [] }; pages.push(result); return result;
}
function block(p: BookPage, key: string, kind: ContentKind, body: BookText, section: string, order: number, sources: readonly BookSource[] = [], extra: Partial<BookBlock> = {}) {
  const result: BookBlock = { id: `${p.id}.${key}`, kind, text: body, section, order, sources, ...extra };
  (p.blocks as BookBlock[]).push(result); return result;
}
const friendNames = { matTron: 'Round Eyes', lapLanh: 'Sparkle', taiThinh: 'Keen Ears', banhLuoi: 'Mesh Wheels' } as const;
const portrait = (p: BookPage, key: keyof typeof friendNames, section: string) => block(p, 'portrait', 'fiction', text(`Nhân vật ${portraits[key].name} trong câu chuyện Cuội.`, `An imagined character in Cuội’s story: ${friendNames[key]}.`), section, 0, [], { image: { src: portraits[key].url, alt: text(`Minh họa ${portraits[key].name}`, `Illustration of ${friendNames[key]}`) } });
/** Explicit bilingual boundaries: fail loudly if editing the source invalidates a split. */
function split(body: BookText, vi: string, en: string): [BookText, BookText] {
  const a = body.vi.indexOf(vi), b = body.en.indexOf(en);
  if (a < 0 || b < 0) throw new Error(`Book split needs review: ${vi} / ${en}`);
  return [text(body.vi.slice(0, a).trim(), body.en.slice(0, b).trim()), text(body.vi.slice(a).trim(), body.en.slice(b).trim())];
}
const overview = page('overview', 'overview', text(journeyCopy.vi.book, journeyCopy.en.book));
block(overview, 'guide', 'fiction', text(journeyCopy.vi.guide, journeyCopy.en.guide), 'A0', 0, [], { readingText: text('Cuội đi tìm chị Hằng với chiếc đèn ông sao. Quyển sách hiện kể về bốn người bạn trên Mặt Trăng; người bạn thứ năm là lời hẹn cho phần tiếp theo.', 'Cuội searches for Hằng with his star lantern. This book currently tells the stories of four lunar friends; a fifth friend is a teaser for a later chapter.') });
block(overview, 'reading-guide', 'game', text('Trong trò chơi, hoàn thành câu chuyện trước để mở cuộc gặp tiếp theo: Mắt Tròn, Lấp Lánh, Tai Thính, rồi Bánh Lưới. Ảnh và gợi ý được thêm vào sách khi chơi. Bản đọc này chứa đủ nội dung, gồm cả gợi ý và đáp án trong phụ lục.', 'In the game, finish each story to unlock the next encounter: Round Eyes, Sparkle, Keen Ears, then Mesh Wheels. Photos and clues are added to the book during play. This reading edition includes all content, including hints and answers in the appendix.'), 'A0', 1);
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

for (const entry of taiThinhBook) {
  const p = page(entry.id === 'intro' ? 'tai-thinh' : `tai-book-${entry.id}`, 'apollo12', entry.title);
  const sources = taiThinhBookSources[entry.id] ? [source(taiThinhBookSources[entry.id]!)] : [];
  const section = ['intro', 'devices'].includes(entry.id) ? 'C3.1' : ['impact', 'ringing'].includes(entry.id) ? 'C3.3' : entry.id === 'legacy' ? 'C3.4' : 'C3.2';
  if (entry.id === 'sensor') {
    const [fact, game] = split(entry.body, 'Các đường sóng', 'The wave traces');
    block(p, 'sensor', 'fact', fact, section, 0, sources, { readingText: text('Địa chấn kế đo những chuyển động rất nhỏ của đất và biến chúng thành tín hiệu. Các bản ghi giúp nhà khoa học biết mặt đất đã rung như thế nào.', 'A seismometer measures tiny ground movements and converts them into signals. The records help scientists understand how the ground shook.') });
    block(p, 'illustration', 'game', game, 'A3.1', 0);
  } else if (entry.id === 'rhythm') {
    const [game, rest] = split(entry.body, 'Cánh cửa ký ức', 'The memory door');
    const [fiction, fact] = split(rest, 'Tai Thính thật', 'the real Keen Ears');
    block(p, 'rhythm', 'game', game, 'A3.2', 0);
    block(p, 'door', 'fiction', fiction, 'A3.2', 1, [], { readingText: text('Cánh cửa ký ức thuộc câu chuyện tưởng tượng.', 'The memory door belongs to the imagined story.') });
    block(p, 'sensor', 'fact', fact, 'C3.2', 5, [source(taiThinhBookSources.sensor!)], { readingText: text('Địa chấn kế PSE đo rung động của đất.', 'The PSE seismometer measures ground vibrations.') });
  } else if (entry.id === 'legacy') {
    const [fact, fiction] = split(entry.body, 'Cuội mang theo', 'Cuội carries');
    block(p, 'archive', 'fact', fact, section, 0, sources); block(p, 'promise', 'fiction', fiction, 'A3.3', 0);
  } else block(p, 'body', entry.id === 'intro' ? 'fiction' : 'fact', entry.body, entry.id === 'intro' ? 'A3' : section, taiThinhBook.indexOf(entry), entry.id === 'intro' ? [] : sources);
  if (entry.id === 'intro') portrait(p, 'taiThinh', 'A3');
}
for (const [i, photo] of taiThinhMemories.entries()) {
  const p = page(`tai-photo-${photo.id}`, 'apollo12', photo.title);
  block(p, 'photo', 'fact', photo.caption, 'C3.1', 10 + i, [a12Photos], { image: { src: photo.src, alt: photo.alt, credit: photo.credit, code: photo.code, date: photo.date } });
}

const sections: Record<string, string> = { 'ban-banh-luoi': 'C4.1', 'ban-book-wheels': 'C4.2', 'ban-book-route': 'A4.2', 'ban-book-walkback': 'C4.3', 'ban-book-samples': 'C4.4', 'ban-book-camera': 'C4.5', 'ban-book-legacy': 'C4.6' };
for (const [id, entry] of Object.entries(banBanhLuoiBook)) {
  const p = page(id, 'apollo17', entry.title);
  if (!('paragraphs' in entry)) continue;
  const sources = id === 'ban-book-walkback' ? [source('https://www.nasa.gov/wp-content/uploads/static/apollo50th/pdf/A17_PressKit.pdf')] : ['ban-book-camera', 'ban-book-samples'].includes(id) ? [a17History] : id === 'ban-book-wheels' ? [source('https://ntrs.nasa.gov/api/citations/20100000019/downloads/20100000019.pdf')] : [source(banBanhLuoiMemories[0].source, id === 'ban-book-legacy')];
  entry.paragraphs.forEach((body, i) => {
    if (id === 'ban-book-route' && i === 0) {
      const [fiction, game] = split(body, 'LM là', 'LM means');
      block(p, 'imagined-trip', 'fiction', fiction, 'A4.2', -1);
      block(p, 'route-rule', 'game', game, 'A4.2', 0);
    } else if (id === 'ban-book-samples') {
      if (i < 2) block(p, `game-${i}`, 'game', body, 'A4.3', i);
      else {
        const [game, fact] = split(body, 'Các nhà khoa học', 'Scientists studied');
        block(p, `game-${i}`, 'game', game, 'A4.3', i);
        block(p, `fact-${i}`, 'fact', fact, sections[id], i, sources);
      }
    } else if (id === 'ban-book-legacy' && i === 1) {
      const [fact, fiction] = split(body, 'Còn trong câu chuyện', 'In the story');
      block(p, 'orbit', 'fact', fact, sections[id], i, [source(banBanhLuoiMemories[1].source)]);
      block(p, 'memory', 'fiction', fiction, 'A4.4', 0);
    } else {
      const kind: ContentKind = id === 'ban-banh-luoi' ? 'fiction' : id === 'ban-book-route' || (id === 'ban-book-walkback' && i === 1) ? 'game' : 'fact';
      block(p, `paragraph-${i}`, kind, body, kind !== 'fact' ? id === 'ban-banh-luoi' ? 'A4' : id === 'ban-book-wheels' ? 'A4.1' : 'A4.2' : sections[id], i, kind === 'fact' ? sources : []);
    }
  });
  if (id === 'ban-banh-luoi') portrait(p, 'banhLuoi', 'A4');
  if (id === 'ban-book-route' || id === 'ban-book-walkback') block(p, 'diagram', 'game', entry.title, 'A4.2', id === 'ban-book-route' ? 10 : 11, [], { diagram: id === 'ban-book-route' ? 'route' : 'route-safe', ...(id === 'ban-book-walkback' ? { reveal: 'hint' as const } : {}) });
  if (id === 'ban-book-camera') block(p, 'diagram', 'fact', entry.title, 'C4.5', 10, sources, { diagram: 'camera' });
}
for (const photo of banBanhLuoiMemories) {
  const p = pages.find(p => p.id === (photo.id === 'vip' ? 'ban-book-wheels' : `ban-photo-${photo.id}`))!;
  const section = photo.id === 'vip' ? 'C4.2' : 'C4.6';
  const image = { src: photo.src, alt: photo.alt, credit: photo.credit, code: photo.code, date: photo.date };
  block(p, 'photo', 'fact', photo.caption, section, 20, [source(photo.source)], { image });
  block(p, 'detail', 'fact', photo.id === 'orbit' ? banBanhLuoiCopy['photoB.detailCaption'] : photo.detailAlt, photo.id === 'vip' ? 'C4.2' : section, 21, [source(photo.source)], { image: { ...image, src: photo.detailSrc, alt: photo.detailAlt }, reveal: 'detail' });
}

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

/** Full inventory; no progress, React, DOM or save access. Browser visibility stays in the UI. */
export const bookPages: readonly BookPage[] = pages;
export const getBookPage = (id: string | null) => bookPages.find(p => p.id === (id ?? 'overview'));
export function getBookBlock(id: string): BookBlock {
  const found = bookPages.flatMap(p => p.blocks).find(b => b.id === id);
  if (!found) throw new Error(`Unknown book block: ${id}`);
  return found;
}
