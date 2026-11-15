# Visual Style — Cuội

Use this document when designing images or requesting AI-generated artwork. It follows the existing interface and assets; it is not a request to replace all visuals.

## Overall Mood

A Vietnamese folktale under moonlight: a quiet Mid-Autumn Festival night that feels warm, slightly nostalgic, and full of discoveries waiting to happen. The primary audience is children in primary school, so characters should be appealing, expressions clear, and shapes recognizable. Hằng’s absence should invite curiosity, avoiding horror or a threatening darkness.

The website deliberately combines three visual approaches:

- **Interface:** midnight blue backgrounds, pale gold borders, cream text, and an airy storybook layout. Book pages use cream paper and subtle decoration.
- **Game scenes:** a side-on 2D view with pixel-based background shapes; clearly outlined sprites and crisp pixels. Phaser enables `pixelArt` and disables antialiasing.
- **Portraits:** children’s book illustrations with paper or painted texture, soft shading, and more detail than sprites. Do not substitute large portraits directly for in-game sprites.

## Reference Palette

| Color | Code | Role |
| --- | --- | --- |
| Midnight blue | `#101e28` | Website background |
| Dialogue blue | `#182c35` / `#10212a` | Translucent dialogue boxes |
| Soft gold | `#d7b875` | Borders and accents |
| Button gold | `#dfc18a` | Primary actions |
| Cream | `#eae7dc` | Text on dark backgrounds |
| Light blue-gray | `#bdcecb` | Secondary text |
| Book paper | `#f2ecdb` | A light area that balances the game |
| Lunar blue-gray | `#677484` | Lunar scene surfaces |

Moonlight should be cool; star lanterns and windows should glow warm yellow. Keep glows localized rather than applying strong bloom across the scene. Tiled roofs, brown shirts, bamboo, banyan trees, porches, and stone benches are important visual cues.

After each friend’s ending, a marker on the right edge lets Cuội walk over and return to the journey map: Round Eye has a glow suggesting Twinkle; Twinkle has ground ripples suggesting Sharp Ear; Sharp Ear has two parallel wheel tracks in lunar dust, hinting at Mesh Wheels. Effects should be subtle and leave characters visible; reduced-motion mode keeps markers static.

## Typography and UI

CSS specifies Lora/Georgia for headings and Be Vietnam Pro/sans-serif for reading text and controls. Both fonts are bundled in `public/fonts/`, declared in `src/styles/fonts.css`, and support Vietnamese. Fallback fonts apply during loading or if loading fails.

Dialogue is usually 20px, reduced to 18px on narrow screens; primary buttons are about 18px and instructions about 16px. Some decorative labels are smaller. Newly generated images should not include interface text: React should render it so Vietnamese/English switching and legibility are preserved. Use gently rounded corners and thin borders, without sci-fi frames or neon buttons.

Round Eye and Twinkle use button styling based on Sharp Ear: secondary buttons have blue-gray `#293e46` backgrounds, cream `#eee5d1` text, `#a9957080` borders, and 8px corners; primary buttons use gold `#dfc18a`, `#20313a` text, `#ead4a4` borders, and 7px corners. Standard buttons are at least 42px tall, with clear hover, focus, and locked states. Tool targets, photo cards, and glass-cleaning cells retain their interaction-specific appearance.

Place “Hint” beside “Back to Journey” in the scene header when a corresponding clue page exists: Round Eye T02, Twinkle T03/T04, and Sharp Ear’s challenges. Keep button positions appropriate to each panel’s content; do not force models or photos into identical layouts. At viewport widths up to 800px, Twinkle’s cleaning panel and scientific model appear below the lunar scene, leaving enough space for text and buttons.

## Reference Assets

