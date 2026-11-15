# AI Guide to Designing New CUỘI Chapters

Standards updated **14 November 2026**. **Surveyor 3 — Round Eye is the user-selected reference** for structure, interface, gameplay, book content, and chapter endings; the An and Grandma scene is the reference for narrative pacing and dialogue. Consult the current implementation in `src/content/friends/`, `src/components/friends/`, and the [references](../references.md). The latest rules in `AGENTS.md` take precedence over this guide where they differ.

Purpose: design or revise chapters that share the website’s style, narrative voice, book, controls, and journey continuity. These rules apply to assigned work; do not independently overhaul other chapters. Chapter-specific mechanics are examples rather than mandatory templates for new chapters. Old plans do not establish the current implementation; check the code before starting.

## 0. Shared Standards Based on Round Eye

### 0.1. Scope and What to Preserve

- Preserve the approved layout, palette, visual textures, and controls. Change only the assigned area and the minimum dependencies needed to make it work.
- Do not independently add buttons, labels, frames, popups, tooltips, effects, rewards, or features as “UX/UI improvements”. Every new element must serve a requirement or necessary chapter interaction.
- Do not independently move instructions or controls. If a new requirement conflicts with a standard, identify the specific conflict for the user to decide before implementing dependent work.
- These are design standards, not instructions to copy every existing behavior. Dialogue mentioning E, inconsistent counter labels, or old documentation do not automatically become exceptions.

### 0.2. An Encounter with a Purpose and an Outcome

Each chapter must answer: **Who does Cuội meet → what help does the friend need → what does the player do to help → what changes or memories return → what does Cuội take onward?**

Standard framework:

```text
Approach the friend → have a short conversation and agree to help
→ discover the friend’s features/work
→ complete challenges and receive photos or clues
→ connect what has been learned
→ listen to the friend’s story → receive thanks and light
→ stay to explore or follow the marker back to the journey map
```

Each stage must contribute to the same act of helping the friend. Do not insert trivia questions, confirmation screens, or decorative activities merely to increase the number of steps. Choose challenge counts, photo counts, and movement modes to suit the content; three tasks, three photos, digging, and timeline matching are not mandatory just because Round Eye uses them.

### 0.3. Stable Interface Roles and Positions

| Element | Standard |
| --- | --- |
| Scene header | Scene name or short objective; navigation and Hint where needed. Do not repeat the same information in multiple frames. |
| Game scene | Shows the space, characters, observation targets, and actions. Keep subjects and important traces visible. |
| Dialogue | Speaker name, portrait if available, turn count, a short passage, and one primary continuation button. Anchor it in the lower scene area by default, following An and Grandma/Round Eye; do not independently move it above the scene or elsewhere. |
| Challenge panel | One clear objective, an interaction area, and relevant feedback. Show only controls needed for the current stage. |
| Game/challenge frame footer | Interaction instructions: movement, keys, selecting, dragging, entering, and submitting. This is the area below the game frame or at the bottom of the challenge panel, not the website footer. |
| Companion book | Facts, clues, diagrams, photos, captions, and sources; game left and book right on wide screens, book below on narrow screens. |

Interaction instructions belong in the footer, not character dialogue, titles, scene headers, popups, or tooltips. Button labels such as “Next”, “Hint”, or “Match Journal Pages” remain on buttons; feedback such as “2/3 photos selected” or observation hints after an incorrect answer stays in the feedback area. Book clue pages explain what to observe and do not replace the controls footer.

Preserve pixel art scenes, children’s book portraits, and simple line diagrams; midnight blue backgrounds, cream text, soft gold, and light book paper. Do not add a separate visual system for one challenge. Reserve space for feedback and changing content where appropriate to prevent layout shifts.

### 0.4. Dialogue and Pacing

Follow An and Grandma’s pacing: one idea per turn, with the player controlling reading. Space/Enter or the continue button first reveals the full line; the next press advances. Do not auto-advance by default. The final button in a conversation should name the next action. Preserve readable text, subtle effects, and reduced-motion support.

