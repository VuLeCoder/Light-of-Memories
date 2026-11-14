import { finaleLines } from '../story/ending/dialogue';
import { text, type BookPage, type BookText } from './types';
import { projectCredits } from '../story/ending/credits';
import { bookBackCover } from './back-cover';

function story(id: string, title: BookText, paragraphs: BookText[]): BookPage {
  return { id, chapter: 'ending', title, blocks: paragraphs.map((body, i) => ({
    id: `${id}.${i}`, kind: 'fiction', publication: 'main', text: body,
    section: 'A6', order: i, sources: [],
  })) };
}
// Reuse the same narrative as the finale so future edits cannot diverge.
const stageStory = (stage: number): BookText[] => finaleLines[stage].map(([, , vi, en]) => text(vi, en));
export const endingPages: readonly BookPage[] = [
  story('ending-book-reunion', text('Đèn sáng dưới cây đa', 'A lantern beneath the banyan'), stageStory(0)),
  story('ending-book-home', text('Dưới ánh trăng quê nhà', 'Under the moon at home'), stageStory(3)),
  story('ending-book-closing', text('Những câu chuyện còn sáng', 'Stories that keep shining'), [
    ...stageStory(2),
    text('Ba việc nhỏ em có thể làm hôm nay: nghĩ xem đồ dùng sẽ đi đâu khi không cần nữa; bỏ rác đúng chỗ; kể lại cho người thân nghe về một người bạn dưới trăng. Em hứa sẽ làm gì?', 'Three small things for today: think about where belongings go when no longer needed; put litter in the right place; tell someone about a friend beneath the Moon. What will you promise to do?'),
    text(`Light of Memories · ${projectCredits.heading.vi}: ${projectCredits.members.join(', ')}.`, `Light of Memories · ${projectCredits.heading.en}: ${projectCredits.members.join(', ')}.`),
  ]),
  bookBackCover,
];
