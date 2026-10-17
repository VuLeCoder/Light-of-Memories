// Vite bundles these original files; no duplicate copy in public/ is needed.
import anPortrait from '../../images/portraits/an.png';
import baPortrait from '../../images/portraits/ba.png';
import cuoiPortrait from '../../images/portraits/cuoi.png';
import cayDaPortrait from '../../images/portraits/cay-da.png';
import matTronPortrait from '../../images/portraits/mat-tron.png';
import chiHangPortrait from '../../images/portraits/chi-hang.png';
import anSheet from '../../images/sprites/an-spritesheet.png';
import baSheet from '../../images/sprites/ba-spritesheet.png';
import cuoiSheet from '../../images/sprites/cuoi-spritesheet.png';

export const portraits = {
  an: { name: 'An', url: anPortrait }, ba: { name: 'Bà', url: baPortrait },
  cuoi: { name: 'Cuội', url: cuoiPortrait }, cayDa: { name: 'Cây Đa', url: cayDaPortrait },
  matTron: { name: 'Mắt Tròn', url: matTronPortrait }, chiHang: { name: 'Chị Hằng', url: chiHangPortrait },
} as const;

// Hand-inspected rectangles in ORIGINAL image pixels, not an assumed uniform grid.
// Only one complete resting pose is selected per sheet for milestone 1.
export const spriteSources = [
  { key: 'an', url: anSheet, width: 1536, height: 1024,
    frame: { x: 8, y: 112, width: 270, height: 394 }, foot: { x: 128, y: 380 } },
  { key: 'ba', url: baSheet, width: 2172, height: 724,
    frame: { x: 65, y: 0, width: 270, height: 362 }, foot: { x: 140, y: 352 } },
  { key: 'cuoi', url: cuoiSheet, width: 1536, height: 1024,
    frame: { x: 88, y: 0, width: 150, height: 230 }, foot: { x: 78, y: 222 } },
] as const;

export const missingAssets = ['Hiên nhà Trung Thu', 'Nền Mặt Trăng', 'Cây đa pixel', 'Ghế đá', 'Đèn năm cánh tách riêng'];

// First sleeping pose, inspected separately: the source is not a uniform grid.
export const cuoiSleepFrame = { x: 12, y: 484, width: 244, height: 108, foot: { x: 122, y: 102 } };

// Hand-trimmed poses from the original sheet. The wake row has uneven spacing,
// so each frame keeps its own rectangle and is aligned by its feet in Phaser.
export const cuoiWakeFrames = [
  { x: 12, y: 694, width: 244, height: 108 },
  { x: 294, y: 682, width: 218, height: 120 },
  { x: 512, y: 645, width: 244, height: 157 },
  { x: 812, y: 614, width: 190, height: 188 },
  { x: 1073, y: 614, width: 172, height: 189 },
  { x: 1328, y: 605, width: 142, height: 199 },
] as const;

export const cuoiWalkFrames = [
  { x: 78, y: 237, width: 154, height: 222 },
  { x: 331, y: 237, width: 160, height: 222 },
  { x: 568, y: 237, width: 164, height: 222 },
  { x: 810, y: 239, width: 160, height: 220 },
  { x: 1064, y: 237, width: 157, height: 222 },
  { x: 1318, y: 237, width: 151, height: 222 },
] as const;
