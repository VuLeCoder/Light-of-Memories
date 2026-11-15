# Scene Audio — Version v3

This document describes the audio currently implemented. The game has **5 background tracks**, selected automatically by scene, and a shared set of interaction effects. There is no voice narration.

The audio documentation was prepared on **14 November 2026**, with a note about recorded music for the ending at the end of this document. During maintenance, also consult the modules in `src/audio/`.

## Background Music by Scene

The titles below are descriptive names used in this document; players do not select tracks from a menu. Durations cover one loop of 32 bars in 4/4 time, excluding reverb tails.

| Scene | Track / ID | Lead Instrument → Response | Tempo | Loop Duration | Mood |
| --- | --- | --- | --- | --- | --- |
| Opening with An and Grandma; Cuội asleep and waking; journey map; menu | A Nursery Rhyme under the Moon — `home` | Bamboo flute → Vietnamese zither | 96 BPM | 80 seconds | Gently cheerful and familiar, with short, memorable phrases |
| Round Eye — Surveyor 3 | Footprints on Lunar Soil — `surveyor` | T’rưng bamboo xylophone → Vietnamese zither | 108 BPM | 71.1 seconds | Bouncy, suggesting steps of discovery |
| Twinkle — Apollo 11 | Little Rays of Light — `sparkle` | Vietnamese zither → bamboo flute | 112 BPM | 68.6 seconds | Bright and lively; the fastest of the five tracks |
| Sky Watcher — LRO | A Breeze across the Moon — `watcher` | Bamboo flute → Vietnamese monochord | 88 BPM | 87.3 seconds | Softer, with space to observe |
| Meeting Hằng, “Friend or Trash?”, returning to An and Grandma, and team introductions through the end | The Moon Brings You Home — `reunion` | Bamboo flute → Vietnamese zither | 100 BPM | 76.8 seconds | Warm and cheerful, recalling the opening motif |

Each friend’s chapter keeps the same track throughout dialogue, tasks, and farewells. Sharp Ear and Mesh Wheels use `home`; Round Eye, Twinkle, and Sky Watcher use the tracks listed above. Returning to the journey map restores `home`. Replaying the ending uses `reunion`; returning to the map afterward uses `home`.

**The menu always takes priority with `home`**, even when opened from a chapter or the ending. Closing the menu selects the track for the scene behind it. The selection order in code is: menu → Hằng’s ending → Round Eye → Twinkle → Sky Watcher → default `home`.

If opening the menu changes the theme (for example, `surveyor` → `home` → `surveyor`), the chapter track restarts when the menu closes. Opening and closing the menu while the scene already uses `home` preserves the loop position.

## Style and Arrangement

The music is composed and synthesized with Web Audio in the style of pentatonic children’s nursery rhymes. The timbres evoke bamboo flute, Vietnamese zither, Vietnamese monochord, and T’rưng bamboo xylophone. These are oscillator-based approximations, rather than recordings of acoustic instruments or arrangements of existing folk songs.

Each track has 4 sections of 8 bars: call, repetition, variation, and cadence. Six-note phrases include rests and a short response, giving the loop a gentle bounce while leaving room for dialogue. Zither and T’rưng provide light accompaniment; Sky Watcher also uses a soft monochord bed and less percussion. Plucked and struck notes decay quickly, the flute has a quick onset, and the monochord uses gentle pitch bends.

## Playback and Controls

- The **Background Music** and **Sound Effects** switches are independent and default to on when no previous setting exists. There is no preview button.
- A real mouse, touch, or keyboard interaction within the game area is required to unlock browser audio. Afterward, background music also plays in the menu when enabled.
- Each track loops continuously. A new theme starts from the beginning and fades in over about 0.5 seconds. Scene changes that retain the same theme do not reset the loop.
- Music volume is reduced during dialogue and designated storytelling or transition states. The menu plays at normal volume; Hằng’s ending stays at reduced volume throughout the ending state.
- Opening the menu pauses gameplay and effects while menu music continues. All audio pauses when the tab is hidden or the window loses focus, and resumes on return if settings allow.
- Settings are saved in `localStorage`: `cuoi.music` and `cuoi.effects`, with values `on`/`off`. If separate values are absent, the game inherits the old `cuoi.sound` setting. If saving fails, the choices still apply for the current session.
- If audio cannot be unlocked, the menu displays a message; players can continue playing.

## Sound Effects

Effects are shared across scenes and do not change with the background track.

| ID | Current Trigger | Timbre |
| --- | --- | --- |
| `touch` | In-game buttons; revealing or advancing dialogue with a mouse or Space/Enter | Short, light zither |
| `success` | Correct answers and matches; completing an action or task | Rising zither notes |
| `retry` | Incorrect choices or checks; digging in the wrong spot | One soft zither note |
| `dig` | Digging in Round Eye’s chapter | Two low T’rưng notes |
| `gift` | Receiving the lantern, photos, or keepsakes; finding objects; certain ending milestones | Bright zither phrase |
| `lamp` | Receiving light on completing a friend’s chapter | Longer zither phrase specific to the chapter |
| `hint` | Opening the book with an in-game button | Vietnamese monochord |

Menu buttons do not play effects. Dialogue buttons handle effects separately to avoid double playback; automatically advancing dialogue does not produce a click sound. Playback is rate-limited to prevent sound buildup during rapid input.

## Source Code

| File | Role |
| --- | --- |
| [`src/audio/music-score.ts`](../../src/audio/music-score.ts) | Five tracks, BPM, notes, arrangements, and `selectMusicMood` |
| [`src/audio/game-audio.ts`](../../src/audio/game-audio.ts) | Timbre synthesis, loops, transitions, ducking, and effects |
| [`src/audio/useGameAudio.ts`](../../src/audio/useGameAudio.ts) | Unlocking audio after interaction, focus/tab handling, and button effects |
| [`src/audio/settings.ts`](../../src/audio/settings.ts) | Reading and saving the two audio switches |
| [`src/App.tsx`](../../src/App.tsx) | Mapping scene state to music theme, pause state, and volume reduction |

Phaser uses `noAudio`; the separate Web Audio system manages music and effects. No external music files are needed.

## Maintenance and Chapter Integration

- Select themes centrally through `selectMusicMood` and state in `App.tsx`; do not create a separate player or `AudioContext` for each chapter.
- Preserve independent switches, menu music priority, pausing on focus loss, and reduced volume during storytelling. Do not add a preview button.
- Trigger effects on the action or milestone that just occurred; loading a save or remounting a component must not replay rewards. Use the shared `SoundCue` set and check that `touch` does not overlap correct/incorrect/reward effects.
- When changing a track, update the scene table, BPM, duration, and related checks. Loop duration = `steps.length × beat / 2`, where `beat = 60 / BPM` seconds.
- Changes to background music preserve effects, the interface, and the game frame unless otherwise requested.

## Checks

Automated audio check scripts were removed on 14 November 2026. The project does not require Playwright or a fixed Chrome path to run or build.

For manual listening checks, follow: menu → opening → journey map → five friends → Hằng → An and Grandma → introductions → journey map. Open and close the menu in each chapter, test both switches independently, switch tabs and return, and test mouse/touch plus Space/Enter during dialogue. Listen for appropriate reading volume, smooth track transitions, and seamless loop boundaries.

## Recorded Music for the Ending

`public/audio/music/five-points-of-light.mp3` starts in the An and Grandma scene and continues through the credits and logo. Replaying the credits restarts the track. It loops and follows the background music switch; the menu and focus loss pause it, and returning resumes it. If loading fails, existing synthesized music is used. Hằng’s scenes and the mini game retain their existing music.
