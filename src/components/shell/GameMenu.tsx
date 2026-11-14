import type { AudioSettings } from '../../audio/settings';
import { useEffect, useRef, useState } from 'react';
import { copy, type Language } from '../../content/i18n';

export function GameMenu({ language, canContinue, onStart, onContinue, audio, onToggleAudio, audioSaveUnavailable, audioUnavailable }: {
  audio: AudioSettings; onToggleAudio: (kind: keyof AudioSettings) => void;
  audioSaveUnavailable: boolean; audioUnavailable: boolean;
  language: Language; canContinue: boolean; onStart: () => void; onContinue: () => void;
}) {
  const t = copy[language];
  const [screen, setScreen] = useState<'main' | 'help' | 'restart'>('main');
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, [screen]);

  return <section className={`game-menu${screen === 'help' ? ' game-menu--help' : ''}`} aria-labelledby="menu-title">
    <div className="menu-story">
      <span className="menu-eyebrow">✦ {t.brandCaption}</span>
      <h2 id="menu-title" ref={heading} tabIndex={-1}>{screen === 'help' ? t.menuHelpTitle : screen === 'restart' ? t.menuRestartTitle : <>{t.heroOne}<span>{t.heroTwo}</span></>}</h2>
      <p>{screen === 'help' ? t.menuHelpLead : screen === 'restart' ? t.menuRestartLead : t.menuLead}</p>
    </div>
    <div className="menu-actions">
      {screen === 'main' ? <>
        <button className="menu-primary" onClick={() => canContinue ? setScreen('restart') : onStart()}>{t.start} <span aria-hidden="true">→</span></button>
        <button disabled={!canContinue} onClick={onContinue} aria-describedby="continue-note">{t.continue}</button>
        <p className="menu-hint" id="continue-note">{canContinue ? t.continueHint : t.startHint}</p>
        <div className="menu-secondary">
          <button onClick={() => setScreen('help')}>{t.help}</button>

        </div>
        {(['music', 'effects'] as const).map(kind => <div className="menu-audio-row" key={kind}>
          <button aria-pressed={audio[kind]} onClick={() => onToggleAudio(kind)}>{kind === 'music' ? t.music : t.effects}: {audio[kind] ? t.on : t.off}</button>
        </div>)}
        <p className="menu-hint">{t.audioHint}</p>
        {audioSaveUnavailable && <p className="menu-hint" role="status">{t.soundNotice}</p>}
        {audioUnavailable && <p className="menu-hint" role="status">{t.audioUnavailable}</p>}
      </> : screen === 'help' ? <>
        <ul className="menu-help">{t.helpSteps.map((step, index) => {
          const separator = step.indexOf(':');
          return <li key={step}>
            <span className="menu-help-number" aria-hidden="true">0{index + 1}</span>
            <div><strong>{step.slice(0, separator)}</strong><p>{step.slice(separator + 1).trim()}</p></div>
          </li>;
        })}</ul>
        <div className="menu-help-bottom">
          <p className="menu-hint">{t.helpNote}</p>
          <button className="menu-primary" onClick={() => setScreen('main')}>{t.backMenu}</button>
        </div>
      </> : <>
        <button className="menu-primary" onClick={onStart}>{t.restart}</button>
        <button onClick={() => setScreen('main')}>{t.keepScene}</button>
      </>}
    </div>
  </section>;
}
