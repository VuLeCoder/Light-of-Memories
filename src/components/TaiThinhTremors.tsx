import { useState } from 'react';
import type { Language } from '../content/i18n';
import { taiThinhTaskCopy as copy } from '../content/levels/tai-thinh-content';
import type { TaiThinhProgress } from '../content/levels/tai-thinh-progress';

/** Synthetic, shared axes: amplitude builds near minute 8 and remains visible past 55. */
export function TaiThinhLongTrace({ long, language, paused = false }: { long: boolean; language: Language; paused?: boolean }) {
  const vi = language === 'vi';
  const points = Array.from({ length: 721 }, (_, i) => {
    const minute = i / 12;
    const envelope = long ? Math.min(1, minute / 8) * Math.exp(-Math.max(0, minute - 8) / 24) : Math.exp(-minute / 1.1);
    return `${(35 + minute * 6).toFixed(2)},${(50 + envelope * 32 * Math.sin(i * 1.7) * Math.cos(i * .29)).toFixed(2)}`;
  }).join(' ');
  return <svg className="tai-long-trace" viewBox="0 0 430 128" role="img" aria-label={vi ? `${long ? 'B: Tín hiệu tăng dần tới khoảng phút 8, suy giảm chậm và còn sau phút 55.' : 'A: Tín hiệu tắt nhanh sau va chạm.'} Cùng thang thời gian 0 đến 60 phút và thang biên độ.` : `${long ? 'B: Signal builds until about minute 8, fades slowly and continues past minute 55.' : 'A: Signal fades quickly after impact.'} Shared time scale of 0 to 60 minutes and amplitude scale.`}>
    <g fill="none" stroke="currentColor" opacity=".3"><path d="M35 14V92H395M35 50H395"/>{[0, 15, 30, 45, 55, 60].map(n => <path key={n} d={`M${35 + n * 6} 16V96`} strokeDasharray={n === 55 ? '3 3' : undefined}/>)}</g>
    <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.3"/>
    <path className="tai-trace-sweep" style={{ animationPlayState: paused ? 'paused' : 'running' }} d="M35 16V89" stroke="#fff0bf" strokeWidth="2" aria-hidden="true"/>
    <g fill="currentColor" textAnchor="middle" fontSize="12">{[0, 15, 30, 45, 55, 60].map(n => <text key={n} x={35 + n * 6} y="109">{n}</text>)}<text x="216" y="125">{vi ? 'Phút sau va chạm' : 'Minutes after impact'}</text></g>
    <text x="39" y="13" fill="currentColor" fontSize="12">↓ {vi ? 'Va chạm' : 'Impact'}</text>
  </svg>;
}

export function TaiThinhTremors({ language, progress: p, paused, onChange }: { language: Language; progress: TaiThinhProgress; paused: boolean; onChange: (p: TaiThinhProgress) => void }) {
  const [wrong, setWrong] = useState(false);
  const vi = language === 'vi';
  const duration = p.phase === 'duration';
  return <section className="tai-tremors tai-task-panel" aria-label={copy.t03.title[language]}>
    <h3>{duration ? (vi ? 'Rung động kéo dài bao lâu?' : 'How long did the tremors last?') : copy.t03.goal[language]} <small>{duration ? '2/2' : '1/2'}</small></h3>
    <p className="tai-task-context">{vi ? '20/11/1969 · Tầng bay lên Apollo 12 va xuống sau khi phi hành đoàn đã rời tàu.' : '20 November 1969 · Apollo 12’s ascent stage impacted after the crew had left it.'}</p>
    {duration ? <><p className="tai-graph-saved">✓ {vi ? 'Đã chọn bản ghi tăng dần rồi suy giảm chậm.' : 'Selected the record that builds, then fades slowly.'}</p><TaiThinhLongTrace long language={language} paused={paused}/><div className="tai-duration-options">{copy.durationOptions.map((label, i) => <button key={i} data-tai-primary={i === 0 ? '' : undefined} onClick={() => {
      if (paused) return;
      if (i !== copy.correctDuration) { setWrong(true); return; }
      onChange({ ...p, durationCorrect: true, phase: 'afterRinging', turn: 0 });
    }}>{label[language]}</button>)}</div></> : <div className="tai-graph-options">{copy.graphOptions.map((label, i) => <button key={i} data-tai-primary={i === 0 ? '' : undefined} onClick={() => {
      if (paused) return;
      if (i !== copy.correctGraph) { setWrong(true); return; }
      onChange({ ...p, graphCorrect: true, phase: 'duration', turn: 0 });
    }}><TaiThinhLongTrace long={i === copy.correctGraph} language={language} paused={paused}/><span>{label[language]}</span></button>)}</div>}
    <p className="tai-feedback" role="status">{wrong ? (duration ? copy.durationWrong[language] : copy.graphWrong[language]) : ''}</p>
    <small className="tai-record-note">{copy.graphNote[language]}</small>
  </section>;
}
