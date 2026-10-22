import { useEffect, useState } from 'react';
import type { Language } from '../content/i18n';
import { mirrorCenters, mirrorRotation, traceSparkleLight } from '../game/sparkle-optics';
import { sparkleRepairSolution, type SparkleProgress } from '../content/levels/lap-lanh';

// Shared unfolded model for the game and its book clue.
export function CornerDiagram({ angles = sparkleRepairSolution, lit = 0, language = 'vi' }: { angles?: number[]; lit?: number; language?: Language }) {
  const vi = language === 'vi';
  const faces = mirrorCenters.map(({ x, y }) => [x, y]);
  const beam = traceSparkleLight(angles);
  const beamPath = beam.points.map((point, i) => `${i ? 'L' : 'M'}${point.x} ${point.y}`).join(' ');
  return <svg className="sparkle-corner-diagram" viewBox="0 0 460 270" role="img" aria-label={vi ? 'Mô hình ba gương và đường phản xạ thực tế của tia sáng theo góc xoay hiện tại.' : 'Three-mirror model showing the reflected light path for the current angles.'}>
    <rect x="4" y="4" width="452" height="262" rx="8" fill="#1b3039" stroke="#9e8b64" strokeWidth="2" />
    <path d="M130 207 280 29 429 207Z" fill="#293e44" stroke="#6c817d" strokeWidth="2" />
    <path d="M280 29V136L130 207M280 136 429 207" fill="none" stroke="#6c817d" strokeDasharray="5 5" />
    {faces.map(([x, y], i) => <g key={i}>
      <circle cx={x + 2} cy={y + 4} r="28" fill="#6e83751f" />
      <circle cx={x} cy={y} r="28" fill="#233941" stroke="#ad9870" strokeWidth="3" />
      <g transform={`rotate(${mirrorRotation(i, angles[i])} ${x} ${y})`}>
        <rect x={x - 22} y={y - 7} width="44" height="14" rx="4" fill="#8da9a6" stroke="#ad9870" strokeWidth="2" />
        <path d={`M${x - 16} ${y - 3}H${x + 16}`} stroke="#e9e2cd" strokeWidth="3" strokeLinecap="round" />
      </g>
      <circle cx={x} cy={y + 38} r="12" fill="#ad9870" /><text x={x} y={y + 43} fill="white" textAnchor="middle" fontSize="15" fontWeight="bold">{i + 1}</text>
    </g>)}
    <rect x="20" y="127" width="53" height="75" rx="5" fill="#30464b" stroke="#ac9870" strokeWidth="2" />
    <circle cx="47" cy="150" r="11" fill="#dfc18a" /><path d="m43 145 7 5-7 5" fill="none" stroke="#665333" strokeWidth="2" />
    <circle cx="47" cy="183" r="10" fill={lit > 0 && beam.success ? '#b8cbc1' : '#617774'} /><path d="m51 179-7 4 7 4" fill="none" stroke="#30464b" strokeWidth="2" />
    <text x="48" y="224" textAnchor="middle" fill="#e6dbc1" fontSize="14" fontWeight="bold">{vi ? 'Trạm gửi' : 'Station'}</text>
    {lit > 0 && <g>
      <path d={beamPath} fill="none" stroke="#e7c684" strokeWidth="8" opacity=".12" />
      <path d={beamPath} fill="none" stroke="#e7c684" strokeWidth="2.5" strokeLinecap="round" pathLength="1" className="sparkle-traced-ray" />
      {beam.points.slice(1).map((point, i) => {
        const from = beam.points[i];
        const rotation = Math.atan2(point.y - from.y, point.x - from.x) * 180 / Math.PI;
        return <path key={i} d="m-5-4 6 4-6 4" transform={`translate(${(from.x + point.x) / 2} ${(from.y + point.y) / 2}) rotate(${rotation})`} fill="none" stroke="#f0d69f" strokeWidth="2" />;
      })}
      <circle cx={beam.points.at(-1)!.x} cy={beam.points.at(-1)!.y} r="4" fill={beam.success ? '#b8cbc1' : '#e7c684'} />
    </g>}
    <circle cx="155" cy="246" r="4" fill="#dfc18a" /><text x="165" y="251" fill="#e6dbc1" fontSize="13">{vi ? 'Tia sáng' : 'Light ray'}</text>
    <circle cx="280" cy="246" r="4" fill="#a5bbb2" /><text x="290" y="251" fill="#d0dcd1" fontSize="13">{vi ? 'Ô nhận' : 'Receiver'}</text>
  </svg>;
}

