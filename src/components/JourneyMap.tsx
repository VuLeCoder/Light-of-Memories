import { digCopy, memoryPhotos } from '../content/levels/surveyor-dig';
import { eventOrder } from '../content/levels/surveyor-progress';
import { challengeCopy } from '../content/levels/surveyor-challenges';
import { memoryCount } from '../content/levels/surveyor-progress';
import { useEffect, useState } from 'react';
import type { Language } from '../content/i18n';
import { copy } from '../content/i18n';
import { getLevel, journeyStops, type LevelId } from '../content/levels';
import { SurveyorLevel, surveyorPlayCopy } from './SurveyorLevel';
import type { SurveyorProgress } from '../content/levels/surveyor-progress';
import { BookNavigation } from './BookNavigation';

export const journeyCopy = {
  vi: {
    title: 'Lộ trình năm ánh sao', book: 'Hành trình của Cuội', reveal: 'Đèn ông sao đang soi đường…',
    lead: 'Năm điểm sáng… Có ai ở đó biết chị Hằng đang ở đâu không nhỉ?',
    guide: 'Cùng Cuội gặp năm người bạn trên Mặt Trăng và khám phá câu chuyện của họ.',
    mystery: 'Người bạn bí ẩn', locked: 'Hoàn thành điểm trước để khám phá.', back: 'Về lộ trình',
    note: 'Mỗi cuộc gặp sẽ để lại một kỷ niệm và thắp thêm một ánh sao trên chiếc đèn.',
    waiting: 'Chưa khám phá', ready: 'Điểm đến tiếp theo', completed: 'Đã hoàn thành câu chuyện', replay: 'Chơi lại cùng bạn',
  },
  en: {
    title: 'The five-star journey', book: 'Cuội’s journey', reveal: 'The star lantern lights the way…',
    lead: 'Five lights… Could someone there know where Hằng is?',
    guide: 'Join Cuội to meet five friends on the Moon and discover their stories.',
    mystery: 'A mystery friend', locked: 'Complete the previous stop to discover this friend.', back: 'Back to the route',
    note: 'Each encounter will leave a memory and light another star on the lantern.',
    waiting: 'Not yet discovered', ready: 'Your next destination', completed: 'Story completed', replay: 'Play again with a friend',
  },
};

export function JourneyMap({ language, activeLevel, onEnter, onBack, onReplay, surveyorProgress, onSurveyorChange }: { surveyorProgress: SurveyorProgress; onSurveyorChange: (value: SurveyorProgress) => void; onReplay: () => void; language: Language; activeLevel: LevelId | null; onEnter: (id: LevelId) => void; onBack: () => void }) {
  const t = journeyCopy[language];
  const level = getLevel(activeLevel);
  const detail = level?.text[language];
  const [selectedFriend, setSelectedFriend] = useState<LevelId | null>(journeyStops[0]);
  const selectedLevel = getLevel(selectedFriend);
  const [locked, setLocked] = useState(false);
  const enterFriend = (id: LevelId) => {
    setLocked(false);
    if (id === 'surveyor' && surveyorProgress.completedOnce) {
      onSurveyorChange({ ...surveyorProgress, phase: 'complete', turn: 10, matched: ['camera', 'scoop'], clues: [...eventOrder], found: [...eventOrder], order: [...eventOrder] });
    }
    onEnter(id);
  };
  if (activeLevel === 'surveyor') return <SurveyorLevel language={language} progress={surveyorProgress} onChange={onSurveyorChange} onReplay={onReplay} onBack={onBack} />;
  return <section className={`journey-view${level ? '' : ' journey-overview'}`} aria-labelledby="journey-title">
    <header><span>{surveyorProgress.completedOnce ? '★ 1' : '☆ 0'}/{journeyStops.length}</span><h2 id="journey-title">{level && detail ? detail.chapter : t.title}</h2></header>
    {level && detail ? <>
      <div className="surveyor-meeting"><img src={level.portrait} alt={detail.friend} /><div><p><b>Cuội:</b> {detail.intro}</p><p><b>{detail.friend}:</b> {detail.reply}</p><p>{detail.invitation}</p></div></div>
      <button onClick={onBack}>{t.back}</button>
    </> : <>
      <p className="journey-lead">{t.lead}</p>
      <div className="journey-route">
        <svg viewBox="0 0 800 180" preserveAspectRatio="none" aria-hidden="true"><path d="M80 110 Q160 20 240 65 T400 110 T560 65 T720 110" /></svg>
        {journeyStops.map((id, index) => <button key={index} className={`journey-stop stop-${index} ${id ? (id === 'surveyor' && surveyorProgress.completedOnce ? 'stop-completed' : 'stop-unfinished') : 'stop-locked'}`} onClick={() => {
          setSelectedFriend(id);
          setLocked(!id);
        }} aria-pressed={!!id && selectedFriend === id} aria-label={`${index + 1}. ${id ? `${getLevel(id)!.text[language].friend}. ${id === 'surveyor' && surveyorProgress.completedOnce ? t.completed : t.ready}` : `${t.mystery}. ${t.locked}`}`} aria-disabled={!id}>
          <span className="stop-orb">{id ? <img src={getLevel(id)!.portrait} alt="" /> : '?'}</span>
          <span>{id ? `${String(index + 1).padStart(2, '0')} · ${getLevel(id)!.label}` : `0${index + 1} · ${t.mystery}`}</span>
          {index === 0 && <small>Cuội ✦</small>}
        </button>)}
      </div>
      <p className="journey-message" role="status">{locked ? t.locked : t.guide}</p>
      <div className="journey-entry-action">{selectedLevel && <button className="journey-primary" onClick={() => enterFriend(selectedLevel.id)}>{selectedLevel.text[language].enter} →</button>}</div>
    </>}
  </section>;
}

