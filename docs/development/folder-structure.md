# Folder Structure and Project Conventions

This document collects CUỘI’s directory maps, code group responsibilities, and file placement rules. The detailed trees below reflect existing files; installed libraries, build output, and internal Git data are not listed file by file.

[← Documentation Index](../README.md) · [Technology Stack](technology-stack.md) · [Project Rules](../../AGENTS.md)

## Quick Reference

| Looking For | See |
| --- | --- |
| Entry points, configuration, and API | [Root overview](#root-overview) |
| Interface, content, and game scenes | [Source tree](#source-code-src) |
| PDFs, images, audio, and fonts | [Asset tree](#assets-public) |
| Topic-specific documentation | [Documentation tree](#documentation-docs) |
| Naming, responsibilities, and old paths | [Content organization conventions](#content-organization-conventions) |
| Asset URLs and moving files | [Static asset conventions](#static-asset-conventions) |

## Root Overview

```text
Game-2/
├── api/
│   └── visitors.js           # Visitor counter API
├── docs/                     # Project documentation and references
├── public/                   # Static assets served directly
├── src/                      # React and Phaser source code and content
├── .gitignore                # Excludes dependencies, builds, and generated files
├── AGENTS.md                 # PDF protection and companion page editorial rules
├── README.md                 # Introduction, members, setup, and team memories
├── index.html                # Vite HTML entry point
├── package.json              # Dependencies and npm scripts
├── package-lock.json         # Version lock for npm ci
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite and React plugin configuration
```

| Supporting Folder / File | Role |
| --- | --- |
| `node_modules/` | Libraries installed by `npm ci`; do not edit directly or commit to Git. |
| `dist/` | Output of `npm run build`; regenerated from source code and assets. |
| `*.tsbuildinfo` | TypeScript build cache; already ignored by Git. |
| `.git/` | Version control history and data. |
| `.agents/`, `.codex/`, `.aws/` | Supporting folders for the current workspace environment; not application code. |

`api/visitors.js` provides the counter in environments supporting Vercel Function and Upstash Redis. See [service configuration](technology-stack.md#visitor-counter-services). Setup and running instructions are in the [project README](../../README.md#setup-and-running).

## Source Code `src/`

```text
src/
├── audio/                                                        # Background music, effects, and audio settings
│   ├── game-audio.ts
│   ├── music-score.ts
│   ├── settings.ts
│   └── useGameAudio.ts
├── components/                                                   # React interface and grouped CSS
│   ├── book/                                                     # Book rendering and pagination
│   │   ├── BookContentLabel.tsx
│   │   ├── BookNavigation.tsx
│   │   ├── BookParagraph.tsx
│   │   ├── BookTopline.tsx
│   │   └── useBookImageLayout.ts
│   ├── ending/                                                   # Ending and team introductions
│   │   ├── HangFinale.tsx
│   │   ├── ProjectCredits.tsx
│   │   ├── finale-scene.css
│   │   └── hang-finale.css
│   ├── friends/
│   │   ├── ban-banh-luoi/                                        # Mesh Wheels — Apollo 15
│   │   │   ├── BanhLuoiCameraDiagram.tsx
│   │   │   ├── BanhLuoiEnding.tsx
│   │   │   ├── BanhLuoiGuide.tsx
│   │   │   ├── BanhLuoiLevel.tsx
│   │   │   ├── BanhLuoiPhoto.tsx
│   │   │   ├── BanhLuoiRoute.tsx
│   │   │   ├── BanhLuoiRouteMap.tsx
│   │   │   ├── BanhLuoiWheels.tsx
│   │   │   └── banh-luoi.css
│   │   ├── gac-troi/                                             # Sky Watcher — LRO
│   │   │   ├── GacCompanion.tsx
│   │   │   ├── GacImpactPhoto.tsx
│   │   │   ├── GacLightMap.tsx
│   │   │   ├── GacRestLight.tsx
│   │   │   ├── GacTroiEnding.tsx
│   │   │   ├── GacTroiImage.tsx
│   │   │   ├── GacTroiImpact.tsx
│   │   │   ├── GacTroiLevel.tsx
│   │   │   ├── GacTroiMatching.tsx
│   │   │   ├── GacTroiTrail.tsx
│   │   │   ├── gac-trail.css
│   │   │   └── gac-troi.css
│   │   ├── lap-lanh/                                             # Twinkle — Apollo 11
│   │   │   ├── SparkleBookClue.tsx
│   │   │   ├── SparkleCleaning.tsx
│   │   │   ├── SparkleEnding.tsx
│   │   │   ├── SparkleLevel.tsx
│   │   │   └── SparkleScience.tsx
│   │   ├── surveyor/                                             # Round Eye — Surveyor 3
│   │   │   ├── SurveyorChallenges.tsx
│   │   │   ├── SurveyorEnding.tsx
│   │   │   ├── SurveyorExcavation.tsx
│   │   │   └── SurveyorLevel.tsx
│   │   └── tai-thinh/                                            # Sharp Ear — Apollo 12
│   │       ├── TaiThinhChallenges.tsx
│   │       ├── TaiThinhEnding.tsx
│   │       ├── TaiThinhLevel.tsx
│   │       ├── TaiThinhPhoto.tsx
│   │       ├── TaiThinhRhythms.tsx
│   │       ├── TaiThinhTremors.tsx
│   │       └── tai-thinh.css
│   ├── journey/                                                  # Journey map
│   │   └── JourneyMap.tsx
│   ├── shared/                                                   # Components shared across scenes
│   │   ├── EarthDialogue.tsx
│   │   ├── EndingTrail.tsx
│   │   └── LanternGiftPause.tsx
│   └── shell/                                                    # Menu and visitor counter
│       ├── GameMenu.tsx
│       └── VisitorCounter.tsx
├── content/                                                      # Bilingual content, data, and progress rules
│   ├── book/                                                     # Catalog, readings, reading order, and PDF links
│   │   ├── back-cover.ts
│   │   ├── catalog.ts
│   │   ├── ending-progress.ts
│   │   ├── ending.ts
│   │   ├── extended.ts
│   │   ├── front-cover.ts
│   │   ├── intro-copy.ts
│   │   ├── journey-copy.ts
│   │   ├── pdf-edition.ts
│   │   ├── publication.ts
│   │   ├── reading-order.ts
│   │   ├── real-world.ts
│   │   ├── restored-friends.ts
│   │   ├── sparkle-pages.ts
│   │   ├── story-pdf.ts
│   │   └── types.ts
│   ├── friends/
│   │   ├── ban-banh-luoi/                                        # Mesh Wheels — Apollo 15
│   │   │   ├── challenges/
│   │   │   │   ├── guide-copy.ts
│   │   │   │   ├── guide.ts
│   │   │   │   ├── models.ts
│   │   │   │   └── route.ts
│   │   │   ├── definition.ts
│   │   │   ├── dialogue.ts
│   │   │   ├── images.ts
│   │   │   └── progress.ts
│   │   ├── gac-troi/                                             # Sky Watcher — LRO
│   │   │   ├── challenges/
│   │   │   │   ├── impact.ts
│   │   │   │   ├── light.ts
│   │   │   │   ├── matching.ts
│   │   │   │   └── shadow-watch.ts
│   │   │   ├── book-copy.ts
│   │   │   ├── definition.ts
│   │   │   ├── dialogue.ts
│   │   │   ├── ending-copy.ts
│   │   │   ├── flow.ts
│   │   │   ├── images.ts
│   │   │   └── progress.ts
│   │   ├── lap-lanh/                                             # Twinkle — Apollo 11
│   │   │   ├── challenges/
│   │   │   │   ├── cleaning.ts
│   │   │   │   └── science.ts
│   │   │   ├── book-copy.ts
│   │   │   ├── definition.ts
│   │   │   ├── dialogue.ts
│   │   │   ├── ending-copy.ts
│   │   │   ├── images.ts
│   │   │   └── progress.ts
│   │   ├── surveyor/                                             # Round Eye — Surveyor 3
│   │   │   ├── challenges/
│   │   │   │   ├── excavation.ts
│   │   │   │   └── journal.ts
│   │   │   ├── book-copy.ts
│   │   │   ├── definition.ts
│   │   │   ├── dialogue.ts
│   │   │   ├── ending-copy.ts
│   │   │   ├── images.ts
│   │   │   └── progress.ts
│   │   ├── tai-thinh/                                            # Sharp Ear — Apollo 12
│   │   │   ├── book-copy.ts
│   │   │   ├── definition.ts
│   │   │   ├── dialogue.ts
│   │   │   └── progress.ts
│   │   ├── index.ts                                              # Chapter registration, order, and access conditions
│   │   └── types.ts                                              # Chapter data types
│   ├── levels/
│   ├── story/                                                    # Opening, ending, and shared dialogue
│   │   ├── ending/
│   │   │   ├── challenges/
│   │   │   │   ├── cards.ts
│   │   │   │   └── trail.ts
│   │   │   ├── credits.ts
│   │   │   ├── dialogue.ts
│   │   │   └── friend-dialogue.ts
│   │   ├── opening/
│   │   │   ├── dialogue.ts
│   │   │   ├── earth-dialogue.ts
│   │   │   ├── moon-dialogue.ts
│   │   │   └── scenes.ts
│   │   ├── dialogue.ts
│   │   ├── remembrance.ts
│   │   └── types.ts
│   ├── assets.ts                                                 # Sprite, portrait, and identity declarations
│   ├── i18n.ts                                                   # Language and shared interface labels
│   ├── play-instructions.ts
│   └── scene-copy.ts
├── export/
├── focus/                                                        # Gameplay focus management
│   └── game-focus.ts
├── game/                                                         # React/Phaser bridge and scenes
│   ├── scenes/
│   │   ├── ban-banh-luoi/                                        # Mesh Wheels — Apollo 15
│   │   │   ├── guide.ts
│   │   │   ├── rock.ts
│   │   │   ├── scenery.ts
│   │   │   └── soil.ts
│   │   ├── ending/
│   │   │   ├── backdrop.tsx
│   │   │   └── scenery.ts
│   │   ├── gac-troi/                                             # Sky Watcher — LRO
│   │   │   └── scenery.ts
│   │   ├── lap-lanh/                                             # Twinkle — Apollo 11
│   │   │   ├── optics.ts
│   │   │   └── scenery.ts
│   │   ├── opening/
│   │   │   └── scenery.ts
│   │   ├── surveyor/                                             # Round Eye — Surveyor 3
│   │   │   └── scenery.ts
│   │   ├── tai-thinh/                                            # Sharp Ear — Apollo 12
│   │   │   ├── layout.ts
│   │   │   └── scenery.ts
│   │   ├── journey-marker.ts
│   │   └── preview-scene.ts                                      # Phaser scene lifecycle and coordination
│   ├── GameCanvas.tsx
│   └── types.ts
├── hooks/                                                        # Application-level hooks
│   └── useWorkspaceFit.ts
├── state/                                                        # Reading, migrating, and saving progress
│   └── progress.ts
├── styles/                                                       # Fonts and shared CSS
│   ├── fonts.css
│   ├── scene-layout.css
│   └── styles.css
├── App.tsx                                                       # Application, chapter, and book coordination
└── main.tsx                                                      # React initialization and CSS loading
```

### Responsibilities

| Group | Responsibility |
| --- | --- |
| `components/` | Interface rendering, user interaction, and temporary state. Dedicated CSS stays with its owning group. |
| `content/` | Dialogue, readings, hints, factual feedback, challenge data, and chapter progress rules. |
| `game/` | Scene rendering, movement, and interaction with Phaser; connected to React through `GameCanvas.tsx`. |
| `state/` | Saving and reading journeys; preserving compatibility with old saves. |
| `audio/`, `focus/`, `hooks/` | Shared application audio, focus, and behavior. |
| `styles/` | Global CSS; `main.tsx` loads `fonts.css`, `styles.css`, and `scene-layout.css` in that order. |

Book-specific hooks belong in `components/book/`; application-level hooks belong in `hooks/`. Components retain PascalCase and existing export names, including `Sparkle*`. Import the needed module directly through relative paths; do not add aliases or barrel exports during a folder-only reorganization.

## Assets `public/`

```text
public/
├── audio/
│   └── music/                                                    # Recorded music
│       └── five-points-of-light.mp3
├── books/                                                        # Two protected original PDFs
│   ├── Truyen.pdf
│   └── Truyen_en.pdf
├── fonts/                                                        # WOFF2 fonts and OFL licenses
│   ├── bevietnampro/
│   │   ├── BeVietnamPro-Bold.woff2
│   │   ├── BeVietnamPro-Italic.woff2
│   │   ├── BeVietnamPro-Medium.woff2
│   │   ├── BeVietnamPro-Regular.woff2
│   │   ├── BeVietnamPro-SemiBold.woff2
│   │   └── OFL.txt
│   ├── lora/
│   │   ├── Lora-Italic-Variable.woff2
│   │   ├── Lora-Variable.woff2
│   │   └── OFL.txt
│   └── pdf/
└── images/
    ├── backgrounds/
    ├── book/                                                     # Book covers and diagrams
    │   ├── back-cover.svg
    │   ├── front-cover.svg
    │   └── reflector-array.svg
    ├── branding/                                                 # Team branding
    │   └── light-of-memories-primary.webp
    ├── memories/                                                 # Archival images by character
    │   ├── ban-banh-luoi/                                        # Mesh Wheels — Apollo 15
    │   │   ├── apollo-15-orbit-detail.webp
    │   │   ├── apollo-15-orbit-m175252641lr.webp
    │   │   ├── apollo-15-scott-7022567.webp
    │   │   └── apollo-15-wheel-detail.webp
    │   ├── gac-troi/                                             # Sky Watcher — LRO
    │   │   ├── apollo11-lro-annotated.webp
    │   │   ├── apollo11-lro.webp
    │   │   ├── apollo12-surveyor3-lro-annotated.webp
    │   │   ├── apollo12-surveyor3-lro.webp
    │   │   ├── conrad-surveyor3-as12-48-7134.webp
    │   │   ├── impact2013-after.webp
    │   │   ├── impact2013-before.webp
    │   │   └── south-pole-illumination.png
    │   ├── lap-lanh/                                             # Twinkle — Apollo 11
    │   │   ├── nasa/
    │   │   ├── apollo-11-deployed-as11-40-5952.webp
    │   │   └── apollo-11-placement-as11-40-5945.webp
    │   ├── surveyor/                                             # Round Eye — Surveyor 3
    │   │   ├── surveyor-apollo12.jpg
    │   │   ├── surveyor-footpad.jpg
    │   │   └── surveyor-trenches.jpg
    │   └── tai-thinh/                                            # Sharp Ear — Apollo 12
    │       ├── alsep-passive-seismic.jpg
    │       ├── apollo-12-as12-47-6916.webp
    │       ├── apollo-12-as12-47-6918.webp
    │       └── apollo-12-as12-47-6921.webp
    ├── portraits/                                                # Dialogue portraits
    │   ├── an.webp
    │   ├── ba.webp
    │   ├── ban-banh-luoi.webp
    │   ├── cay-da.webp
    │   ├── chi-hang.webp
    │   ├── cuoi.webp
    │   ├── gac-troi.webp
    │   ├── lap-lanh.webp
    │   ├── mat-tron.webp
    │   └── tai-thinh.webp
    └── sprites/                                                  # Sprites and sprite sheets
        ├── an-spritesheet.webp
        ├── ba-spritesheet.webp
        ├── chi-hang-seated-idle.png
        ├── cuoi-spritesheet.webp
        └── lap-lanh-idle.webp
```

The two PDFs in `public/books/` are absolutely protected: do not edit, regenerate, optimize, replace, rename, or delete them. Rules and reference hashes are in [AGENTS.md](../../AGENTS.md); opening behavior is explained in the [companion book guide](../README.md#companion-book-and-pdfs).

## Documentation `docs/`

```text
docs/
├── design/                                                       # Visuals, audio, and chapter design
│   ├── audio.md
│   ├── image-assets.md
│   ├── level-design-guide.md
│   └── visual-style.md
├── development/                                                  # Structure, technology, and maintenance
│   ├── folder-structure.md
│   └── technology-stack.md
├── levels/                                                       # Five chapter profiles
│   ├── Game1_Surveyor_3.md
│   ├── Game2_Apollo_11.md
│   ├── Game3_Apollo_12.md
│   ├── Game4_Apollo_15.md
│   └── Game5_LRO.md
├── project/                                                      # Team members and AI usage
│   └── ai-usage.md
├── README.md                                                     # Index and editorial guidance
└── references.md                                                 # Scientific references
```

The root `README.md` introduces the project and explains how to run it; `docs/README.md` is the documentation entry point. Maintain one README in `docs/`; do not create separate READMEs in its subfolders, `public/`, or `src/`. Keep scientific sources in `docs/references.md` to match the editorial rules.

## Content Organization Conventions

Paths such as `friends/`, `story/`, and `book/` in this section are relative to `src/content/` unless another directory is specified.

Content remains in TypeScript modules with both Vietnamese and English. The conventions below apply when maintaining content; reorganizing documentation does not change game wording, content order, unlock conditions, or the progress save format.

### Naming and Responsibilities

- Friend folders use **existing chapter IDs**: `surveyor`, `lap-lanh`, `tai-thinh`, `ban-banh-luoi`, `gac-troi`; do not introduce mixed folder names such as `sparkle`, `apollo11`, or `mat-tron`. `tai-thinh` and `ban-banh-luoi` retain their historical IDs.
- Content and scene files use `kebab-case`; within a folder already identified by ID, use role names (`dialogue.ts`, `scenery.ts`) rather than repeating the character name.
- Challenge files use task names: `excavation.ts`, `journal.ts`, `matching.ts`, `impact.ts`, `light.ts`, `shadow-watch.ts`, `cleaning.ts`, `science.ts`. `light.ts` retains dialogue/models for old branches; `shadow-watch.ts` contains instructions/feedback for the current dark-region model. Preserve old content without merging the two models.
- Progress types/functions belong in `progress.ts`; update flow belongs in `flow.ts` where already separated. React calls these modules; Phaser continues handling drawing, movement, and interaction.
- Dialogue, recollections, hints, and factual feedback belong in `content/`. Components hold the interface, temporary state, and short action labels; shared interface translations belong in `i18n.ts`.
- Import the module responsible for each function directly. `friends/index.ts` only registers chapters; do not collect every module into a barrel export that creates circular dependencies.
- Keep existing export names when only moving modules to limit unrelated changes. React components continue using PascalCase under existing conventions.

### Book Content and Images

`book/catalog.ts` aggregates book content from friends and readings in `book/`. The web edition uses `book/reading-order.ts`; PDFs open directly from existing files through `book/story-pdf.ts`. `book/publication.ts` and `book/pdf-edition.ts` retain editorial data and content checks. Do not duplicate readings in game modules or use PDF order to control web unlocks.

Authentic photos belong in `public/images/memories/<id>/`; Round Eye images use `surveyor`, matching the content folder. When moving an image, update the URL at its declaration while preserving the image file, source, credit, and image ID. `friends/<id>/images.ts` and `challenges/` only reference the corresponding assets. Shared sprites/portraits remain declared in `assets.ts`. See the [asset conventions](#static-asset-conventions).

### Save Compatibility

Keep chapter IDs, dialogue IDs, book page IDs, image IDs, phases, challenge order, `localStorage` keys, and schema v20 unchanged. Historical IDs containing `sparkle-*` or another character name do not change with folder names. Do not rename IDs for neatness; saves and hint links depend on them.

Old source paths have been updated at their call sites; do not leave forwarding modules in `content/levels/` or old `*-scenery.ts` files.

### Old Path Reference

Paths in this table are relative to `src/content/`, except the last row, which is relative to `src/`. This is a historical mapping, not a list of files to recreate.

| Before Refactoring | Current Location |
| --- | --- |
| `levels/index.ts`, `levels/types.ts` | `friends/index.ts`, `friends/types.ts` |
| `levels/surveyor.ts`, `levels/gac-troi.ts` | `friends/<id>/definition.ts` |
| `levels/lap-lanh.ts` | `friends/lap-lanh/{definition,dialogue,progress,images}.ts` |
| `levels/surveyor-encounter.ts` | `friends/surveyor/dialogue.ts` |
| `levels/surveyor-dig.ts` | `friends/surveyor/challenges/excavation.ts`, `friends/surveyor/images.ts` |
| `levels/surveyor-challenges.ts` | `friends/surveyor/challenges/journal.ts` |
| `levels/gac-troi-content.ts` | `friends/gac-troi/dialogue.ts`, `friends/gac-troi/book-copy.ts` |
| `levels/gac-troi-{matching,impact,light}.ts` | `friends/gac-troi/challenges/{matching,impact,light}.ts` |
| `levels/<id>-progress.ts`, `levels/gac-troi-flow.ts` | `friends/<id>/progress.ts`, `friends/gac-troi/flow.ts` |
| `book/surveyor-copy.ts`, `book/sparkle-copy.ts` | `friends/{surveyor,lap-lanh}/book-copy.ts` |
| `earth-dialogue.ts`, `moon-dialogue.ts` | `story/opening/`, with shared types/reducer in `story/` |
| `i18n.ts` (`storyLines`) | `story/opening/dialogue.ts` |
| `levels/ending-{chat,cards}.ts`, `levels/gac-troi-trail.ts` | `story/ending/` and `story/ending/challenges/` |
| `project-credits.ts` | `story/ending/credits.ts` |
| `game/PreviewScene.ts`, `game/*-scenery.ts` | `game/scenes/preview-scene.ts`, `game/scenes/<id>/scenery.ts` |

Run `npm run typecheck` and `npm run build`. Specialized check scripts and fixtures were removed on 14 November 2026; directly test content, unlocks, saves, and PDF links in the browser.

The “Open book PDF” button opens a new tab pointing to `public/books/Truyen.pdf` (VI) or `Truyen_en.pdf` (EN), preserving the original bytes. The PDF generator has been removed. See `AGENTS.md` for editorial rules and [PDFs and the companion book](../README.md#companion-book-and-pdfs) for manuscript opening behavior.

The current journey includes all five friends; the list and access conditions are in `friends/index.ts`. Scientific sources are collected in [docs/references.md](../references.md).

## Static Asset Conventions

Paths beginning with `fonts/`, `images/`, and `books/` in this section are relative to `public/`.

Vite copies the full structure of `public/` to the build directory. Place files by type and role; do not use a generic `assets/` directory for unclassified resources.

- Each friend’s folder ID matches `src/content/friends/` and `src/components/friends/`.
- New assets use lowercase names without diacritics, separated by hyphens; preserve existing font/PDF and file names to avoid unnecessary renaming.
- Shared images are declared in `src/content/assets.ts`; friend-specific archival images in `src/content/friends/<id>/images.ts`. Existing declarations in challenge or book modules retain their current owners.
- TypeScript URLs use `import.meta.env.BASE_URL` to support subpath deployment. Vite processes font CSS through `src/styles/fonts.css`.
- Preserve images, audio, fonts, PDFs, and licenses during folder reorganization. Do not recompress or convert formats during a refactor-only pass.
- Reuse existing images by URL instead of duplicating them between `book/` and `memories/`. Keep source/credit records beside image groups or in existing content data.
- When moving assets, update all active references and current documentation, then check builds and loading at both root URLs and subpaths.

## Checks When Changing Structure

After moving code or assets, run `npm run typecheck` and `npm run build`. Directly check content, unlock conditions, saves, PDF links, and asset loading in the browser. Specialized check scripts and fixtures have been removed; do not use old test output folders as evidence for the current version.

When adding or moving folders, update the corresponding tree in this document and active links. Topic-specific guidance on book editing, asset provenance, and licenses is in the [documentation README](../README.md).
