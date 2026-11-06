/** Shared story illustrations; coordinates and hit targets stay independent of artwork. */
export function Rabbit({ hidden = false, tail = false, sneeze = false, sleeping = false }: { hidden?: boolean; tail?: boolean; sneeze?: boolean; sleeping?: boolean }) {
  return <svg viewBox="0 0 80 104" aria-hidden="true">
    <g stroke="#a99f8c" strokeWidth="1.5" strokeLinejoin="round">
      {hidden ? tail ? <><ellipse cx="40" cy="65" rx="23" ry="22" fill="#c9c6b8"/><path d="M21 65Q15 45 32 47Q42 34 51 47Q70 47 61 65Q67 85 46 84Q25 92 21 65" fill="#f4efdc"/></> : <><path d="M24 96Q10 63 17 18Q21 4 28 18L37 88M42 94Q39 56 50 11Q58 0 62 17Q65 58 54 96" fill="#eee8d6"/><path d="M24 75Q18 38 23 23M49 76Q49 40 56 18" stroke="#c8a49a" strokeWidth="5" strokeLinecap="round"/></> : <>
      <ellipse cx="40" cy="98" rx="32" ry="5" fill="#263740" opacity=".3" stroke="none"/>
      {sleeping ? <><ellipse cx="38" cy="80" rx="31" ry="19" fill="#d6d4c5"/><ellipse cx="58" cy="80" rx="18" ry="16" fill="#f2eddb"/><path d="M55 66Q21 42 17 56Q24 68 51 73M58 66Q31 50 30 61Q36 71 53 74" fill="#eee8d6"/><path d="m56 80 5 3 6-4" fill="none" stroke="#4c4841"/><ellipse cx="12" cy="83" rx="9" ry="10" fill="#f4efdf"/></> : <>
      <ellipse cx="40" cy="77" rx="25" ry="23" fill="#d3d1c2"/><ellipse cx="41" cy="77" rx="18" ry="21" fill="#f3eddc" stroke="none"/>
      <path d="M25 48Q12 24 20 7Q25 2 29 13L36 45M43 43Q45 15 57 4Q65 3 62 18L55 50" fill="#eee8d6"/><path d="M26 36 23 15M50 35 57 13" stroke="#caa99e" strokeWidth="5" strokeLinecap="round"/>
      <path d="M19 53Q17 36 38 36Q61 34 64 54Q72 70 54 76Q26 81 18 65Z" fill="#f4efdd"/>
      <ellipse cx="22" cy="94" rx="12" ry="6" fill="#eee8d6"/><ellipse cx="52" cy="94" rx="12" ry="6" fill="#eee8d6"/><circle cx="67" cy="81" r="10" fill="#f4efdf"/>
      {sneeze ? <path d="m27 54 6 3-6 3m27-6-6 3 6 3" fill="none" stroke="#403d37"/> : <g fill="#403d37" stroke="none"><ellipse cx="30" cy="56" rx="2.6" ry="3.5"/><ellipse cx="51" cy="56" rx="2.6" ry="3.5"/><circle cx="31" cy="55" r=".9" fill="#fff9e7"/><circle cx="52" cy="55" r=".9" fill="#fff9e7"/></g>}
      <path d="m37 64 4 3 4-3" fill="#bd9384" stroke="none"/><path d="M41 67v3m-5 0q5 5 10 0" fill="none" stroke="#8d7c6b"/><path d="m17 62 11 2m27 0 12-2" stroke="#c2bba7"/>
      </>}
      </>}
    </g>
  </svg>;
}
const points = Array.from({length:10},(_,i)=>{const a=-Math.PI/2+i*Math.PI/5,r=i%2?13:29;return [32+Math.cos(a)*r,32+Math.sin(a)*r];});
const outline=points.map(p=>p.join(',')).join(' ');
export function Star({ awake, yawning }: { awake: boolean; yawning: boolean }) {
  return <svg viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="32" cy="32" r="31" fill="#ffe4a1" opacity={awake ? '.12' : '0'}/>
    <polygon points={outline} fill={awake ? '#e8c574' : '#a7b4af'} stroke={awake ? '#a8844c' : '#647b80'} strokeWidth="1.5" strokeLinejoin="round"/>
    {points.map((p,i)=><path key={i} d={`M32 32L${p.join(' ')} ${points[(i+1)%10].join(' ')}Z`} fill={i%2?'#fff2c2':'#536c72'} opacity={i%2?'.2':'.08'}/>)}
    {awake ? <path d="M24 28v4m16-4v4m-12 8q4 4 8 0" fill="none" stroke="#65543d" strokeWidth="2.5" strokeLinecap="round"/> : <path d="m21 30 5 3 5-3m5 0 5 3 5-3" fill="none" stroke="#475e63" strokeWidth="2" strokeLinecap="round"/>}
    {yawning && <ellipse cx="32" cy="40" rx="3" ry="5" fill="#65543d"/>}
  </svg>;
}
export function RabbitLantern({ lit = false }: { lit?: boolean }) {
  return <g transform="translate(250 390)">
    <circle r="42" fill="#ffdf91" opacity={lit ? '.12' : '.05'}/>
    <g transform="translate(-32 -32) scale(1)">
      {points.map((p,i)=><path key={i} d={`M32 32L${p.join(' ')} ${points[(i+1)%10].join(' ')}Z`} fill={(lit ? ['#f2d28c','#d9ac61','#edc47e','#d4a66a','#f5d99c'] : ['#ebc87e','#b18d57','#806548','#927449','#dec085'])[Math.floor(i/2)]}/>)}
      <polygon points={outline} fill="none" stroke="#745336" strokeWidth="2.5" strokeLinejoin="round"/>
      <polygon points={outline} fill="none" stroke="#c5a36a" strokeWidth=".8"/>
      {points.filter((_,i)=>i%2===0).map((p,i)=><path key={i} d={`M32 32L${p.join(' ')}`} stroke="#9c7d4e" strokeWidth="1"/>)}
    </g>
    <circle r="3" fill="#e9c683"/><path d="M0 12v33M-16 19v12m32-12v12" stroke="#957044" strokeWidth="2"/>
    <path d="M-16 31v9m32-9v9" stroke="#a46d4c" strokeWidth="4"/>
    <path d="M-30-8h-10l-10-11" fill="none" stroke="#957044" strokeWidth="3"/>
  </g>;
}