export function SparkleRepair({ language, progress: p, onChange, onComplete }: { language: Language; progress: SparkleProgress; onChange: (p: SparkleProgress) => void; onComplete: () => void }) {
  const vi = language === 'vi';
  const [lit, setLit] = useState(0);
  const [tried, setTried] = useState(false);
  const beam = traceSparkleLight(p.repairAngles);
  const success = tried && beam.success;
  const rotate = (i: number) => {
    setTried(false); setLit(0);
    onChange({ ...p, repairAngles: p.repairAngles.map((angle, id) => id === i ? (angle + 1) % 3 : angle) });
  };
  const trace = () => {
    setLit(value => value + 1); setTried(true);
  };
  return <section className="sparkle-card sparkle-science sparkle-repair" aria-labelledby="sparkle-repair-title">
    <div className="sparkle-science-visual"><CornerDiagram key={lit} angles={p.repairAngles} lit={lit} language={language} /><small>{vi ? 'Mô hình góc gương · Sơ đồ khai triển' : 'Corner reflector model · Unfolded diagram'}</small></div>
    <div className="sparkle-cleaning-copy">
      <h2 id="sparkle-repair-title">{vi ? 'T03 · Đưa ánh sáng trở về' : 'T03 · Bring the light home'}</h2>
      <p className="sparkle-repair-goal">{vi ? 'Mục tiêu: chỉnh 3 mặt gương để tia sáng đi qua cả ba và quay về đúng trạm gửi.' : 'Goal: align all 3 mirror faces so light passes through them and returns to the sending station.'}</p>
      <div className="sparkle-face-controls">{p.repairAngles.map((angle, i) => <button key={i} onClick={() => rotate(i)} aria-label={`${vi ? 'Xoay mặt' : 'Rotate face'} ${i + 1}`}><span>{i + 1}</span><svg viewBox="0 0 40 40" width="30" height="30" aria-hidden="true"><path d="M5 20H35" transform={`rotate(${mirrorRotation(i, angle)} 20 20)`} stroke="currentColor" strokeWidth="4" /></svg>↻</button>)}</div>
      <p className="sparkle-science-feedback" role="status">{success ? (vi ? 'Tia sáng đã trở về phía nguồn!' : 'The light returned toward its source!') : tried ? (vi ? `Tia đã chạm ${beam.hits.length} lần vào gương rồi ${beam.returned ? 'về trạm nhưng chưa qua đủ 3 mặt' : 'đi lệch khỏi trạm'}.` : `The ray reflected ${beam.hits.length} times, then ${beam.returned ? 'returned without reaching all 3 faces' : 'missed the station'}.`) : (vi ? 'Manh mối: Bí mật của góc gương → sách' : 'Clue: The corner reflector’s secret → book')}</p>
      <button onClick={trace}>{vi ? 'Thử tia sáng' : 'Try the light'}</button>
      <button className="journey-primary" disabled={!success} onClick={onComplete}>{vi ? 'Cùng đo khoảng cách →' : 'Measure the distance →'}</button>
    </div>
  </section>;
}

