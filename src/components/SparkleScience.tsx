import { useEffect, useRef, useState } from 'react';
import type { Language } from '../content/i18n';
import { cornerMirrors, cornerPivot, laserSource, laserReceiver, normalizeRotation, traceSparkleLight } from '../game/sparkle-optics';
import type { SparkleProgress } from '../content/levels/lap-lanh';

export function CornerDiagram({ rotation = 0, lit = 0, language = 'vi', onRotate }: { rotation?: number; lit?: number; language?: Language; onRotate?: (rotation: number) => void }) {
  const vi = language === 'vi';
  const drag = useRef<{ id: number; angle: number; rotation: number } | null>(null);
  const beam = traceSparkleLight(rotation);
  const mirrors = cornerMirrors(rotation);
  const beamPath = beam.points.map((point, i) => `${i ? 'L' : 'M'}${point.x} ${point.y}`).join(' ');
  const pointerAngle = (svg: SVGSVGElement, x: number, y: number) => {
    const matrix = svg.getScreenCTM();
    if (!matrix) return null;
    const point = new DOMPoint(x, y).matrixTransform(matrix.inverse());
    return { angle: Math.atan2(point.y - cornerPivot.y, point.x - cornerPivot.x) * 180 / Math.PI, distance: Math.hypot(point.x - cornerPivot.x, point.y - cornerPivot.y) };
  };
  return <svg className={`sparkle-corner-diagram${onRotate ? ' is-rotatable' : ''}`} viewBox="0 0 460 270" role="img" aria-label={vi ? 'Hai gương vuông góc và đường phản xạ của tia sáng' : 'Two perpendicular mirrors and the reflected light path'}
    onPointerDown={event => {
      if (!onRotate || !event.isPrimary || event.button !== 0) return;
      const point = pointerAngle(event.currentTarget, event.clientX, event.clientY);
      if (!point || point.distance > 116 || point.distance < 10) return;
      event.preventDefault();
      drag.current = { id: event.pointerId, angle: point.angle, rotation };
      event.currentTarget.setPointerCapture(event.pointerId);
    }}
    onPointerMove={event => {
      const start = drag.current;
      if (!start || start.id !== event.pointerId) return;
      const point = pointerAngle(event.currentTarget, event.clientX, event.clientY);
      if (point && point.distance >= 10) onRotate?.(normalizeRotation(start.rotation + normalizeRotation(point.angle - start.angle)));
    }}
    onPointerUp={event => { if (drag.current?.id === event.pointerId) { drag.current = null; event.currentTarget.releasePointerCapture(event.pointerId); } }}
    onPointerCancel={() => { drag.current = null; }} onLostPointerCapture={() => { drag.current = null; }}>
    <rect x="4" y="4" width="452" height="262" rx="8" fill="#1b3039" stroke="#9e8b64" strokeWidth="2" />
    <circle cx={cornerPivot.x} cy={cornerPivot.y} r="112" fill="#293e44" stroke="#6c817d" strokeDasharray="4 6" />
    <g transform={`rotate(${rotation} ${cornerPivot.x} ${cornerPivot.y})`}>
      <path d="m307.27 147.73-12.73-12.73 12.73-12.73" fill="none" stroke="#ad9870" strokeWidth="1.5" />
      <circle cx="425" cy="135" r="8" fill="#dfc18a" stroke="#30464b" strokeWidth="2" />
      <path d="m421 135h8m-4-4v8" stroke="#30464b" />
    </g>
    {mirrors.map(({ start, end }, i) => <g key={i}>
      <path d={`M${start.x} ${start.y}L${end.x} ${end.y}`} stroke="#ad9870" strokeWidth="9" strokeLinecap="round" />
      <path d={`M${start.x} ${start.y}L${end.x} ${end.y}`} stroke="#a5bbb2" strokeWidth="5" strokeLinecap="round" />
      <circle cx={end.x} cy={end.y} r="10" fill="#ad9870" /><text x={end.x} y={end.y + 4} textAnchor="middle" fill="#1b3039" fontSize="12">{i + 1}</text>
    </g>)}
    <circle cx={cornerPivot.x} cy={cornerPivot.y} r="4" fill="#dfc18a" />
    <text x="320" y="254" textAnchor="middle" fill="#e6dbc1" fontSize="13">90°</text>
    <rect x="20" y="97" width="45" height="80" rx="5" fill="#30464b" stroke="#ac9870" strokeWidth="2" />
    <circle cx={laserSource.x} cy={laserSource.y} r="5" fill="#dfc18a" />
    <rect x={laserReceiver.x - 4} y={laserReceiver.y - laserReceiver.halfHeight} width="8" height={laserReceiver.halfHeight * 2} rx="2" fill={lit && beam.success ? '#b8cbc1' : '#617774'} stroke="#ad9870" />
    <text x="48" y="200" textAnchor="middle" fill="#e6dbc1" fontSize="14">{vi ? 'Trạm gửi' : 'Station'}</text>
    {lit > 0 && <g key={lit}>
      <path d={beamPath} fill="none" stroke="#e7c684" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" opacity=".12" />
      <path d={beamPath} fill="none" stroke="#e7c684" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" pathLength="1" className="sparkle-traced-ray" />
      {beam.hits.map((_, i) => {
        const point = beam.points[i + 1];
        return <circle key={`contact-${i}`} cx={point.x} cy={point.y} r="2.5" fill="#f0d69f" />;
      })}
      {beam.points.slice(1).map((point, i) => {
        const from = beam.points[i];
        const angle = Math.atan2(point.y - from.y, point.x - from.x) * 180 / Math.PI;
        return <path key={i} d="m-5-4 6 4-6 4" transform={`translate(${(from.x + point.x) / 2} ${(from.y + point.y) / 2}) rotate(${angle})`} fill="none" stroke="#f0d69f" strokeWidth="2" />;
      })}
      <circle cx={beam.points.at(-1)!.x} cy={beam.points.at(-1)!.y} r="6" fill={beam.success ? '#b8cbc1' : '#ce9979'} />
    </g>}
  </svg>;
}

