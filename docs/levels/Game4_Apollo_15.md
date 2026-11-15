# The Story of Apollo 15 — Mesh Wheels (Chapter 4)

Updated from source code on **14 November 2026**. The filename matches the equipment currently used: **the Apollo 15 LRV at Hadley–Apennine in 1971**. Descriptions of Taurus–Littrow, the Apollo 17 VIP Site, Nansen, Shorty, and orange soil belong to an earlier version.

## 1. Equipment and Model Limits

Mesh Wheels is a game character based on the Lunar Roving Vehicle (LRV), an astronaut-driven vehicle on the Moon. Current content covers the Apollo 15 rover, metal mesh wheels, returning samples to the Falcon lander, and tracks seen from orbit. Scientific sources are collected in the Apollo 15 section of [references.md](../references.md).

The talking rover, following Cuội, and giving light are fictional. The 6×5 grid, battery units, and walking step count are educational rules, not Apollo engineering specifications. A/B are game positions, not coordinates of two historical stations. The walk-back page explains limits involving life support consumables, separately from the game’s 4-step rule.

## 2. Place in the Journey

Mesh Wheels follows Sharp Ear and precedes Sky Watcher. The introduction describes a magical journey to Hadley–Apennine, not a real vehicle route connecting landing sites. Chapter access follows [friends/index.ts](../../src/content/friends/index.ts).

Main flow: **meet the rover → T01 choose and test wheels → save photo A → T02 draw a route → T03 follow the route, collect two samples, return to LM → save photo B → recollect two photos → farewell and fourth point awarded → post-ending play**.

Cuội, the rover, and terrain are rendered in [scenery.ts](../../src/game/scenes/ban-banh-luoi/scenery.ts). The illustrated portrait preserves the equipment’s shape without added eyes, mouth, or limbs. The chapter uses the `surveyor` music theme; effects follow shared settings.

## 3. Companion Book Content

There are nine entries when fully unlocked; page count may vary with book dimensions. Conditions are in [progress.ts](../../src/content/friends/ban-banh-luoi/progress.ts), and book text in [dialogue.ts](../../src/content/friends/ban-banh-luoi/dialogue.ts).

| ID | Condition | Content |
| --- | --- | --- |
| `ban-banh-luoi` | Chapter unlocked | “Mesh Wheels — The Friend Who Loves to Roam” |
| `ban-book-wheels` | From the wheel task, photo A acquired, or completed | “Wheels That Need No Air”, task guidance |
| `ban-book-wheels-real` | Same condition as wheel page | “Apollo 15 Wheels”, facts and authentic detail image |
| `ban-photo-vip` | Photo A (`vip`) saved | “Apollo 15 Lunar Rover” |
| `ban-book-route` | Photo A acquired | “One Journey, Two Stations”, model diagram |
| `ban-book-walkback` | Photo A acquired | “What If You Need to Walk Back?”, factual content |
| `ban-book-samples` | Photo A acquired | “Two Stops, Two Samples”, collection hints |
| `ban-book-legacy` | Photo B (`orbit`) saved | “Apollo 15 LRV” |
| `ban-photo-orbit` | Photo B acquired | “Apollo 15 LRV (Continued)”, orbital image |

Internal chapter name `apollo17`, photo key `vip`, and sample key `orange` remain for compatibility. They do not describe the mission or soil color in current content. Hints lead to the wheel, route/walk-back, or sample page depending on phase; `photoB`/`memoriesIntro` selects the summary once photo B is acquired.

## 4. Three Challenges

### T01 — Get the Wheels Ready

Choose rubber, mesh, or stone wheels; test the choice on a simulated path before confirming. Mesh wheels are correct. Changing wheels clears the local test result; reloading requires another test. Incorrect choices receive feedback and can be corrected. Only saving photo A records `vip` and moves to the T02 introduction. [Wheel interface](../../src/components/friends/ban-banh-luoi/BanhLuoiWheels.tsx).

### T02 — Plan a Route Together

The grid has 6 columns × 5 rows, with (column, row) coordinates starting at 1. LM is at (1,1), A at (1,3), and B at (3,1); craters are at (2,2), (4,2), (4,4); slopes at (3,2), (2,4). Move in four directions, visit A and B in either order, then return to LM. Normal cells cost 1 battery unit and slopes 2; the starting cell costs nothing. The budget is 12 battery units. At every step, the shortest crater-free walking path back to LM must be no longer than 4 steps; slopes count as 1 walking step.

