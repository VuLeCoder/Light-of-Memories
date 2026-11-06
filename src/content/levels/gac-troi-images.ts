const base = `${import.meta.env.BASE_URL}images/memories/gac-troi/`;
const images = {
  "apollo11-lro": {
    "alt": {
      "vi": "Khu Apollo 11 nhìn từ quỹ đạo.",
      "en": "Apollo 11 site seen from orbit."
    },
    "credit": "NASA/GSFC/Arizona State University",
    "sourcePage": "https://science.nasa.gov/resource/apollo-11-landing-site/",
    "file": "apollo11-lro.webp"
  },
  "apollo11-lro-annotated": {
    "alt": {
      "vi": "Khu Apollo 11 nhìn từ quỹ đạo, có chú thích vị trí thiết bị.",
      "en": "Apollo 11 site from orbit, with instrument location labels."
    },
    "credit": "NASA/GSFC/Arizona State University",
    "sourcePage": "https://science.nasa.gov/resource/apollo-11-landing-site/",
    "file": "apollo11-lro-annotated.webp"
  },
  "apollo12-surveyor3-lro": {
    "alt": {
      "vi": "Khu Apollo 12 và Surveyor 3 nhìn từ quỹ đạo.",
      "en": "Apollo 12 and Surveyor 3 site seen from orbit."
    },
    "credit": "NASA/GSFC/Arizona State University",
    "sourcePage": "https://science.nasa.gov/photojournal/first-look-apollo-12-and-surveyor-3/",
    "file": "apollo12-surveyor3-lro.webp"
  },
  "apollo12-surveyor3-lro-annotated": {
    "alt": {
      "vi": "Khu Apollo 12 với nhãn Surveyor 3 và khu thí nghiệm ALSEP.",
      "en": "Apollo 12 area with labels for Surveyor 3 and the ALSEP experiment site."
    },
    "credit": "NASA/GSFC/Arizona State University",
    "sourcePage": "https://science.nasa.gov/photojournal/first-look-apollo-12-and-surveyor-3/",
    "file": "apollo12-surveyor3-lro-annotated.webp"
  },
  "conrad-surveyor3-as12-48-7134": {
    "alt": {
      "vi": "Charles Conrad cạnh Surveyor 3 trên bề mặt Mặt Trăng năm 1969.",
      "en": "Charles Conrad beside Surveyor 3 on the lunar surface in 1969."
    },
    "credit": "NASA",
    "sourcePage": "https://science.nasa.gov/resource/apollo-12-and-surveyor-3/",
    "file": "conrad-surveyor3-as12-48-7134.webp"
  },
  "apollo17-lro": {
    "alt": {
      "vi": "Khu Apollo 17, có nhãn xe rover và đường di chuyển.",
      "en": "Apollo 17 site with labels for the rover and travel tracks."
    },
    "credit": "NASA/GSFC/Arizona State University",
    "sourcePage": "https://science.nasa.gov/image-article/apod-2011-september-8-apollo-17-site-a-sharper-view/",
    "file": "apollo17-lro.webp"
  }
} as const;
export type GacImageId = keyof typeof images;
export const gacImage = (id: GacImageId) => ({ ...images[id], src: base + images[id].file });
