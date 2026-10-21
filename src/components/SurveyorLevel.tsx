import { SurveyorEnding } from './SurveyorEnding';
import { useEffect, useRef, useState } from 'react';
import { SurveyorChallenges } from './SurveyorChallenges';
import { challengeCopy } from '../content/levels/surveyor-challenges';
import { memoryCount } from '../content/levels/surveyor-progress';
import type { Language } from '../content/i18n';
import type { SurveyorProgress, SurveyorTool } from '../content/levels/surveyor-progress';

export const surveyorPlayCopy = {
  vi: {
    fiction: 'Câu chuyện tưởng tượng dựa trên thiết bị có thật. Hình minh họa ký ức lúc tàu còn hoạt động.',
    task: 'T01 · Khám phá Mắt Tròn',
    instruction: 'Bấm một công dụng, rồi bấm dụng cụ tương ứng trên hình. Bạn có thể bấm từng dụng cụ để xem gợi ý.',
    camera: 'Máy ảnh', scoop: 'Chiếc xẻng khảo sát', photo: 'Chụp ảnh', soil: 'Khảo sát đất',
    cameraHint: 'Đây là máy ảnh. Dụng cụ này giúp Mắt Tròn quan sát cảnh vật.',
    scoopHint: 'Đây là chiếc xẻng khảo sát. Dụng cụ này giúp Mắt Tròn tìm hiểu đất.',
    select: 'Đã chọn:', choose: 'Bây giờ hãy bấm dụng cụ phù hợp trên hình.',
    wrongCamera: 'Thử lại nhé! Dụng cụ nào giúp mình nhìn thấy cảnh vật từ xa?',
    wrongScoop: 'Thử lại nhé! Dụng cụ nào giúp mình tìm hiểu đất dưới chân?',
    correct: 'Đúng rồi! Công dụng này đã được ghép.', done: 'Bạn đã hiểu các dụng cụ của Mắt Tròn!',
    result: 'Máy ảnh giúp mình quan sát. Chiếc xẻng giúp mình tìm hiểu đất!',
    bookNotice: 'Sổ tay đã mở ba trang gợi ý. Hãy nhận dụng cụ, đọc sách rồi tìm lại ba bức ảnh ký ức.',
    bookTitle: 'Đôi mắt và chiếc xẻng',
    bookBody: 'Surveyor 3 là tàu đổ bộ không người lái của NASA, đến Mặt Trăng năm 1967. Tàu có máy ảnh để quan sát và dụng cụ khảo sát đất. Công việc của người bạn robot giúp chuẩn bị cho những chuyến đi có con người.',
    matched: 'Đã ghép', memories: 'Ký ức', back: 'Về lộ trình',
  },
  en: {
    fiction: 'An imaginary story based on a real spacecraft. Illustration of its memory while it was operating.',
    task: 'T01 · Discover Round Eyes',
    instruction: 'Choose a purpose, then choose its tool in the picture. You can inspect each tool for a hint.',
    camera: 'Camera', scoop: 'Soil scoop', photo: 'Take pictures', soil: 'Study the soil',
    cameraHint: 'This is the camera. It helps Round Eyes observe the surroundings.',
    scoopHint: 'This is the soil scoop. It helps Round Eyes study the ground.',
    select: 'Selected:', choose: 'Now choose the matching tool in the picture.',
    wrongCamera: 'Try again! Which tool helps me see distant scenery?',
    wrongScoop: 'Try again! Which tool helps me study the ground beneath me?',
    correct: 'That’s right! This purpose is now matched.', done: 'You have discovered Round Eyes’ tools!',
    result: 'My camera helps me observe. My scoop helps me study the soil!',
    bookNotice: 'Three clue pages are now in your notebook. Receive the scoop, read the clues and find the three memory photos.',
    bookTitle: 'A camera and a scoop',
    bookBody: 'Surveyor 3 is a NASA robotic lander that reached the Moon in 1967. It had a camera to observe its surroundings and a tool to study the soil. Its work helped prepare for later journeys with people.',
    matched: 'Matched', memories: 'Memories', back: 'Back to the route',
  },
};

/** A schematic with explicit tool regions, rather than ambiguous hotspots on a photograph. */
function SurveyorDrawing() {
  return <svg viewBox="0 0 400 270" aria-hidden="true" className="surveyor-drawing">
    <ellipse cx="207" cy="244" rx="174" ry="16" fill="#172a32" opacity=".6" />
    <g fill="none" stroke="#d8c494" strokeWidth="8" strokeLinejoin="round">
      <path d="M200 162V52M140 168L76 244M248 168L320 244M195 178L197 250M140 168H248L200 110Z" />
      <path d="M210 158L286 188L329 210" stroke="#bfa575" />
    </g>
    <path d="M133 145H256L238 184H153Z" fill="#c8a760" stroke="#ffe4a6" strokeWidth="3" />
    <path d="M68 241H92M183 250H213M308 244H335" stroke="#d8c494" strokeWidth="7" />
    <path d="M110 98L163 78L174 110L122 128Z" fill="#354e64" stroke="#d9c694" strokeWidth="3" />
    <path d="M127 92L138 121M145 85L156 115M115 109L168 91" stroke="#789aa7" strokeWidth="2" />
    <rect x="174" y="30" width="67" height="43" rx="6" fill="#d7bd80" stroke="#fff0c2" strokeWidth="3" />
    <circle cx="219" cy="51" r="14" fill="#182c3c" stroke="#f2d9a2" strokeWidth="4" />
    <circle cx="222" cy="47" r="4" fill="#b1d5dd" />
    <path d="M312 199L347 201L341 226L321 222Z" fill="#e2c385" stroke="#fff0c2" strokeWidth="3" />
  </svg>;
}

