# Image Assets

Conventions for the current version; see the [visual style](visual-style.md) and [references](../references.md). Vite copies assets from `public/` to `dist/`; URLs use `BASE_URL` as specified in the content definitions. Prefer WebP for new images, and preserve the content and attribution of archival images.

Update, 14 November 2026: the current journey includes all five friends. Archival images are grouped under `public/images/memories/<id>/`, including three Round Eye JPGs recently moved from `public/assets/` to `memories/surveyor/`. Preserve their format, image content, sources, and credits; update paths only. See the [public asset conventions](../development/folder-structure.md#static-asset-conventions).

- `branding/`: website logos.
- `portraits/`: dialogue portraits for the opening characters, the five friends, and Hằng.
- `sprites/`: the three An/Grandma/Cuội sheets, Twinkle’s idle sprite, and Hằng seated in the ending scene.
- `memories/<id>/`: archival images for the five friends; folder IDs match the content groups (`surveyor`, `lap-lanh`, `tai-thinh`, `ban-banh-luoi`, `gac-troi`).
- `book/`: covers, diagrams, and images used only in book content; archival images already in `memories/` are reused by URL rather than copied.
- T04: three backgrounds, the lantern beyond the rock crevice, and Hằng’s two poses are drawn in Phaser code in `src/game/scenes/ending/scenery.ts`; they share the T03 map silhouette. Hằng’s dialogue portrait is reused as a complete file, without cropping it into a sprite. These visuals are fictional story elements.
- Filenames use lowercase Vietnamese without diacritics, with hyphens between words.

## Notes for Future Use

- The first pass defined a separate idle frame for each character in `src/content/assets.ts`. Frames were selected manually without modifying the original images.
- An and Grandma have 2 rows; Cuội has 5. Each row shows 6 poses. Do not assume the sheets can be divided into a uniform grid.
- All three sheets have alpha transparency, and the areas outside the characters in the selected frames are transparent. Background or lighting RGB values in an image preview do not mean the background is opaque. All three idle frames retain the full character.
- The Banyan Tree portrait is an illustration, not a pixel art scene prop.
- Backgrounds, trees, benches, lanterns, and Sharp Ear’s equipment are drawn in code for each scene. The absence of a separate bitmap does not mean an asset is missing or needs generating.