Cuội actively asks questions and helps; each friend has a distinct personality. Dialogue explains motivation and feelings; lengthy factual explanations belong in the book. The menu pauses play, and closing it resumes the same stage; moving between dialogue, challenges, and photos must preserve keyboard control for the active player.

### 0.5. Challenges Connected to Learning and Progress

- Before implementing each task, define its core knowledge, interaction, completion condition, missing/incorrect/correct feedback, and saved or unlocked results.
- Use real equipment features to create meaningful interactions. Round Eye provides an example: recognize tools → find traces and photos → organize events.
- Allow gentle retries with hints about what to observe; retain correct work where appropriate. Do not solve the task automatically or remove progress for an incorrect attempt.
- Vary interactions between stages when there is a purpose. Collected content should help players understand later tasks, read the book, or follow the recollection; do not create meaningless collectibles.
- If a task permits free exploration, do not enforce an order just because the book tells events sequentially. Distinguish discovery order from event order.
- When awarding a photo, pause background interaction and show the image, title, short description, relevant date/source, and one save or continue button. Then return control to the next stage.

### 0.6. A Companion Book That Follows Progress

The book supports each chapter by introducing the friend, explaining work/tools, providing clues when needed, and keeping acquired photos and material for rereading. Create only pages that serve actual content; a separate journal page is not required unless designed and implemented.

- Unlock facts, hints, and photos at appropriate milestones without revealing discoveries early.
- Unlocking a page must not turn pages or steal focus. Retain the current page ID when adding content, changing tasks, or switching languages.
- Only the Hint action actively opens the appropriate clue page; provide a way back to the game on narrow screens.
- Do not require opening the book to win unless reading/comparing the book is an explicitly approved task mechanic.
- Round Eye’s sequential hint rules are chapter-specific and should not automatically apply everywhere. If hints are locked, state their unlock conditions and distinguish these from task completion order.
- Factual prose uses the third person, and photos have captions and sources; distinguish authentic material, illustrative models, and story magic.

### 0.7. Chapter Endings and Afterward

The ending must explain what the player’s actions meant to the friend. Briefly introduce the recollection, reuse acquired photos/clues in a meaningful order, then return to Cuội and the friend for thanks and the gift of light. Do not introduce unrelated new facts in the ending.

Rewards connect to the story and star lantern within overall progress. Distinguish photo counts, friend counts, and lantern points; do not copy 1/3 or 1/5 labels from another chapter. Award each reward only once.

After the ending, allow walking, talking to the friend, reviewing the ending, replaying, or returning to the journey map. The right-hand marker suggests the next stage and returns to the map. Reviewing does not require tasks or duplicate rewards; replay preserves completion, unlocks, and approved chapter-specific save policies.

### 0.8. Required Acceptance Checklist

- [ ] Every stage helps the friend; no elements fall outside the assigned scope.
- [ ] Preserve the approved game/book structure, style, and control positions.
- [ ] Interaction instructions are in the footer; dialogue, objectives, and feedback serve their respective roles.
- [ ] Every task has a clear completion condition, incorrect-answer feedback, and retry path.
- [ ] Photos/clues are used in the story, book, or recollection.
- [ ] The book unlocks at the right milestones and retains the current page; Hint and return-to-game actions work.
- [ ] The ending includes recollection, thanks, light, and a continuation path; no duplicate rewards.
- [ ] Continuing, reloading, menu use, post-ending play, and replay preserve progress according to policy.
- [ ] Check Vietnamese/English, wide/narrow screens, and keyboard/mouse/touch; no obscured subjects or clipped buttons.
- [ ] Review the diff, remove unrelated changes, and clearly report anything not checked.

The following sections add implementation detail. Where an old example differs from section 0, apply section 0 within the assigned scope; do not expand the work into a project-wide revision.

## 1. Getting Started and Work Scope

