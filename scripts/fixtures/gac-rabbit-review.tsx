// Only served by check-gac-rabbit-ui.mjs; never imported by the released app.
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { GacTroiTrail } from '../../src/components/GacTroiTrail';
import { freshGacTroi, readGacTroi, type GacTroiProgress } from '../../src/content/levels/gac-troi-progress';
import { freshGacRabbit, rabbitStops, type RabbitStop } from '../../src/content/levels/gac-troi-rabbit';
import type { Language } from '../../src/content/i18n';

const params = new URLSearchParams(location.search);
const language = (params.get('lang') ?? 'vi') as Language;
function Review() {
  const [progress, setProgress] = useState<GacTroiProgress>(() => {
    const saved = localStorage.getItem('rabbit-review');
    if (saved) return readGacTroi(JSON.parse(saved));
    const stage = (params.get('stop') ?? 'slope') as RabbitStop;
    return {...freshGacTroi(), phase:'t04-slope', matched:['surveyor','lap-lanh'], seen:['surveyor','lap-lanh'], t02Done:true,
      rabbitJourney:{...freshGacRabbit(), active:true, stage, completedStops:rabbitStops.indexOf(stage)}};
  });
  const [paused,setPaused] = useState(false);
  const save = (p: GacTroiProgress) => { localStorage.setItem('rabbit-review',JSON.stringify(p)); setProgress(p); };
  return <main id="main-scene"><div className="game-stage">
    {rabbitStops.includes(progress.rabbitJourney!.stage as RabbitStop) ? <GacTroiTrail language={language} progress={progress} onChange={save} onBack={()=>setPaused(true)} onBook={()=>setPaused(true)} paused={paused}/>
      : <p id="reunion">reunion</p>}
    <button id="book" onClick={()=>setPaused(true)}>Book</button>
    {paused && <button id="resume" onClick={()=>setPaused(false)}>Resume</button>}
  </div></main>;
}
createRoot(document.getElementById('root')!).render(<Review/>);
