import { useEffect, useRef, useState } from 'react';
import { gameAudio, type AudioScene } from './game-audio';

/** Browser lifecycle belongs here; the renderer continues to use Phaser noAudio. */
export function useGameAudio(scene: AudioScene) {
  const current = useRef(scene);
  current.current = scene;
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    gameAudio.onUnavailable = setUnavailable;
    let background = document.hidden || !document.hasFocus();
    const sync = () => {
      gameAudio.setActive(!background && !document.hidden);
      gameAudio.update({ ...current.current, paused: current.current.paused || background || document.hidden });
    };
    const wake = (event: Event) => {
      if (!event.isTrusted || !(event.target instanceof Element) || !event.target.closest('.game-stage')) return;
      sync();
      if (current.current.musicEnabled || current.current.effectsEnabled) void gameAudio.unlock();
    };
    // React's semantic answer handlers run first, suppressing the fallback tap.
    const click = (event: MouseEvent) => {
      const button = event.target instanceof Element ? event.target.closest('button') : null;
      if (button && button.closest('.game-stage') && !button.disabled &&
          !button.closest('[inert], [hidden], .game-menu, [data-audio-silent]')) gameAudio.cue('touch');
    };
    const blur = () => { background = true; sync(); };
    const focus = () => { background = false; sync(); };
    const visibility = () => { background = document.hidden || !document.hasFocus(); sync(); };
    document.addEventListener('pointerdown', wake, true);
    document.addEventListener('keydown', wake, true);
    document.addEventListener('click', click);
    window.addEventListener('blur', blur);
    window.addEventListener('focus', focus);
    document.addEventListener('visibilitychange', visibility);
    sync();
    return () => {
      document.removeEventListener('pointerdown', wake, true);
      document.removeEventListener('keydown', wake, true);
      document.removeEventListener('click', click);
      window.removeEventListener('blur', blur);
      window.removeEventListener('focus', focus);
      document.removeEventListener('visibilitychange', visibility);
      gameAudio.dispose();
    };
  }, []);
  useEffect(() => {
    gameAudio.update({ ...scene, paused: scene.paused || document.hidden || !document.hasFocus() });
  }, [scene.musicEnabled, scene.effectsEnabled, scene.paused, scene.effectsPaused, scene.mood, scene.duck, scene.endingMusic, scene.endingSuspended]);
  return unavailable;
}
