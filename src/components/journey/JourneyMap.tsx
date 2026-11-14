import { BanhLuoiRouteMap } from '../friends/ban-banh-luoi/BanhLuoiRouteMap';
import { BanhLuoiCameraDiagram } from '../friends/ban-banh-luoi/BanhLuoiCameraDiagram';
import { restoredFriendPages } from '../../content/book/restored-friends';
import type { TaiThinhProgress } from '../../content/friends/tai-thinh/progress';
import type { BanhLuoiProgress } from '../../content/friends/ban-banh-luoi/progress';
import { BookTopline } from '../book/BookTopline';
import { backCoverCopy, backCoverArtwork, bookBackCover } from '../../content/book/back-cover';
import { frontCoverCopy, frontCoverArtwork, bookFrontCover } from '../../content/book/front-cover';
import { extendedPages } from '../../content/book/extended';
import { availableEndingBookIds } from '../../content/book/ending-progress';
import { portraits } from '../../content/assets';
import { impactCredit, impactDate } from '../../content/friends/gac-troi/challenges/impact';
import { GacLightMap } from '../friends/gac-troi/GacLightMap';
import { Fragment } from 'react';
import { GacImpactPhoto } from '../friends/gac-troi/GacImpactPhoto';
import type { GacTroiProgress } from '../../content/friends/gac-troi/progress';
import { getBookPage } from '../../content/book/catalog';
import { getBrowserBookPages, getBookHintPage } from '../../content/book/reading-order';
import { useBookImageLayout } from '../book/useBookImageLayout';
import { bookArchiveImages, realWorldPages, surveyorToolsPage } from '../../content/book/real-world';
import { BookPageLabel } from '../book/BookContentLabel';
import { BookParagraph } from '../book/BookParagraph';

import { focusGame } from '../../focus/game-focus';
import { SparkleBookClue } from '../friends/lap-lanh/SparkleBookClue';
import { sparkleFactualPages, sparkleIntroTitle } from '../../content/book/sparkle-pages';
import { type SparkleProgress } from '../../content/friends/lap-lanh/progress';
import { digCopy } from '../../content/friends/surveyor/challenges/excavation';
import { memoryPhotos } from '../../content/friends/surveyor/images';
import { enterSurveyor, eventOrder } from '../../content/friends/surveyor/progress';
import { challengeCopy } from '../../content/friends/surveyor/challenges/journal';
import { memoryCount } from '../../content/friends/surveyor/progress';
import { useEffect, useRef, useState } from 'react';
import type { Language } from '../../content/i18n';
import { getLevel, journeyStops, journeyStatus, type LevelId } from '../../content/friends/index';
import { SurveyorLevel, surveyorPlayCopy } from '../friends/surveyor/SurveyorLevel';
import type { SurveyorProgress } from '../../content/friends/surveyor/progress';
import { BookNavigation } from '../book/BookNavigation';

import { journeyCopy } from '../../content/book/journey-copy';
import { introCopy } from '../../content/book/intro-copy';
export { journeyCopy } from '../../content/book/journey-copy';

