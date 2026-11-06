import { useId } from 'react';
import type { Language } from '../content/i18n';
import { gacLightSections, gacLandmarkShapes } from '../content/levels/gac-troi-light';


export function GacLightMap({ language, section = 3, moment = 0, completed = 3, focus = null }: {
  language: Language; section?: number; moment?: number; completed?: number; focus?: number | null;
}) {
  const id = useId().replace(/:/g, '');
  const vi = language === 'vi';
  return <svg className="gac-light-map" viewBox="0 0 960 540" role="img" aria-label={vi ? 'Bản đồ minh họa: triền đất thấp, đá có khe, bóng cây đa. Đường sáng có viền liền; đường tối có gạch chéo.' : 'Imagined map: low slope, split rock, banyan shadow. Visible paths have solid borders; shaded paths have hatching.'}>
    <defs><pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse"><path d="M-4 4L4 -4M0 14L14 0M10 18L18 10" stroke="#9baeb1" strokeWidth="3"/></pattern></defs>
    <g shapeRendering="crispEdges">
      <path fill="#263943" d="M0 0H960V540H0Z"/>
      <path fill="#344b52" d="M0 420H45V390H100V410H220V390H330V430H500V400H610V390H790V360H960V540H0Z"/>
      <path fill="#40545a" d="M65 100H110V80H230V100H270V140H300V210H270V240H110V210H65Z"/>
      <path fill="#172a33" d="M100 135H140V115H215V140H250V195H220V215H140V190H100Z"/>
      <path fill="#506268" d="M590 90H880V115H930V140H860V160H750V145H630V120H590Z"/>
      {Array.from({ length: 45 }, (_, i) => <rect key={i} x={(i * 137 + 31) % 940} y={(i * 71 + 40) % 500} width={i % 3 ? 4 : 10} height="4" fill="#9baeb1" opacity=".18"/>)}
    </g>
    {gacLightSections.map((item, i) => <g key={item.landmark} opacity={i > section ? .23 : 1}>
      {item.branches.map((branch, b) => {
        if (section === 3 && b === 1) return null;
        const lit = branch.lit[moment], kept = i < completed && b === 0;
        return <g key={branch.id}>
          <polyline points={branch.points} fill="none" stroke={lit ? '#c5b68d' : '#14242e'} strokeWidth="40" strokeLinejoin="bevel"/>
          <polyline points={branch.points} fill="none" stroke={lit ? '#546361' : `url(#${id})`} strokeWidth="32" strokeLinejoin="bevel"/>
          <polyline points={branch.points} fill="none" stroke={kept ? '#ffe3a2' : '#f1dbac'} strokeWidth={focus === b && section === i ? 6 : 3} strokeDasharray={lit ? undefined : '5 10'} opacity={lit ? .9 : .4}/>
          {section === i && <g transform={`translate(${branch.points.split(' ')[1].replace(',', ' ')})`}><rect x="-16" y="-16" width="32" height="32" fill="#10232d" stroke="#f1dbac" strokeWidth="2"/><text textAnchor="middle" y="7" fontSize="22" fill="#fff0c7">{b + 1}</text></g>}
        </g>;
      })}
    </g>)}
    {[[300, 310], [540, 300], [820, 280]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y - 26})`}>
      <path d={gacLandmarkShapes[i]} fill={i < completed ? '#c5b68d' : '#728788'} stroke="#152c36" strokeWidth="4" shapeRendering="crispEdges"/>
      {i < completed && <g transform="translate(0 65)"><rect x="-17" y="-16" width="34" height="32" fill="#142b35" stroke="#ffe3a2"/><text fill="#ffe3a2" fontSize="23" textAnchor="middle" y="9">{i + 1}</text></g>}
    </g>)}
    <path d="M75 350h30v20H75z" fill="#eed7a2"/>
    <text x="40" y="480" fill="#d9d0b7" fontSize="23">{vi ? 'Minh họa trong truyện' : 'Story illustration'}</text>
  </svg>;
}
