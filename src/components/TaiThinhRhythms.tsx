import { useEffect, useRef, useState } from 'react';
import type { Language } from '../content/i18n';
import { taiThinhRhythm as rhythm, taiThinhTaskCopy as copy } from '../content/levels/tai-thinh-content';
import type { TaiThinhProgress } from '../content/levels/tai-thinh-progress';

/** Accumulate only visible, unpaused frame time. No background timer or delayed beat. */
function usePlayback(paused: boolean, duration: number) {
  const [elapsed, setElapsed] = useState<number | null>(null);
  const clock = useRef(0);
  const playing = elapsed !== null && elapsed < duration;
  useEffect(() => {
    if (paused || !playing) return;
    let frame = 0;
    let previous: number | null = null;
    const tick = (now: number) => {
      if (!document.hidden && previous !== null) clock.current = Math.min(duration, clock.current + Math.min(100, now - previous));
      previous = document.hidden ? null : now;
      setElapsed(clock.current);
      if (clock.current < duration) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, playing, duration]);
  return { elapsed, playing, start: () => { clock.current = 0; setElapsed(0); } };
}

function BeatMarks({ beats, elapsed, language }: { beats: readonly number[]; elapsed: number | null; language: Language }) {
  return <svg className="tai-beat-marks" viewBox="0 0 260 56" role="img" aria-label={`${beats.length} ${language === 'vi' ? 'nhịp, tại các mốc' : 'beats, at'} ${beats.map(n => `${n / 1000}`).join(', ')} ${language === 'vi' ? 'giây' : 'seconds'}`}>
    <path d="M15 24H245" stroke="currentColor" opacity=".35"/>
    {beats.map((beat, i) => <g key={beat} className={elapsed !== null && elapsed >= beat && elapsed < beat + rhythm.pulseMs ? 'tai-beat is-lit' : 'tai-beat'}><circle cx={15 + beat / rhythm.durationMs * 230} cy="24" r="8"/><text x={15 + beat / rhythm.durationMs * 230} y="49" textAnchor="middle" fill="currentColor" fontSize="13">{i + 1}</text></g>)}
    {elapsed !== null && <path d={`M${15 + elapsed / rhythm.durationMs * 230} 8v28`} stroke="currentColor" strokeWidth="2" opacity=".8" aria-hidden="true"/>}
  </svg>;
}

export function TaiThinhRhythms({ language, progress: p, paused, onChange }: { language: Language; progress: TaiThinhProgress; paused: boolean; onChange: (p: TaiThinhProgress) => void }) {
  const [source, setSource] = useState('sample');
  const [wrong, setWrong] = useState(false);
  const playback = usePlayback(paused, rhythm.durationMs);
  const vi = language === 'vi';
  const watch = (id: string) => { if (!paused) { setSource(id); playback.start(); } };
  return <section className="tai-rhythms tai-task-panel" aria-label={copy.t04.title[language]}>
    <h3>{copy.t04.goal[language]}</h3>
    <div className="tai-rhythm-sample"><button data-tai-primary="" aria-pressed={source === 'sample' && playback.playing} onClick={() => watch('sample')}>{copy.sample[language]} ↻</button><BeatMarks beats={rhythm.sample} elapsed={source === 'sample' ? playback.elapsed : null} language={language}/><p>{copy.rhythmDescription[language]}</p></div>
    <div className="tai-rhythm-options">{rhythm.options.map(option => <section key={option.id} className={`tai-rhythm-stone ${source === option.id && playback.playing ? 'is-playing' : ''}`} aria-label={`${vi ? 'Phiến đá' : 'Stone'} ${option.id.toUpperCase()}`}>
      <h4>{vi ? 'Phiến đá' : 'Stone'} {option.id.toUpperCase()}</h4><BeatMarks beats={option.beats} elapsed={source === option.id ? playback.elapsed : null} language={language}/><p>{option.description[language]}</p>
      <button aria-label={`${copy.replayRhythm[language]} ${option.id.toUpperCase()}`} aria-pressed={source === option.id && playback.playing} onClick={() => watch(option.id)}>{copy.replayRhythm[language]} ↻</button>
      <button className="journey-primary" aria-label={`${copy.choose[language]} ${option.id.toUpperCase()}`} onClick={() => {
        if (paused) return;
        if (option.id !== rhythm.correct) { setWrong(true); return; }
        onChange({ ...p, rhythmCorrect: true, phase: 'door', turn: 0 });
      }}>{copy.choose[language]}</button>
    </section>)}</div>
    <p className="tai-feedback" role="status">{wrong ? copy.rhythmWrong[language] : playback.elapsed !== null ? `${vi ? 'Đang xem' : 'Watching'}: ${source === 'sample' ? (vi ? 'mẫu' : 'sample') : source.toUpperCase()}${playback.playing ? '' : (vi ? ' · đã hết chuỗi' : ' · sequence complete')}` : (vi ? 'Các dấu tròn cùng thang thời gian; có thể chọn ngay, không cần bấm theo nhịp.' : 'Dots share one time scale; choose whenever ready, without tapping in time.')}</p>
    <small className="tai-record-note">{vi ? 'Mở menu sẽ dừng chuỗi; trở lại tiếp tục từ chỗ đã dừng.' : 'The menu pauses playback; returning resumes from the same point.'} {copy.fiction[language]}</small>
  </section>;
}

export function TaiThinhDoor({ language, paused, onOpen }: { language: Language; paused: boolean; onOpen: () => void }) {
  const playback = usePlayback(paused, 1000);
  const complete = useRef(false);
  useEffect(() => { playback.start(); }, []);
  useEffect(() => {
    if (!paused && playback.elapsed === 1000 && !complete.current) { complete.current = true; onOpen(); }
  }, [paused, playback.elapsed, onOpen]);
  return <section className="tai-door tai-task-panel" role="status">
    <svg viewBox="0 0 280 180" aria-hidden="true"><path d="M65 160V60Q140 -15 215 60V160" fill="#34434a" stroke="#b49c69" strokeWidth="6"/><path d="M85 157V64Q140 7 195 64V157" fill="#ead39c" opacity={.2 + (playback.elapsed ?? 0) / 1250}/><g className="tai-door-leaf" transform={`translate(${-42 * (playback.elapsed ?? 0) / 1000} 0)`}><path d="M85 157V64Q111 34 140 32V158Z" fill="#4a514c" stroke="#b49c69" strokeWidth="2"/><circle cx="129" cy="100" r="4" fill="#f8eac5"/></g><g className="tai-door-leaf" transform={`translate(${42 * (playback.elapsed ?? 0) / 1000} 0)`}><path d="M140 32Q169 34 195 64V157H140Z" fill="#4a514c" stroke="#b49c69" strokeWidth="2"/><circle cx="151" cy="100" r="4" fill="#f8eac5"/></g></svg>
    <h3>{language === 'vi' ? 'Đúng nhịp rồi! Cánh cửa ký ức mở ra…' : 'A matching rhythm! The memory door opens…'}</h3>
  </section>;
}