1. Read this guide, the [visual style](visual-style.md), the [project overview](../../README.md), and the three chapter documents.
2. Read the relevant modules and inspect the encounter, challenges, photo awards, book, ending, post-ending state, and replay in the running version.
3. Agree on the equipment, core knowledge, helping narrative, sourced photos, task conditions, and save policy.
4. Write the state flow and divide it into milestones that can be viewed, played, and checked; implement within the user’s assigned scope.
5. Update one primary chapter document to reflect final behavior; merge handoff notes once they duplicate it.

Priority: latest user request → approved decisions → behavior verified in code → old plans. Existing bugs are not standards to copy. If assigned documentation only or planning without implementation, do not independently edit code.

Do not choose the next friend’s identity from old ideas. Ask only unresolved questions that affect design, while continuing assigned independent work.

## 2. Mood and Writing Style

CUỘI is a picture book game for primary school children: Vietnamese folklore, the Mid-Autumn Festival, and discovery of real scientific equipment. Cuội searches for Hằng, visits friends, helps them, and carries their stories onward. The atmosphere is warm, quiet, curious, and slightly nostalgic; avoid threats, stressful competition, or criticism after mistakes.

### Dialogue: Friendly and Distinctive

- In Vietnamese, characters generally refer to themselves as **“mình”** (“I”) and address the other person as **“bạn”** (“you”/“friend”) or **Cuội**; each turn should contain about 1–2 short sentences with one clear idea.
- Cuội actively asks, observes, and helps. Round Eye remembers the past; Twinkle is playful and enjoys riddles; Sharp Ear is calm, meticulous, and likes listening. New friends should have their own traits while remaining easy to understand.
- Explain facts through the current activity. For example: “The light has come back! Let’s work out how far away Earth is.”
- Do not put keyboard instructions, data IDs, implementation details, or editorial notes in character dialogue. Key instructions belong in the footer.
- After mistakes, point out what to observe and invite another try; do not blame the child or finish the task for them.

### Book: Third-Person Narration Like Round Eye

The book is reading material about the friend, not a transcript of chat. Introduce names, work, and historical milestones in short, concrete language, explaining one idea per paragraph. Calling equipment a “friend” is acceptable for warmth, but the narrator remains in the third person.

| Purpose | Example in the Book’s Voice |
| --- | --- |
| Introduction | “Surveyor 3 is a NASA robotic spacecraft that reached the Moon in April 1967.” |
| Explanation | “One hundred small prisms help Twinkle return light toward Earth.” |
| Work | “Sharp Ear measures tiny ground movements to help scientists study the Moon.” |
| Recording an event | “In 1969, Buzz Aldrin placed Twinkle on the ground in the Sea of Tranquility.” |

Do not open factual pages with “I am…” or continually ask the reader to perform actions. Interactive buttons and expandable hints have their own labels. Captions describe the actual subject/event and include sources; do not describe NASA photos as photos Cuội just took.

### Concise Content in Both Languages

Write both Vietnamese and English for dialogue, book text, objectives, buttons, feedback, captions, alt text, and accessibility labels. English should preserve meaning and tone; check its line wrapping separately.

Recollections should tell only the essential part of each photo’s story; split or shorten long passages rather than shrinking text or introducing an in-scene scrollbar. Explain technical terms in approachable language and avoid lists of figures that do not help children understand.

Use **mission — nickname** consistently in summaries/book introductions: “Surveyor 3 — Round Eye”, “Apollo 11 — Twinkle”, “Apollo 12 — Sharp Ear”. Journey location labels may be shortened according to the current design.

## 3. Encounter Structure and Journey Map

Reference narrative framework:

```text
Journey map → regional transition introduction → explore/approach the friend
→ conversation → work-related challenge → photo/clue
→ further challenges → recollection in historical order
→ thanks and one lantern point lit → walking and post-ending conversation
→ marker on the right edge → journey map
```

