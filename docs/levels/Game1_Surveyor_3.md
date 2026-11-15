# The Story of Surveyor 3 — Round Eye (Chapter 1)

> Updated from source code on 14 November 2026. This document describes **content currently in the source code**, cross-referenced with NASA/JPL material. “Round Eye” is the game’s name for Surveyor 3. Cuội, dialogue, talking memories, digging up photos, and the star lantern’s light are fictional; historical milestones are recorded separately below.

## 1. Facts about Surveyor 3

Surveyor 3 is NASA’s **uncrewed robotic lander**. It launched on **17 April 1967**, landed in **Oceanus Procellarum (the Ocean of Storms)** on **20 April 1967 UT/UTC**, and made its final contact on **4 May 1967**. According to NASA Science’s mission record, it was the second Surveyor to achieve a successful soft landing; it bounced twice before coming to rest. [NASA Science — Surveyor 3](https://science.nasa.gov/mission/surveyor-3/)

The spacecraft carried a **television camera** and an **arm/scoop surface sampler**. The camera returned **6,326 images**; the sampler dug trenches, tested the soil’s load-bearing strength, and manipulated lunar surface material. These tests helped scientists assess whether the surveyed area could support an Apollo lander; they do not establish that every part of the Moon is the same. [NASA Science — Surveyor 3](https://science.nasa.gov/mission/surveyor-3/), [NASA/JPL — Surveyor 3](https://www.jpl.nasa.gov/missions/surveyor-3/)

Surveyor 3 rests on the **inner slope of Surveyor Crater**. In **November 1969**, Apollo 12 astronauts **Pete (Charles) Conrad and Alan Bean** visited the inactive spacecraft. They photographed it and the trenches and footpad marks still visible in the soil, then returned its **camera, scoop head, and several other components** to Earth to study the effects of time on the Moon. The rest of the spacecraft remains there. [NASA — 50 Years Ago: Apollo 12 on the Moon](https://www.nasa.gov/history/50-years-ago-apollo-12-on-the-moon-whoopee/), [NASA — Apollo 12: The Pinpoint Mission](https://www.nasa.gov/missions/apollo/apollo-12-the-pinpoint-mission/)

**Date note:** NASA Science’s mission record gives the landing date as **20 April 1967 UT**, while [one NASA image caption](https://science.nasa.gov/resource/view-of-surveyor-iii-in-its-crater/) gives 19 April 1967. Some game narration and captions use **April 1967**; the factual summary currently uses **20 April 1967**, following NASA Science. A month-only reference is not the capture date of every image. For the Apollo 12 visit, the game uses **November 1969**; NASA sources also differ in how they date lunar surface activities. [NASA Science — Surveyor 3](https://science.nasa.gov/mission/surveyor-3/)

## 2. Game Context

Cuội is searching for Hằng. After the opening under the Banyan Tree, he receives a star lantern, follows footprints, and sees the journey map with five friends. The first is **Surveyor 3 — Round Eye**. Cuội approaches the spacecraft on the Moon and talks: Round Eye has not met Hằng but asks Cuội to help recall three photos of its journey. This content is in the [chapter 1 definition](../../src/content/friends/surveyor/definition.ts), [encounter dialogue](../../src/content/friends/surveyor/dialogue.ts), and [game flow](../../src/App.tsx).

Both the encounter and ending use **Surveyor Crater** as their setting: black sky, gray dust, a low crater rim, and the spacecraft on the inner slope. This is a side-view illustration arranged for Cuội to walk around, **not a coordinate map or a photograph of current conditions**. The spacecraft in the present-day scene lacks its camera and scoop head because Apollo 12 returned them; T01 depicts **a memory of the spacecraft with its tools intact**. Sources: [NASA — View of Surveyor III in Its Crater](https://science.nasa.gov/resource/view-of-surveyor-iii-in-its-crater/), [NASA — Apollo 12 on the Moon](https://www.nasa.gov/history/50-years-ago-apollo-12-on-the-moon-whoopee/). Rendering is in [surveyor-scenery.ts](../../src/game/scenes/surveyor/scenery.ts).

Chapter 1’s story flow: **meet Round Eye → recognize two tools → receive a “memory scoop” → find three photos → arrange them into a journal → hear Round Eye’s story → light one lantern point → see a distant glow leading back to the journey map**. The glow hints at the next friend without revealing its identity. The glowing lantern and memory tool are story magic, not real Surveyor 3 operations.

## 3. Current Companion Book Content

The book sits beside the game; the number of displayed pages may vary with frame size. Entries are selected by ID rather than saved page number. Content comes from [catalog.ts](../../src/content/book/catalog.ts), [real-world.ts](../../src/content/book/real-world.ts), and [extended.ts](../../src/content/book/extended.ts).

| ID | Availability | Content |
| --- | --- | --- |
| `surveyor` | First chapter entry in the journey | Chapter introduction and how to use the notebook |
| `surveyor-reality` | Round Eye has been met according to progress | “Surveyor 3 in Real Life”, archival image, facts, and sources |
| `surveyor-b01` | Both T01 tools matched | “Eyes and a Scoop” |
| `clue-arrive`, `clue-work`, `clue-visit` | Both tools matched; hint content unlocks sequentially | Three traces for finding photos |
| `surveyor-photos` | All three photos found | “Three Milestones of Surveyor 3” album |
| `surveyor-notebook`, `surveyor-notebook-visit` | `completedOnce` | Two pages recounting Surveyor 3’s history and the Apollo 12 visit |

Players may dig up photos in any order and are not required to open the book. The three hints become accessible sequentially: remember the previous hint or find its corresponding photo to continue. Marker locations, sketches, and digging for photos are game design choices.

`photo-arrive`, `photo-work`, and `photo-visit` remain in the editorial catalog but are not separate entries in the browser book order. The browser uses the `surveyor-photos` album; do not describe the three separate pages or a “Completed Journal” as currently displayed entries.

## 4. Challenge Details

### T01 — Discover Round Eye

Players view Surveyor 3 **in a memory of its working days**, choose “Take Photos” or “Study the Soil”, then click the correct **camera** or **survey scoop** region. Clicking a tool alone provides a hint; incorrect matches can be retried while correct matches remain. Matching both purposes unlocks B01 and leads to T02. This equipment identification task uses the spacecraft’s two real tools. [T01 implementation](../../src/components/friends/surveyor/SurveyorLevel.tsx), [NASA Science — Surveyor 3 equipment](https://science.nasa.gov/mission/surveyor-3/)

### T02 — Dig for Three Memory Photos

Round Eye explains that the **real scoop was returned to Earth**, then gives Cuội a **memory scoop**. Cuội moves left/right and near/far with WASD, arrow keys, or a selected point on the ground; character size changes to suggest depth. Press **E** to dig anywhere. Away from a trace, the game reports that no photo was found. Near the correct trace, a digging animation is followed by a **NASA photo, title, and description**, then the player continues searching. Photos can be found in **any order**. “Hint” opens the book when needed. [Digging implementation](../../src/components/friends/surveyor/SurveyorExcavation.tsx), [three trace definitions](../../src/content/friends/surveyor/challenges/excavation.ts), [movement scene](../../src/game/scenes/preview-scene.ts)

| In-Game Trace | Memory Photo and Learning Point | Source Material |
| --- | --- | --- |
| **Round Eye’s footpad mark** in the near foreground | Surveyor 3’s footpad left a mark after landing in **1967**. The in-game photo is cropped from material **taken by Surveyor 3 in 1967**. | [NASA SP-284 — *Analysis of Surveyor 3 Material and Photographs Returned by Apollo 12*](https://ntrs.nasa.gov/citations/19720019081), [NASA Science — landing](https://science.nasa.gov/mission/surveyor-3/) |
| **Small soil trenches** farther to the right | Surveyor 3’s scoop dug trenches in **1967**; an archival photo **taken by Apollo 12 in 1969** shows that they remained. | [NASA SP-284](https://ntrs.nasa.gov/citations/19720019081), [NASA — trenches still visible during the Apollo 12 visit](https://www.nasa.gov/history/50-years-ago-apollo-12-on-the-moon-whoopee/) |
| **Footprints** far to the left | Two Apollo 12 astronauts visited Surveyor 3 in **November 1969**; the game image shows **Pete Conrad beside the spacecraft**, photographed during Apollo 12. | [NASA — Apollo 12 article and images](https://www.nasa.gov/history/50-years-ago-apollo-12-on-the-moon-whoopee/), [NASA Science — Surveyor 3](https://science.nasa.gov/mission/surveyor-3/) |

The three game photos correspond to `public/images/memories/surveyor/surveyor-footpad.jpg`, `surveyor-trenches.jpg`, and `surveyor-apollo12.jpg`; sources are cross-referenced above and in section 6. **Photos buried for Cuội to dig up are a fictional storytelling device**. Game traces draw inspiration from footpads, scoop trenches, and astronaut tracks; their shapes and positions are arranged for play, not as a NASA archaeological map.

### T03 — Assemble Round Eye’s Journal

Immediately after the third photo, players **arrange all three photos chronologically**. Shuffled cards can be clicked into “First – Next – Then” slots, clicked again to deselect, and submitted with “Match Journal Pages”. The answer is **(1) the robot reaches the Moon → (2) it takes photos and studies soil → (3) astronauts visit and return some parts for research**. Incorrect arrangements receive hints and can be retried. [T03 implementation](../../src/components/friends/surveyor/SurveyorChallenges.tsx), [event order](../../src/content/friends/surveyor/progress.ts), [NASA Science — mission history](https://science.nasa.gov/mission/surveyor-3/)

## 5. Ending and Message

After T03, Cuội and Round Eye briefly talk against the lunar background. The recollection summarizes landing, camera/scoop work, and the visit, each paired with one of the three photos. Back in the lunar scene, Round Eye **lights the first point of the star lantern**; Cuội sees a distant glow and hears a hint about another friend. Players can **review the ending, replay the chapter, or return to the journey map**; walking to the glow also returns to the map. [Ending implementation](../../src/components/friends/surveyor/SurveyorEnding.tsx), [NASA — Apollo 12 visit](https://www.nasa.gov/history/50-years-ago-apollo-12-on-the-moon-whoopee/)

The chapter’s message: a pioneering robot helped people understand the Moon; returned parts were studied, while the rest of the spacecraft remains where it landed. Cuội’s friendship with Round Eye, “restoring memories”, and the glowing lantern point help children remember the story; **they are not events recorded by NASA**.

## 6. Facts and Sources

| Fact Used | Where It Appears in the Game/Book | Main Source |
| --- | --- | --- |
| Surveyor 3 is an uncrewed robotic spacecraft; it reached the Moon in 1967 | Encounter dialogue, B01, T01, first photo | [NASA Science — Surveyor 3](https://science.nasa.gov/mission/surveyor-3/) |
| Landing region is the Ocean of Storms; spacecraft rests in Surveyor Crater | Encounter/ending setting name and background | [NASA — View of Surveyor III in Its Crater](https://science.nasa.gov/resource/view-of-surveyor-iii-in-its-crater/), [NASA — Apollo 12 on the Moon](https://www.nasa.gov/history/50-years-ago-apollo-12-on-the-moon-whoopee/) |
| Camera observations; scoop soil tests and trenches in preparation for later spacecraft | T01, B01, trench photo, T03 | [NASA Science — Surveyor 3](https://science.nasa.gov/mission/surveyor-3/), [NASA/JPL — Surveyor 3](https://www.jpl.nasa.gov/missions/surveyor-3/) |
| Footpad marks and trenches remained visible when Apollo 12 arrived | First two photos, book hints, ending narrative | [NASA — 50 Years Ago: Apollo 12 on the Moon](https://www.nasa.gov/history/50-years-ago-apollo-12-on-the-moon-whoopee/), [NASA SP-284](https://ntrs.nasa.gov/citations/19720019081) |
| Pete Conrad and Alan Bean visited in November 1969 and returned the camera, scoop, and other parts for research | Third photo, T03, ending | [NASA Science — Surveyor 3](https://science.nasa.gov/mission/surveyor-3/), [NASA — Apollo 12: The Pinpoint Mission](https://www.nasa.gov/missions/apollo/apollo-12-the-pinpoint-mission/) |
| Cuội digs up photos, receives a memory scoop, talks to the spacecraft, and lights the lantern | Chapter 1 gameplay and story | **Original game fiction; no NASA source** |

## Current Maintenance and Verification · 14 November 2026

The journey follows Round Eye → Twinkle → Sharp Ear → Mesh Wheels → Sky Watcher. Each friend contributes one lantern point; shared saves use schema v20 and read v1–v20. Chapter unlock conditions are in [friends/index.ts](../../src/content/friends/index.ts), and book page conditions in [reading-order.ts](../../src/content/book/reading-order.ts).

Factual pages use a title, a captioned archival image where appropriate, short paragraphs, and footer sources from [references.md](../references.md). Pages labeled “Contains game elements” do not need displayed sources. The latest rules are in [AGENTS.md](../../AGENTS.md).

The two PDFs, `public/books/Truyen.pdf` and `Truyen_en.pdf`, open unchanged in a new tab and must remain intact. The companion book has its own unlock conditions and pagination; it does not need to match PDF page counts. See [companion book and PDF behavior](../README.md#companion-book-and-pdfs).

The `check:*` scripts and fixtures have been removed. `npm run typecheck`, `npm run build`, and `npm run preview` remain. This update checked source code and revised documentation; it was not a new interface acceptance test or a fresh verification of source websites.