export function JourneyBook({ language, activeLevel, surveyorProgress, onSurveyorChange, bookRequest }: { onSurveyorChange: (p: SurveyorProgress) => void; bookRequest: number; language: Language; activeLevel: LevelId | null; surveyorProgress: SurveyorProgress }) {
  return <JourneyBookPages onSurveyorChange={onSurveyorChange} bookRequest={bookRequest} key={activeLevel ?? 'route'} language={language} activeLevel={activeLevel} surveyorProgress={surveyorProgress} />;
}

function JourneyBookPages({ language, activeLevel, surveyorProgress, onSurveyorChange, bookRequest }: { onSurveyorChange: (p: SurveyorProgress) => void; bookRequest: number; language: Language; activeLevel: LevelId | null; surveyorProgress: SurveyorProgress }) {
  // Only configured stops have readable pages. Reading never changes the game level.
  const fieldUnlocked = surveyorProgress.matched.length === 2;
  const pages = [null, ...journeyStops.filter((id): id is LevelId => id !== null), ...(fieldUnlocked ? eventOrder.map(id => `clue-${id}`) : []), ...(fieldUnlocked ? ['surveyor-b01'] : []), ...surveyorProgress.found.map(id => `photo-${id}`), ...(surveyorProgress.phase === 'complete' ? ['journal'] : [])];
  const [page, setPage] = useState(() => Math.max(0, pages.indexOf(activeLevel)));
  const t = journeyCopy[language];
  const dt = digCopy[language];
  const clue = eventOrder.find(id => pages[page] === `clue-${id}`);
  const photo = eventOrder.find(id => pages[page] === `photo-${id}`);
  useEffect(() => {
    if (!bookRequest || !fieldUnlocked) return;
    const next = eventOrder.find(id => !surveyorProgress.found.includes(id)) ?? 'arrive';
    setPage(pages.indexOf(`clue-${next}`));
    requestAnimationFrame(() => {
      const heading = document.getElementById('field-book-title');
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }, [bookRequest]);
  const level = getLevel(pages[page]);
  const detail = level?.text[language];
  const entry = ['surveyor-b01', 'surveyor-b02', 'surveyor-b03'].indexOf(pages[page] ?? '');
  const b01 = entry >= 0;
  const ct = challengeCopy[language];
  const st = surveyorPlayCopy[language];
  if (pages[page] === 'journal') return <>
    <div className="book-topline"><span className="book-icon" aria-hidden="true">▤</span><span>{copy[language].bookTop}</span></div>
    <aside className="book-panel" lang={language} aria-labelledby="journal-title"><div className="book-sheet journey-book">
      <span className="book-kicker">Surveyor 3 · ★ 1/5</span>
      <h2 id="journal-title">{language === 'vi' ? 'Nhật ký Mắt Tròn' : 'Round Eyes’ journal'}</h2>
      <ol className="book-journal">{eventOrder.map(id => <li key={id}><img src={memoryPhotos[id]} alt=""/><span>{ct.events[id]}</span></li>)}</ol>
      <p>{language === 'vi' ? 'Ba bức ảnh đã trở về đúng thứ tự trong ký ức.' : 'Three photos are back in the right order in my memory.'}</p>
      <BookNavigation language={language} page={page} count={pages.length} onChange={setPage}/>
    </div><p className="book-note">{dt.fiction}</p></aside>
  </>;
  if (clue || photo) {
    const id = (clue ?? photo)!;
    return <>
      <div className="book-topline"><span className="book-icon" aria-hidden="true">▤</span><span>{copy[language].bookTop}</span></div>
      <aside className="book-panel" lang={language} aria-labelledby="field-book-title"><div className="book-sheet journey-book field-book">
        <span className="book-kicker">{clue ? dt.book : dt.found} · {surveyorProgress.found.length}/3</span>
        <h2 id="field-book-title" tabIndex={-1}>{dt.names[id]}</h2>
        {clue ? <>
          <svg className="clue-sketch" viewBox="0 0 180 65" aria-hidden="true">
            {id === 'arrive' ? <g><ellipse cx="60" cy="38" rx="28" ry="12"/><ellipse cx="120" cy="25" rx="28" ry="12"/></g> : id === 'work' ? <path d="M30 25L150 15M30 40L150 30M30 55L150 45"/> : <g>{[0,1,2,3,4,5].map(i => <ellipse key={i} cx={30 + i * 24} cy={25 + i % 2 * 15} rx="8" ry="4"/>)}</g>}
          </svg><p>{dt.clues[id]}</p>
          <button disabled={surveyorProgress.clues.includes(id)} onClick={() => onSurveyorChange({ ...surveyorProgress, clues: [...surveyorProgress.clues, id] })}>{surveyorProgress.clues.includes(id) ? `✓ ${dt.ready}` : dt.read}</button>
          {surveyorProgress.found.includes(id) && <p>✓ {dt.found}</p>}
        </> : <><img className="book-memory-photo" src={memoryPhotos[id]} alt={dt.names[id]} /><p>{dt.descriptions[id]}</p><small>NASA</small></>}
        <BookNavigation language={language} page={page} count={pages.length} onChange={setPage} />
      </div><p className="book-note">{dt.fiction}</p></aside>
    </>;
  }
  return <>
    <div className="book-topline"><span className="book-icon" aria-hidden="true">▤</span><span>{copy[language].bookTop}</span></div>
    <aside className="book-panel" lang={language} aria-labelledby="book-title"><div className="book-sheet journey-book">
      <div className="page-corner" aria-hidden="true" /><span className="book-kicker">{b01 ? `B0${entry + 1} · Surveyor 3` : level && detail ? `${String(journeyStops.indexOf(level.id) + 1).padStart(2, '0')} · ${level.label}` : t.title}</span>
      <h2 id="book-title">{b01 ? ct.titles[entry] : level && detail ? detail.friend : t.book}</h2>
      <p>{b01 ? (entry === 0 ? st.bookBody : ct.bodies[entry]) : level && detail ? detail.invitation : t.guide}</p>
      {b01 ? <><img className="book-friend" src={getLevel('surveyor')!.portrait} alt="" /><p>✦ {st.memories} · {memoryCount(surveyorProgress)}/3</p></> : level && detail ? <><img className="book-friend" src={level.portrait} alt="" /><p>{detail.memory} · {Array.from({ length: level.memoryCount }, (_, index) => level.id === 'surveyor' && index < memoryCount(surveyorProgress) ? '★' : '☆').join(' ')}</p></> : <ol className="journey-memories">{journeyStops.map((id, index) => <li key={index}><span aria-hidden="true">{id === 'surveyor' && surveyorProgress.completedOnce ? '★' : '☆'}</span><span>{id ? getLevel(id)!.text[language].friend : t.mystery}<small>{id === 'surveyor' && surveyorProgress.completedOnce ? t.completed : id ? t.ready : t.waiting}</small></span></li>)}</ol>}
      {fieldUnlocked && !b01 && <button className="book-new-entry" onClick={() => setPage(pages.indexOf(surveyorProgress.phase === 'complete' ? 'journal' : 'clue-arrive'))}>{surveyorProgress.phase === 'complete' ? (language === 'vi' ? 'Đọc nhật ký hoàn chỉnh' : 'Read the completed journal') : dt.open}</button>}
      <BookNavigation language={language} page={page} count={pages.length} onChange={setPage} />
    </div><p className="book-note">{t.note}</p></aside>
  </>;
}
