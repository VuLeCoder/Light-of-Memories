import { banBanhLuoiPhotos } from '../../assets';
import { banBanhLuoiCopy } from './dialogue';

// Source provenance, precision notes, original hashes and crop bounds live in
// plan/banh-luoi-pdf-milestones.md (vip and orbit).
// Dates retain only the precision established by the cited source.
export const banBanhLuoiMemories = [
  {
    id: 'vip', code: "NASA asset 7022567", date: '1971', datePrecision: 'year',
    credit: "NASA/MSFC", source: "https://www.nasa.gov/image-article/lunar-roving-vehicle-apollo-15-mission/",
    src: banBanhLuoiPhotos.vip, detailSrc: banBanhLuoiPhotos.vipDetail, receiveAfter: 'wheels',
    title: banBanhLuoiCopy['photoA.title'],
    caption: banBanhLuoiCopy['photoA.caption'],
    alt: banBanhLuoiCopy['photoA.alt'],
    detailAlt: banBanhLuoiCopy['photoA.zoomAlt'],
  },
  {
    id: 'orbit', code: "LROC NAC M175252641L,R", date: '2011', datePrecision: 'year',
    credit: "NASA / GSFC / Arizona State University", source: "https://lroc.im-ldi.com/images/491",
    src: banBanhLuoiPhotos.orbit, detailSrc: banBanhLuoiPhotos.orbitDetail, receiveAfter: 'guiding',
    title: banBanhLuoiCopy['photoB.title'],
    caption: banBanhLuoiCopy['photoB.caption'],
    alt: banBanhLuoiCopy['photoB.alt'],
    detailAlt: banBanhLuoiCopy['photoB.zoomAlt'],
  },
] as const;