| Element | Round Eye | Twinkle | Sharp Ear |
| --- | --- | --- | --- |
| Opening | Meet Surveyor 3 | Navigate around six craters, then meet the mirror array | Walk sideways to the ALSEP cluster |
| Tasks | Tools, digging for photos, journal matching | Route finding, glass cleaning, reflection, distance measurement | Identification, classification, graph/duration, rhythm sequence |
| Photos | Three | Two | Three |
| Ending | First point | Second point | Third point |
| Afterward | Movement with depth | Sideways movement | Sideways movement |
| Right-hand marker | Glow suggesting Twinkle | Ripples suggesting Sharp Ear | Two wheel tracks suggesting Mesh Wheels |

Do not set a new chapter’s task/photo count by copying; each stage needs a clear purpose. A minimum of three photos was a Sharp Ear-specific decision, not a universal requirement. Do not add confirmation scenes simply to lengthen transitions.

**Distinguish numbering:** website scenes are Round Eye 03, Twinkle 04, Sharp Ear 05; the five friends are ordered Round Eye 01, Twinkle 02, Sharp Ear 03, Mesh Wheels 04, Sky Watcher 05; tasks start at T01 in each chapter. The lantern has exactly five points, with one lit per completed friend.

Use the same `journeyStatus` for journey and book locks. Round Eye starts unlocked; Twinkle follows Round Eye, then Sharp Ear follows Twinkle. Use `completedOnce` so replay retains access to later chapters. Unimplemented stops remain mysterious, without names, portraits, or photos revealed.

When selecting a stop, **Cuội ✦** follows the selection. Unselected positions still reserve space for this label. Selecting a mysterious friend hides and disables the entry button while **preserving its empty space**; the message area also reserves the height needed for its longest content. Switching selections must not move the entire map up or down.

## 4. Visuals, Layout, and Buttons

The three deliberate visual layers are **2D pixel art scenes**, **painted children’s book portraits**, and **simple line UI/diagrams**. Do not replace one task with neon sci-fi or glossy 3D visuals.

| Role | Reference Color |
| --- | --- |
| Website background | `#101e28` |
| Dialogue panel | `#182c35` / `#10212a` |
| Borders/accents | `#d7b875` |
| Primary button | Background `#dfc18a`, text `#20313a`, border `#ead4a4`, 7px corners |
| Secondary button | Background `#293e46`, text `#eee5d1`, border `#a9957080`, 8px corners |
| Text | Cream `#eae7dc`, secondary `#bdcecb` |
| Book page | `#f2ecdb` |

Standard buttons are at least 42px, easy to click/tap, with clear hover/focus/disabled states. Primary buttons continue or submit; secondary buttons review or show hints. Equipment targets, photo cards, and cleaning cells retain forms suited to their interactions.

**Hint** appears in the scene header beside **Back to Journey** when a suitable hint page exists, using the current shared button style. Preserve each panel’s approved positions; do not independently move or duplicate buttons.

Use `EarthDialogue` for narration and chat: name, portrait where available, line count, gradually revealed text, and next button. By default, place chat in the lower scene area as in section 0.3; preserve a scene’s approved custom layout. Do not obscure characters, lanterns, or targets, or repeat location/challenge names in several panels at once.

Reference canvas: **960 × 540**, side view; distant objects are smaller and lower contrast. Craters have dark interiors, softly lit rims, and flattened perspective; characters are anchored at their feet. Equipment retains real characteristics without invented faces, limbs, or functions.

On desktop, game left and book right; on narrow screens, the book/panel moves below according to the shared layout. Size against the **actual game area width**, not only the viewport, because the book column and workspace fitting also matter. Keep text readable; paginate or shorten before reducing font size. Avoid panel/scene scrollbars caused by excess spacing or lengthy prose; website scrolling in a stacked layout is a separate behavior.

The book uses a shared height with page-turn buttons at the bottom. Static backgrounds/artwork have caching and WebGL recovery; show overlays only after the actual scene has rendered. Edge glows fade into the ground without hard boundaries.

## 5. Content, Hints, and Book Responsibilities