export function JourneyMap({ taiThinhProgress, banhLuoiProgress, onFindHang, gacTroiProgress, sparkleProgress, language, activeLevel, onEnter, onBack, onReplay, surveyorProgress, onSurveyorChange }: { taiThinhProgress: TaiThinhProgress; banhLuoiProgress: BanhLuoiProgress; onFindHang: () => void; gacTroiProgress: GacTroiProgress; sparkleProgress: SparkleProgress; surveyorProgress: SurveyorProgress; onSurveyorChange: (value: SurveyorProgress) => void; onReplay: () => void; language: Language; activeLevel: LevelId | null; onEnter: (id: LevelId) => void; onBack: () => void }) {
  const t = journeyCopy[language];
  const completed = { surveyor: surveyorProgress.completedOnce, 'lap-lanh': sparkleProgress.completedOnce, 'gac-troi': gacTroiProgress.completedOnce, 'tai-thinh': taiThinhProgress.completedOnce, 'ban-banh-luoi': banhLuoiProgress.completedOnce };
  const status = (id: LevelId | null) => journeyStatus(id, completed);
  const level = status(activeLevel) === 'locked' ? undefined : getLevel(activeLevel);
  const detail = level?.text[language];
  const [selectedStop, setSelectedStop] = useState(0);
  const [entryFriend, setEntryFriend] = useState<LevelId>('surveyor');
  const hangUnlocked = gacTroiProgress.completedOnce;
  const selectedHang = hangUnlocked && selectedStop === journeyStops.length;
  const hangLabel = language === 'vi' ? 'Chị Hằng' : 'Hằng';
  const hangEnter = language === 'vi' ? 'Gặp chị Hằng' : 'Meet Hằng';
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
    <header><span>{`★ ${Object.values(completed).filter(Boolean).length}`}/{journeyStops.length}</span><h2 id="journey-title">{level && detail ? detail.chapter : hangUnlocked ? (language === 'vi' ? 'Lộ trình của Cuội' : 'Cuội’s journey') : t.title}</h2></header>
    {level && detail ? <>
      <div className="surveyor-meeting"><img src={level.portrait} alt={detail.friend} /><div><p><b>Cuội:</b> {detail.intro}</p><p><b>{detail.friend}:</b> {detail.reply}</p><p>{detail.invitation}</p></div></div>
      <button onClick={onBack}>{t.back}</button>
    </> : <>
      <p className="journey-lead">{gacTroiProgress.storyCompletedOnce ? (language === 'vi' ? 'Câu chuyện đã khép lại. Cùng nhớ những người bạn dưới ánh trăng!' : 'The story is complete. Remember our friends beneath the Moon!') : hangUnlocked ? (language === 'vi' ? 'Đèn đã sáng đủ năm cánh! Chị Hằng đang đợi Cuội dưới cây đa.' : 'All five points are shining! Hằng is waiting for Cuội beneath the banyan.') : t.lead}</p>
      <div className={`journey-route${hangUnlocked ? ' journey-route-four' : ''}`}>
        <svg viewBox="0 0 800 180" preserveAspectRatio="none" aria-hidden="true"><path d={hangUnlocked ? "M67 110 Q134 20 200 65 T333 110 T467 65 T600 110 T733 65" : "M80 110 Q160 20 240 65 T400 110 T560 65 T720 110"} /></svg>
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
        {hangUnlocked && <button className="journey-stop stop-5 stop-ready" onClick={() => { setSelectedStop(journeyStops.length); setLocked(false); }} aria-pressed={selectedHang} aria-label={`6. ${hangLabel}. ${t.ready}`}>
          <span className="stop-orb"><img src={portraits.chiHang.url} alt="" /></span>
          <span>06 · {hangLabel}</span>
          <small style={{ visibility: selectedHang ? 'visible' : 'hidden' }}>Cuội ✦</small>
        </button>}
      </div>
      <p className="journey-message" role="status">{[t.guide, t.prerequisite, t.locked].map((message, index) => {
        const visible = index === (locked ? selectedFriend ? 1 : 2 : 0);
        return <span key={index} style={{ visibility: visible ? 'visible' : 'hidden' }} aria-hidden={!visible}>{selectedHang && index === 0 ? (gacTroiProgress.storyCompletedOnce ? (language === 'vi' ? 'Trở về hiên nhà cùng An và bà, xem lại giới thiệu hoặc chơi lại đoạn kết.' : 'Return to An and Grandma’s porch, replay the credits or play the ending again.') : (language === 'vi' ? 'Gặp chị Hằng dưới cây đa để tiếp tục câu chuyện.' : 'Meet Hằng beneath the banyan to continue the story.')) : message}</span>;
      })}</p>
      <div className="journey-entry-action"><button className="journey-primary" style={{ visibility: selectedHang || selectedLevel ? 'visible' : 'hidden' }} disabled={!selectedHang && !selectedLevel} onClick={() => { if (selectedHang) onFindHang(); else if (selectedLevel) enterFriend(selectedLevel.id); }}>{selectedHang ? hangEnter : entryLevel.text[language].enter} →</button></div>
    </>}
  </section>;
}

export function JourneyBook({ taiThinhProgress, banhLuoiProgress, gacTroiProgress, sparkleProgress, language, activeLevel, surveyorProgress, onSurveyorChange, bookRequest }: { taiThinhProgress: TaiThinhProgress; banhLuoiProgress: BanhLuoiProgress; gacTroiProgress: GacTroiProgress; sparkleProgress: SparkleProgress; onSurveyorChange: (p: SurveyorProgress) => void; bookRequest: number; language: Language; activeLevel: LevelId | null; surveyorProgress: SurveyorProgress }) {
  return <JourneyBookPages taiThinhProgress={taiThinhProgress} banhLuoiProgress={banhLuoiProgress} gacTroiProgress={gacTroiProgress} sparkleProgress={sparkleProgress} onSurveyorChange={onSurveyorChange} bookRequest={bookRequest} key={activeLevel ?? 'route'} language={language} activeLevel={activeLevel} surveyorProgress={surveyorProgress} />;
}

