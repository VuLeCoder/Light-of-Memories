import type { BanhLuoiProgress } from '../content/levels/ban-banh-luoi-progress';
import { banBanhLuoiBook } from '../content/levels/ban-banh-luoi-content';
import { TaiThinhArchiveImage } from './TaiThinhPhoto';
import { focusGame } from '../focus/game-focus';
import { taiThinhPageIds, type TaiThinhProgress } from '../content/levels/tai-thinh-progress';
import { taiThinhBook, taiThinhBookSources, taiThinhMemories } from '../content/levels/tai-thinh-content';
import { SparkleBookClue } from './SparkleBookClue';
import { sparkleKeepsakes, sparkleRepairUnlocked, sparkleRangingUnlocked, type SparkleProgress } from '../content/levels/lap-lanh';
import { digCopy, memoryPhotos } from '../content/levels/surveyor-dig';
import { enterSurveyor, eventOrder } from '../content/levels/surveyor-progress';
import { challengeCopy } from '../content/levels/surveyor-challenges';
import { memoryCount } from '../content/levels/surveyor-progress';
import { useEffect, useRef, useState } from 'react';
import type { Language } from '../content/i18n';
import { copy } from '../content/i18n';
import { getLevel, journeyStops, journeyStatus, type LevelId } from '../content/levels';
import { SurveyorLevel, surveyorPlayCopy } from './SurveyorLevel';
import type { SurveyorProgress } from '../content/levels/surveyor-progress';
import { BookNavigation } from './BookNavigation';

export const journeyCopy = {
  vi: {
    title: 'Lộ trình năm ánh sao', book: 'Hành trình của Cuội', reveal: 'Đèn ông sao đang soi đường…',
    lead: 'Năm điểm sáng… Có ai ở đó biết chị Hằng đang ở đâu không nhỉ?',
    guide: 'Cùng Cuội gặp năm người bạn trên Mặt Trăng và khám phá câu chuyện của họ.',
    prerequisite: 'Hoàn thành câu chuyện của người bạn phía trước để mở khóa cuộc gặp này.', mystery: 'Người bạn bí ẩn', locked: 'Người bạn này sẽ xuất hiện trong phần tiếp theo. Hẹn Cuội sớm nhé!', back: 'Về lộ trình',
    note: 'Mỗi cuộc gặp sẽ để lại một kỷ niệm và thắp thêm một ánh sao trên chiếc đèn.',
    waiting: 'Chưa khám phá', ready: 'Điểm đến tiếp theo', completed: 'Đã hoàn thành câu chuyện', replay: 'Chơi lại cùng bạn',
  },
  en: {
    title: 'The five-star journey', book: 'Cuội’s journey', reveal: 'The star lantern lights the way…',
    lead: 'Five lights… Could someone there know where Hằng is?',
    guide: 'Join Cuội to meet five friends on the Moon and discover their stories.',
    prerequisite: 'Finish the previous friend’s story to unlock this encounter.', mystery: 'A mystery friend', locked: 'This friend will appear in a future chapter. See you soon, Cuội!', back: 'Back to the route',
    note: 'Each encounter will leave a memory and light another star on the lantern.',
    waiting: 'Not yet discovered', ready: 'Your next destination', completed: 'Story completed', replay: 'Play again with a friend',
  },
};

