import { text, type BookPage } from './types';

/** A physical closing cover, with no additional story or game content. */
export const bookBackCover: BookPage = {
  id: 'ending-book-back-cover', chapter: 'ending',
  title: text('Bìa sau', 'Back cover'), blocks: [],
};
export const backCoverCopy = {
  subtitle: text('Những người bạn dưới trăng', 'Friends beneath the Moon'),
  thanks: text('Cảm ơn bạn đã cùng Cuội đi hết hành trình.', 'Thank you for travelling with Cuội.'),
  end: text('Khép lại một hành trình', 'A journey comes to a close'),
};
export const backCoverArtwork = `${import.meta.env.BASE_URL}images/book/back-cover.svg`;
