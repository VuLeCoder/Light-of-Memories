import { taiThinhMemories } from '../friends/tai-thinh/dialogue';
import { taiThinhBook, taiThinhBookSources, taiThinhReferences, taiThinhPhotoBook } from '../friends/tai-thinh/book-copy';
import { banBanhLuoiBook } from '../friends/ban-banh-luoi/dialogue';
import { banBanhLuoiMemories } from '../friends/ban-banh-luoi/images';
import { text, type BookPage, type BookBlock, type BookText } from './types';
const apollo15Summary = 'https://www.nasa.gov/wp-content/uploads/static/history/SP-4029/Apollo_15a_Summary.htm';
const apollo15SurfaceProcedures = 'https://an.rsl.wustl.edu/apollo/data/A15/resources/A15_SurfaceProc.pdf';
const sources = (url: string | null) => url ? [{ url, status: 'recorded' as const }] : [];
const paragraph = (id: string, body: BookText, kind: BookBlock['kind'], section: string, order: number, url: string | null): BookBlock => ({ id, text: body, kind, section, order, sources: sources(url) });
export const restoredFriendPages: readonly BookPage[] = [
  ...taiThinhBook.map(entry => {
    const id = entry.id === 'intro' ? 'tai-thinh' : `tai-book-${entry.id}`;
    const kind = entry.id === 'intro' || entry.id === 'sources' || entry.id === 'ringing' || entry.id === 'rhythm' ? 'game' : 'fact';
    if (entry.id === 'devices') {
      const urls = [taiThinhBookSources.devices!, 'https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1969-099C-03'];
      return { id, chapter: 'apollo12' as const, title: entry.title, blocks: entry.body.vi.split('\n\n').map((vi, i) => ({
        ...paragraph(`${id}.body-${i}`, text(vi, entry.body.en.split('\n\n')[i]), 'fact', 'C3', i, urls[0]),
        sources: urls.map(url => ({ url, status: 'recorded' as const })),
        ...(i === 0 ? { image: { src: '/images/memories/tai-thinh/alsep-passive-seismic.jpg', alt: text('Thiết bị PSE với lớp phủ cách nhiệt tráng nhôm.', 'A PSE instrument with its aluminized thermal shroud.'), credit: 'NASA/NSSDCA · PSE' } } : {}),
      })) };
    }
    const urls = kind === 'game' ? [] : entry.id === 'impact' ? [taiThinhReferences.alsep, taiThinhReferences.pse] : entry.id === 'legacy' ? [taiThinhReferences.pse, taiThinhReferences.alsep, taiThinhReferences.data] : [taiThinhBookSources[entry.id]!];
    return { id, chapter: 'apollo12' as const, title: entry.title, blocks: entry.body.vi.split('\n\n').map((vi, i) => ({
      ...paragraph(i === 0 ? `${id}.body` : `${id}.body-${i}`, text(vi, entry.body.en.split('\n\n')[i]), kind, kind === 'fact' ? 'C3' : 'A3', i, null),
      sources: urls.map(url => ({ url, status: 'recorded' as const })),
    })) };
  }),
  ...taiThinhMemories.map(photo => {
    const copy = taiThinhPhotoBook[photo.id];
    return { id: `tai-photo-${photo.id}`, chapter: 'apollo12' as const, title: copy.title, blocks: [{ ...paragraph(`tai-photo-${photo.id}.picture`, copy.caption, 'fact', 'C3', 0, copy.source), image: { src: photo.src, alt: photo.alt, code: photo.code, date: photo.date, credit: photo.credit } }] };
  }),
  ...Object.entries(banBanhLuoiBook).map(([id, entry]) => ({ id, chapter: 'apollo17' as const, title: entry.title, blocks: ('paragraphs' in entry ? entry.paragraphs : []).map((body, i) => {
    const model = id === 'ban-banh-luoi' || id === 'ban-book-route' || id === 'ban-book-samples' || id === 'ban-book-wheels';
    return paragraph(`${id}.body-${i}`, body, model ? 'game' : 'fact', model ? 'A4' : 'C4', i, model ? null : id === 'ban-book-walkback' ? apollo15SurfaceProcedures : id === 'ban-book-wheels-real' ? 'https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html' : apollo15Summary);
  }) })),
];
const orbitStory = restoredFriendPages.find(p => p.id === 'ban-photo-orbit')!;
for (const block of orbitStory.blocks) block.sources = [apollo15Summary, 'https://sma.nasa.gov/SignificantIncidents/assets/apollo-15-mission-report.pdf', 'https://lroc.im-ldi.com/images/491'].map(url => ({ url, status: 'recorded' as const }));
const realWheels = restoredFriendPages.find(p => p.id === 'ban-book-wheels-real')!;
(realWheels.blocks as BookBlock[]).push({
  ...paragraph('ban-book-wheels-real.picture', text(
    'Ảnh cắt từ NASA.',
    'NASA photo detail.'
  ), 'fact', 'C4', 20, 'https://www.nasa.gov/image-article/lunar-roving-vehicle-apollo-15-mission/'),
  image: {
    src: '/images/memories/ban-banh-luoi/apollo-15-wheel-detail.webp',
    alt: text('Bánh lưới kim loại và gân bám của xe Apollo 15.', 'The Apollo 15 rover’s metal-mesh wheel and traction treads.'),
    credit: 'NASA/MSFC · 1971',
  },
});
const walkback = restoredFriendPages.find(p => p.id === 'ban-book-walkback')!;
const returnPhoto = banBanhLuoiMemories.find(photo => photo.id === 'vip')!;
(walkback.blocks as BookBlock[]).push({
  ...paragraph('ban-book-walkback.picture', text(
    'Trong ảnh, David Scott ngồi trên LRV, đưa các mẫu đá và đất về tàu Falcon.',
    'The photo shows David Scott on the LRV, returning to the Falcon lunar module with rock and soil samples.'
  ), 'fact', 'C4', 20, returnPhoto.source),
  image: {
    src: returnPhoto.src,
    alt: text('David Scott ngồi trên LRV Apollo 15 trên bề mặt Mặt Trăng.', 'David Scott seated on the Apollo 15 LRV on the lunar surface.'),
    credit: returnPhoto.credit,
    date: returnPhoto.date,
  },
});
for (const [id, diagram] of [['ban-book-route', 'route']] as const) {
  const page = restoredFriendPages.find(p => p.id === id)!;
  (page.blocks as BookBlock[]).push({ ...paragraph(`${id}.diagram`, text('Sơ đồ minh họa, không theo tỉ lệ.', 'Illustrative diagram, not to scale.'), 'game', 'A4', 10, null), diagram });
}
// The photo pages already exist in the authored book. Attach archive metadata once.
for (const photo of banBanhLuoiMemories) {
  const page = restoredFriendPages.find(p => p.id === `ban-photo-${photo.id}`);
  if (page) (page.blocks as BookBlock[]).push({ ...paragraph(`${page.id}.picture`, photo.id === 'orbit' ? text('', '') : photo.caption, 'fact', 'C4', 20, photo.source), image: { src: photo.src, alt: photo.alt, credit: photo.credit, code: photo.code, date: photo.date } });
}
export const restoredReadingOrder = [
  'tai-thinh', 'tai-book-devices', 'tai-photo-pse', 'tai-book-sensor', 'tai-book-sources', 'tai-book-noise', 'tai-photo-station', 'tai-book-impact', 'tai-book-ringing', 'tai-book-rhythm', 'tai-photo-magnetometer', 'tai-book-legacy',
  'ban-banh-luoi', 'ban-book-wheels', 'ban-book-wheels-real', 'ban-photo-vip', 'ban-book-route', 'ban-book-walkback', 'ban-book-samples', 'ban-book-legacy', 'ban-photo-orbit',
];