export function SparkleRepair({ language, progress: p, onChange, onComplete }: { language: Language; progress: SparkleProgress; onChange: (p: SparkleProgress) => void; onComplete: () => void }) {
  const vi = language === 'vi';
  const [lit, setLit] = useState(0);
  const [tried, setTried] = useState(false);
  const beam = traceSparkleLight(p.repairRotation);
  const success = tried && beam.success;
  const rotate = (rotation: number) => {
    setTried(false); setLit(0);
    onChange({ ...p, repairRotation: rotation });
  };
  return <section className="sparkle-card sparkle-science sparkle-repair" aria-labelledby="sparkle-repair-title">
    <div className="sparkle-science-visual"><CornerDiagram rotation={p.repairRotation} lit={lit} language={language} onRotate={rotate} /><small>{vi ? 'Đây là mô hình 2D đơn giản. Thiết bị Apollo 11 thật sử dụng các lăng kính có ba mặt phản xạ vuông góc.' : 'This is a simplified 2D model. The real Apollo 11 device uses prisms with three mutually perpendicular reflecting faces.'}</small></div>
    <div className="sparkle-cleaning-copy">
      <h2 id="sparkle-repair-title">{vi ? 'T03 · Sửa kính phản xạ Apollo 11' : 'T03 · Repair the Apollo 11 reflector'}</h2>
      <p className="sparkle-repair-goal">{vi ? 'Mục tiêu: tia sáng phản xạ trên cả hai gương rồi quay về vùng nhận tại trạm phát.' : 'Goal: reflect light off both mirrors and return it to the station’s receiver.'}</p>
      <label className="sparkle-rotation-control">{vi ? 'Góc xoay cụm gương' : 'Mirror pair rotation'} <output>{Math.round(p.repairRotation)}°</output><input aria-label={vi ? 'Góc xoay cụm gương' : 'Mirror pair rotation'} type="range" min="-180" max="180" step="1" value={p.repairRotation} onChange={event => rotate(Number(event.target.value))} /></label>
      {tried && <p className="sparkle-science-feedback" role="status">{success ? (vi ? 'Đủ hai lần phản xạ! Tia trở lại vùng nhận, ngược chiều tia tới.' : 'Two reflections! The ray reaches the receiver, opposite to its incoming direction.') : (vi ? `Tia phản xạ ${beam.hits.length} lần, chưa trở về vùng nhận qua đủ hai gương.` : `The ray reflected ${beam.hits.length} times, without returning through both mirrors.`)}</p>}
      <button onClick={() => { setLit(value => value + 1); setTried(true); }}>{vi ? 'Thử tia sáng' : 'Try the light'}</button>
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

export function SparkleRanging({ language, progress: p, onChange, paused }: { language: Language; progress: SparkleProgress; onChange: (p: SparkleProgress) => void; paused: boolean }) {
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
    onChange({ ...p, calculation: correct, ...(correct ? { distance: values[3], phase: 'farewell', turn: 0 } : {}) });
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
    </div>
  </section>;
}
