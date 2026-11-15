# The Story of LRO — Sky Watcher (Chapter 5)

Consolidated from the current source code, updated **14 November 2026**. Sky Watcher is the **fifth friend**, after Round Eye, Twinkle, Sharp Ear, and Mesh Wheels. This document describes implemented content, not a new chapter plan. Vietnamese/English dialogue remains in the [content module](../../src/content/friends/gac-troi/dialogue.ts).

## 1. Facts about LRO

Sky Watcher personifies the **Lunar Reconnaissance Orbiter (LRO)**, which observes the Moon from orbit. The **LROC** camera system records the surface, supporting studies of terrain and traces at explored sites. Orbital images are not close-ups: they cannot resolve every small object, and a broad Apollo 11 site image cannot establish that the laser reflector array is visible in detail.

The game’s factual content covers three activities: recognizing familiar places from above, comparing images to find changes, and studying light/shadow near the poles. T02 uses before/after images of the **17 March 2013** impact, with a new crater about **18 m** wide according to the current content. Telescopes on Earth recorded the flash; later LRO images helped locate the crater.

Cuội, the spacecraft speaking through the lantern, the map to Hằng, and the lantern’s light are fictional. Cuội remains on the ground while talking; the orbital scene is an illustration not to scale. T03’s three sunlight directions form an educational model and cannot establish that a real location is permanently shadowed.

These facts were compiled from project content and source records; this documentation pass did not independently verify the source websites.

## 2. Game Context

After Mesh Wheels, Cuội meets the friend flying overhead to find the way to Hằng. Sky Watcher introduces the orbital view, invites Cuội to revisit places already explored, then observes a new change and shadows inside a crater together.

The scene uses a lunar background with the observing spacecraft overhead; the illustrated portrait supports dialogue/book content. Do not depict Cuội standing beside the spacecraft in orbit. Visual content and accessibility labels explicitly state that Cuội is on the ground and the illustration is not to scale.

Main flow: **meet the friend → T01 match memories → summary → T02 compare images → impact story → T03 shadow watch → three-page recollection → thanks and light gift → meet Hằng**. [Chapter interface](../../src/components/friends/gac-troi/GacTroiLevel.tsx), [background scene](../../src/game/scenes/gac-troi/scenery.ts).

## 3. Current Companion Book Content

The book keeps facts and images under stable IDs. Unlocking a page does not complete a challenge or automatically change the current reading page.

| ID | Unlock Milestone | Content |
| --- | --- | --- |
| `gac-book-orbit` | Chapter unlocked | Introduction to Sky Watcher in the game |
| `gac-book-sites` | Encounter completed or corresponding reading entitlement acquired | “Four Friends, Three Regions”, T01 hint |
| `gac-book-impact` | Image comparison started or reading entitlement acquired | “A New Trace”, T02 guidance |
| `gac-book-impact.story` | T02 completed or reading entitlement acquired | “The Flash and the Crater”, factual content |
| `gac-book-light` | T03 observation task reached or corresponding reading entitlement acquired | “Light and Shadow”, incorporating the old map page |
| `lro-notebook`, `lro-notebook-mapping` | `completedOnce` | Two factual pages about LRO, LROC, and LOLA |

The four `gac-memory-*` IDs may still be saved during matching but no longer create four separate browser book pages. `gac-book-map` is a compatibility reading entitlement; its content appears in `gac-book-light` without creating an eighth entry. Do not count IDs in `bookUnlocks` as visible pages.

T01 hints open `gac-book-sites`; T02 opens the comparison page; T03 opens `gac-book-light`. Specifically, `t03-intro` after T02 still selects `gac-book-impact.story`. Definitions: [book text](../../src/content/friends/gac-troi/book-copy.ts), [progress](../../src/content/friends/gac-troi/progress.ts), [reader order](../../src/content/book/reading-order.ts).

## 4. Challenge Details

### T01 — Match Memories

Choose a friend, then the corresponding region among three orbital image areas:

| Friend | Answer | Story after Matching |
| --- | --- | --- |
| Round Eye — Surveyor 3 | Apollo 12 · Ocean of Storms | Astronauts visited in 1969 and returned the camera and other parts for study; photo of Conrad beside Surveyor 3 |
| Twinkle | Apollo 11 · Sea of Tranquility | The reflector returns laser light toward its source; annotated orbital image of the Apollo 11 site |
| Sharp Ear | Apollo 12 · Ocean of Storms | PSE belongs to ALSEP and measures vibrations |
| Mesh Wheels | Apollo 15 · Hadley–Apennine | The rover carried astronauts in 1971; tracks are seen from orbit |

