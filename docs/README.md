# CUỘI Project Documentation

Documentation is grouped by task to make it easier for the team to find and maintain. The [project README](../README.md) contains the introduction, team members, setup instructions, and team memories. This is the only README outside the root; do not create separate READMEs in `public/`, `src/`, or subfolders of `docs/`.

The latest rules in [AGENTS.md](../AGENTS.md) take precedence, including protection of the two PDFs and presentation of factual pages. Historical notes do not override current rules.

## Documentation by Category

### Project and Team — `project/`

- Team roles and contributions are documented in the technical report in the [shared Google Drive folder](https://drive.google.com/drive/folders/1QKIBXyY5a7Y-gi2FXehmMTYo2qvI2Mmz).
- [AI Usage](project/ai-usage.md) — tools and their roles in content, the original PDF books, visuals, code, and audio.

### Development and Maintenance — `development/`

- [Technology Stack](development/technology-stack.md).
- [Code and Documentation Structure](development/folder-structure.md).
- [Content Organization Conventions](#content-organization-conventions).
- [Companion Book and PDFs](#companion-book-and-pdfs).

### Design and Assets — `design/`

- [Image Assets](design/image-assets.md).
- [Visual Style](design/visual-style.md).
- [Audio](design/audio.md).
- [Chapter Design Guide](design/level-design-guide.md).
- [Static Assets, Provenance, and Licenses](#static-assets).
- [Scientific References](references.md) — kept directly under `docs/` to match the editorial rules.

### Five Chapter Profiles — `levels/`

- [Round Eye — Surveyor 3](levels/Game1_Surveyor_3.md).
- [Twinkle — Apollo 11](levels/Game2_Apollo_11.md).
- [Sharp Ear — Apollo 12](levels/Game3_Apollo_12.md).
- [Mesh Wheels — Apollo 15](levels/Game4_Apollo_15.md).
- [Sky Watcher — LRO](levels/Game5_LRO.md).

These profiles describe the implemented flow and data; they do not replace acceptance testing on real devices.

[Historical companion book notes](#historical-companion-book-notes) appear at the end of this document.

## Content Organization Conventions

See the [folder structure and project conventions](development/folder-structure.md) for the root, source, asset, and documentation trees. Naming rules, responsibilities, save compatibility, and the old-to-new path reference are collected there.

## Companion Book and PDFs

Module paths in this section are relative to `src/content/book/`. The current journey has five friends; the list and access conditions are in `src/content/friends/index.ts`.

### Content and Publication

- Each friend’s book content and hints are in `src/content/friends/<id>/book-copy.ts`, images in `images.ts`, and challenge content in `challenges/`. `catalog.ts` aggregates the data; do not duplicate content in components.
- `catalog.ts` combines the catalog with readings in `extended.ts`, ending pages in `ending.ts`, and restored friend data in `restored-friends.ts`.
- `kind` distinguishes `fact`, `game`, and `fiction`; `publication` independently specifies `main` or `appendix`. When placement is unspecified, `fact` defaults to the main section and `game`/`fiction` to the appendix; explicit placements retain the choices declared in the data.
- `publication.ts` maintains editorial order. `getReadingBook(language)` takes no progress argument and returns the complete content with deduplicated sources. Main/appendix rules for the reading edition do not control browser book unlocks or regenerate the two original PDFs.
- Content and captions are available in Vietnamese and English. NASA/JPL/ILRS sources remain in the data; `recorded` records provenance rather than certifying that all content has been reviewed.

### Reading Order and Unlock Conditions

`reading-order.ts` defines the browser book order. Factual articles are inserted beside related content through `insertRealWorldPages` and `insertExtendedPages`; preserve chapter unlock conditions and hint locations. The selected page ID must remain stable when players receive more photos or unlock more content.

Ending unlocks depend on `ending-progress.ts`, the `HangFinale` stage, and the number of understood cards. Acquired IDs are kept in `bookUnlocks`, supplemented when reading old saves, and retained on replay. Check the actual module logic rather than relying on retired ending phases. Both covers are always available; reading the book does not change game progress.

### Layout and Pagination

- Sharp Ear and Mesh Wheels images accompany narrative text in the body; image descriptions serve as alt text, while captions display sources, image IDs, and dates. Illustrations and diagrams precede the relevant explanation.
- Short passages use centered images; long passages may put the image on the left, with text wrapping beside and below it. Each subpage chooses its layout after images/fonts load and on resize.
- Pagination measures paragraph fragments together with images, preferring sentence boundaries and preserving formatting and classification labels. Avoid stranded images, overflow, missing content, or duplicated content.
- Short introductions use `book-prose--intro`, with centered images and text even on small screens. The friend list is centered as a whole, with a fixed star column and left-aligned names.
- Factual pages follow the “Surveyor 3 in Real Life” model: a title, a suitable captioned archival image where available, short paragraphs, and footer sources from [references.md](references.md). Pages labeled “Contains game elements” do not need displayed sources. Do not change unlock conditions or add/remove pages during a documentation update.
- Observe changes to collapsed/expanded content to recalculate pagination. The table of contents uses existing page IDs and conditions; displayed page counts depend on the measured layout.

### Opening the Original PDFs

`story-pdf.ts` selects `public/books/Truyen.pdf` (VI) or `public/books/Truyen_en.pdf` (EN) based on language and the application base URL. The “Open book PDF” button opens a new tab with `noopener noreferrer` and no download attribute. This action does not generate a PDF or read or modify progress.

The old PDF generator, diagram exporter, jsPDF library, and dedicated PDF fonts have been removed. `publication.ts` and `pdf-edition.ts` still hold editorial data and checking utilities; the web book still uses `getParagraphBlocks`. Web pagination and unlocks are independent of the fixed PDF manuscripts. Hashes and protection rules appear under [protected PDFs](#protected-original-story-pdfs).

### Checks When Editing the Book

Run `npm run typecheck` and `npm run build` when changing source code. Directly check progress, hint targets, factual page placement, reloading, replay, retained unlocks, and ending milestones. Review Vietnamese/English at desktop and mobile sizes; reading must not change the save. Check that PDFs open in a new tab in the correct language with their original bytes, including deployments under a subpath. Specialized check scripts and browser fixtures were removed on 14 November 2026.

## Static Assets

See the [public/ directory tree](development/folder-structure.md#assets-public) and [asset organization conventions](development/folder-structure.md#static-asset-conventions). Paths beginning with `fonts/`, `images/`, and `books/` in this section are relative to `public/`; provenance and license details are retained below.

### Fonts

The fonts were downloaded from Google Fonts on 14 November 2026:

- [Lora](https://github.com/google/fonts/tree/main/ofl/lora): variable weights 400–700, upright and italic, in `fonts/lora/`.
- [Be Vietnam Pro](https://github.com/google/fonts/tree/main/ofl/bevietnampro): upright weights 400, 500, 600, 700 and italic 400, in `fonts/bevietnampro/`.

Original TTF files were converted to WOFF2 using fontTools, preserving all characters and glyph shapes. Both families support Vietnamese. Each font folder contains the original SIL Open Font License in `OFL.txt`.

Fonts are declared in `src/styles/fonts.css`. Preserve the full character set when updating; a basic Latin subset would omit Vietnamese vowels and diacritics.

### Companion Book Illustrations

Assets present in `images/book/` as of 14 November 2026:

- `front-cover.svg` and `back-cover.svg`: original decorative artwork for the browser book, featuring the night sky, the Moon, and a Vietnamese star lantern. Cover text is rendered separately in Vietnamese or English.
- `reflector-array.svg`: a top-down diagram illustrating the Apollo 11 reflector’s 100 prisms, not to scale. Used in `src/content/book/real-world.ts`; scientific sources are listed in the [references](references.md).

Archival images on companion pages are reused from `images/memories/`. Sources and credits remain in the corresponding content modules. Unused archival image copies in `images/book/` were removed on 14 November 2026.

### Lunar South Pole Illumination Map

`images/memories/gac-troi/south-pole-illumination.png` is a NASA LROC illumination map compiled from observations at multiple times, downloaded at 1,000 pixels wide and kept in its original PNG format.

In Sky Watcher’s chapter, this archival image illustrates light and darkness and also appears in the ending recollection. It is a map assembled from multiple LROC images, rather than a photograph of the game model. The game’s shadow observation model does not reproduce the scientific map processing workflow.

- Credit: NASA/GSFC/Arizona State University.
- [NASA source page](https://science.nasa.gov/resource/illumination-map-of-the-moons-south-pole/).
- [Downloaded PNG image](https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/l/lunar_south_pole_lroc.png?fit=clip&w=1000).

### Protected Original Story PDFs

The two manuscripts in `books/` are fixed documents. Do not edit, regenerate, optimize, replace, rename, or delete these files:

| File | SHA-256 |
| --- | --- |
| `books/Truyen.pdf` | `856e77f59d739e0f9a6a436576612f13b46575fa5918515c7e5107e8da42cc4e` |
| `books/Truyen_en.pdf` | `045212a3497522d4badcac36b3a4cf065180fc51498073cf9a680124f46c6213` |

See the full rules in [AGENTS.md](../AGENTS.md). Companion content is adapted around these manuscripts.

## Historical Companion Book Notes

The following notes were merged from the old book README. Page counts, assets, PDF export rules, and descriptions of journeys with fewer friends reflect only the time recorded; they are not acceptance criteria for the current version. Apollo 17 below refers to historical source material, rather than the equipment in Mesh Wheels’ Apollo 15 chapter.

### Sources and Editing on 14 November 2026

The old edition inserted bilingual factual pages after the corresponding story/challenge page, using `above` or `wrap` image layouts. `useBookImageLayout` remeasured after images/fonts loaded and on resize; long pages moved images left so text could wrap beside and below them. The two sample articles appeared consecutively: rock, then orange soil.

Image provenance records at the time included:

- `images/book/apollo17-route.jpg`: NASA, Apollo 17 traverse map, from *50 Years Ago: Apollo 17 Lands at Taurus-Littrow*.
- `images/book/nansen-rock.jpg`: NASA AS17-137-20901, from the same article.
- `images/book/orange-soil.jpg`: NASA ARES Lunar Disk 80, image EDDISK 80_Page_4_Image_0001.jpg.
- `images/book/apollo12-seismogram.png`: [NASA Apollo 12 Mission Report](https://www.nasa.gov/wp-content/uploads/2025/11/a12-missionreport.pdf), printed page 3-10, figure 3-8, PDF page 19; extracted with axes, time scale, and annotations intact. The report states about 50 minutes, while ALSEP historical material states more than 55 minutes. This is real data, distinct from the illustrative graph in the game.

These paths are historical provenance records, not a list of assets still present. Other images reused the project’s NASA material; fictional character illustrations were not presented as photographs of real equipment. An earlier pass used six archival images: four newly downloaded and two reused. Unused copies were removed on 14 November 2026; see [current assets](#companion-book-illustrations).

The editing pass on 14 November 2026 removed eight duplicate pages: Surveyor tools, laser ranging, ALSEP equipment, vibration sources, impact vibrations, wheels, walk-back limits, and rover legacy. Their explanations were incorporated into the original pages, including tool/ALSEP images, wheel flexibility, life support limits, tides, and heat. NASA sources on Apollo 17 wheels and walk-back limits were retained for the web edition and catalog.

Chapter openings introduced the imaginary friend before moving to the real equipment; mirror repair instructions led to the prism page, and sample collection led to the two sample pages. The seismogram page explained three measurement directions and the time scale rather than repeating the sensor definition. Captions retained identification context. That edition once had 44 pages, followed by a three-friend journey with 26 pages; fiction and game instructions were once placed in the reading edition’s appendix.

### Review on 14 November 2026

- Retained the 26 IDs and unlock conditions in use at the time; removed three duplicate image blocks, leaving 49 bilingual blocks.
- Distinguished the Apollo 12 visit, research on returned materials, and orbital observations. Replaced a repeated reflector photograph with an original, clearly labeled top-down SVG.
- Explained the measurement method first, revealing numerical answers only on request. Mixed-content pages retained sources at that time; current source display rules follow `AGENTS.md`.
- Kept T02/T03 knowledge content when opening hints. T02 displayed both dated photos and numbered the third section; annotated answers waited until completion.
- Sky Watcher’s portrait and centered text were reserved for the introduction. The table of contents did not unlock content or change saves; expanding an answer required repagination.

The automatically generated PDF once used repeating frames, then moved to a reading edition that prioritized factual content. Those generators have been removed. Old descriptions of shared web/PDF covers, no running footer, and a back cover as the final PDF page apply only to the old generator.

### Updates on 14 November 2026

On 14 November 2026, the old README recorded 40 canonical entries, including two covers and 95 bilingual blocks, across the opening, Surveyor 3, Apollo 11, LRO, and ending. That version described two illustrated real-world stories per chapter, removal of seven fictional extended entries, and removal of per-chapter word targets. Those counts do not represent the current five-friend journey.

The front cover always opened the reading journey; entry from a chapter or hint selected a relevant page. The back cover had its own night palette and no narrative block. Both covers were always available, with newly unlocked content appearing between them. Old cover unlock IDs remained compatible but did not restrict reading the covers.

Notes dated 14 November 2026 added measurement of paragraph fragments together with images and preservation of formatting during pagination, applying to Sharp Ear/Mesh Wheels images. Some earlier notes still described progress-based PDF export; the current version only opens the two fixed manuscripts in a new tab, under the [PDF rules](#opening-the-original-pdfs).
