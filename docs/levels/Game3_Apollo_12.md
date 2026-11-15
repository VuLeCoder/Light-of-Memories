# The Story of Apollo 12 — Sharp Ear (Chapter 3)

> Updated from source code on 14 November 2026. This consolidated document replaces the M0–M8 plans and handoffs, following [Round Eye’s chapter](Game1_Surveyor_3.md). Sharp Ear is the game’s name for Apollo 12’s PSE seismometer. Cuội, speech, mixed-up annotation cards, memory rhythms, and the star point belong to the story; history and models are distinguished below.

## 1. Facts about the Equipment

**PSE — Passive Seismic Experiment** was the seismic experiment in **Apollo 12’s ALSEP**, deployed in the **Ocean of Storms — Oceanus Procellarum** on **19 November 1969**. PSE measured tiny ground movements rather than listening with ears. The **central station**, which received commands/transmitted data, and the **three-boom magnetometer** were separate instruments. [Apollo 12 Image Library](https://apollojournals.org/alsj/a12/images12.html), [NASA — Moonquakes](https://science.nasa.gov/moon/moonquakes/)

On **20 November 1969**, after the astronauts had left it, Apollo 12’s ascent stage was deliberately crashed into the Moon. ALSEP historical material describes the signal growing stronger until about **7–8 minutes**, then decaying slowly and remaining detectable for **more than 55 minutes**. “Ringing” is a metaphor for ground vibrations, not a bell sound traveling through a vacuum. [NASA — Lunar Artifact Impacts](https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_artifact_impacts.html), [Hamish Lindsay’s ALSEP material hosted by NASA](https://www.nasa.gov/wp-content/uploads/static/history/alsj/HamishALSEP.html)

**Duration limits:** the ALSEP account says “more than 55 minutes”, while Mission Report section 3.1.2 gives about 50 minutes. The game retains the answer from its selected historical source; 55 minutes is not an exact threshold for all vibrations or a measurement obtained from the illustrative graph. Long-lasting waves are explained through scattering in rock and slow energy decay, not as evidence that the Moon is hollow. [Apollo 12 Mission Report](https://www.nasa.gov/wp-content/uploads/2025/11/a12-missionreport.pdf), [Dainty et al., 1974 — NASA NTRS](https://ntrs.nasa.gov/citations/19740042883)

On **2 December 1969**, a series of equal-amplitude pulses was suspected to involve the analog-to-digital converter or reference voltage. This underlies T02’s noise example; it does not mean every square wave indicates faulty equipment. [Mission Report, section 3.1.2, printed page 3-6 / PDF page 15](https://www.nasa.gov/wp-content/uploads/2025/11/a12-missionreport.pdf)

ALSEP operations ended on **30 September 1977**; Apollo data remain archived on Earth for research. This milestone is narrated after the 1969 deployment photos. [ALSEP material](https://www.nasa.gov/wp-content/uploads/static/history/alsj/HamishALSEP.html), [NASA PDS — Apollo](https://pds-geosciences.wustl.edu/missions/apollo/index.htm)

## 2. Game Context

Sharp Ear is calm, meticulous, slightly shy, and fond of listening. Cuội helps reorganize imaginary annotation cards and retell memories; he does not repair or restore real NASA data.

The chapter opens after Twinkle’s first completion flag. Friend order is **03**, website scene **05**, with **T01–T04 required**, **three photos**, and one new star point at the end. There are no friend-card or skill rewards.

Story flow: **leave the Sea of Tranquility → follow vibration ripples to ALSEP → identify PSE → receive photo A → classify records → receive photo B → select a graph and duration → choose the matching rhythm → receive photo C → recollect A/B/C → thanks and third point lit → wheel tracks lead back to the journey map**.

The chapter starts with only a regional transition introduction; no Apollo 11 → Apollo 12 diagram covers the scene. A correct T04 answer goes straight to photo C dialogue, without a separate scene announcing that a memory door opened.

The scene has gray mare terrain, black sky, small rocks, shallow craters, and consistent shadows. PSE has a low body and silver cover; the central station and magnetometer are separate. Distances and shapes are stylized for play rather than as a survey map. For actual coordinates, [NASA — Apollo Landing Site Coordinates](https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html) distinguishes ALSEP at approximately 3.0098° south, 23.4249° west from the lander.

Cuội walks sideways during approach and after the ending using A/D, arrows, or ground taps; approach and press E or click the equipment. Chat, tasks, photo awards, and recollection lock walking. The lantern reappears during thanks and follows the hand while walking. Narrow screens put text/panels below the scene rather than squeezing tiny text into the canvas.

## 3. Current Companion Book Content

Sharp Ear’s group follows Twinkle and precedes Mesh Wheels, and is readable only when chapter access is allowed. There are 12 entries when fully unlocked; page count depends on pagination and is not the PDF page count.

| ID | Condition | Current Content |
| --- | --- | --- |
| `tai-thinh` | Chapter unlocked | “Sharp Ear — The Friend Who Loves Listening”, game introduction |
| `tai-book-devices` | Identified, a photo acquired, or completed | “Apollo 12 · ALSEP” |
| `tai-photo-pse` | Photo A saved | “Apollo 12 PSE · Thermal Cover” |
| `tai-book-sensor` | Photo A acquired | “Listening through Measurement” |
| `tai-book-sources` | Photo A acquired | “Where Do Vibrations Come From?”, classification hint |
| `tai-book-noise` | Photo A acquired | “When Equipment Needs Checking” |
| `tai-photo-station` | Photo B saved | “Apollo 12 · PSE and the ALSEP Central Station” |
| `tai-book-impact` | Photo B acquired | “A Deliberate Impact” |
| `tai-book-ringing` | Photo B acquired | “Reading Waves and Time”, task hint |
| `tai-book-rhythm` | Duration answered correctly or completed | “Counting Beats and Rests” |
| `tai-photo-magnetometer` | Photo C saved | “Apollo 12 · LSM Magnetometer” |
| `tai-book-legacy` | Farewell reached or completed | “Apollo 12 PSE · The True Story” |

Conditions are in [progress.ts](../../src/content/friends/tai-thinh/progress.ts), with separate book text and captions in [book-copy.ts](../../src/content/friends/tai-thinh/book-copy.ts). Sources and fact/game labels are assembled in [restored-friends.ts](../../src/content/book/restored-friends.ts).

Hints from book coordination: identification/arrival selects the overview (`null`); classification opens `tai-book-sources`; graph/duration opens `tai-book-ringing`; rhythm opens `tai-book-rhythm`; other phases open `tai-thinh`. Unlocking does not turn the book automatically.

## 4. Challenge Details

### T01 — Identify the Equipment

Observe three instruments, select one to view its purpose, then press **Choose This Instrument**. Viewing is not submission. The answer is **PSE / instrument A**; the tall antenna station receives/transmits data, while the three-boom instrument measures the magnetic field.

Incorrect choices receive feedback without a score penalty. A correct answer opens the introduction and photo A; only saving the photo records it in the book. The panel fits its content without a large gap below the button. [TaiThinhChallenges.tsx](../../src/components/friends/tai-thinh/TaiThinhChallenges.tsx)

### T02 — Classify Records

Select a record, read its note, then choose a label; dragging is not required.

| Record | Correct Label |
| --- | --- |
| `inside` — clues to an internal source | `moonquake` — Moonquake |
| `impact` — clues to an object striking from outside | `meteoroid` — Meteoroid impact |
| `electronics` — signs suspected to involve electronics | `noise` — Noise requiring investigation |

Correct pairs remain after mistakes or reloading. Completing all three leads to Sharp Ear’s dialogue and photo B. Waves are synthesized illustrations, not three NASA datasets; classification requires context rather than waveform shape alone. [TaiThinhChallenges.tsx](../../src/components/friends/tai-thinh/TaiThinhChallenges.tsx)

### T03 — Why Did the Moon Ring?

Compare two graphs on the same **0–60 minute** axis. Graph **B** rises until about 7–8 minutes, then decays slowly, with a trace beyond minute 55; A fades quickly. There is an impact marker at 0 and an illustration/time-lapse note; these are not described as raw data.

Choose B, then **More than 55 Minutes** from three answers: a few seconds / more than 55 minutes / many days. An incorrect duration preserves the graph answer. Completing both steps leads to the scattering explanation and T04. `afterRinging` dialogue explicitly states that some sources give more than 55 minutes and others about 50 minutes; the game answer must not become a single exact duration. [TaiThinhTremors.tsx](../../src/components/friends/tai-thinh/TaiThinhTremors.tsx)

### T04 — A Rhythm Sequence Unlocks Memories

This required task uses observation and comparison rather than fast reflexes or enabled sound.

| Sequence | Beat Times (ms) | Pattern |
| --- | --- | --- |
| Reference | 0 / 500 / 1800 | Two close beats, a long rest, then another beat |
| A | 0 / 900 / 1800 | Three evenly spaced beats |
| **B** | **0 / 500 / 1800** | **Matches the reference** |
| C | 0 / 1800 | Two beats |

Static markers, text descriptions, and lights represent the same data; pulses last 220 ms and playback lasts 2,500 ms. Unlimited replay is allowed, with only one sequence playing at a time. Viewing the reference does not submit an answer; separate selection buttons allow choosing from the static diagram.

The menu pauses the clock and resumes at the same point; reloading returns to the idle playback state. Incorrect answers preserve T01–T03, while a correct answer saves `rhythmCorrect` and moves to `afterRhythm`; no star is awarded at T04. [TaiThinhRhythms.tsx](../../src/components/friends/tai-thinh/TaiThinhRhythms.tsx)

## 5. Memory Photos, Ending, and Message

All three photos were **taken by Alan Bean on 19 November 1969**, credited **NASA · Alan Bean**, from the [Apollo 12 Image Library, magazine 47](https://apollojournals.org/alsj/a12/images12.html). Do not substitute composites/anaglyphs for single images.

| ID / Reference / File in `public/images/memories/tai-thinh/` | Subject | Award / Recollection |
| --- | --- | --- |
| `pse` · **AS12-47-6916** · `apollo-12-as12-47-6916.webp` | PSE and thermal cover | After T01 / first |
| `station` · **AS12-47-6918** · `apollo-12-as12-47-6918.webp` | PSE in front, central station behind, during deployment | After T02 / second |
| `magnetometer` · **AS12-47-6921** · `apollo-12-as12-47-6921.webp` | Magnetometer in front; Pete Conrad installing the antenna behind | After T04 / third |

Original images: [6916](https://apollojournals.org/alsj/a12/AS12-47-6916HR.jpg), [6918](https://apollojournals.org/alsj/a12/AS12-47-6918HR.jpg), [6921](https://apollojournals.org/alsj/a12/AS12-47-6921HR.jpg). GET 117:30:24 for 6916/6918 and 117:40:50 for 6921 are activity references in the annotations, not capture times accurate to the second. Do not describe photo B as showing the completed antenna installation.

WebP versions are at most 1280 px, quality 90, retaining the full frame without generated detail or repainting. They include titles, captions, IDs, sources, alt text, error states, and retry. Network errors do not block saving; images can be retried in the book. Only saving adds an ID, without duplicates. [TaiThinhPhoto.tsx](../../src/components/friends/tai-thinh/TaiThinhPhoto.tsx)

Photo C replaced candidate PIA12903 because equipment detail in the orbital image was difficult to read in the game frame; PIA12903 is not part of the awarded set. Do not use image publication dates as event dates.

The **A → B → C** recollection has Previous/Next Page controls. Only after C does it describe the next day’s impact; only after returning beside Sharp Ear does it mention 1977. Sharp Ear thanks Cuội for listening; light travels from PSE to the lantern over about 1.4 seconds, and only on arrival is completion saved and the **third point** lit, preserving the previous two. Reduced motion skips the flight path; the menu pauses the effect. [TaiThinhEnding.tsx](../../src/components/friends/tai-thinh/TaiThinhEnding.tsx)

Afterward, **Review Ending / Replay / Back to Journey** are available and Cuội can walk sideways. Click the friend or approach and press E to hear thanks and a hint toward **two parallel wheel tracks at the right edge**. Following them returns to the journey map rather than entering chapter 4 automatically. These are magical clues pointing to Mesh Wheels at Hadley–Apennine; they do not imply that Apollo 15’s rover drove at Apollo 12’s landing site. Replaying chat does not change stars/photos. [ending-chat.ts](../../src/content/story/ending/friend-dialogue.ts), [EndingTrail.tsx](../../src/components/shared/EndingTrail.tsx)

Message: tiny measurements can help people understand a distant world; even work that has ended leaves data and stories worth remembering.

## 6. Facts and Sources

| Fact | In the Game/Book | Main Source |
| --- | --- | --- |
| PSE, central station, magnetometer; deployment on 19 November 1969 | T01, book, three photos | [Apollo 12 Image Library](https://apollojournals.org/alsj/a12/images12.html) |
| Internal vibrations and impacts | T02, vibration source page | [NASA — Moonquakes](https://science.nasa.gov/moon/moonquakes/) |
| Suspected electronic noise on 2 December 1969 | T02, noise page | [Mission Report, section 3.1.2](https://www.nasa.gov/wp-content/uploads/2025/11/a12-missionreport.pdf) |
| Ascent stage impact on 20 November 1969 | T03, recollection after photo C | [NASA — Lunar Artifact Impacts](https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_artifact_impacts.html) |
| Peak around 7–8 minutes; account of more than 55 minutes; ALSEP shutdown in 1977 | T03, book, thanks | [ALSEP material](https://www.nasa.gov/wp-content/uploads/static/history/alsj/HamishALSEP.html); see duration differences in section 1 |
| Scattering and weak attenuation | Explanation after T03 | [Dainty et al. — NASA NTRS](https://ntrs.nasa.gov/citations/19740042883) |
| Apollo data remain archived | Final page, ending | [NASA PDS](https://pds-geosciences.wustl.edu/missions/apollo/index.htm) |
| Mixed cards, drawn waves, stone rhythms, lantern, guiding markers | Tasks and story | Game fiction/models, not real PSE capabilities |

## 7. Progress, Assets, and Handoff

### State Flow

```text
route → approach → arrival → identify → meeting → photoA
→ recordsIntro → records → afterRecords → photoB
→ ringingIntro → graph → duration → afterRinging → rhythmIntro → rhythm
→ afterRhythm → photoC → afterPhotoC → memoriesIntro
→ recallA → recallB → recallC → farewell → gift → finished
```

Incorrect steps keep the current task. The two `afterRhythm` lines are split before photo C and after saving it (`afterPhotoC`), so Cuội only says all three photos are collected once they have been saved.

The `cuoi.progress` save described here is **v5**, reading v1–v4. Keep phase, dialogue, and photo IDs stable. Main fields: `phase`, `turn`, `identified`, `matches`, `graphCorrect`, `durationCorrect`, `rhythmCorrect`, `keepsakes`, `recallIndex`, `completedOnce`. The reader validates prerequisites and returns to missing tasks; old phase `door` becomes `afterRhythm` when results are sufficient.

Saving a photo and changing stages happen in the same update. Effect time, focus, hover, and movement targets are not saved. Reloading `gift:0` safely replays the light gift; `gift:1` is retained only with valid completion. Reviewing the ending returns to `memoriesIntro`, preserving answers/photos/stars; replay returns to `route`, clears this attempt’s answers, and retains all three photos and completion. Returning to the journey map preserves the stage without duplicating stars.

### Source Code and Visual Identity

| File | Role |
| --- | --- |
| [tai-thinh-content.ts](../../src/content/friends/tai-thinh/dialogue.ts) | Vietnamese/English dialogue, equipment, tasks, and photos; separate book text/sources in `book-copy.ts` |
| [tai-thinh-progress.ts](../../src/content/friends/tai-thinh/progress.ts) | Reader, flow, unlocked pages, replay |
| [TaiThinhLevel.tsx](../../src/components/friends/tai-thinh/TaiThinhLevel.tsx) | Combines dialogue, challenges, photos, and ending |
| [tai-thinh-layout.ts](../../src/game/scenes/tai-thinh/layout.ts), [tai-thinh-scenery.ts](../../src/game/scenes/tai-thinh/scenery.ts) | Shared positions and code-drawn background/equipment |
| [App.tsx](../../src/App.tsx), [JourneyMap.tsx](../../src/components/journey/JourneyMap.tsx), [progress.ts](../../src/state/progress.ts) | Integration, unlocks, book, and saving |
| [tai-thinh.css](../../src/components/friends/tai-thinh/tai-thinh.css) | Chapter layout, narrow panels, and recollection |

Canvas 960 × 540, Cuội foot anchor y=431, scale 0.62; PSE at (610,431), station (470,332), magnetometer (821,402). These coordinates serve game design. The static background is cached with WebGL recovery; equipment and ripples are separate layers.

Portrait: `public/images/portraits/tai-thinh.webp`, 1024 × 683 RGBA, WebP quality 92. Created with image_gen from the PSE shape in 6916 and Twinkle’s illustration texture: low silver cylinder, dark top, spread silver cover, small cable, upper-right lighting, transparent background; no added face/ears/limbs, mirror array, or station. The in-scene equipment is drawn in code, not an enlarged portrait used as a sprite.

The old M0–M1 design preview (`src/design/tai-thinh-preview.tsx` and accompanying CSS) was removed after chapter integration; `/design/tai-thinh.html` no longer exists. Use the main chapter as the layout and interaction reference.

## Current Maintenance and Verification · 14 November 2026

The journey follows Round Eye → Twinkle → Sharp Ear → Mesh Wheels → Sky Watcher. Each friend contributes one lantern point; shared saves use schema v20 and read v1–v20. Chapter unlock conditions are in [friends/index.ts](../../src/content/friends/index.ts), and book page conditions in [reading-order.ts](../../src/content/book/reading-order.ts).

Factual pages use a title, a captioned archival image where appropriate, short paragraphs, and footer sources from [references.md](../references.md). Pages labeled “Contains game elements” do not need displayed sources. The latest rules are in [AGENTS.md](../../AGENTS.md).

The two PDFs, `public/books/Truyen.pdf` and `Truyen_en.pdf`, open unchanged in a new tab and must remain intact. The companion book has its own unlock conditions and pagination; it does not need to match PDF page counts. See [companion book and PDF behavior](../README.md#companion-book-and-pdfs).

The `check:*` scripts and fixtures have been removed. `npm run typecheck`, `npm run build`, and `npm run preview` remain. This update checked source code and revised documentation; it was not a new interface acceptance test or a fresh verification of source websites.
