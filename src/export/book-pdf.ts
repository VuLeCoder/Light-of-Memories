import { jsPDF } from 'jspdf';
import { getReadingBook } from '../content/book/publication';
import type { BookChapter } from '../content/book/types';
import type { Language } from '../content/i18n';
import { bookDiagramSvg } from './book-diagrams';
import { impactTarget } from '../content/levels/gac-troi-impact';

type ReadingBook = ReturnType<typeof getReadingBook>;
type ReadingBlock = ReadingBook['main'][number];
const margin = 20, width = 170, bottom = 273;

async function fontBase64(path: string) {
  const response = await fetch(`${import.meta.env.BASE_URL}fonts/pdf/${path}`, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`Cannot load PDF font: ${path}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  let binary = '';
  for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  return btoa(binary);
}

async function raster(src: string, annotation?: 'hint' | 'answer') {
  const image = new Image();
  image.src = src;
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([image.decode(), new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error('PDF illustration timed out')), 30000);
    })]);
  } finally { clearTimeout(timer); }
  const scale = Math.min(1, 1800 / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(image.naturalWidth * scale);
  canvas.height = Math.round(image.naturalHeight * scale);
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Cannot prepare PDF illustration');
  context.fillStyle = '#faf6eb';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  if (annotation) {
    context.strokeStyle = '#ffe3a2';
    context.lineWidth = Math.max(3, canvas.width / 300);
    context.beginPath();
    if (annotation === 'hint') {
      context.setLineDash([canvas.width / 70, canvas.width / 100]);
      context.rect(canvas.width * .36, canvas.height * .3, canvas.width * .3, canvas.height * .4);
    } else context.ellipse(canvas.width * impactTarget.x, canvas.height * impactTarget.y,
      canvas.width * impactTarget.rx, canvas.height * impactTarget.ry, 0, 0, Math.PI * 2);
    context.stroke();
  }
  return { data: canvas.toDataURL('image/jpeg', .92), ratio: canvas.width / canvas.height };
}

export async function createBookPdf(language: Language) {
  const vi = language === 'vi';
  // Intentionally no progress/save input: every catalog block is included.
  const book = getReadingBook(language);
  const [regular, bold] = await Promise.all([fontBase64('DejaVuSerif.ttf'), fontBase64('DejaVuSerif-Bold.ttf')]);
  const pdf = new jsPDF({ compress: true, putOnlyUsedFonts: true });
  pdf.addFileToVFS('Book.ttf', regular);
  pdf.addFont('Book.ttf', 'Book', 'normal');
  pdf.addFileToVFS('Book-Bold.ttf', bold);
  pdf.addFont('Book-Bold.ttf', 'Book', 'bold');
  const title = vi ? 'Cuội — Sách đồng hành' : 'Cuội — Companion book';
  pdf.setProperties({ title, subject: vi ? 'Bản sách đầy đủ và phụ lục trò chơi' : 'Complete reading edition and game appendix', author: 'Light of Memories' });
  pdf.setLanguage(language);
  const chapterNames: Record<BookChapter, string> = vi
    ? { overview: 'Mở đầu', surveyor: 'Mắt Tròn · Surveyor 3', apollo11: 'Lấp Lánh · Apollo 11', lro: 'Gác Trời · LRO' }
    : { overview: 'Introduction', surveyor: 'Round Eyes · Surveyor 3', apollo11: 'Sparkle · Apollo 11', lro: 'Sky Watcher · LRO' };
  const contents: { title: string; page: number }[] = [];
  const sourceNumbers = new Map(book.sources.map((source, i) => [source.url, i + 1]));
  const images = new Map<string, Promise<Awaited<ReturnType<typeof raster>>>>();
  const publishedImages = new Map<string, number>();
  let y = margin;
  let inset = 0;
  let imageMaxHeight = 72;
  const pageNumber = () => pdf.getNumberOfPages();
  function sheet() {
    pdf.setFillColor(250, 246, 235);
    pdf.rect(0, 0, 210, 297, 'F');
    y = margin;
  }
  function nextPage() { pdf.addPage(); sheet(); }
  function ensure(height: number) { if (y + height > bottom) nextPage(); }
  function text(value: string, size = 11, isBold = false, gap = 4) {
    pdf.setFont('Book', isBold ? 'bold' : 'normal');
    pdf.setFontSize(size);
    pdf.setTextColor(63, 65, 55);
    const lines = pdf.splitTextToSize(value.normalize('NFC'), width - inset * 2) as string[];
    const lineHeight = size * .3528 * 1.55;
    for (const line of lines) {
      ensure(lineHeight);
      pdf.text(line, margin + inset, y + size * .3528);
      y += lineHeight;
    }
    y += gap;
  }
  function heading(value: string, size = 17) {
    ensure(32);
    text(value, size, true, 7);
  }
  async function prepareImage(src: string, annotation?: 'hint' | 'answer') {
    const key = `${src}:${annotation ?? ''}`;
    let pending = images.get(key);
    if (!pending) { pending = raster(src, annotation); images.set(key, pending); }
    return pending;
  }
  function imageSize(ratio: number) {
    const w = Math.min(width - inset * 2, imageMaxHeight * ratio);
    return { w, h: w / ratio };
  }
  function textHeight(value: string, size = 11, bold = false, gap = 4) {
    pdf.setFont('Book', bold ? 'bold' : 'normal'); pdf.setFontSize(size);
    return (pdf.splitTextToSize(value.normalize('NFC'), width - inset * 2) as string[]).length * size * .3528 * 1.55 + gap;
  }
  async function illustration(src: string, caption: string, alias: string, annotation?: 'hint' | 'answer') {
    const image = await prepareImage(src, annotation);
    const { w, h } = imageSize(image.ratio);
    // Keep each figure and its caption together when possible.
    pdf.setFont('Book', 'normal'); pdf.setFontSize(8);
    const captionHeight = textHeight(caption, 8);
    ensure(h + captionHeight + 6);
    const figurePage = pageNumber();
    pdf.addImage(image.data, 'JPEG', margin + (width - w) / 2, y, w, h, alias, 'FAST');
    pdf.setDrawColor(81, 76, 62); pdf.setLineWidth(.35);
    pdf.rect(margin + (width - w) / 2, y, w, h);
    y += h + 3;
    text(caption, 8);
    return figurePage;
  }
  sheet();
  pdf.setDrawColor(81, 76, 62); pdf.setLineWidth(.8);
  pdf.roundedRect(13, 13, 184, 259, 3, 3);
  y = 30;
  heading(title, 26);
  text(vi ? 'Những người bạn dưới trăng' : 'Friends beneath the Moon', 16);
  await illustration(`${import.meta.env.BASE_URL}images/portraits/cuoi.webp`, vi ? 'Cuội và hành trình dưới trăng' : 'Cuội’s journey beneath the Moon', 'cover.cuoi');
  y += 5;
  text(vi ? 'Bản đọc đầy đủ · Không phụ thuộc tiến độ trò chơi' : 'Complete reading edition · Independent of game progress', 12);
  text(vi ? 'Phần chính trình bày kiến thức và hình ảnh tư liệu. Nội dung hư cấu, thử thách, gợi ý và đáp án nằm trong phụ lục cuối sách.' : 'The main section presents factual material and archive images. Fiction, challenges, hints and answers appear in the appendix.');
  text(vi ? 'Tài liệu này giữ lại nguồn và chú thích ảnh của sách. Các nguồn cần rà soát được ghi rõ trong danh mục tham khảo.' : 'This edition retains the book’s sources and image captions. Sources requiring review are identified in the reference list.', 10);
  nextPage(); // Reserve a contents page, filled after pagination.
  async function section(blocks: ReadingBlock[], appendix: boolean) {
    let chapter: BookChapter | undefined;
    let lastPageId = '';
    for (const block of blocks) {
      if (chapter !== block.chapter) {
        if (chapter === undefined) nextPage();
        else { y += 8; ensure(90); }
        chapter = block.chapter;
        const label = `${appendix ? (vi ? 'Phụ lục · ' : 'Appendix · ') : ''}${chapterNames[chapter]}`;
        contents.push({ title: label, page: pageNumber() });
        heading(label, 20);
        lastPageId = '';
      }
      const citations = block.sources.length ? ` [${block.sources.map(s => sourceNumbers.get(s.url)).join(', ')}]` : '';
      const previous = block.image ? publishedImages.get(`${block.image.src}:${block.image.annotation ?? ''}`) : undefined;
      const crossReference = previous ? (vi ? `Ảnh đã in ở trang ${previous}.` : `Image reproduced on page ${previous}.`) : '';
      const figures: { src: string; caption: string; alias: string; annotation?: 'hint' | 'answer' }[] = [];
      if (block.image && !previous) figures.push({
        src: block.image.src, annotation: block.image.annotation, alias: block.id,
        caption: [block.image.alt, block.image.credit, block.image.code, block.image.date].filter(Boolean).join(' · '),
      });
      let diagramUrl: string | undefined;
      try {
        if (block.diagram) {
          const svg = bookDiagramSvg(block.diagram, language);
          const viewBox = svg.match(/viewBox="([^"]+)"/)![1].split(' ').map(Number);
          const sized = svg.replace('<svg ', `<svg width="1440" height="${Math.round(1440 * viewBox[3] / viewBox[2])}" `);
          diagramUrl = URL.createObjectURL(new Blob([sized], { type: 'image/svg+xml' }));
          figures.push({ src: diagramUrl, caption: block.title, alias: `${block.id}.diagram` });
        }
        inset = 6;
        const label = appendix ? (block.kind === 'fiction' ? (vi ? 'HƯ CẤU' : 'FICTION') : (vi ? 'TRÒ CHƠI · GỢI Ý' : 'GAME · CLUE')) : '';
        const newTitle = lastPageId !== block.pageId;
        let height = 12 + textHeight(block.text + citations);
        if (label) height += textHeight(label, 8, true, 2);
        if (newTitle) height += textHeight(block.title, 14, true, 5);
        if (crossReference) height += textHeight(crossReference, 9);
        for (const figure of figures) {
          const image = await prepareImage(figure.src, figure.annotation);
          height += imageSize(image.ratio).h + 3 + textHeight(figure.caption, 8);
        }
        // Slightly reduce a figure to fill remaining space, but preserve a readable minimum.
        const overflow = y + height - bottom;
        if (figures.length === 1 && overflow > 0 && overflow <= 22) {
          const image = await prepareImage(figures[0].src, figures[0].annotation);
          const oldHeight = imageSize(image.ratio).h;
          imageMaxHeight = Math.max(50, oldHeight - overflow - .5);
          height -= oldHeight - imageSize(image.ratio).h;
        }
        // Measure before drawing: a panel must never split between two pages.
        if (height > bottom - margin) throw new Error(`PDF panel exceeds page: ${block.id}`);
        ensure(height);
        pdf.setDrawColor(81, 76, 62); pdf.setLineWidth(.45);
        pdf.setFillColor(255, 253, 247);
        pdf.roundedRect(margin, y, width, height, 2, 2, 'FD');
        const panelBottom = y + height;
        y += 6;
        if (newTitle) text(block.title, 14, true, 5);
        if (label) text(label, 8, true, 2);
        text(block.text + citations);
        if (crossReference) text(crossReference, 9);
        for (const figure of figures) {
          const figurePage = await illustration(figure.src, figure.caption, figure.alias, figure.annotation);
          if (figure.src === block.image?.src) publishedImages.set(`${figure.src}:${figure.annotation ?? ''}`, figurePage);
        }
        y = panelBottom + 5;
        lastPageId = block.pageId;
      } finally {
        inset = 0;
        imageMaxHeight = 72;
        if (diagramUrl) URL.revokeObjectURL(diagramUrl);
      }
      // Yield between blocks so the download status paints and controls stay responsive.
      await new Promise<void>(resolve => setTimeout(resolve, 0));
    }
  }
  await section(book.main, false);
  await section(book.appendix, true);
  nextPage();
  const sourceTitle = vi ? 'Nguồn tham khảo và hình ảnh' : 'References and image sources';
  contents.push({ title: sourceTitle, page: pageNumber() });
  heading(sourceTitle, 20);
  book.sources.forEach((source, i) => {
    ensure(28);
    const sourcePage = pageNumber(), sourceY = y;
    text(`[${i + 1}] ${source.url}`, 8, false, 2);
    if (sourcePage === pageNumber()) pdf.link(margin, sourceY, width, y - sourceY, { url: source.url });
    if (source.status === 'needs-review') text(vi ? 'Ghi chú: nguồn/chú thích cần được rà soát thêm.' : 'Note: source/attribution requires further review.', 8);
    if (source.note) text(source.note[language], 8);
    y += 3;
  });
  pdf.setPage(2); y = margin;
  heading(vi ? 'Mục lục' : 'Contents', 22);
  for (const entry of contents) {
    const at = y;
    text(`${entry.title}   ·   ${entry.page}`, 11, false, 5);
    pdf.link(margin, at, width, y - at, { pageNumber: entry.page });
  }
  const total = pageNumber();
  for (let i = 1; i <= total; i++) {
    pdf.setPage(i);
    pdf.setDrawColor(190, 178, 145);
    pdf.line(margin, 280, 190, 280);
    pdf.setFont('Book', 'normal'); pdf.setFontSize(8); pdf.setTextColor(105, 98, 78);
    pdf.text(title, margin, 287);
    pdf.text(`${i} / ${total}`, 190, 287, { align: 'right' });
  }
  return pdf;
}

export async function downloadBookPdf(language: Language) {
  const pdf = await createBookPdf(language);
  await pdf.save(`cuoi-sach-dong-hanh-${language}.pdf`, { returnPromise: true });
}
