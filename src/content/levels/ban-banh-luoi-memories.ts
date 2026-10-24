import { banBanhLuoiPhotos } from '../assets';
import { banBanhLuoiCopy } from './ban-banh-luoi-content';

// Source provenance, precision notes, original hashes and crop bounds live in
// docs/plan/ban-banh-luoi-m0/photos.md. Dates retain month precision.
export const banBanhLuoiMemories = [
  {
    id: 'vip', code: "AS17-143-21933", date: '1972-12', datePrecision: 'month',
    credit: "NASA / Eugene Cernan; scan via Apollo Lunar Surface Journal", source: "https://apollojournals.org/alsj/a17/images17.html#21933",
    src: banBanhLuoiPhotos.vip, detailSrc: banBanhLuoiPhotos.vipDetail, receiveAfter: 'wheels',
    title: banBanhLuoiCopy['photoA.title'],
    caption: banBanhLuoiCopy['photoA.caption'],
    alt: banBanhLuoiCopy['photoA.alt'],
    detailAlt: banBanhLuoiCopy['photoA.zoomAlt'],
  },
  {
    id: 'orbit', code: "LROC NAC M168000580LR", date: '2011-08', datePrecision: 'month',
    credit: "NASA / GSFC / Arizona State University / Lunar Reconnaissance Orbiter", source: "https://science.nasa.gov/image-article/apod-2011-september-8-apollo-17-site-a-sharper-view/",
    src: banBanhLuoiPhotos.orbit, detailSrc: banBanhLuoiPhotos.orbitDetail, receiveAfter: 'launch',
    title: banBanhLuoiCopy['photoB.title'],
    caption: banBanhLuoiCopy['photoB.caption'],
    alt: banBanhLuoiCopy['photoB.alt'],
    detailAlt: banBanhLuoiCopy['photoB.zoomAlt'],
  },
] as const;
