import { useEffect, useRef } from 'react';
import { spriteSources } from '../../../content/assets';

/** The finale reuses the awakening scene and the Earth opening artwork. */
export function FinaleBackdrop({ closing, showHang = true }: { closing: 'moon' | 'earth'; showHang?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    let game: import('phaser').Game | undefined;
    void Promise.all([import('phaser'), import('../opening/scenery')]).then(([{ default: Phaser }, opening]) => {
      if (disposed) return;
      class Backdrop extends Phaser.Scene {
        preload() {
          if (closing === 'earth') for (const source of spriteSources) if (source.key !== 'cuoi') this.load.image(source.key, source.url);
        }
        create() {
          if (closing === 'earth') {
            opening.cacheScenery(this, opening.earthScenery);
            for (const source of spriteSources) {
              if (source.key === 'cuoi') continue;
              const f = source.frame;
              this.textures.get(source.key).add('rest', 0, f.x, f.y, f.width, f.height);
            }
            opening.drawEarthFamily(this);
          } else if (closing === 'moon') {
            opening.moonScenery(this);
          }
        }
      }
      // Match the opening renderer as well as its artwork: smoothing changes
      // the faces noticeably even when the same source frames are used.
      game = new Phaser.Game({ type: closing === 'earth' ? Phaser.AUTO : Phaser.CANVAS, parent: host.current!, width: 960, height: 540,
        ...(closing === 'earth' ? { pixelArt: true, antialias: false, backgroundColor: '#101d2b' } : {}),
        transparent: true, banner: false, audio: { noAudio: true }, scene: Backdrop,
        input: { keyboard: false, mouse: false, touch: false },
        scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH } });
    });
    return () => { disposed = true; game?.destroy(true); };
  }, [closing]);
  return <><div className="finale-backdrop" data-closing={closing} ref={host} aria-hidden="true"/>
    {closing === 'moon' && showHang && <div className="finale-hang finale-hang-seated" data-closing={closing} aria-hidden="true"><img src={`${import.meta.env.BASE_URL}images/sprites/chi-hang-seated-idle.png`} alt=""/></div>}</>;
}

export function FinaleCuoi() {
  const source = spriteSources[2];
  const f = source.frame;
  return <svg className="finale-cuoi" style={{ overflow: 'visible' }} viewBox={`0 0 ${f.width} ${f.height}`} aria-hidden="true">
    {/* The same idle fist and wrist angle as the controllable Cuội. Draw behind his hand. */}
    <g transform="translate(106 154) rotate(38.96) scale(1.6129) translate(0 -27)"><FriendLantern/></g>
    <svg width={f.width} height={f.height} viewBox={`0 0 ${f.width} ${f.height}`} overflow="hidden">
      <image href={source.url} x={-f.x} y={-f.y} width={source.width} height={source.height}/>
    </svg>
  </svg>;
}

/** Same geometry, paper and five earned points as PreviewScene's handheld lantern. */
function FriendLantern() {
  const at = (n: number, r: number) => `${Math.cos(-Math.PI / 2 + n * Math.PI / 5) * r},${Math.sin(-Math.PI / 2 + n * Math.PI / 5) * r}`;
  const outline = Array.from({ length: 10 }, (_, i) => at(i, i % 2 ? 9 : 21)).join(' ');
  return <g strokeLinejoin="round">
    {Array.from({ length: 5 }, (_, i) => <g key={i}>
      <polygon points={`0,0 ${at(i * 2 - 1, 9)} ${at(i * 2, 21)}`} fill="#ffe6a2"/>
      <polygon points={`0,0 ${at(i * 2, 21)} ${at(i * 2 + 1, 9)}`} fill="#f2be63"/>
    </g>)}
    <polygon points={outline} fill="none" stroke="#745336" strokeWidth="2.5"/>
    <polygon points={outline} fill="none" stroke="#c5a36a" strokeWidth=".8"/>
    {Array.from({ length: 5 }, (_, i) => <g key={i}>
      <polyline points={`${at(i * 2 - 1, 9)} ${at(i * 2, 21)} ${at(i * 2 + 1, 9)}`} fill="none" stroke="#ffefbd" strokeOpacity=".95"/>
      <polyline points={`0,0 ${at(i * 2, 21)}`} stroke="#a67c3e" strokeOpacity=".85"/>
    </g>)}
    <circle r="3" fill="#9c8050"/>
    <path d="M0 9V35" stroke="#805634" strokeWidth="3"/>
    {[-12, 12].map(x => <g key={x}>
      <path d={`M${x} 15V23`} stroke="#9d855c"/>
      <rect x={x - 2} y="23" width="4" height="8" fill="#744333"/>
      <path d={`M${x} 23V33`} stroke="#a77b4b"/>
    </g>)}
  </g>;
}