Only correct pairs record `matched` and memory entitlements in the save; each pair’s story appears within the matching task. Players must finish the matched pair’s story to record `seen` before matching again. All four stories are required to reach the summary and unlock the T02 introduction. Incorrect choices do not advance progress; the model has no time condition or score penalty.

[Pairs and stories](../../src/content/friends/gac-troi/challenges/matching.ts), [interface](../../src/components/friends/gac-troi/GacTroiMatching.tsx).

### T02 — A New Spot in the Image

Two images of the same region appear side by side: **before, 12 February 2012**, and **after, 28 July 2013**. The impact date, 17 March 2013, is recorded separately from capture dates. Players compare three numbered regions and choose the one with the new spot; the answer is **region 2**.

Answer buttons unlock only when both images are ready. Hover/focus highlights the corresponding region without recording an answer. Incorrect choices prompt another look at the middle region; a correct answer switches once to the marked after-image and four explanatory dialogue turns. Only finishing them records `t02Done` and unlocks T03. Players do not have to click a tiny precise point on the image.

Images: `impact2013-before.webp`, `impact2013-after.webp`; source NASA SVS 4242. [Data](../../src/content/friends/gac-troi/challenges/impact.ts), [interface](../../src/components/friends/gac-troi/GacTroiImpact.tsx).

### T03 — Keeping Watch over the Dark Region

The current task is a **crater cross-section with a sunlight direction slider**, not walking to light three lamps or selecting route branches. Players move sunlight through three directions, observe the **Left Ledge / Deep Floor / Right Ledge**, then select the region that stays dark in all three directions and press **Record in the Watch Log**.

The log stores observed directions. A region cannot be selected until all three have been observed; recording requires a selection. The answer is **Deep Floor**. Selecting a ledge returns sunlight to a direction that illuminates that ledge for review. Incorrect answers can be corrected without losing observed directions.

A correct entry sets `shadowWatch.recorded`, retains all three `routeLandmarks` for progress compatibility, unlocks `gac-book-map`, then enables **Continue** to the recollection. Saved landmark IDs do not mean players have just performed the old route-finding task.

The illustration shows crater walls obscuring the solar disk and rays stopping at terrain; this is a diagram, not an illumination simulation of a real crater. The recollection explains that scientific conclusions require multiple images and terrain data. [Interface and model](../../src/components/friends/gac-troi/GacRestLight.tsx), [feedback](../../src/content/friends/gac-troi/challenges/shadow-watch.ts).

## 5. Ending, Rewards, and Message

After thanks for the watch, Sky Watcher tells three pages:

1. **Familiar Places from Above:** annotated Apollo 12/Surveyor 3 site image; notes the limits of resolving small objects.
2. **The Moon Keeps Changing:** post-impact image; connects the flash observed from Earth with the crater located in images.
3. **A Watch over the Dark Region:** south pole illumination map from multiple LROC images; distinguishes model observations from scientific conclusions.

Previous/Next Page controls, captions, and credits are available; image errors offer retry. After the final page, the farewell resumes and Sky Watcher sends light into the lantern. Only completing the farewell records `farewellDone` and `completedOnce`.

The current journey has five friends, each contributing one point: **Round Eye × 1 + Twinkle × 1 + Sharp Ear × 1 + Mesh Wheels × 1 + Sky Watcher × 1 = 5/5**. Sky Watcher lights the fifth point; `App.tsx` calculates the star count from friends with `completedOnce`.

In `App.tsx`, the first farewell triggers the starlight transition, then opens the meeting with Hằng and saves `hangArrival`. The continuing finale includes conversation under the banyan tree, the “Friend or Trash?” mini game, returning to An and Grandma, team introductions, and the journey map. This is the shared story ending; Sky Watcher chapter completion and whole-story completion have separate save flags.

Sky Watcher’s post-ending interface still offers **Review Ending / Replay / Back to Journey**. Reviewing resets the phase to recollection rather than using an independent review cursor. Replay creates a new attempt while retaining `hangArrival`, chapter/story completion entitlements, and unlocked book entries; stars are not duplicated. T04 code for finding the slope, rock crevice, and banyan tree remains, but its presence does not describe the current automatic flow.