export function SparkleRanging({ language, progress: p, onChange, onComplete, paused }: { language: Language; progress: SparkleProgress; onChange: (p: SparkleProgress) => void; onComplete: () => void; paused: boolean }) {
  const vi = language === 'vi';
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [operation, setOperation] = useState(p.calculation ? 'multiply' : '');
  const [divisor, setDivisor] = useState(p.calculation ? 'two' : '');
  const [feedback, setFeedback] = useState('');
  const running = elapsed !== null && elapsed < 2.56;
  useEffect(() => {
    if (!running || paused) return;
    const started = performance.now() - elapsed! * 1000;
    const timer = window.setInterval(() => setElapsed(Math.min(2.56, (performance.now() - started) / 1000)), 25);
    return () => window.clearInterval(timer);
  }, [running, paused]);
  useEffect(() => {
    if (elapsed === 2.56 && !p.measured) onChange({ ...p, measured: true });
  }, [elapsed]);
  const check = () => {
    const correct = operation === 'multiply' && divisor === 'two';
    onChange({ ...p, calculation: correct });
    setFeedback(correct ? (vi ? 'Đúng rồi! Hãy đặt khoảng cách bên dưới.' : 'Correct! Set the distance below.') : (vi ? 'Xem lại sách: đồng hồ tính mấy lượt đi?' : 'Check the book: how many journeys did the clock time?'));
  };
  const valid = p.measured && p.calculation && p.distance === 384000;
  const pulse = elapsed === null ? null : elapsed <= 1.28 ? 65 + elapsed / 1.28 * 310 : 375 - (elapsed - 1.28) / 1.28 * 310;
  return <section className="sparkle-card sparkle-science sparkle-ranging" aria-labelledby="sparkle-ranging-title">
    <div className="sparkle-science-visual">
      <svg viewBox="0 0 440 220" role="img" aria-label={vi ? 'Ánh sáng từ Trái Đất đến Mặt Trăng rồi trở về' : 'Light from Earth to the Moon and back'}>
        <path d="M65 100H375M375 125H65" stroke="#829995" strokeWidth="2" strokeDasharray="5 5" />
        <path d="m225 95 10 5-10 5m-10 15-10 5 10 5" stroke="#dfc18a" fill="none" />
        <circle cx="65" cy="110" r="34" fill="#426e80" stroke="#aac7c0" strokeWidth="2" /><path d="m48 85 20 2 10 15-15 12-3 23-13-15 7-17Z" fill="#94b3a0" />
        <circle cx="375" cy="110" r="26" fill="#a2a39b" /><circle cx="382" cy="100" r="6" fill="#737f7b" />
        {pulse !== null && <circle cx={pulse} cy={elapsed! <= 1.28 ? 100 : 125} r="6" fill="#ffe0a0" />}
        <text x="65" y="170" textAnchor="middle" fill="#eee6d4" fontSize="17">{vi ? 'Trái Đất' : 'Earth'}</text><text x="375" y="170" textAnchor="middle" fill="#eee6d4" fontSize="17">{vi ? 'Mặt Trăng' : 'Moon'}</text>
      </svg>
      <output className="sparkle-clock" aria-live="off">{elapsed === null ? (p.measured ? '2,56' : '0,00') : elapsed.toFixed(2).replace('.', vi ? ',' : '.')} s</output>
      <button disabled={running} onClick={() => { setElapsed(0); setFeedback(''); }}>{running ? (vi ? 'Đang chờ tia trở về…' : 'Waiting for the return…') : (vi ? 'Gửi xung sáng' : 'Send a light pulse')}</button>
      <small>{vi ? 'Số liệu mô phỏng · Hình không theo tỉ lệ' : 'Simulated data · Not to scale'}</small>
    </div>
    <div className="sparkle-cleaning-copy">
      <h2 id="sparkle-ranging-title">{vi ? 'T04 · Lời chào mất bao lâu?' : 'T04 · How long is a greeting?'}</h2>
      {p.measured ? <>
        <div className="sparkle-equation"><span>300.000</span><select aria-label={vi ? 'Phép tính vận tốc và thời gian' : 'Operation on speed and time'} value={operation} onChange={e => { setOperation(e.target.value); onChange({ ...p, calculation: false }); }}><option value="">?</option><option value="multiply">×</option><option value="add">+</option></select><span>2,56</span><select aria-label={vi ? 'Số lượt di chuyển' : 'Number of journeys'} value={divisor} onChange={e => { setDivisor(e.target.value); onChange({ ...p, calculation: false }); }}><option value="">?</option><option value="one">÷ 1</option><option value="two">÷ 2</option></select></div>
        {!p.calculation && <button onClick={check}>{vi ? 'Kiểm tra phép tính' : 'Check the calculation'}</button>}
        <label className="sparkle-distance-label">{vi ? 'Khoảng cách một chiều' : 'One-way distance'}<output>{p.distance.toLocaleString(vi ? 'vi-VN' : 'en-US')} km</output><input type="range" min="250000" max="450000" step="1000" value={p.distance} onChange={e => { onChange({ ...p, distance: Number(e.target.value) }); setFeedback(''); }} /></label>
      </> : <p>{vi ? 'Trạm trên Trái Đất đã sẵn sàng.' : 'The station on Earth is ready.'}</p>}
      <p className="sparkle-science-feedback" role="status">{feedback || (vi ? 'Manh mối: Một lời chào, hai lượt đi → sách' : 'Clue: One greeting, two journeys → book')}</p>
      <button className="journey-primary" disabled={!valid || running} onClick={onComplete}>{vi ? 'Xác nhận khoảng cách →' : 'Confirm the distance →'}</button>
    </div>
  </section>;
}
