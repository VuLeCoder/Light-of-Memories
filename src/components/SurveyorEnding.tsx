import { useEffect, useRef } from 'react';
import type { Language } from '../content/i18n';
import type { SurveyorProgress } from '../content/levels/surveyor-progress';
import { memoryPhotos } from '../content/levels/surveyor-dig';

const endingCopy = {
  vi: {
    labels: ['Một cuộc gặp giữa im lặng', 'Một ký ức, một ánh sao', 'Mang câu chuyện đi tiếp'],
    story: 'Mình nhớ lần những vị khách ghé thăm năm 1969. Sau những ngày im lặng trên Mặt Trăng, lại có bước chân đến bên mình. Họ mang một phần của mình về Trái Đất… và hôm nay, Cuội đã tìm lại câu chuyện ấy.',
    light: 'Cảm ơn Cuội đã lắng nghe. Hãy giữ ký ức này trong chiếc đèn của cậu nhé!',
    promise: 'Mình sẽ nhớ tên bạn, Mắt Tròn. Mỗi khi nhìn cánh sao này, mình sẽ nhớ cuộc gặp của chúng ta.',
    caption: 'Apollo 12 ghé thăm Surveyor 3 · NASA, 1969',
    reward: 'Cánh sao đầu tiên đã sáng · 1/5',
    next: 'Lắng nghe tiếp', kindle: 'Thắp sáng cánh sao', continue: 'Mang theo ánh sáng', back: 'Trở về lộ trình', replay: 'Xem lại đoạn kết',
    journal: 'Ba bức ảnh đã được lưu trong sổ tay của Cuội.',
  },
  en: {
    labels: ['A visit in the silence', 'One memory, one light', 'Carry the story onward'],
    story: 'I remember my visitors in 1969. After the quiet days on the Moon, footsteps reached me again. They took a part of me back to Earth… and today, Cuội, you have found that story again.',
    light: 'Thank you for listening, Cuội. Keep this memory in your lantern!',
    promise: 'I will remember your name, Round Eyes. Whenever I see this star point, I will remember our meeting.',
    caption: 'Apollo 12 visits Surveyor 3 · NASA, 1969',
    reward: 'The first star point is shining · 1/5',
    next: 'Keep listening', kindle: 'Light the star point', continue: 'Carry the light', back: 'Return to the route', replay: 'Replay the ending',
    journal: 'All three photographs are now in Cuội’s notebook.',
  },
};

/** Five separate paper panels; only the top point receives this friend's light. */
function MemoryLantern({ lit }: { lit: boolean }) {
  return <svg className={`ending-lantern ${lit ? 'is-lit' : ''}`} viewBox="0 0 240 240" role="img" aria-label={lit ? '★ 1/5' : '☆ 0/5'}>
    <circle className="lantern-aura" cx="120" cy="110" r="90" fill="#ffd88a" opacity="0" />
    <path d="M120 26V10M114 10H126" stroke="#bd9761" strokeWidth="3" fill="none" />
    <g stroke="#c89b61" strokeWidth="2" strokeLinejoin="round">
      <path className="lit-point" d="M120 110L97 79L120 26L143 79Z" fill="#67503c" />
      <path d="M120 110L143 79L208 85L159 126Z" fill="#664e3c" />
      <path d="M120 110L159 126L175 190L120 156Z" fill="#594638" />
      <path d="M120 110L120 156L65 190L81 126Z" fill="#624a39" />
      <path d="M120 110L81 126L32 85L97 79Z" fill="#71543b" />
      <path d="M120 26V156M32 85L159 126M208 85L81 126M65 190L143 79M175 190L97 79" strokeWidth="1" opacity=".6" fill="none" />
    </g>
    <circle cx="120" cy="110" r="5" fill="#f3ca83" />
    <g stroke="#d4ae6f" strokeWidth="2"><path d="M65 190V210M175 190V210" /></g>
    <g fill="#b66447"><path d="M61 208H69L72 229H58Z" /><path d="M171 208H179L182 229H168Z" /></g>
    <path d="M65 211V229M175 211V229" stroke="#e8bd73" />
  </svg>;
}

export function SurveyorEnding({ language, progress, onChange, onBack }: {
  language: Language; progress: SurveyorProgress; onChange: (p: SurveyorProgress) => void; onBack: () => void;
}) {
  const t = endingCopy[language];
  const step = Math.min(progress.turn, 3);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, [step]);
  return <div className="surveyor-ending">
    <div className="ending-steps" aria-label={`${step === 0 ? 1 : step < 3 ? 2 : 3}/3`}><span className="is-active" /><span className={step >= 1 ? 'is-active' : ''} /><span className={step >= 3 ? 'is-active' : ''} /></div>
    <h3 ref={heading} tabIndex={-1}>{t.labels[step === 0 ? 0 : step < 3 ? 1 : 2]}</h3>
    {step === 0 ? <figure className="ending-photo"><img src={memoryPhotos.visit} alt={t.caption} /><figcaption>{t.caption}</figcaption></figure> : <MemoryLantern lit={step >= 2} />}
    <p className="ending-speech"><b>{step === 3 ? 'Cuội' : language === 'vi' ? 'Mắt Tròn' : 'Round Eyes'}:</b> {step === 0 ? t.story : step === 3 ? t.promise : t.light}</p>
    <p className="ending-note" role="status">{step >= 2 ? t.reward : t.journal}</p>
    <nav className="ending-actions" aria-label={language === 'vi' ? 'Đoạn kết' : 'Ending'}>
      {step === 3 && <button onClick={() => onChange({ ...progress, turn: 0 })}>{t.replay}</button>}
      <button className="journey-primary" onClick={() => step === 3 ? onBack() : onChange({ ...progress, turn: step + 1 })}>{step === 0 ? t.next : step === 1 ? t.kindle : step === 2 ? t.continue : t.back} →</button>
    </nav>
  </div>;
}
