import type { Language } from '../content/i18n';
import { taiThinhDialogue, taiThinhMemories, taiThinhTaskCopy as copy } from '../content/levels/tai-thinh-content';
import type { TaiThinhProgress } from '../content/levels/tai-thinh-progress';
import { EarthDialogue } from './EarthDialogue';
import { TaiThinhIdentify, TaiThinhRecords } from './TaiThinhChallenges';
import { TaiThinhTremors } from './TaiThinhTremors';
import { TaiThinhRhythms } from './TaiThinhRhythms';
import { TaiThinhPhoto } from './TaiThinhPhoto';
import { TaiThinhEnding } from './TaiThinhEnding';
import './tai-thinh.css';

export function TaiThinhLevel({ language, progress: p, onChange, onBack, onBook, paused, stars }: {
  language: Language; progress: TaiThinhProgress; onChange: (p: TaiThinhProgress) => void; onBack: () => void; onBook: () => void; paused: boolean; stars: number;
}) {
  const vi = language === 'vi';
  const transitions = { route: 'approach', arrival: 'identify', meeting: 'photoA', recordsIntro: 'records', afterRecords: 'photoB', ringingIntro: 'graph', afterRinging: 'rhythmIntro', rhythmIntro: 'rhythm', afterRhythm: 'photoC', afterPhotoC: 'memoriesIntro', memoriesIntro: 'recallA' } as const;
  const dialogue = p.phase in transitions ? p.phase as keyof typeof transitions : null;
  const lines = dialogue === 'afterRhythm' ? taiThinhDialogue(language, 'afterRhythm').slice(0, 1) : dialogue === 'afterPhotoC' ? taiThinhDialogue(language, 'afterRhythm').slice(1) : dialogue ? taiThinhDialogue(language, dialogue) : [];
  const photo = p.phase === 'photoA' ? taiThinhMemories[0] : p.phase === 'photoB' ? taiThinhMemories[1] : p.phase === 'photoC' ? taiThinhMemories[2] : null;
  const task = p.phase === 'identify' ? 't01' : p.phase === 'records' ? 't02' : ['graph', 'duration'].includes(p.phase) ? 't03' : p.phase === 'rhythm' ? 't04' : null;
  return <section className={`tai-thinh-level tai-phase-${p.phase}`} hidden={paused} lang={language} aria-label={vi ? '03 · Bạn Tai Thính' : '03 · Keen Ears'}>
    {!['recallA', 'recallB', 'recallC', 'farewell', 'gift', 'finished'].includes(p.phase) && <div className="surveyor-scene-hud"><span>{task ? `${task.toUpperCase()} · ${copy[task].title[language]}` : (vi ? 'Đại Dương Bão · Apollo 12' : 'Ocean of Storms · Apollo 12')}</span>{task && <button onClick={onBook}>{copy.hint[language]}</button>}<button onClick={onBack}>{vi ? 'Về lộ trình' : 'Back to route'}</button></div>}
    {dialogue && <EarthDialogue key={dialogue} language={language} paused={paused} title={vi ? 'Bạn Tai Thính' : 'Keen Ears'} lines={lines} initialIndex={p.turn} onTurn={turn => { if (turn !== p.turn) onChange({ ...p, turn }); }} finalAction="moon" finalLabel={dialogue === 'route' ? (vi ? 'Đến Đại Dương Bão' : 'Arrive in the Ocean of Storms') : dialogue === 'meeting' || dialogue === 'afterRecords' || dialogue === 'afterRhythm' ? (vi ? 'Nhận bức ảnh' : 'Receive the picture') : copy.next[language]} onComplete={() => onChange({ ...p, phase: transitions[dialogue], turn: 0 })} />}
    {p.phase === 'identify' && <TaiThinhIdentify language={language} progress={p} paused={paused} onChange={onChange}/>}
    {p.phase === 'records' && <TaiThinhRecords language={language} progress={p} paused={paused} onChange={onChange}/>}
    {['graph', 'duration'].includes(p.phase) && <TaiThinhTremors key={p.phase} language={language} progress={p} paused={paused} onChange={onChange}/>}
    {p.phase === 'rhythm' && <TaiThinhRhythms language={language} progress={p} paused={paused} onChange={onChange}/>}
    {photo && <TaiThinhPhoto key={photo.id} photo={photo} language={language} onKeep={() => { if (!paused) onChange({ ...p, keepsakes: [...new Set([...p.keepsakes, photo.id])], phase: photo.id === 'pse' ? 'recordsIntro' : photo.id === 'station' ? 'ringingIntro' : 'afterPhotoC', turn: 0 }); }}/>}
    {['recallA', 'recallB', 'recallC', 'farewell', 'gift', 'finished'].includes(p.phase) && <TaiThinhEnding language={language} progress={p} onChange={onChange} onBack={onBack} paused={paused} stars={stars}/>}
  </section>;
}
