import { useEffect, useRef, useState } from 'react';
import { copy, type Language } from '../content/i18n';

export function GameMenu({ language, canContinue, onStart, onContinue }: {
  language: Language; canContinue: boolean; onStart: () => void; onContinue: () => void;
}) {
  const t = copy[language];
  const [screen, setScreen] = useState<'main' | 'help' | 'restart'>('main');
  const [sound, setSound] = useState(() => {
    try { return localStorage.getItem('cuoi.sound') !== 'off'; } catch { return true; }
  });
  const [notice, setNotice] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, [screen]);

  function toggleSound() {
    const next = !sound;
    setSound(next);
    try {
      localStorage.setItem('cuoi.sound', next ? 'on' : 'off');
      setNotice('');
    } catch { setNotice(t.soundNotice); }
  }

  return <section className="game-menu" aria-labelledby="menu-title">
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
          <button aria-pressed={sound} onClick={toggleSound}>{t.sound}: {sound ? t.on : t.off}</button>
        </div>
        <p className="menu-hint">{t.noMusic}</p>
        {notice && <p className="menu-hint" role="status">{notice}</p>}
      </> : screen === 'help' ? <>
        <ul className="menu-help">{t.helpSteps.map((step) => <li key={step}>{step}</li>)}</ul>
        <p className="menu-hint">{t.helpNote}</p>
        <button className="menu-primary" onClick={() => setScreen('main')}>{t.backMenu}</button>
      </> : <>
        <button className="menu-primary" onClick={onStart}>{t.restart}</button>
        <button onClick={() => setScreen('main')}>{t.keepScene}</button>
      </>}
    </div>
  </section>;
}