| Location | Responsibility |
| --- | --- |
| Task title/objective | What needs to be achieved |
| Footer | Controls: keys, dragging, selecting, entering, submitting |
| Chat | Why help is needed, emotions, questions, story transitions |
| Book | Facts, clues, diagrams, photos, and sources |
| Task feedback | What is correct/incorrect and what to observe next |

Group the book by friend: Round Eye → Twinkle → Sharp Ear → subsequent groups. Insert photos in the correct group rather than collecting everyone’s photos at the end.

On chapter entry, select that friend’s introduction. Afterward, retain the reader’s chosen page ID through new photos, task changes, and language changes. **Unlocking a page does not turn the book automatically.** Only Hint moves to the required page and focuses its heading. Provide a return-to-game button on narrow screens. Book diagrams share components/data with tasks to avoid differences in principles, colors, or rhythms.

Do not impose a fixed page count; paginate by meaning and height. Put long explanations in the book without turning it into implementation instructions for developers.

## 6. Tasks, Controls, and Focus

Every task has defined knowledge, interaction, success conditions, and incorrect-answer feedback. Allow gentle retries and preserve previous correct results. Simulations respond to input rather than using animations that always lead to a correct answer.

Mouse/touch interactions need clear targets; HTML buttons support Tab/Enter/Space, and drag tasks have keyboard alternatives where appropriate. Calculations allow number entry, operator selection, and submission, with clear missing/incorrect feedback. Sharp Ear is playable with sound off; new chapters must not use audio as the only clue.

Define each stage’s mode: sideways walking, movement with depth, or locked movement. Do not require Cuội animations that do not exist or turn crater navigation into jumping/falling. When chat/photos/panels open, block background interaction to prevent click-through.

**Focus is part of gameplay flow:**

- While the user is playing, transitions from dialogue → task → photo → post-ending state must keep receiving keyboard input without requiring another canvas click.
- Use the shared mechanism in [game-focus.ts](../../src/focus/game-focus.ts) and App coordination: prioritize the dialogue button, walking canvas, or visible control; skip hidden, disabled, or `inert` elements.
- Removing/disabling a button may move focus to the body; wait for the DOM to settle, then restore focus if the game still owns it, rather than relying only on `focusout`.
- Do not steal focus from inputs, the book, or outside the game. Clicking outside, tabbing to the book, or changing windows must release control. Return-to-game uses the same target selection function.
- Space/Enter reveals the line or advances it, avoiding two actions from one press. Do not capture game arrow keys/Space while the user is filling out a form.

The menu pauses input, text, and timers/effects that should pause. Resuming clears old keys and movement targets. Stage changes apply their movement mode even when both stages are called `free`. Replay resets position, facing, scale, pose, old targets, warnings, and pending interactions; language changes, the book, and the menu do not automatically reset position.

For audio, consult the [v3 scene audio rules](audio.md). Use the shared Web Audio system in `src/audio/`, with music selected through `selectMusicMood` and App coordination; Phaser keeps `noAudio`. Feedback effects must work for corresponding mouse/touch and keyboard actions, avoiding duplicates or automatic reward sounds when loading saves. The menu plays `home` and pauses effects; focus loss or a hidden tab pauses all audio. Preserve independent switches and never use sound as the only clue needed to solve a task.

## 7. Scientific Material and Memory Photos

Prefer NASA/JPL mission sources, original archives, operators, or original research. Record equipment, mission, location, creator/subject, image ID, capture date, and event date. A page’s publication date is not the capture date.

Open images and check captions before choosing them. Hosting on NASA’s site does not prove an image shows the correct equipment: do not substitute Apollo 14 for Apollo 11, or laser ranging to LRO for ranging to a surface reflector. Preserve credits and check third-party material against [NASA Images and Media Usage Guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/).

Store **acquisition order** separately from **historical order**. Twinkle receives 5952 then 5945 but tells 5945 → 5952; Sharp Ear receives/tells 6916 → 6918 → 6921. Do not attach the 20 November impact or 1977 station shutdown to deployment photos from 19 November 1969.