- [Cuội](../../public/images/portraits/cuoi.webp): brown shirt with a light collar edge, dark blue trousers, black hair in a bun, fabric belt, and a friendly stance. Use the actual image as the identity reference.
- [An](../../public/images/portraits/an.webp), [Grandma](../../public/images/portraits/ba.webp), [Banyan Tree](../../public/images/portraits/cay-da.webp), [Hằng](../../public/images/portraits/chi-hang.webp), [Round Eye](../../public/images/portraits/mat-tron.webp): open the corresponding image before creating variants.
- [Cuội sprite](../../public/images/sprites/cuoi-spritesheet.webp): reference for character proportions and in-game animation.
- [Logo](../../public/images/branding/light-of-memories-primary.webp): a crescent moon cradling a golden star lantern, with a midnight blue background and Light of Memories lettering. Continue using the existing file when placing the logo.

## Suggested Specifications for New Images

**Backgrounds:** 16:9 composition, preferably 960 × 540 or a larger image at the same ratio. Keep a consistent side view, avoiding isometric or top-down cameras. Distant scenery should have lower contrast than characters. Keep the lower area simple because dialogue boxes cover part of the scene. The porch has An and Grandma on the left and the Moon at the upper right; the lunar scene has the banyan tree on the left, a bench in the middle, and an exit path to the right.

**Props:** transparent PNGs for separate tree, bench, and lantern layers; no embedded text, buttons, or HUD. Star lanterns have exactly five points. Trees and benches need clear ground contact so they do not appear to float.

**Sprites:** transparent backgrounds and full bodies without cropped hair, feet, or props; consistent proportions and clothing across frames. Keep facing direction, baseline, and lighting consistent. For new assets, use a uniform grid with padding between cells, specifying frame count, order, and cell dimensions. Existing sheets use irregular per-frame crops in `src/content/assets.ts`; do not apply a new grid to old images. When replacing a sheet, measure and update coordinates, anchors, and scale, then inspect the animation in motion.

**Portraits:** warm, hand-drawn illustrations with subtle texture and faces that remain readable at small sizes. Leave safety margins around the head; dialogue boxes may crop the image. Use transparency only when compositing requires it; do not assume existing portraits have transparent backgrounds.

Use lowercase, hyphen-separated filenames. Place images in the appropriate group in `public/images/` and declare URLs through `src/content/assets.ts` to respect the base path. See the [image conventions](image-assets.md).

## Sample Prompt

Replace the bracketed sections and attach existing character or sprite images as references.

> Create a [scene background / prop / sprite] for Cuội, a Vietnamese folktale game for primary school children. A quiet, nostalgic, warm, and magical Mid-Autumn Festival night. Side-on 2D view. Pixel art matching the reference sprite, recognizable shapes, midnight blue and blue-gray backgrounds, cream moonlight, and soft yellow lantern highlights. Content: [specific description]. Preserve the reference character’s identity, clothing, and proportions. [16:9 background with clearly walkable ground / transparent PNG prop / uniform grid sheet with N frames]. No text, watermarks, UI, neon, glossy plastic 3D, isometric perspective, or horror. Do not crop feet or props. Keep the lower area simple for dialogue.

For portraits, replace the pixel art requirement with “hand-drawn children’s book illustration, soft paper and paint texture, warm lines, clear expressions”; keep identity and palette requirements.

After the endings of all four friends, Cuội can click a character to walk over and talk, or approach and press E. Each friend has two short lines: thanks for visiting and a hint to look at the marker on the right. Dialogue can be replayed, leaves the marker visible, pauses movement while speaking, and does not change progress or rewards. Both Vietnamese and English are available.

Focus stays within the game area when moving from dialogue to challenges, receiving photos, or reaching the post-ending state, even if the focused element is removed, disabled, or placed inside an `inert` region. Shared restoration across the four chapters selects a dialogue button, movement canvas, or visible control. It must not steal focus from inputs, the book, or other page areas; clicking outside, tabbing to the book, or switching windows releases game control. The book’s return-to-game button uses the same focus target selection.
