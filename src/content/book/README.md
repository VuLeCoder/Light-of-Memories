# Shared companion book

`catalog.ts` inventories the 35 reachable book pages as classified, bilingual
blocks. `overview` corresponds to the browser's `null` page. Unlock logic remains
in the existing progress helpers and `JourneyMap`; it never filters this catalog.

- `types.ts`: fact/game/fiction, stable block IDs, publication section/order,
  sources, image provenance, diagrams, hidden hint/detail markers.
- `*-copy.ts`: authored text extracted from React, reused by existing components.
- Existing level content remains the source for photos and chapter text.
  Mixed paragraphs are split at explicit bilingual boundaries. Editing those
  boundaries must update the catalog; validation fails rather than silently
  assigning the wrong category.
- `getBookPage(id)` provides browser order and original wording.
- `getReadingBook('vi' | 'en')` returns all `main` factual blocks, `appendix`
  game/fiction blocks, and source metadata, in publication order. It accepts no
  progress and requires no browser/save. `readingText` overrides wording only
  where needed for an independent reading edition.
- `BookParagraph` preserves existing mixed paragraphs while attaching stable
  classification attributes to their spans. Visible labels belong to M3.

The reading edition includes the laser answer, original and cropped archive
photos, three Surveyor sketch IDs, corner/ranging diagrams, route and safe-route
variants, and the camera diagram. M4 must render every `image` and `diagram`,
including `reveal: hint/detail`; these flags describe browser visibility, not
export filters. Reused portraits/photos are published once with cross-references
rather than copied each time the browser displays them.

Sources marked `recorded` reproduce existing project provenance, not independent
fact checking. `needs-review` marks the Surveyor image attribution gap, the
Apollo 11 link currently used for Apollo 17 walkback, and the legacy citation.
Do not fabricate missing Surveyor photo codes/credits. Preserve date precision
(`1969`, `1972-12`, etc.) in PDF captions. Source/credit review is required before
publishing the M4 sample.

Run `npm run check:book` for page coverage, bilingual paragraph conservation,
classification, chronological photo ordering, local assets, source coverage,
and full export in a server environment with no DOM or save. Run `npm run build`
for TypeScript and production integration. The check uses Vite SSR to resolve
existing `BASE_URL` image references without starting an HTTP/WebSocket server.

## Nhãn trên trình duyệt (M3)

`BookParagraph` giữ nguyên nội dung và thuộc tính phân loại của từng đoạn. `BookPageLabel` đọc catalog và hiển thị một nhãn chung “Nội dung giả tưởng” ở góc trên trái cho trang có khối game hoặc fiction; trang chỉ có fact không có nhãn. Không gắn nhãn lặp lại trong nội dung. Phân loại game/fiction vẫn được giữ riêng trong dữ liệu xuất bản. `BookLabelGuide` nằm dưới section nhân vật trong cảnh, giải thích nhãn bằng `details/summary`, bao gồm ý nghĩa với trang hỗn hợp. Khung sách cuộn dọc để không cắt nội dung.

## NASA companion pages

`real-world.ts` contains bilingual factual pages inserted after their available story or challenge page. Chapter locks still apply. The two sample pages form a consecutive sequence (rock, then orange soil). Each page has explicit `above` or `wrap` art direction, an archival caption and NASA source links. The catalog includes these pages as facts in the progress-independent reading edition.

Sources consulted 2026-10-31 are recorded with each entry. New local images:
- `images/book/apollo17-route.jpg` — NASA, Apollo 17 surface traverse map, linked from *50 Years Ago: Apollo 17 Lands at Taurus-Littrow*.
- `images/book/nansen-rock.jpg` — NASA AS17-137-20901, same article.
- `images/book/orange-soil.jpg` — NASA ARES Lunar Disk 80, image EDDISK 80_Page_4_Image_0001.jpg.
- `images/book/apollo12-seismogram.png` — NASA Apollo 12 Mission Report, printed page 3-10, figure 3-8 (PDF page 19), extracted with its original axes, time scale and caption. Source: https://www.nasa.gov/wp-content/uploads/2025/11/a12-missionreport.pdf . This is a real record, not the game waveform. The report describes about 50 minutes; the historical ALSEP account describes over 55 minutes, so the companion prose says “nearly an hour”.

Other photographs reuse the project's NASA archival assets; illustrations of fictional characters are not used as photographs of real hardware.
