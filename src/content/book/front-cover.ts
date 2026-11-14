import { text, type BookPage } from './types';

export const bookFrontCover: BookPage = {
  id: 'book-front-cover', chapter: 'overview',
  title: text('Bìa trước', 'Front cover'), blocks: [],
};
export const frontCoverCopy = {
  eyebrow: text('Sách đồng hành', 'Companion book'),
  subtitle: text('Những người bạn dưới trăng', 'Friends beneath the Moon'),
  invitation: text('Khám phá thiết bị Mặt Trăng và gợi ý chơi.', 'Explore lunar instruments and gameplay hints.'),
};
export const frontCoverArtwork = `${import.meta.env.BASE_URL}images/book/front-cover.svg`;
