import { useEffect, useRef, useState } from 'react';
import type { Language } from '../content/i18n';
import type { StoryLine } from '../content/earth-dialogue';
import type { SurveyorProgress } from '../content/levels/surveyor-progress';
import { digCopy, memoryPhotos } from '../content/levels/surveyor-dig';
import { eventOrder } from '../content/levels/surveyor-progress';
import { EarthDialogue } from './EarthDialogue';

const endingCopy = {
  vi: {
    title: 'Câu chuyện của Mắt Tròn', labels: ['Lần đầu chạm đất', 'Đôi mắt và chiếc xẻng', 'Những người bạn ghé thăm'],
    stories: [
      'Mình đến Mặt Trăng năm 1967. Nhìn này, phần chân tàu của mình đã để lại dấu trên đất!',
      'Mình dùng máy ảnh để quan sát và chiếc xẻng để đào đất. Hơn hai năm sau, những rãnh mình đào vẫn còn đó.',
      'Rồi hai phi hành gia đến thăm mình. Họ mang vài bộ phận của mình về Trái Đất để tìm hiểu. Nhờ Cuội, mình đã nhớ lại cuộc gặp ấy!',
    ],
    captions: ['Chân đế Surveyor 3 · 1967 · NASA', 'Rãnh khảo sát năm 1967, được chụp lại năm 1969 · NASA', 'Pete Conrad bên Surveyor 3 · 1969 · NASA'],
    before: 'Trang trước', next: 'Trang tiếp', return: 'Trở lại bên Mắt Tròn', listen: 'Nghe Mắt Tròn kể', carry: 'Mang theo ánh sáng',
    route: 'Về lộ trình', replay: 'Xem lại đoạn kết', playAgain: 'Chơi lại', reward: 'Đã thắp sáng 1/5 cánh sao',
    distant: 'Đi đến điểm sáng phía xa để trở về lộ trình.', journal: 'Ba bức ảnh đã được lưu trong sổ tay của Cuội.', unavailable: 'Ảnh tư liệu chưa tải được.', retry: 'Tải lại ảnh',
    intro: [
      { id: 'ending-intro-0', speaker: 'matTron', text: 'Những bức ảnh… giờ đã trở về đúng chỗ rồi.' },
      { id: 'ending-intro-1', speaker: 'cuoi', text: 'Bạn nhớ hai người từng đến thăm bạn chưa?' },
      { id: 'ending-intro-2', speaker: 'matTron', text: 'Mình nhớ rồi. Để mình kể Cuội nghe nhé.' },
    ],
    outro: [
      { id: 'ending-outro-0', speaker: 'matTron', text: 'Cảm ơn Cuội đã giúp mình nhớ lại. Mong ánh sáng này sẽ soi đường cho bạn.' },
      { id: 'ending-outro-1', speaker: 'cuoi', text: 'Một cánh sao sáng rồi! Mỗi khi nhìn cánh sao này, mình sẽ nhớ cuộc gặp của chúng ta.' },
      { id: 'ending-outro-2', speaker: 'cuoi', text: 'Kìa, phía xa có một điểm sáng! Không biết còn ai đang đợi mình nhỉ?' },
      { id: 'ending-outro-3', speaker: 'matTron', text: 'Ngoài kia còn một người bạn nữa. Có lẽ bạn ấy cũng có một câu chuyện muốn kể.' },
    ],
  },
  en: {
    title: 'Round Eyes’ story', labels: ['The first touchdown', 'A camera and a scoop', 'Visitors on the Moon'],
    stories: [
      'I reached the Moon in 1967. Look! My feet left marks in the soil.',
      'I used my camera to look around and my scoop to dig. More than two years later, my little trenches were still there.',
      'Then two astronauts came to visit me. They took some of my parts back to Earth to study. Cuội helped me remember their visit!',
    ],
    captions: ['Surveyor 3 footpad · 1967 · NASA', 'Trenches dug in 1967, photographed in 1969 · NASA', 'Pete Conrad beside Surveyor 3 · 1969 · NASA'],
    before: 'Previous page', next: 'Next page', return: 'Return to Round Eyes', listen: 'Listen to the story', carry: 'Carry the light',
    route: 'View the route', replay: 'Replay the ending', playAgain: 'Play again', reward: 'One of five star points is shining',
    distant: 'Walk to the distant light to return to the route.', journal: 'All three photographs are now in Cuội’s notebook.', unavailable: 'The archive photo could not load.', retry: 'Retry photo',
    intro: [
      { id: 'ending-intro-0', speaker: 'matTron', text: 'The photographs… they are all back in the right places.' },
      { id: 'ending-intro-1', speaker: 'cuoi', text: 'Do you remember the two people who came to visit you?' },
      { id: 'ending-intro-2', speaker: 'matTron', text: 'I do. Let me tell you about them, Cuội.' },
    ],
    outro: [
      { id: 'ending-outro-0', speaker: 'matTron', text: 'Thank you for helping me remember, Cuội. May this light guide your way.' },
      { id: 'ending-outro-1', speaker: 'cuoi', text: 'One star point is shining! Whenever I see it, I will remember our meeting.' },
      { id: 'ending-outro-2', speaker: 'cuoi', text: 'Look, a light in the distance! I wonder who else is waiting for me?' },
      { id: 'ending-outro-3', speaker: 'matTron', text: 'There is another friend out there. Perhaps they have a story to tell, too.' },
    ],
  },
} as const satisfies Record<Language, { intro: readonly StoryLine[]; outro: readonly StoryLine[] } & Record<string, unknown>>;

