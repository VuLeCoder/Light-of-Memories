import { renderToStaticMarkup } from 'react-dom/server';
import { GacLightMap } from '../components/GacLightMap';
import { CornerDiagram, RangingDiagram } from '../components/SparkleScience';
import type { BookDiagram } from '../content/book/types';
import type { Language } from '../content/i18n';

/** Export the same authored diagrams without mounting or changing the game. */
export function bookDiagramSvg(diagram: BookDiagram, language: Language): string {
  let markup: string;
  switch (diagram) {
    case 'corner': markup = renderToStaticMarkup(<CornerDiagram language={language} lit={4} />); break;
    case 'ranging': markup = renderToStaticMarkup(<RangingDiagram language={language} />); break;
    case 'gac-map': markup = renderToStaticMarkup(<GacLightMap language={language} />); break;
    case 'clue-arrive':
    case 'clue-work':
    case 'clue-visit':
      markup = renderToStaticMarkup(<svg viewBox="0 0 180 65">
        <rect width="180" height="65" fill="#f8f3e7" />
        <g fill="none" stroke="#796a4c" strokeWidth="2">
          {diagram === 'clue-arrive' ? <><ellipse cx="60" cy="38" rx="28" ry="12" /><ellipse cx="120" cy="25" rx="28" ry="12" /></> : diagram === 'clue-work' ? <path d="M30 25L150 15M30 40L150 30M30 55L150 45" /> : <>{[0, 1, 2, 3, 4, 5].map(i => <ellipse key={i} cx={30 + i * 24} cy={25 + i % 2 * 15} rx="8" ry="4" />)}</>}
        </g>
      </svg>); break;
    default: throw new Error(`Missing publication diagram: ${diagram}`);
  }
  return markup.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ').replace('<svg ', '<svg style="font-family:serif" ');
}
