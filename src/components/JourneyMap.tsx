import { useState } from 'react';
import type { Language } from '../content/i18n';
import { copy } from '../content/i18n';
import { getLevel, journeyStops, type LevelId } from '../content/levels';
import { BookNavigation } from './BookNavigation';

export const journeyCopy = {
  vi: {
    title: 'Lộ trình năm ánh sao', book: 'Hành trình của Cuội', reveal: 'Đèn ông sao đang soi đường…',
    lead: 'Năm điểm sáng… Có ai ở đó biết chị Hằng đang ở đâu không nhỉ?',
    guide: 'Cùng Cuội gặp năm người bạn trên Mặt Trăng và khám phá câu chuyện của họ.',
    mystery: 'Người bạn bí ẩn', locked: 'Hoàn thành điểm trước để khám phá.', back: 'Về lộ trình',
    note: 'Mỗi cuộc gặp sẽ để lại một kỷ niệm và thắp thêm một ánh sao trên chiếc đèn.',
    waiting: 'Chưa khám phá', ready: 'Điểm đến tiếp theo',
  },
  en: {
    title: 'The five-star journey', book: 'Cuội’s journey', reveal: 'The star lantern lights the way…',
    lead: 'Five lights… Could someone there know where Hằng is?',
    guide: 'Join Cuội to meet five friends on the Moon and discover their stories.',
    mystery: 'A mystery friend', locked: 'Complete the previous stop to discover this friend.', back: 'Back to the route',
    note: 'Each encounter will leave a memory and light another star on the lantern.',
    waiting: 'Not yet discovered', ready: 'Your next destination',
  },
};

export function JourneyMap({ language, activeLevel, onEnter, onBack }: { language: Language; activeLevel: LevelId | null; onEnter: (id: LevelId) => void; onBack: () => void }) {
  const t = journeyCopy[language];
  const level = getLevel(activeLevel);
  const detail = level?.text[language];
  const firstLevel = getLevel(journeyStops[0])!;
  const [locked, setLocked] = useState(false);
  return <section className={`journey-view${level ? '' : ' journey-overview'}`} aria-labelledby="journey-title">
    <header><span>☆ 0/{journeyStops.length}</span><h2 id="journey-title">{level && detail ? detail.chapter : t.title}</h2></header>
    {level && detail ? <>
      <div className="surveyor-meeting"><img src={level.portrait} alt={detail.friend} /><div><p><b>Cuội:</b> {detail.intro}</p><p><b>{detail.friend}:</b> {detail.reply}</p><p>{detail.invitation}</p></div></div>
      <button onClick={onBack}>{t.back}</button>
    </> : <>
      <p className="journey-lead">{t.lead}</p>
      <div className="journey-route">
        <svg viewBox="0 0 800 180" preserveAspectRatio="none" aria-hidden="true"><path d="M80 110 Q160 20 240 65 T400 110 T560 65 T720 110" /></svg>
        {journeyStops.map((id, index) => <button key={index} className={`journey-stop stop-${index}`} onClick={() => id ? onEnter(id) : setLocked(true)} aria-label={`${index + 1}. ${id ? getLevel(id)!.text[language].friend : `${t.mystery}. ${t.locked}`}`} aria-disabled={!id}>
          <span className="stop-orb">{id ? <img src={getLevel(id)!.portrait} alt="" /> : '?'}</span>
          <span>{id ? `${String(index + 1).padStart(2, '0')} · ${getLevel(id)!.label}` : `0${index + 1} · ${t.mystery}`}</span>
          {index === 0 && <small>Cuội ✦</small>}
        </button>)}
      </div>
      <p className="journey-message" role="status">{locked ? t.locked : t.guide}</p>
      <button className="journey-primary" onClick={() => onEnter(firstLevel.id)}>{firstLevel.text[language].enter} →</button>
    </>}
  </section>;
}

export function JourneyBook({ language, activeLevel }: { language: Language; activeLevel: LevelId | null }) {
  return <JourneyBookPages key={activeLevel ?? 'route'} language={language} activeLevel={activeLevel} />;
}

function JourneyBookPages({ language, activeLevel }: { language: Language; activeLevel: LevelId | null }) {
  // Only configured stops have readable pages. Reading never changes the game level.
  const pages = [null, ...journeyStops.filter((id): id is LevelId => id !== null)];
  const [page, setPage] = useState(() => Math.max(0, pages.indexOf(activeLevel)));
  const t = journeyCopy[language];
  const level = getLevel(pages[page]);
  const detail = level?.text[language];
  return <>
    <div className="book-topline"><span className="book-icon" aria-hidden="true">▤</span><span>{copy[language].bookTop}</span></div>
    <aside className="book-panel" lang={language} aria-labelledby="book-title"><div className="book-sheet journey-book">
      <div className="page-corner" aria-hidden="true" /><span className="book-kicker">{level && detail ? `${String(journeyStops.indexOf(level.id) + 1).padStart(2, '0')} · ${level.label}` : t.title}</span>
      <h2 id="book-title">{level && detail ? detail.friend : t.book}</h2>
      <p>{level && detail ? detail.invitation : t.guide}</p>
      {level && detail ? <><img className="book-friend" src={level.portrait} alt="" /><p>{detail.memory} · {Array.from({ length: level.memoryCount }, () => '☆').join(' ')}</p></> : <ol className="journey-memories">{journeyStops.map((id, index) => <li key={index}><span aria-hidden="true">☆</span><span>{id ? getLevel(id)!.text[language].friend : t.mystery}<small>{index === 0 ? t.ready : t.waiting}</small></span></li>)}</ol>}
      <BookNavigation language={language} page={page} count={pages.length} onChange={setPage} />
    </div><p className="book-note">{t.note}</p></aside>
  </>;
}
