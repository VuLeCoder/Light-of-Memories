import { portraits } from '../content/assets';

/** Keep the original portrait out of the low-resolution pixel-art canvas. */
export function GacCompanion({ large = false }: { large?: boolean }) {
  return <img src={portraits.gacTroi.url} alt="" aria-hidden="true" draggable={false}
    style={{ position: 'absolute', left: large ? '71.25%' : '74%', top: large ? '9.5%' : '14%',
      width: large ? '16.5%' : '11%', height: large ? '27%' : '18%',
      objectFit: 'contain', imageRendering: 'auto', pointerEvents: 'none', zIndex: 2 }} />;
}
