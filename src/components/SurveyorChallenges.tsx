import { memoryPhotos } from '../content/levels/surveyor-dig';
import { useEffect, useState } from 'react';
import type { Language } from '../content/i18n';
import { challengeCopy, challengeLines } from '../content/levels/surveyor-challenges';
import { eventOrder, type SurveyorProgress } from '../content/levels/surveyor-progress';
import { EarthDialogue } from './EarthDialogue';

export const surveyorVisitPhoto = `${import.meta.env.BASE_URL}assets/surveyor-apollo12.jpg`;
export function SurveyorChallenges({ language, progress, onChange }: { language: Language; progress: SurveyorProgress; onChange: (p: SurveyorProgress) => void }) {
  const t = challengeCopy[language];
  const [wrong, setWrong] = useState(false);
  const phase = progress.phase;
  useEffect(() => { setWrong(false); }, [phase]);
  const advance = (next: SurveyorProgress['phase']) => onChange({ ...progress, phase: next, completedOnce: progress.completedOnce || next === 'complete', turn: 0 });
  if (phase === 'soil-intro' || phase === 'timeline-intro') return <div className={phase === 'timeline-intro' ? 'memory-story-layout' : undefined}>
    {phase === 'timeline-intro' && <figure className="surveyor-history"><img src={surveyorVisitPhoto} alt={t.photo} /><figcaption>{t.photo}</figcaption></figure>}
    <EarthDialogue key={phase} language={language} paused={false} lines={challengeLines(language, phase === 'timeline-intro')} initialIndex={progress.turn} title={phase === 'soil-intro' ? t.soilTitle : t.timelineTitle} finalAction="moon" finalLabel={t.begin} onTurn={turn => { if (turn !== progress.turn) onChange({ ...progress, turn }); }} onComplete={() => advance(phase === 'soil-intro' ? 'soil' : 'timeline')} />
  </div>;
  if (phase === 'timeline') {
    const vi = language === 'vi';
    const cards = vi ? {
      arrive: { title: 'Lần chạm đất', body: 'Mắt Tròn đến Mặt Trăng và chụp lại dấu chân tàu trên đất.' },
      work: { title: 'Những rãnh nhỏ', body: 'Chiếc xẻng đào rãnh, giúp tìm hiểu đất Mặt Trăng.' },
      visit: { title: 'Cuộc ghé thăm', body: 'Hai phi hành gia đến thăm, mang một phần của tàu về nhà.' },
    } : {
      arrive: { title: 'Touchdown', body: 'Round Eyes lands and photographs its footpad in the soil.' },
      work: { title: 'Little trenches', body: 'The scoop digs trenches to study the lunar soil.' },
      visit: { title: 'A visit to remember', body: 'Two astronauts visit and bring parts of the lander home.' },
    };
    const toggle = (id: typeof eventOrder[number]) => {
      setWrong(false);
      onChange({ ...progress, order: progress.order.includes(id) ? progress.order.filter(item => item !== id) : [...progress.order, id] });
    };
    return <div className="journal-puzzle">
      <p className="journal-instruction">{vi ? 'Cùng kể lại câu chuyện của Mắt Tròn từ đầu nhé!' : 'Let’s tell Round Eyes’ story from the beginning!'}</p>
      <ol className="journal-sequence" aria-label={vi ? 'Thứ tự đã chọn' : 'Selected order'}>{t.slots.map((slot, i) => <li key={slot} className={progress.order[i] ? 'is-filled' : ''}>
        <span>{i + 1}</span><span>{slot}</span><span aria-hidden="true">{progress.order[i] ? '✓' : '·'}</span>
      </li>)}</ol>
      <div className="journal-cards" role="group" aria-label={vi ? 'Ba bức ảnh ký ức' : 'Three memory photos'}>
        {(['visit', 'arrive', 'work'] as const).filter(id => progress.found.includes(id)).map(id => {
          const index = progress.order.indexOf(id);
          return <button key={id} className={`journal-card ${index >= 0 ? 'is-selected' : ''}`} aria-pressed={index >= 0} aria-label={`${cards[id].title}${index >= 0 ? ` · ${t.slots[index]}` : ''}`} onClick={() => toggle(id)}>
            <span className="journal-card-photo"><img src={memoryPhotos[id]} alt="" /><span className="journal-order" aria-hidden="true">{index >= 0 ? index + 1 : '+'}</span></span>
            <span className="journal-card-copy"><strong>{cards[id].title}</strong><span>{cards[id].body}</span><small>{index >= 0 ? `${t.slots[index]} · ${vi ? 'Bỏ chọn' : 'Undo'}` : vi ? 'Chọn ảnh này' : 'Choose this photo'}</small></span>
          </button>;
        })}
      </div>
      <div className="journal-submit">
        <p role="status" className={wrong ? 'is-error' : ''}>{wrong ? t.hint : progress.order.length === 3 ? (vi ? 'Ba ảnh đã sẵn sàng. Cùng ghép nhật ký nhé!' : 'All three photos are ready. Let’s complete the journal!') : (vi ? `Đã chọn ${progress.order.length}/3 ảnh` : `${progress.order.length}/3 photos selected`)}</p>
        <button className="journey-primary" disabled={progress.order.length !== 3} onClick={() => eventOrder.every((id, i) => progress.order[i] === id) ? advance('complete') : setWrong(true)}>{t.check} <span aria-hidden="true">→</span></button>
      </div>
    </div>;
  }
  return <div className="surveyor-memory"><span className="memory-light" aria-hidden="true">✦</span>
    <p>{t.soilResult}</p><p>{t.newEntry}</p>{phase === 'soil-memory' && <button className="journey-primary" onClick={() => advance('timeline-intro')}>{t.nextTimeline} →</button>}
  </div>;
}
