# The Story of Apollo 11 — Twinkle (Chapter 2)

> Updated from source code on 14 November 2026. This document consolidates existing content using the structure of [Round Eye’s chapter](Game1_Surveyor_3.md). Twinkle is the game’s name for the Apollo 11 laser retroreflector array. Cuội, dust cleaning, and light for the lantern belong to the story; equipment facts and historical photos are sourced separately.

## 1. Facts about the Equipment

The **Apollo 11** laser retroreflector array was placed in the **Sea of Tranquility — Mare Tranquillitatis** in **1969**. It has **100 corner-cube prisms** that return light toward its source. The array needs no battery or motor to reflect light and does not emit a laser itself. [NASA/JPL — The Apollo Experiment That Keeps on Giving](https://www.jpl.nasa.gov/news/the-apollo-experiment-that-keeps-on-giving/), [ILRS — Apollo 11](https://ilrs.gsfc.nasa.gov/missions/satellite_missions/current_missions/ap11_general.html)

Observatories on Earth send laser pulses and measure their round-trip time to calculate the one-way distance. Distance varies with the orbit; **2.56 seconds and 384,000 km are rounded simulation values in the game**. [NIST — To the Moon and Back in 2.5 Seconds](https://www.nist.gov/history/moon-and-back-25-seconds)

The two memory photos are from Apollo 11: **Buzz Aldrin places the still-folded equipment on the ground**, then **Neil Armstrong unfolds and aligns it**. Historical order differs from the order in which photos are awarded in the game. [Apollo 11 Image Library](https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/images11.html), [LRRR Clevis Fasteners](https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11-LRRR_ClevisFasteners.html)

## 2. Game Context

After Round Eye, Cuội follows a glow to the Sea of Tranquility. The introduction depicts a magical journey between distant regions rather than suggesting the two locations are adjacent. The chapter unlocks after Round Eye’s first completion.

Twinkle is playful, likes riddles, and enjoys light. The character retains the form of a tilted prism array on a low stand, without added eyes, mouth, or limbs. The portrait has a hand-drawn children’s book texture; the scene uses a pixel art sprite. The background is drawn in code and is not a landing site map.

Story flow: **follow the glow → navigate around craters → meet the friend and receive a photo → clean the glass and receive a photo → align the reflection model → measure distance → tell two memories chronologically → light the second star point → follow ripples back to the journey map**.

The lantern and star counter do not permanently occupy challenge space. The lantern returns during the thanks and follows Cuội’s hand afterward. Friend order is **02**, website scene number **04**; tasks begin at T01.

## 3. Current Companion Book Content

Twinkle’s group follows Round Eye and precedes Sharp Ear. Once fully unlocked, the reader has seven entries; responsive pagination may create additional pages within an entry.

| ID | Condition | Content |
| --- | --- | --- |
| `lap-lanh` | Chapter unlocked | Introduction to the game character |
| `sparkle-photo-0` | Keepsake index 0 acquired | Folded reflector, AS11-40-5945 |
| `sparkle-photo-1` | Keepsake index 1 acquired | Deployed reflector, AS11-40-5952 |
| `sparkle-repair-clue` | Mirror alignment task condition reached | “The Secret of Mirror Angles”, reflection model |
| `sparkle-repair-clue-reality` | Alignment page available to read | “Apollo 11 Retroreflector Prisms”, facts about the real equipment |
| `sparkle-ranging-clue` | Distance measurement task condition reached | “One Greeting, Two Trips” |
| `apollo-notebook` | `completedOnce` | Summary of real events involving the Apollo 11 reflector |

The book deliberately tells photos in historical order **5945 → 5952**, unlike game award order **5952 → 5945**. Page IDs and keepsake indices remain for compatibility; book image metadata is in [sparkle-pages.ts](../../src/content/book/sparkle-pages.ts), and awarded photos in [images.ts](../../src/content/friends/lap-lanh/images.ts). `lap-lanh-reality` remains in the catalog but is filtered from the current reader.

Unlocking content does not turn the book automatically. T03/T04 hints select `sparkle-repair-clue` or `sparkle-ranging-clue`. Factual pages present facts and sources; character voice, riddles, and emotions belong to game dialogue.

## 4. Challenge Details

### T01 — Follow the Glow

Cuội finds a path around **six craters** to the bright area on the right. Move with WASD, arrows, or clicks/taps on the ground; Cuội becomes smaller farther away and larger nearby. Craters appear from the task introduction, with routes around them and padding around the destination.

Touching a crater edge stops movement and prompts a reminder from Cuội; there is no jumping or falling followed by respawning at the start. Reaching the destination switches to a scene without challenge craters, with Cuội on the left and Twinkle in the middle. Approach and press E or click the equipment to talk, then receive the first photo. [SparkleLevel.tsx](../../src/components/friends/lap-lanh/SparkleLevel.tsx), [PreviewScene.ts](../../src/game/scenes/preview-scene.ts)

### T02 — Cuội Cleans the Glass

Click/drag with a mouse, use touch, or use Tab and Enter to clean **24 dust cells**. At 100%, the button to receive the second photo unlocks. The 24 cells divide the interaction area; they are not the real prism count.

Dust cleaning is imaginary. The two historical photos are not before/after images of Cuội’s actions. The panel leaves enough room for interaction without unintended internal scrolling. [SparkleCleaning.tsx](../../src/components/friends/lap-lanh/SparkleCleaning.tsx)

### T03 — Repair the Apollo 11 Reflector

This is a **2D model**, not rotation of real prisms. Mirror 1 is fixed; players rotate mirror 2 through **0°–180°** relative to mirror 1. Drag the mirror or use the angle slider with a keyboard, then send a ray to test.

The simulation computes intersections and reflection from the current angle. Success requires the ray to hit both mirrors in order and enter a narrow receiver opening. Perpendicular mirrors reverse the outgoing direction relative to the incoming ray; **89°/91° miss the opening**. Do not replace ray-path calculations with a correct-angle check. Rotating again clears the previous test result.

The book and task share the diagram. Labels distinguish the two-face model from the real equipment’s **three mutually perpendicular prism faces**. [SparkleScience.tsx](../../src/components/friends/lap-lanh/SparkleScience.tsx), [sparkle-optics.ts](../../src/game/scenes/lap-lanh/optics.ts), [Apache Point — Retroreflector Arrays](https://www.apo.nmsu.edu/mainpage/apollo/apollolrrr/)

### T04 — How Long Does a Greeting Take?

Send a pulse from Earth and watch the timer measure **2.56 seconds for the round trip**. The menu pauses the timer. After measuring, enter numbers and select operators:

```text
300,000 × 2.56 ÷ 2 = 384,000 km
```

Both commas and periods are accepted as decimal separators. Submit with the button or Enter; missing/incorrect answers receive feedback and can be corrected. Once measured and correctly submitted, the recollection introduction starts immediately, without an extra distance confirmation step. [SparkleScience.tsx](../../src/components/friends/lap-lanh/SparkleScience.tsx), [SparkleBookClue.tsx](../../src/components/friends/lap-lanh/SparkleBookClue.tsx)

## 5. Memory Photos, Ending, and Message

| Photo and File in `public/images/memories/lap-lanh/` | Awarded | Recollection |
| --- | --- | --- |
| **AS11-40-5952** · `apollo-11-deployed-as11-40-5952.webp` · Unfolded and aligned | After the encounter, before T02 | Second |
| **AS11-40-5945** · `apollo-11-placement-as11-40-5945.webp` · Just placed, still folded | After T02 | First |

Photos include NASA attribution and archival IDs; do not infer dust quantities from brightness/darkness. Reference sources: [Image Library](https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/images11.html), [deployment notes](https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11-LRRR_ClevisFasteners.html). Illustrated portraits/sprites are not used as historical photographs.

After T04, Twinkle tells **5945 → 5952**. Each page is short and fits the frame, rather than combining all the facts and Cuội’s achievements into one passage. Back in the lunar scene, Twinkle gives thanks and lights the **second star point**. The message: even a small instrument can help people understand vast distances. [SparkleEnding.tsx](../../src/components/friends/lap-lanh/SparkleEnding.tsx)

Afterward, sideways walking keeps y/scale fixed and the lantern follows the hand. **Review Ending / Replay / Back to Journey** are available. Click the friend to approach, or walk close and press E: Twinkle thanks Cuội for visiting, then suggests looking at the **ripples on the right edge**. Reaching them returns to the journey map; the ripples hint at Sharp Ear as part of the magical storytelling. Replaying dialogue gives no additional rewards. [ending-chat.ts](../../src/content/story/ending/friend-dialogue.ts), [EndingTrail.tsx](../../src/components/shared/EndingTrail.tsx)

Replay begins at the regional transition introduction, retaining both photos and `completedOnce`; reviewing the ending retains answers and photos. Completion unlocks Sharp Ear; reviewing/replaying does not duplicate stars. The reader still accepts the old angle `repairRotation` and old phases through [progress.ts](../../src/content/friends/lap-lanh/progress.ts).

## 6. Facts and Sources

| Fact | In the Game/Book | Main Source |
| --- | --- | --- |
| Apollo 11, Sea of Tranquility, 1969 | Introduction, photos, recollection | [ILRS — Apollo 11](https://ilrs.gsfc.nasa.gov/missions/satellite_missions/current_missions/ap11_general.html) |
| 100 prisms; passive reflection | Book, dialogue, T03 | [NASA/JPL](https://www.jpl.nasa.gov/news/the-apollo-experiment-that-keeps-on-giving/), [Apache Point](https://www.apo.nmsu.edu/mainpage/apollo/apollolrrr/) |
| Aldrin places it; Armstrong unfolds/aligns it | Captions, recollection order | [Image Library](https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/images11.html), [LRRR Clevis Fasteners](https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11-LRRR_ClevisFasteners.html) |
| Round-trip time determines distance | T04, book | [NIST](https://www.nist.gov/history/moon-and-back-25-seconds) |
| Two mirrors, receiver opening, 24 dust cells, 2.56 seconds | Tasks | Game models and illustrative values |
| Cuội cleans glass, equipment talks, star point, ripples | Story | Original game fiction |

## 7. Chapter Maintenance Notes

- Dialogue: [dialogue.ts](../../src/content/friends/lap-lanh/dialogue.ts); saves: [progress.ts](../../src/content/friends/lap-lanh/progress.ts); coordination: [App.tsx](../../src/App.tsx); book: [JourneyMap.tsx](../../src/components/journey/JourneyMap.tsx).
- Background: [sparkle-scenery.ts](../../src/game/scenes/lap-lanh/scenery.ts). Portrait: `public/images/portraits/lap-lanh.webp`; single idle-frame sprite: `public/images/sprites/lap-lanh-idle.webp`.
- Use shared button styling, Hint, and focus retention under the [new chapter guide](../design/level-design-guide.md). Place chat in free space without covering equipment/lantern; narrow screens move panels below the scene.
- Earlier checks covered Vietnamese/English layouts on wide/narrow screens, short recollections, number entry, focus, and post-ending play. This is a handoff record, not testing with pupils or confirmation across all browsers.
- Ideas about finding photos in craters using the lantern, adding laser observatory photos, or LRO are not part of the current flow. Do not treat them as missing T03/T04 work.

## Current Maintenance and Verification · 14 November 2026

The journey follows Round Eye → Twinkle → Sharp Ear → Mesh Wheels → Sky Watcher. Each friend contributes one lantern point; shared saves use schema v20 and read v1–v20. Chapter unlock conditions are in [friends/index.ts](../../src/content/friends/index.ts), and book page conditions in [reading-order.ts](../../src/content/book/reading-order.ts).

Factual pages use a title, a captioned archival image where appropriate, short paragraphs, and footer sources from [references.md](../references.md). Pages labeled “Contains game elements” do not need displayed sources. The latest rules are in [AGENTS.md](../../AGENTS.md).

The two PDFs, `public/books/Truyen.pdf` and `Truyen_en.pdf`, open unchanged in a new tab and must remain intact. The companion book has its own unlock conditions and pagination; it does not need to match PDF page counts. See [companion book and PDF behavior](../README.md#companion-book-and-pdfs).

The `check:*` scripts and fixtures have been removed. `npm run typecheck`, `npm run build`, and `npm run preview` remain. This update checked source code and revised documentation; it was not a new interface acceptance test or a fresh verification of source websites.