export function JourneyMap({ banhLuoiProgress, taiThinhProgress, sparkleProgress, language, activeLevel, onEnter, onBack, onReplay, surveyorProgress, onSurveyorChange }: { banhLuoiProgress: BanhLuoiProgress; taiThinhProgress: TaiThinhProgress; sparkleProgress: SparkleProgress; surveyorProgress: SurveyorProgress; onSurveyorChange: (value: SurveyorProgress) => void; onReplay: () => void; language: Language; activeLevel: LevelId | null; onEnter: (id: LevelId) => void; onBack: () => void }) {
  const t = journeyCopy[language];
  const completed = { surveyor: surveyorProgress.completedOnce, 'lap-lanh': sparkleProgress.completedOnce, 'tai-thinh': taiThinhProgress.completedOnce, 'ban-banh-luoi': banhLuoiProgress.completedOnce };
  const status = (id: LevelId | null) => journeyStatus(id, completed);
  const level = status(activeLevel) === 'locked' ? undefined : getLevel(activeLevel);
  const detail = level?.text[language];
  const [selectedStop, setSelectedStop] = useState(0);
  const [entryFriend, setEntryFriend] = useState<LevelId>('surveyor');
  const selectedFriend = journeyStops[selectedStop];
  const selectedLevel = status(selectedFriend) === 'locked' ? undefined : getLevel(selectedFriend);
  const entryLevel = selectedLevel ?? getLevel(entryFriend)!;
  const [locked, setLocked] = useState(false);
  const enterFriend = (id: LevelId) => {
    setLocked(false);
    if (status(id) === 'locked') { setLocked(true); return; }
    if (id === 'surveyor' && surveyorProgress.completedOnce) {
      onSurveyorChange(enterSurveyor(surveyorProgress));
    }
    onEnter(id);
  };
  if (activeLevel === 'surveyor') return <SurveyorLevel language={language} progress={surveyorProgress} onChange={onSurveyorChange} onReplay={onReplay} onBack={onBack} />;
  return <section className={`journey-view${level ? '' : ' journey-overview'}`} aria-labelledby="journey-title">
    <header><span>{`★ ${Object.values(completed).filter(Boolean).length}`}/{journeyStops.length}</span><h2 id="journey-title">{level && detail ? detail.chapter : t.title}</h2></header>
    {level && detail ? <>
      <div className="surveyor-meeting"><img src={level.portrait} alt={detail.friend} /><div><p><b>Cuội:</b> {detail.intro}</p><p><b>{detail.friend}:</b> {detail.reply}</p><p>{detail.invitation}</p></div></div>
      <button onClick={onBack}>{t.back}</button>
    </> : <>
      <p className="journey-lead">{t.lead}</p>
      <div className="journey-route">
        <svg viewBox="0 0 800 180" preserveAspectRatio="none" aria-hidden="true"><path d="M80 110 Q160 20 240 65 T400 110 T560 65 T720 110" /></svg>
        {journeyStops.map((id, index) => {
          const state = status(id);
          const friend = state === 'locked' ? undefined : getLevel(id);
          return <button key={index} className={`journey-stop stop-${index} stop-${state}`} onClick={() => {
            setSelectedStop(index);
            if (friend) setEntryFriend(friend.id);
            setLocked(state === 'locked');
          }} aria-pressed={selectedStop === index} aria-label={`${index + 1}. ${friend ? `${friend.text[language].friend}. ${state === 'completed' ? t.completed : t.ready}` : `${t.mystery}. ${id ? t.prerequisite : t.locked}`}`}>
            <span className="stop-orb">{friend ? <img src={friend.portrait} alt="" /> : '?'}</span>
            <span>{`${String(index + 1).padStart(2, '0')} · ${friend ? friend.label : t.mystery}`}</span>
            <small style={{ visibility: selectedStop === index ? 'visible' : 'hidden' }}>Cuội ✦</small>
          </button>;
        })}
      </div>
      <p className="journey-message" role="status">{[t.guide, t.prerequisite, t.locked].map((message, index) => {
        const visible = index === (locked ? selectedFriend ? 1 : 2 : 0);
        return <span key={index} style={{ visibility: visible ? 'visible' : 'hidden' }} aria-hidden={!visible}>{message}</span>;
      })}</p>
      <div className="journey-entry-action"><button className="journey-primary" style={{ visibility: selectedLevel ? 'visible' : 'hidden' }} disabled={!selectedLevel} onClick={() => { if (selectedLevel) enterFriend(selectedLevel.id); }}>{entryLevel.text[language].enter} →</button></div>
    </>}
  </section>;
}

export function JourneyBook({ banhLuoiProgress, taiThinhProgress, sparkleProgress, language, activeLevel, surveyorProgress, onSurveyorChange, bookRequest }: { banhLuoiProgress: BanhLuoiProgress; taiThinhProgress: TaiThinhProgress; sparkleProgress: SparkleProgress; onSurveyorChange: (p: SurveyorProgress) => void; bookRequest: number; language: Language; activeLevel: LevelId | null; surveyorProgress: SurveyorProgress }) {
  return <JourneyBookPages banhLuoiProgress={banhLuoiProgress} taiThinhProgress={taiThinhProgress} sparkleProgress={sparkleProgress} onSurveyorChange={onSurveyorChange} bookRequest={bookRequest} key={activeLevel ?? 'route'} language={language} activeLevel={activeLevel} surveyorProgress={surveyorProgress} />;
}

