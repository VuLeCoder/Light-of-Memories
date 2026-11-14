import { useRef, useState } from 'react';
import type { Language } from '../content/i18n';
import { taiThinhDevices, taiThinhRecords, taiThinhRecordLabels, taiThinhTaskCopy as copy } from '../content/levels/tai-thinh-content';
import type { TaiThinhProgress, TaiThinhRecord } from '../content/levels/tai-thinh-progress';
import { taiThinhLayout } from '../game/tai-thinh-layout';

/** Synthetic examples only: classification also requires the accompanying context. */
export function TaiThinhWave({ type, language }: { type: typeof taiThinhRecords[number]['waveform']; language: Language }) {
  const points = Array.from({ length: 241 }, (_, i) => {
    const x = 10 + i * 1.4;
    const envelope = type === 'emergent' ? Math.min(1, i / 65) * Math.exp(-i / 180) : Math.exp(-Math.max(0, i - 35) / 80);
    const y = type === 'square' ? 48 - (i % 32 >= 16 ? 22 : 0) : 44 + (i < 25 ? 1 : envelope * 28) * Math.sin(i * 1.7) * Math.cos(i * .31);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return <svg className="tai-wave" viewBox="0 0 360 82" role="img" aria-label={language === 'vi' ? 'Đường sóng minh họa; đọc ghi chú đi kèm để phân loại.' : 'Illustrated wave trace; read the accompanying notes to classify it.'}>
    <path d="M10 12V68H350M10 44H350" fill="none" stroke="currentColor" opacity=".25"/><polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.6"/>
  </svg>;
}

export function TaiThinhIdentify({ language, progress: p, paused, onChange }: { language: Language; progress: TaiThinhProgress; paused: boolean; onChange: (p: TaiThinhProgress) => void }) {
  const [selected, setSelected] = useState<typeof taiThinhDevices[number]['id'] | null>(null);
  const [wrong, setWrong] = useState<typeof taiThinhDevices[number]['id'] | null>(null);
  const device = taiThinhDevices.find(d => d.id === selected);
  const vi = language === 'vi';
  return <section className="tai-identify" aria-label={copy.t01.title[language]}>
    <div className="tai-inspection">
      <h3>{copy.t01.goal[language]}</h3>
      {device ? <><p>{device.clue[language]}</p><button className="journey-primary" onClick={() => {
        if (paused) return;
        if (selected === 'pse') onChange({ ...p, identified: true, phase: 'meeting', turn: 0 });
        else setWrong(selected);
      }}>{copy.confirm[language]}</button></> : <p>{vi ? 'Quan sát cả ba thiết bị và mở manh mối của từng bạn.' : 'Observe all three instruments and inspect their clues.'}</p>}
      <p className="tai-feedback" role="status">{wrong ? taiThinhDevices.find(d => d.id === wrong)!.wrong[language] : ''}</p>
    </div>
    {taiThinhDevices.map(d => { const at = taiThinhLayout[d.id]; return <button key={d.id} data-tai-primary={d.id === 'pse' ? '' : undefined} className="tai-device-choice" aria-pressed={selected === d.id} aria-label={`${d.label[language]} · ${copy.inspect[language]}`} style={{ left: `${(at.x - at.width / 2) / 9.6}%`, top: `${(at.y - at.height) / 5.4}%`, width: `${at.width / 9.6}%`, height: `${at.height / 5.4}%` }} onClick={() => { if (!paused) { setSelected(d.id); setWrong(null); } }}><span>{d.label[language]}</span></button>; })}
  </section>;
}

export function TaiThinhRecords({ language, progress: p, paused, onChange }: { language: Language; progress: TaiThinhProgress; paused: boolean; onChange: (p: TaiThinhProgress) => void }) {
  const [selected, setSelected] = useState<TaiThinhRecord>(() => taiThinhRecords.find(r => !p.matches.includes(r.id))?.id ?? 'inside');
  const [wrong, setWrong] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const record = taiThinhRecords.find(r => r.id === selected)!;
  const done = p.matches.includes(selected);
  return <section className="tai-records tai-task-panel" aria-label={copy.t02.title[language]}>
    <h3>{copy.t02.goal[language]} <small>{p.matches.length}/3</small></h3>
    <div className="tai-record-tabs" role="group" aria-label={language === 'vi' ? 'Chọn bản ghi' : 'Choose a record'}>{taiThinhRecords.map((r, i) => <button key={r.id} ref={el => { tabs.current[i] = el; }} data-tai-primary={i === 0 ? '' : undefined} aria-pressed={selected === r.id} onClick={() => { if (!paused) { setSelected(r.id); setWrong(false); } }}>{r.title[language]}{p.matches.includes(r.id) ? ' ✓' : ''}</button>)}</div>
    <div className="tai-record-detail"><TaiThinhWave type={record.waveform} language={language}/><p>{record.clue[language]}</p></div>
    <div className="tai-record-labels" role="group" aria-label={language === 'vi' ? 'Ghép nhãn cho bản ghi đang chọn' : 'Match a label to the selected record'}>{taiThinhRecordLabels.map(label => <button key={label.id} disabled={done} onClick={() => {
      if (paused || done) return;
      if (label.id !== record.answer) { setWrong(true); return; }
      const matches = [...new Set([...p.matches, selected])];
      onChange({ ...p, matches, ...(matches.length === 3 ? { phase: 'afterRecords', turn: 0 } : {}) });
      setWrong(false);
      // The submitted label becomes disabled. Keep keyboard control on a live record button.
      tabs.current[taiThinhRecords.findIndex(r => r.id === selected)]?.focus({ preventScroll: true });
    }}>{label.label[language]}{done && label.id === record.answer ? ' ✓' : ''}</button>)}</div>
    <p className="tai-feedback" role="status">{done ? record.feedback[language] : wrong ? copy.recordWrong[language] : ''}</p>
    <small className="tai-record-note">{copy.recordNote[language]}</small>
  </section>;
}

/** On compact screens, controls sit below the art; these labels retain their visual mapping. */
export function TaiThinhSceneLabels({ language }: { language: Language }) {
  return <div className="tai-scene-labels" aria-hidden="true">{taiThinhDevices.map(d => { const at = taiThinhLayout[d.id]; return <span key={d.id} style={{ left: `${at.x / 9.6}%`, top: `${(at.y - at.height) / 5.4}%` }}>{d.label[language]}</span>; })}</div>;
}