Message: looking carefully and comparing can reveal stories in small traces; distant views are useful but always have limits.

[Recollection](../../src/components/friends/gac-troi/GacTroiEnding.tsx), [three-page content](../../src/content/friends/gac-troi/ending-copy.ts), [coordination](../../src/App.tsx), [shared finale](../../src/components/ending/HangFinale.tsx).

## 6. Facts and Sources

The links below come from the project’s content records.

| Fact / Material | In the Game | Source |
| --- | --- | --- |
| LRO and its instruments | Introduction, orbit book page | [NASA — Spacecraft and Instruments](https://science.nasa.gov/mission/lro/spacecraft-and-instruments/) |
| Apollo 11 site from orbit | T01, Twinkle memory | [NASA — Apollo 11 Landing Site](https://science.nasa.gov/resource/apollo-11-landing-site/) |
| Apollo 12 and Surveyor 3 from orbit | T01, recollection | [NASA — First Look](https://science.nasa.gov/photojournal/first-look-apollo-12-and-surveyor-3/) |
| Conrad beside Surveyor 3, AS12-48-7134 | Round Eye story | [NASA — Apollo 12 and Surveyor 3](https://science.nasa.gov/resource/apollo-12-and-surveyor-3/) |
| 2013 impact image pair | T02 | [NASA SVS 4242](https://svs.gsfc.nasa.gov/4242/) |
| Terrain/illumination references | T03 diagram and recollection | [LRO sources in references.md](../references.md) |
| Apollo 15 site from orbit | Mesh Wheels pair in T01 | [LROC — Apollo 15](https://lroc.im-ldi.com/images/491) |
| Three sunlight directions, three selectable regions, fixed answer | T03 task | Educational model in the source code |
| Talking through the lantern, light gift, map to Hằng | Story | Original game fiction |

Runtime images are in `public/images/memories/gac-troi/`; the portrait is in `public/images/portraits/gac-troi.webp`. Image metadata includes Vietnamese/English alt text, credits, and source pages in [images.ts](../../src/content/friends/gac-troi/images.ts). The third recollection image uses `south-pole-illumination.png`.

## 7. Chapter Maintenance Notes

- Content is organized under `src/content/friends/gac-troi/`; keep Vietnamese/English dialogue in source modules rather than creating a second dialogue copy in Markdown.
- Chapter saves use `revision: 4` within shared schema v20; the reader validates T01, T02, T03, and later prerequisites in order while accepting old data. `legacyMatchingComplete` supports older journey saves without automatically creating new matches. For incomplete chapters with missing friends, the reader may return to matching; replay uses all four friends. `shadowWatch` retains viewed directions, position, and log result.
- `t03-walk`, `t03-dark-intro`, route branch data, and T04 remain for compatibility/history; the task launched from the T03 introduction now goes directly to `t03-map` and the watch diagram.
- When editing the ending, check [flow.ts](../../src/content/friends/gac-troi/flow.ts), [progress.ts](../../src/content/friends/gac-troi/progress.ts), and `App.tsx`; reading only the reducer misses the automatic Hằng encounter.
- This update only read code and wrote documentation; it did not rerun the game, test the interface, or verify online material. Do not treat it as a new test record.

## Current Maintenance and Verification · 14 November 2026

The journey follows Round Eye → Twinkle → Sharp Ear → Mesh Wheels → Sky Watcher. Each friend contributes one lantern point; shared saves use schema v20 and read v1–v20. Chapter unlock conditions are in [friends/index.ts](../../src/content/friends/index.ts), and book page conditions in [reading-order.ts](../../src/content/book/reading-order.ts).

Factual pages use a title, a captioned archival image where appropriate, short paragraphs, and footer sources from [references.md](../references.md). Pages labeled “Contains game elements” do not need displayed sources. The latest rules are in [AGENTS.md](../../AGENTS.md).

The two PDFs, `public/books/Truyen.pdf` and `Truyen_en.pdf`, open unchanged in a new tab and must remain intact. The companion book has its own unlock conditions and pagination; it does not need to match PDF page counts. See [companion book and PDF behavior](../README.md#companion-book-and-pdfs).

The `check:*` scripts and fixtures have been removed. `npm run typecheck`, `npm run build`, and `npm run preview` remain. This update checked source code and revised documentation; it was not a new interface acceptance test or a fresh verification of source websites.
