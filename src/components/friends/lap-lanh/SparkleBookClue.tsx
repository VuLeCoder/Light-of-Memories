import { BookParagraph } from '../../book/BookParagraph';
import { clueCopy } from '../../../content/friends/lap-lanh/book-copy';
import type { Language } from '../../../content/i18n';
import { CornerDiagram } from './SparkleScience';

export function SparkleBookClue({ language, ranging }: { language: Language; ranging: boolean; showSources: boolean }) {
  return <>
    <span className="book-kicker">{clueCopy.kicker[language]}</span>
    <h2 id="sparkle-clue-title" tabIndex={-1}>{ranging ? (clueCopy.rangingTitle[language]) : (clueCopy.repairTitle[language])}</h2>
    {ranging ? <>
      <p>{clueCopy.roundTrip[language]}</p>
      <dl className="sparkle-book-data"><dt>{clueCopy.speedLabel[language]}</dt><dd>{clueCopy.speed[language]}</dd><dt>{clueCopy.timeLabel[language]}</dt><dd>{clueCopy.time[language]}</dd></dl>
      <p>{clueCopy.formula[language]}</p>
      <details className="book-answer sparkle-ranging-answer"><summary>{language === 'vi' ? 'Xem đáp án' : 'Show answer'}</summary><p>{clueCopy.answer[language]}</p></details>
      <small><BookParagraph pageId="sparkle-ranging-clue" value={clueCopy.note[language]} language={language}/></small>
    </> : <>
      <CornerDiagram lit={4} language={language} />
      <p>{clueCopy.model[language].split('90°').map((part, index) => <span key={index}>{index > 0 && <strong className="sparkle-book-angle">90°</strong>}{part}</span>)}</p>
      <p>{clueCopy.reflection[language]}</p>
    </>}
  </>;
}
