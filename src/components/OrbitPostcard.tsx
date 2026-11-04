import type { Language } from '../content/i18n';

export function OrbitPostcard({ language }: { language: Language }) {
  return <figure className="orbit-postcard">
    <img src="/images/memories/ban-banh-luoi/apollo-17-orbit-m168000580lr.webp" alt={language === 'vi' ? 'Ảnh từ quỹ đạo của khu vực Apollo 17 và những dấu vết trên bề mặt' : 'Orbital photograph of the Apollo 17 site and surface traces'} />
    <figcaption>{language === 'vi' ? 'Bức ảnh gửi từ trên cao · Apollo 17' : 'A picture from above · Apollo 17'}<small>NASA / GSFC / Arizona State University · LROC</small></figcaption>
  </figure>;
}
