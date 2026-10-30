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