function JourneyBookPages({ taiThinhProgress, banhLuoiProgress, gacTroiProgress, sparkleProgress, language, activeLevel, surveyorProgress, onSurveyorChange, bookRequest }: { taiThinhProgress: TaiThinhProgress; banhLuoiProgress: BanhLuoiProgress; gacTroiProgress: GacTroiProgress; sparkleProgress: SparkleProgress; onSurveyorChange: (p: SurveyorProgress) => void; bookRequest: number; language: Language; activeLevel: LevelId | null; surveyorProgress: SurveyorProgress }) {
  const completed = { surveyor: surveyorProgress.completedOnce, 'lap-lanh': sparkleProgress.completedOnce, 'gac-troi': gacTroiProgress.completedOnce, 'tai-thinh': taiThinhProgress.completedOnce, 'ban-banh-luoi': banhLuoiProgress.completedOnce };
  const status = (id: LevelId | null) => journeyStatus(id, completed);
  // Only configured stops have readable pages. Reading never changes the game level.
  const pages = getBrowserBookPages({ surveyor: surveyorProgress, sparkle: sparkleProgress, gacTroi: gacTroiProgress, taiThinh: taiThinhProgress, banhLuoi: banhLuoiProgress });
  // Keep the selected page's identity when new photos or clues are inserted.
  const [selectedPage, setSelectedPage] = useState<string | null>(activeLevel === 'gac-troi' ? 'gac-book-orbit' : activeLevel ?? bookFrontCover.id);
  const previousSparklePhotos = useRef(sparkleProgress.keepsakes);
  useEffect(() => {
    if (activeLevel === 'lap-lanh') {
      const received = [0, 1].filter(id => sparkleProgress.keepsakes.includes(id) && !previousSparklePhotos.current.includes(id));
      if (received.length) setSelectedPage(`sparkle-photo-${received.at(-1)}`);
    }
    previousSparklePhotos.current = sparkleProgress.keepsakes;
  }, [activeLevel, sparkleProgress.keepsakes]);
  const previousTaiIdentified = useRef(taiThinhProgress.identified);
  useEffect(() => {
    if (activeLevel === 'tai-thinh' && taiThinhProgress.identified && !previousTaiIdentified.current) {
      setSelectedPage('tai-book-devices');
    }
    previousTaiIdentified.current = taiThinhProgress.identified;
  }, [activeLevel, taiThinhProgress.identified]);
  const previousSurveyorPhase = useRef(surveyorProgress.phase);
  useEffect(() => {
    if (activeLevel === 'surveyor' && previousSurveyorPhase.current === 'dialogue' && surveyorProgress.phase === 'tools') {
      setSelectedPage('surveyor-reality');
    }
    if (activeLevel === 'surveyor' && previousSurveyorPhase.current !== 'soil' && surveyorProgress.phase === 'soil' && surveyorProgress.found.length === 0) {
      setSelectedPage('clue-arrive');
    }
    if (activeLevel === 'surveyor' && previousSurveyorPhase.current !== 'complete' && surveyorProgress.phase === 'complete') {
      setSelectedPage('surveyor-notebook');
    }
    previousSurveyorPhase.current = surveyorProgress.phase;
  }, [activeLevel, surveyorProgress.phase]);
  const page = Math.max(0, pages.indexOf(selectedPage));
  const setPage = (index: number) => setSelectedPage(pages[index] ?? null);
  const lastBookRequest = useRef(bookRequest);
  const [impactHintVisible, setImpactHintVisible] = useState(false);
  const [bookFocusRequest, setBookFocusRequest] = useState(0);
  const t = journeyCopy[language];
  const dt = digCopy[language];
  const clue = eventOrder.find(id => pages[page] === `clue-${id}`);
  const clueUnlocked = !clue || eventOrder.slice(0, eventOrder.indexOf(clue)).every(id => surveyorProgress.clues.includes(id) || surveyorProgress.found.includes(id));
  const photo = eventOrder.find(id => pages[page] === `photo-${id}`);
  useEffect(() => {
    if (lastBookRequest.current === bookRequest) return;
    lastBookRequest.current = bookRequest;
    const target = getBookHintPage({ surveyor: surveyorProgress, sparkle: sparkleProgress, gacTroi: gacTroiProgress, taiThinh: taiThinhProgress, banhLuoi: banhLuoiProgress }, activeLevel);
    if (!target || !pages.includes(target)) return;
    setSelectedPage(target);
    if (target === 'gac-book-impact') setImpactHintVisible(true);
    setBookFocusRequest(bookRequest);
  }, [bookRequest]);
  // Wait until the requested page has rendered before looking up its heading.
  useEffect(() => {
    if (!bookFocusRequest) return;
    const frame = requestAnimationFrame(() => {
      const heading = document.getElementById('reading-book-title') ?? document.getElementById(activeLevel === 'gac-troi' ? 'gac-book-title' : activeLevel === 'lap-lanh' ? 'sparkle-clue-title' : 'field-book-title');
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
    });
    return () => cancelAnimationFrame(frame);
  }, [bookFocusRequest, activeLevel]);
  useEffect(() => {
    document.querySelector('.book-panel .book-sheet')?.scrollTo({ top: 0 });
  }, [selectedPage]);
  const leafNavigation = useBookImageLayout(pages[page], language, bookRequest, pages, page, setPage, JSON.stringify([surveyorProgress.found, surveyorProgress.clues, sparkleProgress.keepsakes, completed, impactHintVisible, availableEndingBookIds(gacTroiProgress)]));
  const bookNavigation = { ...leafNavigation, contents: pages.map((id, index) => ({
    title: `${id?.startsWith('clue-') ? (language === 'vi' ? 'Gợi ý · ' : 'Clue · ') : id?.startsWith('photo-') ? (language === 'vi' ? 'Ảnh · ' : 'Photo · ') : ''}${getBookPage(id)?.title[language] ?? ''}`, index,
  })).map(item => { const level = getLevel(pages[item.index]); return level && status(level.id) === 'locked' ? { ...item, title: t.mystery } : item; }), selected: page, onSelect: setPage };
  const showSources = !!getBookPage(pages[page])?.blocks.some(block => block.sources.length > 0);
  const level = getLevel(pages[page]);
  const detail = level?.text[language];
  const entry = ['surveyor-b01', 'surveyor-b02', 'surveyor-b03'].indexOf(pages[page] ?? '');
  const b01 = entry >= 0;
  const ct = challengeCopy[language];
  const st = surveyorPlayCopy[language];
  if (level && status(level.id) === 'locked') return <>
    <BookTopline language={language} />
    <aside className="book-panel" lang={language} aria-labelledby="book-title"><div tabIndex={0} className="book-sheet journey-book">
      <BookPageLabel pageId={pages[page]} language={language}/>
      <div className="page-corner" aria-hidden="true" /><span className="book-kicker">{String(journeyStops.indexOf(level.id) + 1).padStart(2, '0')} · {t.waiting}</span>
      <h2 id="book-title">{t.mystery}</h2><p>{t.prerequisite}</p>
      {activeLevel && <BackToGame language={language} />}
    </div><BookNavigation language={language} {...bookNavigation} /></aside>
  </>;
  if (pages[page] === bookFrontCover.id) return <>
    <BookTopline language={language}/>
    <aside className="book-panel" lang={language} aria-label={bookFrontCover.title[language]}>
      <div tabIndex={0} className="book-sheet book-back-cover book-front-cover" style={{ backgroundImage: `url("${frontCoverArtwork}")` }}>
        <div className="back-cover-content">
          <span className="back-cover-eyebrow">{frontCoverCopy.eyebrow[language]}</span>
          <div className="back-cover-title"><h2>CUỘI</h2><p>{frontCoverCopy.subtitle[language]}</p></div>
          <div className="back-cover-signoff"><p>{frontCoverCopy.invitation[language]}</p><span>LIGHT OF MEMORIES</span></div>
        </div>
      </div>
      <BookNavigation language={language} {...bookNavigation}/>
    </aside>
  </>;
  if (pages[page] === bookBackCover.id) return <>
    <BookTopline language={language}/>
    <aside className="book-panel" lang={language} aria-label={bookBackCover.title[language]}>
      <div tabIndex={0} className="book-sheet book-back-cover" style={{ backgroundImage: `url("${backCoverArtwork}")` }}>
        <div className="back-cover-content">
          <span className="back-cover-eyebrow">{backCoverCopy.end[language]}</span>
          <div className="back-cover-title"><h2>CUỘI</h2><p>{backCoverCopy.subtitle[language]}</p></div>
          <div className="back-cover-signoff"><p>{backCoverCopy.thanks[language]}</p><span>LIGHT OF MEMORIES</span></div>
        </div>
      </div>
      <BookNavigation language={language} {...bookNavigation}/>
    </aside>
  </>;
  if ([...extendedPages, ...restoredFriendPages].some(p => p.id === pages[page]) || pages[page]?.startsWith('ending-book-')) {
    const entry = getBookPage(pages[page])!;
    const recap = extendedPages.find(p => p.id === entry.id);
    const taiSources = (entry.chapter === 'apollo12' || entry.id === 'ban-photo-vip' || entry.id === 'ban-book-wheels-real' || entry.id === 'ban-book-walkback' || ['ban-photo-orbit', 'ban-book-legacy'].includes(entry.id)) && entry.blocks.some(block => block.sources.length > 0);
    return <>
      <BookTopline language={language}/>
      <aside className="book-panel" lang={language} aria-labelledby="reading-book-title">
        <div tabIndex={0} className={`book-sheet journey-book${recap?.gate === 'surveyor' || recap?.gate === 'apollo11' || recap?.gate === 'lro' || entry.id === 'tai-book-devices' || ['ban-book-legacy', 'ban-photo-orbit'].includes(entry.id) ? ' book-surveyor-story' : ''}`}>
          <BookPageLabel pageId={entry.id} language={language}/><div className="page-corner" aria-hidden="true"/>
          {entry.id === 'tai-thinh' && <span className="book-kicker">03 · Apollo 12</span>}
          {entry.id === 'ban-banh-luoi' && <span className="book-kicker">04 · Apollo 15</span>}
          <h2 id="reading-book-title" tabIndex={-1} className={recap?.continuation || entry.id === 'ban-photo-orbit' ? 'sr-only' : undefined}>{entry.title[language]}</h2>
          <div className="book-prose">{getLevel(entry.id) && <img className="book-friend" src={getLevel(entry.id)!.portrait} alt=""/>}{entry.blocks.filter(block => block.image || block.diagram).map(block => block.diagram === 'route' || block.diagram === 'route-safe' ? <figure className="book-reality-photo book-diagram" key={block.id} data-book-block={block.id}><BanhLuoiRouteMap language={language} showSafe={block.diagram === 'route-safe' && banhLuoiProgress.routeHint === 2}/><figcaption>{block.text[language]}</figcaption></figure> : block.diagram === 'camera' ? <figure className="book-reality-photo book-diagram" key={block.id} data-book-block={block.id}><BanhLuoiCameraDiagram language={language}/><figcaption>{block.text[language]}</figcaption></figure> : block.image
            ? <figure key={block.id} className="book-reality-photo" data-book-block={block.id}>
                <img src={block.image.src} alt={block.image.alt[language]}/>
                <figcaption>{[block.image.credit, block.image.code, block.image.date].filter(Boolean).join(' · ')}</figcaption>
              </figure>
            : null)}{entry.id === 'ban-book-wheels' ? <ul className="ban-wheel-hints">{entry.blocks.map((block, i) => <li key={block.id} className={i === 2 ? 'ban-wheel-answer' : undefined} data-book-block={block.id}><p><BookParagraph pageId={entry.id} value={block.text[language]} language={language}/></p></li>)}</ul> : entry.blocks.filter(block => !block.diagram).map(block => <p key={block.id} data-book-block={block.id}><BookParagraph pageId={entry.id} value={block.text[language]} language={language}/></p>)}</div>
          {!recap?.sourcesOnNextPage && entry.id !== 'ban-book-legacy' && (recap?.gate === 'surveyor' || recap?.gate === 'apollo11' || recap?.gate === 'lro' || taiSources ? <footer className={`book-reality-sources${taiSources ? ' book-tai-sources' : ''}`}>{[...new Set(entry.blocks.flatMap(block => block.sources.map(source => source.url)))].map(url => <BookReference key={url} url={url} language={language}/>)}</footer> : [...new Set(entry.blocks.flatMap(block => block.sources.map(source => source.url)))].map(url => <BookReference key={url} url={url} language={language}/>))}
          {activeLevel && <BackToGame language={language}/>}
        </div>
        <BookNavigation language={language} {...bookNavigation}/>
      </aside>
    </>;
  }
  if (pages[page]?.startsWith('gac-')) {
    const entry = getBookPage(pages[page])!;
    return <>
      <BookTopline language={language} />
      <aside className="book-panel" lang={language} aria-labelledby="gac-book-title"><div tabIndex={0} className="book-sheet journey-book">
        <BookPageLabel pageId={entry.id} language={language}/><div className="page-corner" aria-hidden="true"/>
        {!['gac-book-sites', 'gac-book-impact', 'gac-book-impact.story'].includes(entry.id) && <span className="book-kicker">05 · LRO</span>}<h2 id="gac-book-title" tabIndex={-1}>{entry.title[language]}</h2>
        <div className={`book-prose${entry.id === 'gac-book-orbit' ? ' book-prose--intro' : ''}`}>
          {entry.id === 'gac-book-orbit' && <img className="book-friend" src={getLevel('gac-troi')!.portrait} alt=""/>}
          {entry.id === 'gac-book-impact' && <div className="book-impact-pair">
            {(['before', 'after'] as const).map(when => <figure key={when}>
              <div className="book-impact-regions"><GacImpactPhoto when={when} language={language}/><div className="book-impact-numbers" aria-hidden="true"><span>1</span><span>2</span><span>3</span></div></div>
              <figcaption>{impactDate(when, language)}</figcaption>
            </figure>)}
          </div>}
          {entry.blocks.filter(block => (block.id !== 'gac-book-impact.hint' || impactHintVisible)).map(block => <Fragment key={block.id}>
            {block.diagram === 'gac-map' && <figure className="book-gac-map" data-book-block={block.id}><GacLightMap language={language}/></figure>}
            {block.image?.annotation === 'answer' && <figure className="book-reality-photo book-impact-photo" data-book-block={block.id}><GacImpactPhoto when="after" language={language} annotation="answer"/><figcaption>{impactDate('after', language)}</figcaption></figure>}
            {entry.id !== 'gac-book-orbit' && block.image && !block.image.annotation && <figure className="book-reality-photo" data-book-block={block.id}><img src={block.image.src} alt={block.image.alt[language]}/><figcaption>{block.image.credit}</figcaption></figure>}
            <p id={block.id === 'gac-book-impact.hint' ? 'gac-impact-answer' : undefined} data-book-block={block.id} className={block.id === 'gac-book-impact.hint' ? 'book-impact-answer' : entry.id === 'gac-book-sites' && block.id.includes('.friend-') ? 'book-site-friend' : undefined}>{entry.id === 'gac-book-sites' && block.id.includes('.friend-') ? <><strong>{block.text[language].split(' — ')[0]}</strong><span> — {block.text[language].split(' — ')[1]}</span></> : <BookParagraph pageId={entry.id} value={block.text[language]} language={language}/>}</p>
          </Fragment>)}
          {entry.id === 'gac-book-impact' && <button className="book-hint-toggle book-impact-answer-toggle" aria-controls="gac-impact-answer" aria-expanded={impactHintVisible} onClick={() => setImpactHintVisible(value => !value)}>{language === 'vi' ? (impactHintVisible ? 'Ẩn đáp án' : 'Xem đáp án') : (impactHintVisible ? 'Hide answer' : 'Show answer')}</button>}
        </div>
        {['gac-book-impact.story', 'gac-book-light'].includes(entry.id) ? <footer className="book-reality-sources">{[...new Set(entry.blocks.flatMap(block => block.sources.map(s => s.url)))].map(url => <BookReference key={url} url={url} language={language}/>)}</footer> : [...new Set(entry.blocks.flatMap(block => block.sources.map(s => s.url)))].map(url => <BookReference key={url} url={url} language={language}/>)}
        {activeLevel && <BackToGame language={language}/>}
      </div><BookNavigation language={language} {...bookNavigation}/></aside>
    </>;
  }
  const reality = pages[page] === surveyorToolsPage.id ? surveyorToolsPage : [...realWorldPages, ...sparkleFactualPages].find(entry => entry.id === pages[page]);
  if (reality) return <>
    <BookTopline language={language} />
    <aside className="book-panel" lang={language} aria-labelledby="reality-book-title">
      <div tabIndex={0} className="book-sheet journey-book book-reality">
        <div className="page-corner" aria-hidden="true" />
        <h2 id="reality-book-title">{reality.title[language]}</h2>
        <div className={`book-prose book-prose--${reality.layout}`}>
          {reality.image && <figure className="book-reality-photo"><img src={reality.image} alt={reality.caption[language]} /><figcaption>{reality.caption[language]}</figcaption></figure>}
          {reality.paragraphs.map((paragraph, i) => <p key={i}>{paragraph[language]}</p>)}
        </div>
        <footer className="book-reality-sources">{reality.sources.map(url => <BookReference key={url} url={url} language={language}/>)}</footer>
        {activeLevel && <BackToGame language={language} />}
      </div><BookNavigation language={language} {...bookNavigation} />
    </aside>
  </>;
  const archive = bookArchiveImages[pages[page] as keyof typeof bookArchiveImages];
  if (pages[page] === 'sparkle-repair-clue' || pages[page] === 'sparkle-ranging-clue') return <>
    <BookTopline language={language} />
    <aside className="book-panel" lang={language} aria-labelledby="sparkle-clue-title"><div tabIndex={0} className={`book-sheet journey-book sparkle-science-book${pages[page] === 'sparkle-repair-clue' ? ' sparkle-repair-book' : ''}`}>
      <BookPageLabel pageId={pages[page]} language={language}/>
      <div className="page-corner" aria-hidden="true" />
      <SparkleBookClue key={pages[page]} showSources={showSources} language={language} ranging={pages[page] === 'sparkle-ranging-clue'} />
      {activeLevel && <BackToGame language={language} />}
    </div><BookNavigation language={language} {...bookNavigation} /></aside>
  </>;
  if (pages[page] === 'surveyor-photos') {
    const album = getBookPage('surveyor-photos')!;
    return <>
      <BookTopline language={language}/>
      <aside className="book-panel" lang={language} aria-labelledby="surveyor-photos-title">
        <div tabIndex={0} className="book-sheet journey-book surveyor-photo-album">
          <BookPageLabel pageId={album.id} language={language}/>
          <h2 id="surveyor-photos-title">{album.title[language]}</h2>
          <div className="book-prose surveyor-photo-rows">
            {album.blocks.map(block => <figure className="surveyor-photo-row" key={block.id}>
              <img src={block.image!.src} alt={block.image!.alt[language]}/>
              <figcaption>{block.text[language]}</figcaption>
            </figure>)}
          </div>
          <BookSource language={language}/>
          {activeLevel && <BackToGame language={language}/>}
        </div>
        <BookNavigation language={language} {...bookNavigation}/>
      </aside>
    </>;
  }
  if (clue || photo) {
    const id = (clue ?? photo)!;
    return <>
      <BookTopline language={language} />
      <aside className="book-panel" lang={language} aria-labelledby="field-book-title"><div tabIndex={0} className="book-sheet journey-book field-book">
      <BookPageLabel pageId={pages[page]} language={language}/>
        <span className="book-kicker">{clue ? dt.book : dt.found} · {surveyorProgress.found.length}/3</span>
        <h2 id="field-book-title" tabIndex={-1}>{dt.names[id]}</h2>
        {clue ? clueUnlocked ? <>
          <svg className="clue-sketch" viewBox="0 0 180 65" aria-hidden="true">
            {id === 'arrive' ? <g><ellipse cx="60" cy="38" rx="28" ry="12"/><ellipse cx="120" cy="25" rx="28" ry="12"/></g> : id === 'work' ? <path d="M30 25L150 15M30 40L150 30M30 55L150 45"/> : <g>{[0,1,2,3,4,5].map(i => <ellipse key={i} cx={30 + i * 24} cy={25 + i % 2 * 15} rx="8" ry="4"/>)}</g>}
          </svg><p>{dt.clues[id]}</p>
          <button disabled={surveyorProgress.clues.includes(id)} onClick={() => onSurveyorChange({ ...surveyorProgress, clues: [...surveyorProgress.clues, id] })}>{surveyorProgress.clues.includes(id) ? `✓ ${dt.ready}` : dt.read}</button>
          {surveyorProgress.clues.includes(id) && eventOrder.indexOf(id) < eventOrder.length - 1 && <button className="book-next-clue" onClick={() => setPage(pages.indexOf(`clue-${eventOrder[eventOrder.indexOf(id) + 1]}`))}>{language === 'vi' ? 'Gợi ý tiếp theo →' : 'Next clue →'}</button>}
          {surveyorProgress.found.includes(id) && <p>✓ {dt.found}</p>}
        </> : <p role="status">{dt.lockedClue}</p> : <><div className="book-prose"><img className="book-memory-photo" src={memoryPhotos[id]} alt={dt.names[id]} /><p>{dt.descriptions[id]}</p></div>{showSources && <BookSource language={language} />}</>}
        {activeLevel && <BackToGame language={language} />}
        </div><BookNavigation language={language} {...bookNavigation} /></aside>
    </>;
  }
  return <>
    <BookTopline language={language} />
    <aside className="book-panel" lang={language} aria-labelledby="book-title"><div tabIndex={0} className="book-sheet journey-book">
      <BookPageLabel pageId={pages[page]} language={language}/>
      <div className="page-corner" aria-hidden="true" /><span className="book-kicker">{b01 ? `B0${entry + 1} · Surveyor 3` : level && detail ? `${String(journeyStops.indexOf(level.id) + 1).padStart(2, '0')} · ${level.label}` : t.title}</span>
      <h2 id="book-title">{b01 ? ct.titles[entry] : level && detail ? level.id === 'lap-lanh' ? sparkleIntroTitle[language] : detail.friend : t.book}</h2>
      <div className={`book-prose${level ? ' book-prose--intro' : !b01 ? ' book-prose--overview' : ''}`}>
      {archive && <ArchiveFigure photo={archive} language={language}/>}
      {!archive && (b01 || level) && <img className="book-friend" src={b01 ? getLevel('surveyor')!.portrait : level!.portrait} alt="" />}
      <p>{b01 ? (entry === 0 ? st.bookBody : ct.bodies[entry]) : level && detail ? level.id === 'lap-lanh'
        ? introCopy.sparkleIntro[language]
        : introCopy.surveyorIntro[language]
        : <>{language === 'vi' ? 'Tra cứu thông tin thiết bị và gợi ý cho các thử thách. Các trang được mở theo tiến trình chơi.' : 'Explore instrument facts and challenge hints. Pages unlock as you play.'}</>}</p>
      {b01 ? <><p>✦ {st.memories} · {memoryCount(surveyorProgress)}/3</p></> : level && detail ? !['surveyor', 'lap-lanh'].includes(level.id) && <p>{detail.memory} · {memoryCount(surveyorProgress)}/{level.memoryCount}</p> : <><ol className="journey-memories">{journeyStops.map((id, index) => {
        const state = status(id);
        const friend = state === 'locked' ? undefined : getLevel(id);
        return <li key={index}><span aria-hidden="true">{state === 'completed' ? '★' : '☆'}</span><span>{friend ? friend.text[language].friend : t.mystery}<small>{state === 'completed' ? t.completed : friend ? t.ready : t.waiting}</small></span></li>;
      })}</ol></>}
      </div>

      {showSources && level?.id !== 'lap-lanh' && (level || b01) && <BookSource language={language} />}
      {activeLevel && <BackToGame language={language} />}
      </div><BookNavigation language={language} {...bookNavigation} /></aside>
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

function ArchiveFigure({ photo, language }: { photo: { src: string; caption: { vi: string; en: string } }; language: Language }) {
  return <figure className="book-reality-photo"><img src={photo.src} alt={photo.caption[language]}/><figcaption>{photo.caption[language]}</figcaption></figure>;
}

/** Human-readable titles keep multiple references distinguishable. */
function BookReference({ url, language }: { url: string; language: Language }) {
  // Book sources also include app-relative PDFs, not only external NASA URLs.
  const reference = new URL(url, window.location.href);
  if (reference.origin === window.location.origin && /\/books\/[^/]+\.pdf$/i.test(reference.pathname)) {
    return <a className="sparkle-book-source" href={url} target="_blank" rel="noreferrer">{language === 'vi' ? 'Sách gốc · PDF' : 'Original book · PDF'} ↗</a>;
  }
  const titles: Record<string, [string, string]> = {
    'A15_SurfaceProc.pdf': ['Apollo 15 · Giới hạn đi bộ về tàu', 'Apollo 15 · Walk-back limits'],
    'lroc.im-ldi.com/images/491': ['LROC · Dấu vết Apollo 15', 'LROC · Apollo 15 tracks'],
    '19730010465': ['Camera truyền hình GCTA', 'GCTA television camera'],
    'apollo-15-mission-report.pdf': ['Apollo 15 · Báo cáo nhiệm vụ', 'Apollo 15 · Mission report'],
    'Apollo_15a_Summary.htm': ['Apollo 15 · Tổng kết nhiệm vụ', 'Apollo 15 · Mission summary'],
    'spacecraftName=Apollo+12': ['Dữ liệu PSE Apollo 12', 'Apollo 12 · PSE data'],
    'id=1969-099C-03': ['Thí nghiệm địa chấn PSE Apollo 12', 'Apollo 12 · PSE'],
    'id=1969-099C': ['Cụm thiết bị ALSEP Apollo 12', 'Apollo 12 · ALSEP'],
    'Apollo11_Preliminary_Sci_Report_LLR.pdf': ['Apollo 11 · Báo cáo thí nghiệm LRRR', 'Apollo 11 · LRRR science report'],
    'spacecraft-and-instruments': ['Tàu LRO và thiết bị', 'LRO spacecraft and instruments'],
    'apollo-11-landing-site': ['Khu hạ cánh Apollo 11', 'Apollo 11 landing site'],
    'apollo-12-and-surveyor-3': ['Conrad bên Surveyor 3', 'Conrad beside Surveyor 3'],
    '4242': ['Ảnh trước và sau va chạm', 'Before and after the impact'],
    'impact-crater': ['Hố va chạm tháng 3/2013', 'March 2013 impact crater'],
    'surveyor-3-camera': ['Máy ảnh Surveyor 3 trở về', 'Surveyor 3 camera returned'],
    'surveyor-3': ['Sứ mệnh Surveyor 3', 'Surveyor 3 mission'],
    'ap11_reflector': ['Cấu tạo bảng phản xạ', 'Reflector construction'],
    'ap11_general': ['Thí nghiệm Apollo 11', 'Apollo 11 experiment'],
    'experiment-still': ['Bảng phản xạ Apollo 11', 'Apollo 11 reflector'],
    'south-pole': ['Bản đồ chiếu sáng cực Nam', 'South pole illumination map'],
  };
  const title = Object.entries(titles).find(([part]) => url.includes(part))?.[1][language === 'vi' ? 0 : 1];
  return <a className="sparkle-book-source" href={url} target="_blank" rel="noreferrer" title={url.includes('/4242/') ? impactCredit : undefined}>{title ? `NASA · ${title}` : `NASA · ${reference.pathname.split('/').filter(Boolean).at(-1)?.replaceAll('-', ' ') || 'LRO'}`} ↗</a>;
}
