import { FriendLevel } from './FriendLevel';
import { JourneyFinale } from './JourneyFinale';
import { friendStories, type FriendId } from '../content/levels/friends';
import { orderedFriends, isFriendUnlocked, starCount, type FriendsProgress } from '../content/levels/friends-progress';
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

export function JourneyMap({ language, activeLevel, onEnter, onBack, surveyorProgress, onSurveyorChange, friends, onFriendsChange }: {
  surveyorProgress: SurveyorProgress; onSurveyorChange: (value: SurveyorProgress) => void;
  language: Language; activeLevel: LevelId | null; onEnter: (id: LevelId) => void; onBack: () => void;
  friends: FriendsProgress; onFriendsChange: (p: FriendsProgress) => void;
}) {
  const t = journeyCopy[language], vi = language === 'vi';
  const [locked, setLocked] = useState(false);
  const [finale, setFinale] = useState(false);
  const done = surveyorProgress.phase === 'complete';
  const count = starCount(done, friends);
  const next: LevelId = !done ? 'surveyor' : orderedFriends.find(id => friends.levels[id].step !== 5) ?? 'footprint';
  if (finale && count === 5) return <JourneyFinale language={language} progress={friends} onChange={onFriendsChange} onBack={() => { setFinale(false); onBack(); }} />;
  if (activeLevel === 'surveyor') return <SurveyorLevel language={language} progress={surveyorProgress} onChange={onSurveyorChange} onBack={onBack} />;
  if (activeLevel && isFriendUnlocked(activeLevel, done, friends)) return <FriendLevel key={activeLevel} id={activeLevel} language={language} progress={friends.levels[activeLevel]} onChange={p => onFriendsChange({ ...friends, levels: { ...friends.levels, [activeLevel]: p } })} onBack={onBack} onNext={() => {
    const index = orderedFriends.indexOf(activeLevel);
    if (index === 3) setFinale(true); else onEnter(orderedFriends[index + 1]);
  }} />;
  return <section className="journey-view journey-overview five-friends-map" aria-labelledby="journey-title" lang={language}>
    <header><span>★ {count}/5</span><h2 id="journey-title">{t.title}</h2></header>
    <p className="journey-lead">{count===5 ? (vi?'Năm cánh sao đã sáng. Con đường tới chị Hằng hiện ra.':'Five star points are shining. The path to Hằng appears.') : t.lead}</p>
    <div className="journey-route">
      <svg viewBox="0 0 800 180" preserveAspectRatio="none" aria-hidden="true"><path d="M80 110 Q160 20 240 65 T400 110 T560 65 T720 110" /></svg>
      {journeyStops.map((id,index) => {
        if (!id) return null;
        const level=getLevel(id)!;
        const unlocked=id==='surveyor'||isFriendUnlocked(id,done,friends);
        const finished=id==='surveyor'?done:friends.levels[id].step===5;
        const name=id==='surveyor'?(vi?'Mắt Tròn':'Round Eyes'):friendStories[language][id].name;
        return <button key={id} className={`journey-stop stop-${index} ${finished?'is-complete':''} ${!unlocked?'is-locked':''}`} aria-disabled={!unlocked} onClick={()=>{if(unlocked){setLocked(false);onEnter(id);}else setLocked(true);}} aria-label={`${index+1}. ${name}${unlocked?'':`. ${t.locked}`}`}>
          <span className="stop-orb"><img src={level.portrait} alt=""/></span><span>{name}</span><small>{finished?'★':unlocked?(vi?'Khám phá':'Explore'):(vi?'Chưa mở':'Locked')}</small>
        </button>;
      })}
    </div>
    <p className="journey-message" role="status">{locked?t.locked:count===5?(vi?'Những người bạn vẫn chờ trong sổ tay.':'Your friends are waiting in the journal.'):t.guide}</p>
    <button className="journey-primary" onClick={()=>count===5?setFinale(true):onEnter(next)}>{count===5?(friends.finale.seen?(vi?'Gặp lại chị Hằng':'Visit Hằng again'):(vi?'Đi tìm chị Hằng':'Find Hằng')):getLevel(next)!.text[language].enter} →</button>
  </section>;
}

