// Project image URLs respect the deployment base path. Conversion details live in docs/image-assets.md.
const imageUrl = (path: string) => `${import.meta.env.BASE_URL}images/${path}`;

export const brandLogo = imageUrl('branding/light-of-memories-primary.webp');

const anPortrait = imageUrl('portraits/an.webp');
const baPortrait = imageUrl('portraits/ba.webp');
const cuoiPortrait = imageUrl('portraits/cuoi.webp');
const cayDaPortrait = imageUrl('portraits/cay-da.webp');
const matTronPortrait = imageUrl('portraits/mat-tron.webp');
const chiHangPortrait = imageUrl('portraits/chi-hang.webp');
const anSheet = imageUrl('sprites/an-spritesheet.webp');
const baSheet = imageUrl('sprites/ba-spritesheet.webp');
const cuoiSheet = imageUrl('sprites/cuoi-spritesheet.webp');

export const portraits = {
  taiThinh: { name: 'Tai Thính', url: imageUrl('portraits/tai-thinh.webp') },
  lapLanh: { name: 'Lấp Lánh', url: imageUrl('portraits/lap-lanh.webp') },
  an: { name: 'An', url: anPortrait }, ba: { name: 'Bà', url: baPortrait },
  cuoi: { name: 'Cuội', url: cuoiPortrait }, cayDa: { name: 'Cây Đa', url: cayDaPortrait },
  matTron: { name: 'Mắt Tròn', url: matTronPortrait }, chiHang: { name: 'Chị Hằng', url: chiHangPortrait },
} as const;

// M0–M1 art preparation; chapter registration and saves are handled in M2.
export const taiThinhPhotos = {
  pse: imageUrl('memories/tai-thinh/apollo-12-as12-47-6916.webp'),
  station: imageUrl('memories/tai-thinh/apollo-12-as12-47-6918.webp'),
  magnetometer: imageUrl('memories/tai-thinh/apollo-12-as12-47-6921.webp'),
} as const;

// Hand-inspected rectangles in ORIGINAL image pixels, not an assumed uniform grid.
// Resting poses; Cuội animation frames are defined separately below.
export const spriteSources = [
  { key: 'an', url: anSheet, width: 1536, height: 1024,
    frame: { x: 8, y: 112, width: 270, height: 394 }, foot: { x: 128, y: 380 } },
  { key: 'ba', url: baSheet, width: 2172, height: 724,
    frame: { x: 65, y: 0, width: 270, height: 362 }, foot: { x: 140, y: 352 } },
  { key: 'cuoi', url: cuoiSheet, width: 1536, height: 1024,
    frame: { x: 92, y: 8, width: 135, height: 220 }, foot: { x: 67, y: 216 } },
] as const;


// First sleeping pose, inspected separately: the source is not a uniform grid.
export const cuoiSleepFrame = { x: 20, y: 486, width: 238, height: 108, foot: { x: 119, y: 104 } };

// Hand-trimmed poses from the original sheet. The wake row has uneven spacing,
// so each frame keeps its own rectangle and is aligned by its feet in Phaser.
export const cuoiWakeFrames = [
  { x: 20, y: 700, width: 239, height: 106 },
  { x: 297, y: 687, width: 229, height: 118 },
  { x: 549, y: 650, width: 211, height: 156 },
  { x: 818, y: 620, width: 180, height: 187 },
  { x: 1078, y: 618, width: 163, height: 189 },
  { x: 1334, y: 606, width: 135, height: 201 },
] as const;

export const cuoiWalkFrames = [
  { x: 74, y: 239, width: 156, height: 226 },
  { x: 343, y: 239, width: 145, height: 226 },
  { x: 577, y: 239, width: 159, height: 226 },
  { x: 833, y: 239, width: 163, height: 226 },
  { x: 1104, y: 239, width: 148, height: 226 },
  { x: 1339, y: 239, width: 156, height: 226 },
] as const;
