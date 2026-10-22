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
      {tried && <p className="sparkle-science-feedback" role="status">{success ? (vi ? 'Tia sáng đã trở về phía nguồn!' : 'The light returned toward its source!') : (vi ? `Tia đã chạm ${beam.hits.length} lần vào gương rồi ${beam.returned ? 'về trạm nhưng chưa qua đủ 3 mặt' : 'đi lệch khỏi trạm'}.` : `The ray reflected ${beam.hits.length} times, then ${beam.returned ? 'returned without reaching all 3 faces' : 'missed the station'}.`)}</p>}
      <button onClick={trace}>{vi ? 'Thử tia sáng' : 'Try the light'}</button>
      <button className="journey-primary" disabled={!success} onClick={onComplete}>{vi ? 'Cùng đo khoảng cách →' : 'Measure the distance →'}</button>
    </div>
  </section>;
}

export function RangingDiagram({ elapsed = null, language = 'vi' }: { elapsed?: number | null; language?: Language }) {
  const vi = language === 'vi';
  const station = { x: 98, y: 119 };
  const reflector = { x: 382, y: 130 };
  const fraction = elapsed === null ? null : elapsed <= 1.28 ? elapsed / 1.28 : (2.56 - elapsed) / 1.28;
  const pulse = fraction === null ? null : { x: station.x + (reflector.x - station.x) * fraction, y: station.y + (reflector.y - station.y) * fraction };
  const rayAngle = Math.atan2(reflector.y - station.y, reflector.x - station.x) * 180 / Math.PI;
  return <svg className="sparkle-ranging-diagram" viewBox="0 0 460 250" role="img" aria-label={vi ? 'Xung sáng từ trạm Trái Đất đến gương trên Mặt Trăng rồi quay về trạm' : 'Light travels from the Earth station to the lunar reflector and back'}>
    <rect x="4" y="4" width="452" height="242" rx="8" fill="#1b3039" stroke="#9e8b64" strokeWidth="2" />
    {[[35, 35], [123, 54], [216, 30], [315, 48], [419, 31], [242, 174]].map(([x, y]) => <path key={x} d={`M${x} ${y}h3`} stroke="#8da5a5" strokeWidth="2" />)}
    <circle cx="65" cy="119" r="48" fill="#8ca8ad" opacity=".06" />
    <circle cx="65" cy="119" r="34" fill="#9bbcc4" />
    <path d="M45 96h22v12H56v22H45Zm29 27h19v10H74Z" fill="#668b88" />
    <path d="M39 112h41v4H39Zm23 24h23v4H62Z" fill="#d0dddb" opacity=".75" />
    <path d="M320 149 343 140 378 142 414 137 442 147V181H320Z" fill="#9a9b97" />
    <path d="m320 164 36-6 33 8 53-8v23H320Z" fill="#626f75" />
    <ellipse cx="382" cy="156" rx="18" ry="4" fill="#33434b" />
    <path d="m363 145 8-28h29l-8 28Z" fill="#30464b" stroke="#ad9870" strokeWidth="2" />
    {[0, 1, 2].map(i => <path key={i} d={`m${372 + i * 8} 122-4 17h5l4-17Z`} fill="#a5bbb2" />)}
    <path d="m369 146-3 8m21-8 3 8" stroke="#ad9870" strokeWidth="2" />
    <path d={`M${station.x} ${station.y}L${reflector.x} ${reflector.y}`} stroke="#829995" strokeWidth="1.5" strokeDasharray="4 5" opacity=".7" />
    <circle cx={station.x} cy={station.y} r="3" fill="#dfc18a" />
    <circle cx={reflector.x} cy={reflector.y} r="3" fill="#dfc18a" />
    <path d="m-5-4 7 4-7 4" transform={`translate(214 ${station.y + (214 - station.x) * (reflector.y - station.y) / (reflector.x - station.x)}) rotate(${rayAngle})`} stroke="#dfc18a" fill="none" strokeWidth="2" />
    <path d="m5-4-7 4 7 4" transform={`translate(258 ${station.y + (258 - station.x) * (reflector.y - station.y) / (reflector.x - station.x)}) rotate(${rayAngle})`} stroke="#dfc18a" fill="none" strokeWidth="2" />
    <text x="222" y="88" textAnchor="middle" fill="#e6dbc1" fontSize="12">{vi ? 'Lượt đi' : 'Outward'}</text>
    <text x="222" y="151" textAnchor="middle" fill="#e6dbc1" fontSize="12">{vi ? 'Lượt về' : 'Return'}</text>
    {pulse !== null && <g><circle cx={pulse.x} cy={pulse.y} r="12" fill="#e7c684" opacity=".12" /><circle cx={pulse.x} cy={pulse.y} r="4" fill="#f0d69f" /></g>}
    <text x="67" y="202" textAnchor="middle" fill="#e6dbc1" fontSize="15">{vi ? 'Trái Đất' : 'Earth'}</text>
    <text x="380" y="202" textAnchor="middle" fill="#e6dbc1" fontSize="15">{vi ? 'Mặt Trăng' : 'Moon'}</text>
    <text x="230" y="230" textAnchor="middle" fill="#b8cbc7" fontSize="12">{vi ? 'Một khoảng cách · Hai lượt sáng' : 'One distance · Two light journeys'}</text>
  </svg>;
}