export function SurveyorLevel({ language, progress, onChange, onReplay, onBack }: {
  language: Language; progress: SurveyorProgress; onChange: (value: SurveyorProgress) => void; onReplay: () => void; onBack: () => void;
}) {
  const t = surveyorPlayCopy[language];
  const ct = challengeCopy[language];
  const count = memoryCount(progress);
  const [selected, setSelected] = useState<SurveyorTool | null>(null);
  const [feedback, setFeedback] = useState<keyof Pick<typeof t, 'cameraHint' | 'scoopHint' | 'wrongCamera' | 'wrongScoop' | 'correct'> | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, [progress.phase]);
  const { phase, matched } = progress;
  function inspect(tool: SurveyorTool) {
    if (matched.includes(tool)) { setFeedback(tool === 'camera' ? 'cameraHint' : 'scoopHint'); return; }
    if (!selected) { setFeedback(tool === 'camera' ? 'cameraHint' : 'scoopHint'); return; }
    if (selected !== tool) { setFeedback(selected === 'camera' ? 'wrongCamera' : 'wrongScoop'); return; }
    const next = [...matched, tool];
    setSelected(null);
    setFeedback('correct');
    onChange({ ...progress, matched: next, phase: next.length === 2 ? 'memory' : 'tools' });
  }
  return <section className={`journey-view surveyor-level phase-${phase}`} aria-labelledby="surveyor-title" lang={language}>
    <header><span aria-label={`${t.memories}: ${count}/3`}>{Array.from({ length: 3 }, (_, i) => i < count ? '★' : '☆').join(' ')}</span><h2 id="surveyor-title" ref={heading} tabIndex={-1}>{phase === 'tools' ? t.task : phase === 'memory' ? t.done : phase === 'complete' ? ct.complete : phase.startsWith('timeline') ? ct.timelineTitle : ct.soilTitle}</h2></header>
    {phase === 'complete' ? <SurveyorEnding language={language} progress={progress} onChange={onChange} onReplay={onReplay} onBack={onBack} /> : phase === 'tools' ? <>
      <p className="surveyor-instruction">{t.instruction}</p>
      <div className="surveyor-tools-layout">
        <div className="surveyor-tool-picture"><SurveyorDrawing />
          {(['camera', 'scoop'] as const).map(tool => <button key={tool} className={`tool-hotspot tool-${tool} ${matched.includes(tool) ? 'is-matched' : ''}`} aria-label={`${t[tool]}${matched.includes(tool) ? ` · ${t.matched}` : ''}`} onClick={() => inspect(tool)}><span>{matched.includes(tool) ? '✓ ' : ''}{t[tool]}</span></button>)}
        </div>
        <div className="surveyor-labels" role="group" aria-label={language === 'vi' ? 'Chọn công dụng' : 'Choose a purpose'}>
          {(['camera', 'scoop'] as const).map(tool => <button key={tool} disabled={matched.includes(tool)} aria-pressed={selected === tool} onClick={() => { setSelected(tool); setFeedback(null); }}>{matched.includes(tool) ? '✓ ' : ''}{tool === 'camera' ? t.photo : t.soil}</button>)}
          <span>{matched.length}/2 {t.matched.toLocaleLowerCase(language)}</span>
        </div>
      </div>
      <p className="surveyor-feedback" role="status">{feedback ? t[feedback] : selected ? `${t.select} ${selected === 'camera' ? t.photo : t.soil}. ${t.choose}` : '\u00a0'}</p>
    </> : phase !== 'memory' ? <SurveyorChallenges language={language} progress={progress} onChange={onChange} /> : <div className="surveyor-memory">
      <span className="memory-light" aria-hidden="true">✦</span><p><b>{language === 'vi' ? 'Mắt Tròn' : 'Round Eyes'}:</b> {t.result}</p><p>{t.bookNotice}</p><button className="journey-primary" onClick={() => onChange({ ...progress, phase: 'soil-intro', turn: 0 })}>{ct.nextSoil} →</button>
    </div>}
    {phase !== 'complete' && <footer className="surveyor-footer"><button onClick={onBack}>{t.back}</button><small>{t.fiction}</small></footer>}
  </section>;
}
