import { useEffect, useRef } from 'react';
import type { RabbitStop } from '../content/levels/gac-troi-rabbit';
import { portraits, spriteSources } from '../content/assets';

/** Static scenery only; accessible input and reactions live in GacRabbitTrail. */
export function GacRabbitBackdrop({ stop, hang, orbit = false }: { stop: RabbitStop; hang: boolean; orbit?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let disposed = false;
    let game: import('phaser').Game | undefined;
    void Promise.all([import('phaser'), import('../game/gac-trail-scenery'), import('../game/gac-troi-scenery')]).then(([{ default: Phaser }, scenery, orbitScenery]) => {
      if (disposed) return;
      class Backdrop extends Phaser.Scene {
        create() {
          if (orbit) orbitScenery.gacTroiScenery(this);
          else scenery.drawGacTrail(this, `t04-${stop}`, true);

        }
      }
      game = new Phaser.Game({ type: Phaser.CANVAS, parent: host.current!, width: 960, height: 540,
        transparent: true, banner: false, audio: { noAudio: true }, scene: Backdrop,
        input: { keyboard: false, mouse: false, touch: false },
        scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH } });
    });
    return () => { disposed = true; game?.destroy(true); };
  }, [stop, hang, orbit]);
  return <><div className="rabbit-backdrop" ref={host} aria-hidden="true"/>{hang && <img className="rabbit-hang" src={portraits.chiHang.url} alt="" aria-hidden="true"/>}</>;
}

export function RabbitCuoi() {
  const source = spriteSources[2];
  const f = source.frame;
  return <svg className="rabbit-cuoi" viewBox={`0 0 ${f.width} ${f.height}`} aria-hidden="true">
    <image href={source.url} x={-f.x} y={-f.y} width={source.width} height={source.height}/>
  </svg>;
}