function MemoryPhoto({ src, caption, language }: { src: string; caption: string; language: Language }) {
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  return <figure className="ending-photo">
    {failed ? <div className="ending-photo-error" role="status"><p>{endingCopy[language].unavailable}</p><button onClick={() => { setFailed(false); setAttempt(n => n + 1); }}>{endingCopy[language].retry}</button></div>
      : <img key={attempt} src={src} alt={caption} onError={() => setFailed(true)} />}
    <figcaption>{caption}</figcaption>
  </figure>;
}

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

export function SurveyorEnding({ language, progress, onChange, onReplay, onBack, paused = false }: {
  language: Language; progress: SurveyorProgress; onChange: (p: SurveyorProgress) => void; onReplay: () => void; onBack: () => void; paused?: boolean;
}) {
  const t = endingCopy[language];
  // 0–2: lunar conversation; 3–5: recollection; 6–9: lantern conversation; 10: farewell.
  const step = Math.min(progress.turn, 10);
  const recollection = step >= 3 && step <= 5;
  const page = step - 3;
  const lit = step >= 7;
  const [gifting, setGifting] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if (!paused) heading.current?.focus({ preventScroll: true }); }, [step, paused]);
  const go = (turn: number) => {
    if (step === 6 && turn === 7) setGifting(true);
    if (turn < 7) setGifting(false);
    onChange({ ...progress, turn });
  };
  if (recollection) return <section className="journey-view ending-recollection" hidden={paused} lang={language} aria-label={t.title}>
    <header><span aria-hidden="true">★ ★ ★</span><h2>{t.title}</h2></header>
    <div className="surveyor-ending">
      <div className="ending-steps" aria-label={`${page + 1}/3`}>{eventOrder.map((id, index) => <span key={id} className={index === page ? 'is-active' : ''} />)}</div>
      <h3 ref={heading} tabIndex={-1}>{t.labels[page]}</h3>
      <MemoryPhoto key={page} src={memoryPhotos[eventOrder[page]]} caption={t.captions[page]} language={language} />
      <p className="ending-speech"><b>{language === 'vi' ? 'Mắt Tròn' : 'Round Eyes'}:</b> {t.stories[page]}</p>
      <p className="ending-note">{t.journal}</p>
      <nav className="ending-actions" aria-label={t.title}>
        <button disabled={page === 0} onClick={() => go(step - 1)}>← {t.before}</button>
        <button className="journey-primary" onClick={() => go(step + 1)}>{page === 2 ? t.return : t.next} →</button>
      </nav>
      <small className="ending-fiction">{digCopy[language].fiction}</small>
    </div>
  </section>;
  return <section className={`ending-scene${gifting ? ' is-gifting' : ''}${step === 10 ? ' is-exploring' : ''}`} hidden={paused} lang={language} aria-label={t.title}>
    <div className="surveyor-scene-hud"><span>{t.title}</span>{lit && <strong role="status">★ 1/5</strong>}</div>
    {step >= 6 && step < 10 && <div className={`ending-scene-lantern ${lit ? 'is-kindled' : ''}`}><MemoryLantern lit={lit} />
      {gifting && <span className="ending-sparkles" aria-hidden="true">{[0, 1, 2, 3, 4].map(i => <span key={i}>✦</span>)}</span>}
    </div>}
    {gifting && <span className="ending-light-travel" aria-hidden="true" onAnimationEnd={() => setGifting(false)} />}
    {step >= 8 && <span className="ending-distant-light" aria-label={t.distant}>✦</span>}
    {step < 3 ? <EarthDialogue key="ending-intro" language={language} paused={paused} lines={t.intro} initialIndex={step} title={t.title} finalAction="moon" finalLabel={t.listen} onTurn={index => { if (index !== step) go(index); }} onComplete={() => go(3)} />
      : step < 10 ? <EarthDialogue key="ending-outro" language={language} paused={paused} lines={t.outro} initialIndex={step - 6} title={t.title} finalAction="moon" finalLabel={t.carry} onTurn={index => { if (index + 6 !== step) go(index + 6); }} onComplete={() => go(10)} />
      : <div className="ending-farewell">
        <nav className="ending-actions" aria-label={t.title}>
          <button onClick={() => go(0)}>{t.replay}</button><button onClick={onReplay}>{t.playAgain}</button><button className="journey-primary" onClick={onBack}>{t.route} →</button>
        </nav>
      </div>}
  </section>;
}