Battery and walk-back limits are evaluated independently. Undo, redraw, hints, and route submission are available; there is no timer or automatic answer completion. Only a correct submission creates `confirmedRoute: { modelVersion: 1, cells }`. Drafts do not replace the confirmed route. Submitting the same route retains the checkpoint; a different route resets only T03.

Example valid route: `(1,1) → (1,2) → (1,3) → (2,3) → (3,3) → (3,2) → (3,1) → (2,1) → (1,1)`: 8 steps, 9 battery units, and a maximum walk-back distance of 4 steps. An optimal route is not required. [Model](../../src/content/friends/ban-banh-luoi/challenges/models.ts), [algorithm](../../src/content/friends/ban-banh-luoi/challenges/route.ts), [interface](../../src/components/friends/ban-banh-luoi/BanhLuoiRoute.tsx).

### T03 — Two Stops, Two Samples

The rover follows the entire confirmed route, preserving A/B order and repeated segments. At A, Cuội approaches the rock, holds and releases within the force zone to strike; two correct strikes free the sample. The second force zone is narrower and shifted right. Pick up the sample, carry it back to the rover, and store it.

At B, observe three soil patches, choose the middle patch with fine grains mixed with small fragments, then carry the sample back to the rover. The soil is gray; the task does not ask players to find Shorty’s orange soil. Returning to LM with both samples leads to photo B and the recollection.

Checkpoints store route and sample state; positions/animation clocks are temporary. The reader and reducer handle invalid/duplicate data according to stage conditions. [Checkpoint](../../src/content/friends/ban-banh-luoi/challenges/guide.ts), [guidance](../../src/content/friends/ban-banh-luoi/challenges/guide-copy.ts), [interface](../../src/components/friends/ban-banh-luoi/BanhLuoiGuide.tsx), [scene](../../src/game/scenes/ban-banh-luoi/guide.ts).

## 5. Photos, Recollection, and Reward

| Key | Current Material | Award Milestone |
| --- | --- | --- |
| `vip` | NASA asset 7022567, Apollo 15 LRV photo, 1971, NASA/MSFC | After T01 |
| `orbit` | LROC NAC M175252641L,R, Apollo 15 site from orbit, 2011, NASA/GSFC/ASU | After T03 |

Metadata, captions, detail images, and sources are in [images.ts](../../src/content/friends/ban-banh-luoi/images.ts). Authentic images are in `public/images/memories/ban-banh-luoi/`; do not use AI to alter archival images.

After two recollection pages, Cuội returns beside the rover, hears the farewell, then receives the fourth lantern point. Completion is saved only after the light gift finishes. Afterward, players can review the ending, replay, or return to the journey map; repeat conversations do not add stars. Sky Watcher is the next friend. [Chapter ending](../../src/components/friends/ban-banh-luoi/BanhLuoiEnding.tsx), [coordination](../../src/App.tsx).

## 6. Saves and Maintenance Sources

The shared save system writes schema v20 and reads v1–v20. `readBanhLuoi` still accepts old camera/launch phases and compatibility entitlement `guideLegacyPassed`; this does not mean camera/launch scenes are still playable. Replay retains photos and `completedOnce` while creating a fresh attempt. Do not change IDs simply to match the Apollo 15 name.

Scientific sources in [references.md](../references.md) include NASA/NSSDCA on the LRV, NASA/MSFC for the Apollo 15 photo, the Apollo 15 Mission Report, Surface Procedures for walk-back, and LROC for orbital images. M0–M7 records and old assertion counts are not current acceptance test results.

## Current Maintenance and Verification · 14 November 2026

The journey follows Round Eye → Twinkle → Sharp Ear → Mesh Wheels → Sky Watcher. Each friend contributes one lantern point; shared saves use schema v20 and read v1–v20. Chapter unlock conditions are in [friends/index.ts](../../src/content/friends/index.ts), and book page conditions in [reading-order.ts](../../src/content/book/reading-order.ts).

Factual pages use a title, a captioned archival image where appropriate, short paragraphs, and footer sources from [references.md](../references.md). Pages labeled “Contains game elements” do not need displayed sources. The latest rules are in [AGENTS.md](../../AGENTS.md).

The two PDFs, `public/books/Truyen.pdf` and `Truyen_en.pdf`, open unchanged in a new tab and must remain intact. The companion book has its own unlock conditions and pagination; it does not need to match PDF page counts. See [companion book and PDF behavior](../README.md#companion-book-and-pdfs).

The `check:*` scripts and fixtures have been removed. `npm run typecheck`, `npm run build`, and `npm run preview` remain. This update checked source code and revised documentation; it was not a new interface acceptance test or a fresh verification of source websites.
