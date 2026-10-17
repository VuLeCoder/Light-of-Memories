import { useEffect, useReducer, useRef } from 'react';
import { dialogueReducer, earthDialogue } from '../content/earth-dialogue';
import { portraits } from '../content/assets';

export function EarthDialogue({ paused, onComplete, onTurn }: {
  paused: boolean; onComplete: () => void; onTurn: (index: number) => void;
}) {
  const [state, dispatch] = useReducer(dialogueReducer, { index: 0, visible: 0, finished: false });
  const nextButton = useRef<HTMLButtonElement>(null);
  const completed = useRef(false);
  const line = earthDialogue[state.index];
  const full = state.visible >= line.text.length;
  const portrait = line.speaker === 'narrator' ? null : portraits[line.speaker];

  useEffect(() => { onTurn(state.index); }, [state.index, onTurn]);
  useEffect(() => {
    if (!paused) nextButton.current?.focus({ preventScroll: true });
  }, [paused]);
  useEffect(() => {
    if (paused || full || state.finished) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dispatch('reveal');
      return;
    }
    const timer = window.setInterval(() => dispatch('tick'), 35);
    return () => window.clearInterval(timer);
  }, [paused, full, state.index, state.finished]);
  useEffect(() => {
    if (!state.finished || completed.current) return;
    completed.current = true;
    onComplete();
  }, [state.finished, onComplete]);

  return <section className="dialogue" hidden={paused} aria-label="Câu chuyện An và bà" data-line={line.id} data-complete={full}
    onKeyDown={(event) => {
      if (event.code !== 'Space' && event.code !== 'Enter') return;
      // Own keyboard continuation here. Suppress the button's native key click,
      // and ignore held keys so one physical press performs one action.
      event.preventDefault();
      if (!event.repeat && !paused) dispatch('advance');
    }}>
    <div className="dialogue-body">
      {portrait && <div className={`dialogue-portrait dialogue-portrait-${line.speaker}`}><img src={portrait.url} alt={`Chân dung ${portrait.name}`} /></div>}
      <div className="dialogue-copy">
        <div className="dialogue-meta"><strong>{portrait?.name ?? 'Người dẫn truyện'}</strong><span>{state.index + 1} / {earthDialogue.length}</span></div>
        <p className="dialogue-text" aria-hidden="true">{line.text.slice(0, state.visible)}<span className="typing-mark">{full ? '' : '▎'}</span></p>
        <p className="sr-only" aria-live="polite" aria-atomic="true">{portrait?.name ?? 'Người dẫn truyện'}: {line.text}</p>
      </div>
    </div>
    <div className="dialogue-footer">
      <span>Nhấn Space / Enter hoặc bấm nút bên cạnh</span>
      <button ref={nextButton} className={full ? 'dialogue-next is-ready' : 'dialogue-next'} onClick={() => dispatch('advance')}>
        {full ? (state.index === earthDialogue.length - 1 ? 'Theo ánh trăng' : 'Tiếp theo') : 'Hiện hết câu'} <span aria-hidden="true">→</span>
      </button>
    </div>
  </section>;
}
