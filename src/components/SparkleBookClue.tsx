import { BookParagraph } from './BookParagraph';
import { clueCopy } from '../content/book/sparkle-copy';
import { useState } from 'react';
import type { Language } from '../content/i18n';
import { CornerDiagram, RangingDiagram } from './SparkleScience';

export function SparkleBookClue({ language, ranging }: { language: Language; ranging: boolean }) {
  const vi = language === 'vi';
  const [hint, setHint] = useState(false);
  return <>
    <span className="book-kicker">{clueCopy.kicker[language]}</span>
    <h2 id="sparkle-clue-title" tabIndex={-1}>{ranging ? (clueCopy.rangingTitle[language]) : (clueCopy.repairTitle[language])}</h2>
    {ranging ? <>
      <div className="sparkle-book-route"><RangingDiagram language={language} /></div>
      <p>{clueCopy.roundTrip[language]}</p>
      <dl className="sparkle-book-data"><dt>{clueCopy.speedLabel[language]}</dt><dd>{clueCopy.speed[language]}</dd><dt>{clueCopy.timeLabel[language]}</dt><dd>{clueCopy.time[language]}</dd></dl>
      <p>{hint ? (clueCopy.answer[language]) : (clueCopy.formula[language])}</p>
      <button className="book-new-entry" aria-expanded={hint} onClick={() => setHint(!hint)}>{vi ? (hint ? 'Thu gọn gợi ý' : 'Cần thêm gợi ý?') : (hint ? 'Hide hint' : 'Need another hint?')}</button>
      <small><BookParagraph pageId="sparkle-ranging-clue" value={clueCopy.note[language]} language={language}/></small>
      <a className="sparkle-book-source" href="https://www.nasa.gov/missions/laser-beams-reflected-between-earth-and-moon-boost-science/" target="_blank" rel="noreferrer">{clueCopy.rangingSourceLabel[language]}</a>
    </> : <>
      <CornerDiagram lit={4} language={language} />
      <p>{clueCopy.model[language]}</p>
      <p>{clueCopy.reflection[language]}</p>
      <small>{clueCopy.prisms[language]}</small>
      <a className="sparkle-book-source" href="https://www.jpl.nasa.gov/news/apollo-11-experiment-still-going-strong-after-35-years/" target="_blank" rel="noreferrer">{clueCopy.repairSourceLabel[language]}</a>
    </>}
  </>;
}