function JourneyBookPages({ banhLuoiProgress, taiThinhProgress, sparkleProgress, language, activeLevel, surveyorProgress, onSurveyorChange, bookRequest }: { banhLuoiProgress: BanhLuoiProgress; taiThinhProgress: TaiThinhProgress; sparkleProgress: SparkleProgress; onSurveyorChange: (p: SurveyorProgress) => void; bookRequest: number; language: Language; activeLevel: LevelId | null; surveyorProgress: SurveyorProgress }) {
  const completed = { surveyor: surveyorProgress.completedOnce, 'lap-lanh': sparkleProgress.completedOnce, 'tai-thinh': taiThinhProgress.completedOnce, 'ban-banh-luoi': banhLuoiProgress.completedOnce };
  const status = (id: LevelId | null) => journeyStatus(id, completed);
  // Only configured stops have readable pages. Reading never changes the game level.
  const fieldUnlocked = surveyorProgress.matched.length === 2;
  const pages = [null, ...journeyStops.flatMap(id => {
    if (id && status(id) === 'locked') return [id];
    if (id === 'surveyor') return [
      id,
      ...(fieldUnlocked ? eventOrder.map(event => `clue-${event}`) : []),
      ...(fieldUnlocked ? ['surveyor-b01'] : []),
      ...eventOrder.filter(event => surveyorProgress.found.includes(event)).map(event => `photo-${event}`),
    ];
    if (id === 'lap-lanh') return [id, ...sparkleProgress.keepsakes.map(photo => `sparkle-photo-${photo}`), ...(sparkleRepairUnlocked(sparkleProgress) ? ['sparkle-repair-clue'] : []), ...(sparkleRangingUnlocked(sparkleProgress) ? ['sparkle-ranging-clue'] : [])];
    if (id === 'tai-thinh') return taiThinhPageIds(taiThinhProgress);
    return id ? [id] : [];
  })];
  // Keep the selected page's identity when new photos or clues are inserted.
  const [selectedPage, setSelectedPage] = useState<string | null>(activeLevel);
  const page = Math.max(0, pages.indexOf(selectedPage));
  const setPage = (index: number) => setSelectedPage(pages[index] ?? null);
  const lastBookRequest = useRef(bookRequest);
  const [bookFocusRequest, setBookFocusRequest] = useState(0);
  const t = journeyCopy[language];
  const dt = digCopy[language];
  const clue = eventOrder.find(id => pages[page] === `clue-${id}`);
  const clueUnlocked = !clue || eventOrder.slice(0, eventOrder.indexOf(clue)).every(id => surveyorProgress.clues.includes(id) || surveyorProgress.found.includes(id));
  const photo = eventOrder.find(id => pages[page] === `photo-${id}`);
  const nextClue = eventOrder.find(id => !surveyorProgress.clues.includes(id) && !surveyorProgress.found.includes(id))
    ?? eventOrder.find(id => !surveyorProgress.found.includes(id)) ?? 'arrive';
  useEffect(() => {
    if (lastBookRequest.current === bookRequest) return;
    lastBookRequest.current = bookRequest;
    const target = activeLevel === 'lap-lanh'
      ? sparkleProgress.phase === 'repair' ? 'sparkle-repair-clue' : sparkleProgress.phase === 'ranging' ? 'sparkle-ranging-clue' : null
      : activeLevel === 'tai-thinh' ? taiThinhProgress.phase === 'identify' ? 'tai-book-devices' : taiThinhProgress.phase === 'records' ? 'tai-book-sources' : ['graph', 'duration'].includes(taiThinhProgress.phase) ? 'tai-book-ringing' : taiThinhProgress.phase === 'rhythm' ? 'tai-book-rhythm' : null
      : activeLevel === 'surveyor' && fieldUnlocked ? `clue-${nextClue}` : null;
    if (!target || !pages.includes(target)) return;
    setSelectedPage(target);
    setBookFocusRequest(bookRequest);
  }, [bookRequest]);
  // Wait until the requested page has rendered before looking up its heading.
  useEffect(() => {
    if (!bookFocusRequest) return;
    const frame = requestAnimationFrame(() => {
      const heading = document.getElementById(activeLevel === 'tai-thinh' ? 'tai-book-title' : activeLevel === 'lap-lanh' ? 'sparkle-clue-title' : 'field-book-title');
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
    });
    return () => cancelAnimationFrame(frame);
  }, [bookFocusRequest, activeLevel]);
  useEffect(() => {
    document.querySelector('.book-panel .book-sheet')?.scrollTo({ top: 0 });
  }, [selectedPage]);
  const level = getLevel(pages[page]);
  const detail = level?.text[language];
  const entry = ['surveyor-b01', 'surveyor-b02', 'surveyor-b03'].indexOf(pages[page] ?? '');
  const b01 = entry >= 0;
  const ct = challengeCopy[language];
  const st = surveyorPlayCopy[language];
  if (level && status(level.id) === 'locked') return <>
    <div className="book-topline"><span className="book-icon" aria-hidden="true">▤</span><span>{copy[language].bookTop}</span></div>
    <aside className="book-panel" lang={language} aria-labelledby="book-title"><div tabIndex={0} className="book-sheet journey-book">
      <div className="page-corner" aria-hidden="true" /><span className="book-kicker">{String(journeyStops.indexOf(level.id) + 1).padStart(2, '0')} · {t.waiting}</span>
      <h2 id="book-title">{t.mystery}</h2><p>{t.prerequisite}</p>
      {activeLevel && <BackToGame language={language} />}
    </div><BookNavigation language={language} page={page} count={pages.length} onChange={setPage} /></aside>
  </>;
  if (pages[page] === 'ban-banh-luoi') {
    const intro = banBanhLuoiBook['ban-banh-luoi'];
    return <>
      <div className="book-topline"><span className="book-icon" aria-hidden="true">▤</span><span>{copy[language].bookTop}</span></div>
      <aside className="book-panel" lang={language} aria-labelledby="banh-luoi-book-title"><div tabIndex={0} className="book-sheet journey-book">
        <div className="page-corner" aria-hidden="true"/><span className="book-kicker">04 · Apollo 17</span>
        <h2 id="banh-luoi-book-title" tabIndex={-1}>{intro.title[language]}</h2>
        <img className="book-friend" src={level!.portrait} alt=""/>
        {intro.paragraphs.map((paragraph, i) => <p key={i}>{paragraph[language]}</p>)}
        <a className="sparkle-book-source" href="https://apollojournals.org/alsj/a17/a17.clsout3.html#1701948" target="_blank" rel="noreferrer">{language === 'vi' ? 'Nguồn tư liệu' : 'Source'} · Apollo 17 ↗</a>
        {activeLevel && <BackToGame language={language}/>}
      </div><BookNavigation language={language} page={page} count={pages.length} onChange={setPage}/></aside>
    </>;
  }
  const taiPage = taiThinhBook.find(entry => pages[page] === `tai-book-${entry.id}` || entry.id === 'intro' && pages[page] === 'tai-thinh');
  const taiPhoto = taiThinhMemories.find(photo => pages[page] === `tai-photo-${photo.id}`);
  if (taiPage || taiPhoto) {
    const source = taiPage ? taiThinhBookSources[taiPage.id] : 'https://apollojournals.org/alsj/a12/images12.html';
    return <>
      <div className="book-topline"><span className="book-icon" aria-hidden="true">▤</span><span>{copy[language].bookTop}</span></div>
      <aside className="book-panel" lang={language} aria-labelledby="tai-book-title"><div tabIndex={0} className="book-sheet journey-book tai-book">
        <div className="page-corner" aria-hidden="true"/><span className="book-kicker">03 · Apollo 12</span>
        <h2 id="tai-book-title" tabIndex={-1}>{taiPhoto ? taiPhoto.title[language] : taiPage!.id === 'intro' ? getLevel('tai-thinh')!.text[language].friend : taiPage!.title[language]}</h2>
        {taiPhoto ? <><div className="book-memory-photo tai-book-photo"><TaiThinhArchiveImage key={taiPhoto.id} photo={taiPhoto} language={language}/></div><p>{taiPhoto.caption[language]}</p><small>{taiPhoto.credit} · {taiPhoto.code}</small></> : <>{taiPage!.id === 'intro' && <img className="book-friend" src={getLevel('tai-thinh')!.portrait} alt=""/>}<p>{taiPage!.body[language]}</p></>}
        {source && <a className="sparkle-book-source" href={source} target="_blank" rel="noreferrer">{language === 'vi' ? 'Nguồn tư liệu' : 'Source'} · Apollo 12 ↗</a>}
        {activeLevel && <BackToGame language={language}/>}
      </div><BookNavigation language={language} page={page} count={pages.length} onChange={setPage}/></aside>
    </>;
  }
  if (pages[page] === 'sparkle-repair-clue' || pages[page] === 'sparkle-ranging-clue') return <>
    <div className="book-topline"><span className="book-icon" aria-hidden="true">▤</span><span>{copy[language].bookTop}</span></div>
    <aside className="book-panel" lang={language} aria-labelledby="sparkle-clue-title"><div tabIndex={0} className={`book-sheet journey-book sparkle-science-book${pages[page] === 'sparkle-repair-clue' ? ' sparkle-repair-book' : ''}`}>
      <div className="page-corner" aria-hidden="true" />
      <SparkleBookClue key={pages[page]} language={language} ranging={pages[page] === 'sparkle-ranging-clue'} />
      {activeLevel && <BackToGame language={language} />}
    </div><BookNavigation language={language} page={page} count={pages.length} onChange={setPage} /></aside>
  </>;
  const sparklePhotoId = sparkleProgress.keepsakes.find(id => pages[page] === `sparkle-photo-${id}`);
  if (sparklePhotoId !== undefined) {
    const photo = sparkleKeepsakes[sparklePhotoId];
    return <>
      <div className="book-topline"><span className="book-icon" aria-hidden="true">▤</span><span>{copy[language].bookTop}</span></div>
      <aside className="book-panel" lang={language} aria-labelledby="sparkle-photo-title"><div tabIndex={0} className="book-sheet journey-book">
        <div className="page-corner" aria-hidden="true" /><span className="book-kicker">{language === 'vi' ? 'Kỷ niệm cùng Lấp Lánh' : 'Memories with Sparkle'} · {sparklePhotoId + 1}/2</span>
        <h2 id="sparkle-photo-title">{photo[language].title}</h2><img className="book-memory-photo" src={photo.src} alt={photo[language].title} /><p>{photo[language].description}</p><BookSource language={language} sparkle photo />
        {activeLevel && <BackToGame language={language} />}
        </div><BookNavigation language={language} page={page} count={pages.length} onChange={setPage} /></aside>
    </>;
  }
  if (clue || photo) {
    const id = (clue ?? photo)!;
    return <>
      <div className="book-topline"><span className="book-icon" aria-hidden="true">▤</span><span>{copy[language].bookTop}</span></div>
      <aside className="book-panel" lang={language} aria-labelledby="field-book-title"><div tabIndex={0} className="book-sheet journey-book field-book">
        <span className="book-kicker">{clue ? dt.book : dt.found} · {surveyorProgress.found.length}/3</span>
        <h2 id="field-book-title" tabIndex={-1}>{dt.names[id]}</h2>
        {clue ? clueUnlocked ? <>
          <svg className="clue-sketch" viewBox="0 0 180 65" aria-hidden="true">
            {id === 'arrive' ? <g><ellipse cx="60" cy="38" rx="28" ry="12"/><ellipse cx="120" cy="25" rx="28" ry="12"/></g> : id === 'work' ? <path d="M30 25L150 15M30 40L150 30M30 55L150 45"/> : <g>{[0,1,2,3,4,5].map(i => <ellipse key={i} cx={30 + i * 24} cy={25 + i % 2 * 15} rx="8" ry="4"/>)}</g>}
          </svg><p>{dt.clues[id]}</p>
          <button disabled={surveyorProgress.clues.includes(id)} onClick={() => onSurveyorChange({ ...surveyorProgress, clues: [...surveyorProgress.clues, id] })}>{surveyorProgress.clues.includes(id) ? `✓ ${dt.ready}` : dt.read}</button>
          {surveyorProgress.clues.includes(id) && eventOrder.indexOf(id) < eventOrder.length - 1 && <button className="book-next-clue" onClick={() => setPage(pages.indexOf(`clue-${eventOrder[eventOrder.indexOf(id) + 1]}`))}>{language === 'vi' ? 'Gợi ý tiếp theo →' : 'Next clue →'}</button>}
          {surveyorProgress.found.includes(id) && <p>✓ {dt.found}</p>}
        </> : <p role="status">{dt.lockedClue}</p> : <><img className="book-memory-photo" src={memoryPhotos[id]} alt={dt.names[id]} /><p>{dt.descriptions[id]}</p><BookSource language={language} /></>}
        {activeLevel && <BackToGame language={language} />}
        </div><BookNavigation language={language} page={page} count={pages.length} onChange={setPage} /></aside>
    </>;
  }
  return <>
    <div className="book-topline"><span className="book-icon" aria-hidden="true">▤</span><span>{copy[language].bookTop}</span></div>
    <aside className="book-panel" lang={language} aria-labelledby="book-title"><div tabIndex={0} className="book-sheet journey-book">
      <div className="page-corner" aria-hidden="true" /><span className="book-kicker">{b01 ? `B0${entry + 1} · Surveyor 3` : level && detail ? `${String(journeyStops.indexOf(level.id) + 1).padStart(2, '0')} · ${level.label}` : t.title}</span>
      <h2 id="book-title">{b01 ? ct.titles[entry] : level && detail ? detail.friend : t.book}</h2>
      <p>{b01 ? (entry === 0 ? st.bookBody : ct.bodies[entry]) : level && detail ? level.id === 'lap-lanh'
        ? (language === 'vi' ? 'Lấp Lánh là bảng gương phản xạ laser của Apollo 11, được đặt ở Biển Yên Tĩnh năm 1969. Một trăm lăng kính nhỏ giúp bạn gửi ánh sáng trở về phía Trái Đất mà không cần pin. Nhờ đo thời gian ánh sáng đi và về, các nhà khoa học biết được khoảng cách đến Mặt Trăng.' : 'Sparkle is Apollo 11’s laser reflector, placed in the Sea of Tranquility in 1969. Its one hundred small prisms return light toward Earth without batteries. Timing the light’s round trip helps scientists measure the distance to the Moon.')
        : (language === 'vi' ? 'Surveyor 3 là tàu robot NASA đến Mặt Trăng tháng 4/1967. Tàu chụp ảnh và dùng xẻng khảo sát đất. Tháng 11/1969, các phi hành gia Apollo 12 đến thăm và mang một số bộ phận về nghiên cứu.' : 'Surveyor 3 is a NASA robot that reached the Moon in April 1967. It took photos and studied soil with a scoop. In November 1969, Apollo 12 astronauts visited and returned some parts to Earth for study.')
        : t.guide}</p>
      {b01 ? <><img className="book-friend" src={getLevel('surveyor')!.portrait} alt="" /><p>✦ {st.memories} · {memoryCount(surveyorProgress)}/3</p></> : level && detail ? <><img className="book-friend" src={level.portrait} alt="" /><p>{detail.memory} · {level.id === 'lap-lanh' ? `${sparkleProgress.keepsakes.length}/2` : `${memoryCount(surveyorProgress)}/${level.memoryCount}`}</p></> : <ol className="journey-memories">{journeyStops.map((id, index) => {
        const state = status(id);
        const friend = state === 'locked' ? undefined : getLevel(id);
        return <li key={index}><span aria-hidden="true">{state === 'completed' ? '★' : '☆'}</span><span>{friend ? friend.text[language].friend : t.mystery}<small>{state === 'completed' ? t.completed : friend ? t.ready : t.waiting}</small></span></li>;
      })}</ol>}

      {(level || b01) && <BookSource language={language} sparkle={level?.id === 'lap-lanh'} />}
      {activeLevel && <BackToGame language={language} />}
      </div><BookNavigation language={language} page={page} count={pages.length} onChange={setPage} /></aside>
  </>;
}

function BackToGame({ language }: { language: Language }) {
  return <button className="book-return-game" onClick={() => {
    const stage = document.querySelector<HTMLElement>('.game-stage');
    focusGame(stage);
    stage?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  }}>{language === 'vi' ? '↑ Quay lại trò chơi' : '↑ Back to the game'}</button>;
}

function BookSource({ language, sparkle = false, photo = false }: { language: Language; sparkle?: boolean; photo?: boolean }) {
  return <a className="sparkle-book-source" href={sparkle
    ? photo ? 'https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/images11.html' : 'https://www.jpl.nasa.gov/news/apollo-11-experiment-still-going-strong-after-35-years/'
    : 'https://science.nasa.gov/mission/surveyor-3/'} target="_blank" rel="noreferrer">
    {language === 'vi' ? 'Nguồn NASA' : 'NASA source'} · {sparkle ? 'Apollo 11' : 'Surveyor 3'} ↗
  </a>;
}
