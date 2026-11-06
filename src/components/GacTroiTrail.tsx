import { useEffect, useRef, useState } from 'react';
import type { Language } from '../content/i18n';
import type { GacTroiPhase, GacTroiProgress } from '../content/levels/gac-troi-progress';
import { replayGacTroi } from '../content/levels/gac-troi-progress';
import { advanceGacDialogue, keepGacClue } from '../content/levels/gac-troi-flow';
import { gacReunionDialogue, gacTrailCopy as copy } from '../content/levels/gac-troi-trail';
import { GameCanvas } from '../game/GameCanvas';
import { EarthDialogue } from './EarthDialogue';
import { GacLightMap } from './GacLightMap';
import { portraits } from '../content/assets';
import './gac-trail.css';

export const isGacTrailPhase = (phase: GacTroiPhase) => ['t04-slope', 't04-rock', 't04-banyan', 'reunion', 'cards-intro'].includes(phase);

/** Local observations are not clues. A clue is committed only after the confirmed walk. */
export function GacTroiTrail({ language, progress, onChange, onBack, onBook, paused }: {
  language: Language; progress: GacTroiProgress; onChange: (p: GacTroiProgress) => void;
  onBack: () => void; onBook: () => void; paused: boolean;
}) {
  const vi = language === 'vi';
  const phase = progress.phase;
  const slope = phase === 't04-slope', rock = phase === 't04-rock', banyan = phase === 't04-banyan';
  const reunion = phase === 'reunion', rest = phase === 'cards-intro';
  const [selection, setSelection] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [mapViewed, setMapViewed] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [walking, setWalking] = useState(0);
  const map = useRef<HTMLDialogElement>(null);
  const mapButton = useRef<HTMLButtonElement>(null);
  const root = useRef<HTMLElement>(null);
  const committed = useRef(false);
  const walkingAllowed = !paused && !mapOpen && (confirmed || banyan);
  const scene = slope ? 't04-slope' : rock ? 't04-rock' : banyan ? 't04-banyan' : 'reunion';
  useEffect(() => {
    if (mapOpen && !paused) map.current?.showModal();
    else map.current?.close();
  }, [mapOpen, paused]);
  useEffect(() => {
    if (walkingAllowed && walking) root.current?.querySelector<HTMLElement>('.game-host')?.focus({preventScroll:true});
  }, [walkingAllowed, walking]);
  function finishWalk() {
    if (!walkingAllowed || committed.current) return;
    committed.current = true;
    onChange(keepGacClue(progress, slope ? 'slope' : rock ? 'lantern' : 'call'));
  }
  const data = slope || rock || banyan ? copy[phase as 't04-slope' | 't04-rock' | 't04-banyan'] : null;
  const choose = (id: string) => { if (!paused && !confirmed && (!slope || mapViewed)) setSelection(id); };
  const feedback = confirmed && (slope || rock) ? copy[slope ? 't04-slope' : 't04-rock'].done[language]
    : selection === 'high' ? copy.wrong[language] : selection === 'star' ? copy.star[language] : selection === 'lantern' ? copy.lantern[language] : '';
  return <section ref={root} className="gac-trail" hidden={paused} lang={language} aria-label={vi ? 'Chị Hằng ở đâu?' : 'Where is Hằng?'}>
    <header className="gac-trail-hud"><span>{vi ? (slope ? 'Triền đất' : rock ? 'Khe đá' : 'Gốc đa') : (slope ? 'The slope' : rock ? 'The split rock' : 'The banyan')}</span>
      <nav><button ref={mapButton} aria-haspopup="dialog" onClick={() => setMapOpen(true)}>{vi ? 'Xem bản đồ' : 'View map'} ▤</button><button onClick={onBack}>{vi ? 'Về lộ trình' : 'Back to route'}</button></nav></header>
    <div className="gac-trail-view">
      <div className="gac-trail-canvas" inert={!walkingAllowed}>
        <GameCanvas scene={scene} initiallyAwake encounterStarted quest="complete" treeSpeaking={false}
          taiStars={5} moonMode={paused || mapOpen ? 'paused' : walkingAllowed ? 'free' : 'story'} language={language}
          walkCommand={walking} walkDestination={walking && walkingAllowed ? (banyan ? 720 : 890) : undefined}
          onInteract={() => {}} onAwake={() => {}} onExit={finishWalk}/>
      </div>
      {slope && !confirmed && <div className="gac-trail-hotspots" inert={paused || mapOpen}>
        <button tabIndex={-1} disabled={!mapViewed} style={{left:'30%',top:'39%',width:'20%',height:'34%'}} aria-label={vi ? 'Triền cao' : 'High ridge'} onClick={() => choose('high')}/>
        <button tabIndex={-1} disabled={!mapViewed} style={{left:'57%',top:'48%',width:'27%',height:'25%'}} aria-label={vi ? 'Triền thấp' : 'Low slope'} onClick={() => choose('low')}/>
      </div>}
      {rock && !confirmed && <div className="gac-trail-hotspots" inert={paused || mapOpen}>
        <button tabIndex={-1} style={{left:'63%',top:'10%',width:'16%',height:'21%'}} aria-label={vi ? 'Ngôi sao ở cao' : 'The high star'} onClick={() => choose('star')}/>
        <button tabIndex={-1} style={{left:'71%',top:'46%',width:'15%',height:'20%'}} aria-label={vi ? 'Chiếc đèn ở thấp' : 'The low lantern'} onClick={() => choose('lantern')}/>
      </div>}
    </div>
    <div className="gac-trail-panel">
      {reunion ? <EarthDialogue managedFocus language={language} paused={paused || mapOpen} title={vi ? 'Gặp lại dưới gốc đa' : 'Together beneath the banyan'} lines={gacReunionDialogue(language)} initialIndex={progress.turn} finalAction="moon"
        finalLabel={vi ? 'Ngồi lại cùng chị Hằng' : 'Stay with Hằng'}
        onTurn={turn => { if (!paused && turn !== progress.turn) onChange({...progress,turn}); }}
        onComplete={() => { if (!paused && !committed.current) { committed.current = true; onChange(advanceGacDialogue(progress)); } }}/>
      : rest ? <><p>{vi ? 'Cuội ngồi lại dưới gốc đa cùng chị Hằng. Những câu chuyện đã biết vẫn ở trong sách.' : 'Cuội rests with Hằng beneath the banyan. The stories he knows are still in the book.'}</p><nav><button onClick={onBook}>{vi ? 'Xem lại những câu chuyện' : 'Revisit the stories'} ▤</button><button onClick={() => onChange(replayGacTroi(progress))}>{vi ? 'Chơi lại Gác Trời' : 'Replay Sky Watcher'}</button></nav></>
      : <><p className="gac-trail-cue">{banyan && <img src={portraits.chiHang.url} alt=""/>}<strong>{banyan ? (vi ? 'Chị Hằng' : 'Hằng') : 'Cuội'}:</strong> {data?.intro[language]}</p>
        <p>{data?.help[language]}</p>
        {(slope || rock) && !confirmed && <nav className="gac-trail-choices">
          {slope ? <><button disabled={!mapViewed} aria-pressed={selection === 'high'} onClick={() => choose('high')}>{vi ? 'Triền cao' : 'High ridge'}</button><button disabled={!mapViewed} aria-pressed={selection === 'low'} onClick={() => choose('low')}>{vi ? 'Triền thấp' : 'Low slope'}</button></>
          : <><button aria-pressed={selection === 'star'} onClick={() => choose('star')}>{vi ? 'Xem ngôi sao' : 'Look at the star'}</button><button aria-pressed={selection === 'lantern'} onClick={() => choose('lantern')}>{vi ? 'Xem chiếc đèn' : 'Look at the lantern'}</button></>}
        </nav>}
        {!banyan && <p className="gac-trail-feedback" role="status">{feedback || (slope && !mapViewed ? (vi ? 'Mở bản đồ để đối chiếu trước nhé.' : 'Open the map to compare first.') : '\u00a0')}</p>}
        <nav className="gac-trail-actions">
          <button onClick={onBook}>{vi ? 'Gợi ý trong sách' : 'Hint in the book'} ▤</button>
          {!confirmed && !banyan && <button disabled={selection !== (slope ? 'low' : 'lantern')} onClick={() => { if (!paused) { setConfirmed(true); setWalking(0); } }}>{vi ? (slope ? 'Xác nhận triền thấp' : 'Theo ánh đèn') : (slope ? 'Confirm the low slope' : 'Follow the lantern')}</button>}
          {(confirmed || banyan) && <button onClick={() => setWalking(n => n + 1)}>{vi ? (banyan ? 'Tới gốc đa' : 'Đi sang phải') : (banyan ? 'Go to the tree' : 'Walk to the right')} →</button>}
        </nav>
        {(confirmed || banyan) && <p className="gac-trail-move">{vi ? 'Di chuyển: A/D, ←/→ hoặc chạm mặt đất.' : 'Move: A/D, ←/→, or tap the ground.'}</p>}
      </>}
    </div>
    <dialog ref={map} className="gac-trail-map" aria-label={vi ? 'Bản đồ trong đèn' : 'Map in the lantern'} onCancel={() => setMapOpen(false)} onClose={() => { setMapOpen(false); setMapViewed(true); mapButton.current?.focus({preventScroll:true}); }}>
      <GacLightMap language={language}/><p>{vi ? 'Triền đất thấp → đá có khe → bóng cây đa.' : 'Low slope → split rock → banyan shadow.'}</p>
      <button autoFocus onClick={() => setMapOpen(false)}>{vi ? 'Đóng bản đồ' : 'Close map'}</button>
    </dialog>
  </section>;
}
