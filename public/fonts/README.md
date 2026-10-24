# Bundled fonts

Source: Google Fonts, downloaded 2026-10-24.

- Lora: https://github.com/google/fonts/tree/main/ofl/lora
- Be Vietnam Pro: https://github.com/google/fonts/tree/main/ofl/bevietnampro

The upstream TTF files were converted to WOFF2 with fontTools, without
subsetting or changing glyphs. Both families include Vietnamese coverage.
Lora includes variable weights 400–700 in normal and italic styles.
Be Vietnam Pro includes normal weights 400, 500, 600, 700 and italic 400.
Each family directory contains its upstream SIL Open Font License.

Font declarations are in `src/fonts.css`. Preserve the full character sets
when updating; Latin-only subsets omit Vietnamese vowels and tone marks.