Photo awards follow Round Eye’s style: a photo frame, title, short description, and save/continue button, with alt text/sources and error handling. Do not use AI to alter archival images or fabricate before/after dust-cleaning photos. Long editorial notes belong in documentation, not character lines.

Distinguish history, models, and fantasy in the design itself. Labels such as “2D model” or “illustration/time-lapse” can prevent misunderstandings. Hand-drawn waves are not NASA data; “ringing” is not sound traveling through a vacuum. Where sources differ numerically, record both evidence and limitations in the chapter document.

## 8. Endings, Chapter Links, and Replay

1. Introduce the recollection and tell the photos’ stories chronologically in short pages.
2. Return to the scene with Cuội and the friend, give thanks, and send light to the lantern.
3. Keep previous points lit and light one new point exactly once; completion flags determine the star count.
4. After dialogue, allow movement and show **Review Ending / Replay / Back to Journey** without obscuring the subjects.
5. Keep the right-edge marker and allow Cuội to walk to it to return to the journey map.

The lantern follows Cuội’s hand, facing, and walking frame; do not leave an HTML lantern in the middle of the scene after Cuội walks away. Markers should be visible but subtle, unobstructive, and static under reduced motion. Choose a marker that suggests the next friend according to approved content; Sharp Ear uses two parallel wheel tracks to suggest Mesh Wheels. Reaching them still returns to the map to select a chapter.

**Characters remain interactive afterward:** click/tap the friend to make Cuội approach, or walk close and press E. Chat lasts about two turns: thanks for visiting, then a hint to look to the right. Preserve individual voices, child-friendly language, and repeatability. Lock movement during chat, keep the marker visible, and temporarily hide post-ending buttons; closing chat restores control. Do not change progress/rewards.

| Action | Behavior |
| --- | --- |
| Review Ending | Review memories without repeating tasks or receiving duplicate stars |
| Replay | Start a new attempt according to chapter policy; retain completion and unlocks |
| Back to Journey / walk to marker | Preserve progress without opening unimplemented chapters |

Twinkle/Sharp Ear retain photos on replay; Round Eye has its own checkpoint policy. Do not change these policies merely to standardize data.

## 9. Integration and Assets

Each chapter has clear content, progress, photo award conditions, and completion rules. React coordinates the story; Phaser handles scenes/movement without becoming another source of story state.

Keep saved `LevelId`, phases, and dialogue/photo/page IDs stable. The schema recorded here is v6 (Mesh Wheels M1), with a reader accepting v1–v5. Schema/phase changes require compatibility; do not reset the whole journey to fix a save. Update results and stage/photo transitions atomically where needed. Do not save focus, hover, movement targets, or effect timings.

Review level registration, `journeyStatus`, star counts, book, headers/footers, focus, canvas, replay, and saves; adding a list item alone is insufficient. Scope CSS to chapters/components; changing shared selectors requires checking all three older chapters. `freeRoam` has different meanings for movement with depth and sideways walking.

Filenames are lowercase, without diacritics, and hyphenated. Portraits belong in `public/images/portraits/`, sprites in `sprites/`, and archival material in `memories/<id>/`. Prefer WebP for new bitmaps and preserve alpha where needed; URLs use `import.meta.env.BASE_URL`. Retain current formats for existing assets still in use. Inspect reference images before creating variants; do not replace sprites with portraits.

Cuội’s sprite frames are cropped manually rather than from a uniform grid. Preserve crop coordinates, foot anchors, and animation. Prefer code for simple backgrounds/diagrams. Do not remove listener/timer cleanup, fallback caches, or canvas recovery merely to shorten code.

## 10. Source Code Reading Map