export function SparkleRanging({ language, progress: p, onChange, onComplete, paused }: { language: Language; progress: SparkleProgress; onChange: (p: SparkleProgress) => void; onComplete: () => void; paused: boolean }) {
  const vi = language === 'vi';
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [numbers, setNumbers] = useState(p.calculation ? ['300000', '2,56', '2', String(p.distance)] : ['', '', '', '']);
  const [operations, setOperations] = useState(p.calculation ? ['×', '÷'] : ['', '']);
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
  const invalidate = () => { setFeedback(''); if (p.calculation) onChange({ ...p, calculation: false }); };
  const check = () => {
    // Grouped integers must use one separator and groups of exactly 3 digits.
    const values = numbers.map((value, i) => {
      const trimmed = value.trim();
      const validNumber = i === 1
        ? /^\d+(?:[.,]\d+)?$/.test(trimmed)
        : /^(?:\d+|\d{1,3}(?:\.\d{3})+|\d{1,3}(?:,\d{3})+|\d{1,3}(?: \d{3})+)$/.test(trimmed);
      return validNumber ? Number(i === 1 ? trimmed.replace(',', '.') : trimmed.replace(/[., ]/g, '')) : NaN;
    });
    const complete = numbers.every(value => value.trim() !== '') && values.every(Number.isFinite) && operations.every(Boolean);
    const correct = complete && values[0] === 300000 && values[1] === 2.56 && values[2] === 2 && values[3] === 384000 && operations[0] === '×' && operations[1] === '÷';
    onChange({ ...p, calculation: correct, ...(correct ? { distance: values[3] } : {}) });
    setFeedback(correct ? (vi ? 'Đúng rồi! Mặt Trăng cách trạm khoảng 384.000 km trong lần đo này.' : 'Correct! The Moon is about 384,000 km from the station in this measurement.') : !complete ? (vi ? 'Hãy nhập đủ các số đúng định dạng và chọn hai dấu trước khi nộp nhé.' : 'Enter valid numbers in every field and choose both operators before submitting.') : (vi ? 'Chưa đúng rồi. Xem lại sách: ánh sáng đi bao xa mỗi giây, và đồng hồ tính mấy lượt?' : 'Not quite. Check the book: how far does light travel per second, and how many journeys did the clock time?'));
  };
  const labels = vi ? ['Vận tốc ánh sáng (km/s)', 'Thời gian (s)', 'Số lượt', 'Kết quả (km)'] : ['Light speed (km/s)', 'Time (s)', 'Journeys', 'Result (km)'];
  const numberField = (i: number) => <label className={`sparkle-number-field sparkle-number-${i}`}><span>{labels[i]}</span><input type="text" inputMode={i === 1 ? 'decimal' : 'numeric'} autoComplete="off" spellCheck={false} maxLength={16} value={numbers[i]} onChange={e => { setNumbers(numbers.map((value, index) => index === i ? e.target.value : value)); invalidate(); }} /></label>;
  const operatorField = (i: number) => <select aria-label={vi ? `Dấu phép tính ${i + 1}` : `Operator ${i + 1}`} value={operations[i]} onChange={e => { setOperations(operations.map((value, index) => index === i ? e.target.value : value)); invalidate(); }}><option value="">?</option>{['×', '÷', '+', '−'].map(op => <option key={op} value={op}>{op}</option>)}</select>;
  return <section className="sparkle-card sparkle-science sparkle-ranging" aria-labelledby="sparkle-ranging-title">
    <div className="sparkle-science-visual">
      <RangingDiagram elapsed={elapsed} language={language} />
      <output className="sparkle-clock" aria-live="off">{elapsed === null ? (p.measured ? (vi ? '2,56' : '2.56') : (vi ? '0,00' : '0.00')) : elapsed.toFixed(2).replace('.', vi ? ',' : '.')} s</output>
      <button disabled={running} onClick={() => { setElapsed(0); setFeedback(''); }}>{running ? (vi ? 'Đang chờ tia trở về…' : 'Waiting for the return…') : (vi ? 'Gửi xung sáng' : 'Send a light pulse')}</button>
      <small>{vi ? 'Số liệu mô phỏng · Hình không theo tỉ lệ' : 'Simulated data · Not to scale'}</small>
    </div>
    <div className="sparkle-cleaning-copy">
      <h2 id="sparkle-ranging-title">{vi ? 'T04 · Lời chào mất bao lâu?' : 'T04 · How long is a greeting?'}</h2>
      {p.measured ? <form className="sparkle-calculation" onSubmit={event => { event.preventDefault(); if (!running && !paused) check(); }}>
        <div className="sparkle-equation">{numberField(0)}{operatorField(0)}{numberField(1)}{operatorField(1)}{numberField(2)}</div>
        <div className="sparkle-answer"><span aria-hidden="true">=</span>{numberField(3)}</div>
        <button type="submit" disabled={running}>{vi ? 'Nộp kết quả' : 'Submit answer'}</button>
      </form> : <p>{vi ? 'Trạm trên Trái Đất đã sẵn sàng.' : 'The station on Earth is ready.'}</p>}
      {(feedback || p.calculation) && <p className="sparkle-science-feedback" role="status">{feedback || (vi ? 'Đã ghi nhận khoảng cách: 384.000 km.' : 'Distance recorded: 384,000 km.')}</p>}
      <button className="journey-primary" disabled={!p.measured || !p.calculation || p.distance !== 384000 || running} onClick={onComplete}>{vi ? 'Xác nhận khoảng cách →' : 'Confirm the distance →'}</button>
    </div>
  </section>;
}
