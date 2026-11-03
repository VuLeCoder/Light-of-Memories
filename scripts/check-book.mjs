import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
  const { bookPages, getBookBlock } = await server.ssrLoadModule('/src/content/book/catalog.ts');
  const { getReadingBook, getParagraphBlocks } = await server.ssrLoadModule('/src/content/book/publication.ts');
  const { taiThinhBook } = await server.ssrLoadModule('/src/content/levels/tai-thinh-content.ts');
  const { banBanhLuoiBook } = await server.ssrLoadModule('/src/content/levels/ban-banh-luoi-content.ts');
  const { realWorldPages, insertRealWorldPages } = await server.ssrLoadModule('/src/content/book/real-world.ts');
  const expected = ['gac-book-orbit', 'overview', 'surveyor', 'surveyor-b01', ...['arrive', 'work', 'visit'].flatMap(id => [`clue-${id}`, `photo-${id}`]), 'lap-lanh', 'sparkle-photo-0', 'sparkle-photo-1', 'sparkle-repair-clue', 'sparkle-ranging-clue', ...taiThinhBook.map(p => p.id === 'intro' ? 'tai-thinh' : `tai-book-${p.id}`), ...['pse', 'station', 'magnetometer'].map(id => `tai-photo-${id}`), ...Object.keys(banBanhLuoiBook), ...realWorldPages.map(p => p.id)];
  assert.deepEqual(bookPages.map(p => p.id).sort(), expected.sort());
  for (const p of realWorldPages) {
    assert.ok(expected.includes(p.after), p.after);
    assert.ok(p.sources.every(url => new URL(url).hostname.endsWith('.nasa.gov')), p.id);
    const paired = insertRealWorldPages([p.after]);
    assert.ok(paired.indexOf(p.id) > paired.indexOf(p.after));
    assert.deepEqual(insertRealWorldPages([p.after], () => false), [p.after]);
    assert.ok(bookPages.find(page => page.id === p.id).blocks.every(b => b.kind === 'fact'));
  }
  const blocks = bookPages.flatMap(p => p.blocks);
  assert.equal(new Set(blocks.map(b => b.id)).size, blocks.length);
  for (const p of bookPages) assert.ok(p.blocks.length, p.id);
  for (const b of blocks) {
    for (const lang of ['vi', 'en']) {
      assert.ok(b.text[lang]?.trim(), `${b.id} ${lang}`);
      if (b.readingText) assert.ok(b.readingText[lang]?.trim());
      if (b.image) assert.ok(b.image.alt[lang]?.trim());
    }
    assert.ok(b.section.startsWith(b.kind === 'fact' ? 'C' : 'A'), b.id);
    if (b.kind === 'fact') assert.ok(b.sources.length, `Missing provenance: ${b.id}`);
    if (b.image) assert.ok(existsSync(`public/${b.image.src.replace(/^\//, '')}`), b.image.src);
  }
  for (const lang of ['vi', 'en']) {
    const book = getReadingBook(lang);
    assert.equal(book.main.length + book.appendix.length, blocks.length);
    assert.ok(book.main.every(b => b.kind === 'fact'));
    assert.ok(book.appendix.every(b => b.kind !== 'fact'));
    assert.ok(book.appendix.some(b => b.id === 'sparkle-ranging-clue.answer' && b.text.includes('384')));
    assert.ok(book.main.some(b => b.id === 'ban-photo-orbit.detail' && b.image));
    assert.ok(book.appendix.some(b => b.diagram === 'route-safe'));
    assert.ok(book.main.findIndex(b => b.pageId === 'sparkle-photo-1') < book.main.findIndex(b => b.pageId === 'sparkle-photo-0'));
    for (const entry of taiThinhBook) {
      const id = entry.id === 'intro' ? 'tai-thinh' : `tai-book-${entry.id}`;
      const page = bookPages.find(p => p.id === id);
      assert.equal(getParagraphBlocks(page.blocks, entry.body[lang], lang).map(b => b.text[lang]).join(' '), entry.body[lang]);
    }
    for (const [id, entry] of Object.entries(banBanhLuoiBook)) {
      if (!entry.paragraphs) continue;
      const page = bookPages.find(p => p.id === id);
      for (const paragraph of entry.paragraphs) assert.equal(getParagraphBlocks(page.blocks, paragraph[lang], lang).map(b => b.text[lang]).join(' '), paragraph[lang]);
    }
  }
  assert.equal(getBookBlock('tai-book-rhythm.door').kind, 'fiction');
  console.log(`Book verified: ${bookPages.length} pages, ${blocks.length} blocks, VI/EN; full export without browser or save.`);
} finally {
  await server.close();
}