| Group | Files and Roles |
| --- | --- |
| Coordination and focus | [App.tsx](../../src/App.tsx), [game-focus.ts](../../src/focus/game-focus.ts), [EarthDialogue.tsx](../../src/components/shared/EarthDialogue.tsx) |
| Registration/saving | [friends/index.ts](../../src/content/friends/index.ts), [types.ts](../../src/content/friends/types.ts), [progress.ts](../../src/state/progress.ts) |
| Book/journey map | [JourneyMap.tsx](../../src/components/journey/JourneyMap.tsx), [BookNavigation.tsx](../../src/components/book/BookNavigation.tsx) |
| Chapter content | [Content conventions](../development/folder-structure.md#content-organization-conventions), `src/content/friends/<id>/` folders (`definition.ts`, `dialogue.ts`, `progress.ts`, `challenges/`) |
| Scenes/photos/mini games | Surveyor*, Sparkle*, and TaiThinh* components linked in each chapter document |
| Endings and chapter links | [ending-chat.ts](../../src/content/story/ending/friend-dialogue.ts), [EndingTrail.tsx](../../src/components/shared/EndingTrail.tsx), and *Ending components |
| Game bridge and scenes | [GameCanvas.tsx](../../src/game/GameCanvas.tsx), [PreviewScene.ts](../../src/game/scenes/preview-scene.ts), and *scenery/*layout modules |
| Light model | [SparkleScience.tsx](../../src/components/friends/lap-lanh/SparkleScience.tsx), [sparkle-optics.ts](../../src/game/scenes/lap-lanh/optics.ts), [SparkleBookClue.tsx](../../src/components/friends/lap-lanh/SparkleBookClue.tsx) |
| Visuals/layout | [assets.ts](../../src/content/assets.ts), [styles.css](../../src/styles/styles.css), [useWorkspaceFit.ts](../../src/hooks/useWorkspaceFit.ts) |

## 11. Decisions Needed for a New Friend

Ask only for details not already provided:

- Equipment, mission, nickname, location, personality, and core knowledge?
- What does Cuội help with, what does each task contribute, and which tasks are required?
- Photo count, sources, award timing, and narrative order; when do book/clue pages unlock?
- Which stages use sideways/depth movement, when does the lantern appear, and what happens afterward?
- Unlock conditions, replay policy, and marker suggesting the next friend?

Do not independently choose skills or friend cards as rewards. Current rewards are photos/memories and one star point on completion. Unapproved ideas must be clearly separated from implemented content.

## 12. Handoff Conditions and Documentation

Check first entry, continuing/reloading, incorrect then correct attempts, photos before/after saving, book/Hint, menu, language, ending, repeat post-ending chat, walking to the marker, reviewing the ending, and replay. Review keyboard/mouse/touch, focus transitions, and number entry; verify that keys are not captured outside the game.

Review Vietnamese/English on wide/narrow screens and at actual game widths: chat must not obscure subjects, horizontal overflow must be absent, panels/scenes must have no unintended scrolling, and book/map layouts must not jump. Check reduced motion, failed image loading, lantern hand tracking, and no duplicate stars. Changes to shared code require rechecking all three chapters.

For code changes, run appropriate TypeScript/build checks and `git diff --check`; directly test changed interactions. For documentation changes, check links, consistency, and file scope. Do not report old checks as freshly run.

New chapter documentation follows the Game1 structure: **real facts → context → book → challenges → ending/message → source table**, with technical/verification notes where useful. Preserve image sources, decisions, and limitations in the consolidated document before deleting duplicate plans/handoffs. Do not keep independent dialogue copies that differ from code or add temporary test scripts/images to the repository.

Preserve pre-existing workspace changes; do not independently reset, commit, or rewrite Git history to tidy documentation. State what changed, what was checked, and what still needs a decision.

## 13. Sample Assignment

> Read the Round Eye standards in section 0 of this guide and the visual style; check the relevant code and scenes before starting. Implement [request] within [scope]. Preserve layout, control positions, and the book; interaction instructions belong only in the footer. Do not independently add UI, features, or effects beyond the request. Each challenge must help the friend; endings include recollection, thanks, and a continuation path. Preserve saves, rewards, and earlier chapters. Before handoff, review the section 0.8 checklist and diff; report what changed, what was checked, and what could not be checked.