export function JourneyBook({ language, activeLevel, surveyorProgress, onSurveyorChange, bookRequest, friends }: { friends: FriendsProgress; onSurveyorChange: (p: SurveyorProgress) => void; bookRequest: number; language: Language; activeLevel: LevelId | null; surveyorProgress: SurveyorProgress }) {
  return <JourneyBookPages friends={friends} onSurveyorChange={onSurveyorChange} bookRequest={bookRequest} key={activeLevel ?? 'route'} language={language} activeLevel={activeLevel} surveyorProgress={surveyorProgress} />;
}

function JourneyBookPages({ language, activeLevel, surveyorProgress, onSurveyorChange, bookRequest, friends }: { friends: FriendsProgress; onSurveyorChange: (p: SurveyorProgress) => void; bookRequest: number; language: Language; activeLevel: LevelId | null; surveyorProgress: SurveyorProgress }) {
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
  if (level && detail && level.id !== 'surveyor') {
    const id = level.id as FriendId, story = friendStories[language][id], progress = friends.levels[id];
    return <>
      <div className="book-topline"><span className="book-icon" aria-hidden="true">▤</span><span>{copy[language].bookTop}</span></div>
      <aside className="book-panel" lang={language} aria-labelledby="friend-book-title"><div className="book-sheet journey-book friend-book">
        <span className="book-kicker">{story.title}</span><h2 id="friend-book-title">{story.name}</h2>
        <img src={level.portrait} alt="" className="friend-book-art"/>
        {progress.step===0?<p>{story.opening}</p>:<ol className="friend-book-memories">{story.memories.map((memory,index)=><li key={memory}>{progress.step>index+1?'✦':'☆'} {progress.step>index+1?memory:story.tasks[index]}</li>)}</ol>}
        {id==='flag'&&progress.keepsake!==null&&<p>{language==='vi'?'Kỷ niệm đã chọn:':'My keepsake:'} { (language==='vi'?['Những bước chân','Bàn tay dựng cờ','Khoảnh khắc chụp ảnh']:['Footsteps','The hand raising the flag','The photograph'])[progress.keepsake]}</p>}
        <BookNavigation language={language} page={page} count={pages.length} onChange={setPage}/>
      </div><p className="book-note">{language==='vi'?'Nhân vật và ký ức trong chương này là hư cấu.':'The character and memories in this chapter are fictional.'}</p></aside>
    </>;
  }
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
      {b01 ? <><img className="book-friend" src={getLevel('surveyor')!.portrait} alt="" /><p>✦ {st.memories} · {memoryCount(surveyorProgress)}/3</p></> : level && detail ? <><img className="book-friend" src={level.portrait} alt="" /><p>{detail.memory} · {Array.from({ length: level.memoryCount }, (_, index) => level.id === 'surveyor' && index < memoryCount(surveyorProgress) ? '★' : '☆').join(' ')}</p></> : <ol className="journey-memories">{journeyStops.map((id, index) => <li key={index}><span aria-hidden="true">{id && (id === 'surveyor' ? surveyorProgress.phase === 'complete' : friends.levels[id].step === 5) ? '★' : '☆'}</span><span>{id ? getLevel(id)!.text[language].friend : t.mystery}<small>{id && (id === 'surveyor' ? surveyorProgress.phase === 'complete' : friends.levels[id].step === 5) ? (language === 'vi' ? 'Đã thắp sáng' : 'Remembered') : id && (id === 'surveyor' || isFriendUnlocked(id, surveyorProgress.phase === 'complete', friends)) ? t.ready : t.waiting}</small></span></li>)}</ol>}
      {fieldUnlocked && !b01 && <button className="book-new-entry" onClick={() => setPage(pages.indexOf(surveyorProgress.phase === 'complete' ? 'journal' : 'clue-arrive'))}>{surveyorProgress.phase === 'complete' ? (language === 'vi' ? 'Đọc nhật ký hoàn chỉnh' : 'Read the completed journal') : dt.open}</button>}
      <BookNavigation language={language} page={page} count={pages.length} onChange={setPage} />
    </div><p className="book-note">{t.note}</p></aside>
  </>;
}
