import { useEffect, useRef, useState } from 'react';
import type { Language } from '../../content/i18n';
import { closingCredits, creditsTiming, projectCredits } from '../../content/story/ending/credits';

type CreditsPhase = 'roll' | 'enter' | 'hold' | 'exit' | 'leaving' | 'done';

export function ProjectCredits({ language, paused, onComplete }: { language: Language; paused: boolean; onComplete: () => void }) {
  const [step, setStep] = useState(-1);
  const [phase, setPhase] = useState<CreditsPhase>('roll');
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const clock = useRef({ key: '', remaining: 0 });
  const complete = useRef(onComplete);
  const completed = useRef(false);
  complete.current = onComplete;
  const card = closingCredits[step];

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReducedMotion(query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    if (phase === 'done') {
      if (!paused && !completed.current) {
        completed.current = true;
        complete.current();
      }
      return;
    }
    const key = `${step}:${phase}:${reducedMotion}`;
    if (clock.current.key !== key) {
      clock.current = {
        key,
        remaining: phase === 'roll' ? creditsTiming.team : phase === 'hold' ? card.duration : reducedMotion ? 0 : creditsTiming.fade,
      };
    }
    if (paused) return;
    const started = performance.now();
    const timer = window.setTimeout(() => {
      if (phase === 'roll') { setStep(0); setPhase('enter'); }
      else if (phase === 'enter') setPhase('hold');
      else if (phase === 'hold') setPhase('exit');
      else if (phase === 'exit' && step < closingCredits.length - 1) { setStep(step + 1); setPhase('enter'); }
      else setPhase('done');
    }, clock.current.remaining);
    return () => {
      window.clearTimeout(timer);
      clock.current.remaining = Math.max(0, clock.current.remaining - (performance.now() - started));
    };
  }, [step, phase, paused, reducedMotion, card]);

  return <section className={`project-credits${phase === 'leaving' ? ' is-leaving' : ''}`} aria-label={projectCredits.heading[language]}
    data-credits-step={card?.id ?? 'team'} data-credits-phase={phase}
    style={{ animationPlayState: paused ? 'paused' : 'running' }}>
    {step === -1 ? <div className="credits-roll" style={{ animationPlayState: paused ? 'paused' : 'running' }}>
      <h2>{projectCredits.title}</h2><p>{projectCredits.heading[language]}</p>
      {projectCredits.members.map(name => <p key={name} className="credits-member">{name}</p>)}
      <div className="credits-logo">
        <img src={`${import.meta.env.BASE_URL}images/branding/light-of-memories-primary.webp`} alt="Light of Memories" />
      </div>
    </div> : <div key={card.id} className={`credits-card${card.id === 'the-end' ? ' credits-end' : ''}`} data-phase={phase}
      style={{ animationPlayState: paused ? 'paused' : 'running' }} aria-live="polite" aria-atomic="true">
      <h2>{card.heading[language]}</h2>
      {card.paragraphs.map((paragraph, index) => <p key={index}>{paragraph[language]}</p>)}
    </div>}
    <button disabled={paused || phase === 'leaving' || phase === 'done'} onClick={() => setPhase('leaving')}>{language === 'vi' ? 'Về lộ trình / Bỏ qua' : 'Return / Skip'}</button>
  </section>;
}
