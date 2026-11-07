import type { RabbitStop } from '../content/levels/gac-troi-rabbit';
import type { RabbitRock } from '../content/levels/gac-rabbit-layout';
/** Shared story illustrations; coordinates and hit targets stay independent of artwork. */
export function Rabbit({ hidden = false, tail = false, sneeze = false, sleeping = false, hopping = false, stride = 0 }: { hidden?: boolean; tail?: boolean; sneeze?: boolean; sleeping?: boolean; hopping?: boolean; stride?: number }) {
  return <svg className={`moon-rabbit ${sleeping ? 'is-sleeping' : hidden ? 'is-hiding' : hopping ? 'is-hopping' : 'is-alert'}`} viewBox="0 0 80 104" aria-hidden="true">
    <g stroke="#a99f8c" strokeWidth="1.5" strokeLinejoin="round">
      {hidden ? tail ? <><ellipse cx="40" cy="65" rx="23" ry="22" fill="#c9c6b8"/><path d="M21 65Q15 45 32 47Q42 34 51 47Q70 47 61 65Q67 85 46 84Q25 92 21 65" fill="#f4efdc"/></> : <><path d="M24 96Q10 63 17 18Q21 4 28 18L37 88M42 94Q39 56 50 11Q58 0 62 17Q65 58 54 96" fill="#eee8d6"/><path d="M24 75Q18 38 23 23M49 76Q49 40 56 18" stroke="#c8a49a" strokeWidth="5" strokeLinecap="round"/></> : <>
      <ellipse cx="40" cy="98" rx="32" ry="5" fill="#263740" opacity=".3" stroke="none"/>
      {sleeping ? <><g className="rabbit-breath"><ellipse cx="38" cy="80" rx="31" ry="19" fill="#d6d4c5"/><ellipse cx="58" cy="80" rx="18" ry="16" fill="#f2eddb"/><path d="M55 66Q21 42 17 56Q24 68 51 73M58 66Q31 50 30 61Q36 71 53 74" fill="#eee8d6"/><path d="m56 80 5 3 6-4" fill="none" stroke="#4c4841"/><ellipse cx="12" cy="83" rx="9" ry="10" fill="#f4efdf"/></g></> : <>
      <ellipse cx="40" cy="77" rx="25" ry="23" fill="#d3d1c2"/><ellipse cx="41" cy="77" rx="18" ry="21" fill="#f3eddc" stroke="none"/>
      <g className="rabbit-ears" transform={hopping ? `rotate(${Math.sin(stride * Math.PI * 2) * 13} 40 46)` : undefined}><path d="M25 48Q12 24 20 7Q25 2 29 13L36 45M43 43Q45 15 57 4Q65 3 62 18L55 50" fill="#eee8d6"/><path d="M26 36 23 15M50 35 57 13" stroke="#caa99e" strokeWidth="5" strokeLinecap="round"/></g>
      <path d="M19 53Q17 36 38 36Q61 34 64 54Q72 70 54 76Q26 81 18 65Z" fill="#f4efdd"/>
      <g className="rabbit-feet" transform={hopping ? `translate(${Math.sin(stride * Math.PI * 2) * 5} ${-Math.sin(stride * Math.PI) * 5})` : undefined}><ellipse cx="22" cy="94" rx="12" ry="6" fill="#eee8d6"/><ellipse cx="52" cy="94" rx="12" ry="6" fill="#eee8d6"/></g><circle cx="67" cy="81" r="10" fill="#f4efdf"/>
      {sneeze ? <path d="m27 54 6 3-6 3m27-6-6 3 6 3" fill="none" stroke="#403d37"/> : <g className="rabbit-eyes" fill="#403d37" stroke="none"><ellipse cx="30" cy="56" rx="2.6" ry="3.5"/><ellipse cx="51" cy="56" rx="2.6" ry="3.5"/><circle cx="31" cy="55" r=".9" fill="#fff9e7"/><circle cx="52" cy="55" r=".9" fill="#fff9e7"/></g>}
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
export function RabbitLantern({ lit = false, local = false }: { lit?: boolean; local?: boolean }) {
  return <g transform={local ? undefined : "translate(250 390)"}>
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

/** Faceted lunar stones in the muted palette of the preceding scenes. */
export function TrailRock({ rock }: { rock: RabbitRock }) {
  const profiles = {
    flat: '-50,0 -47,-27 -26,-48 20,-53 43,-34 50,0',
    split: '-50,0 -44,-55 -17,-84 14,-80 39,-46 50,0',
    round: '-50,0 -48,-34 -29,-61 0,-69 30,-55 46,-28 50,0',
    point: '-50,0 -38,-30 -8,-70 12,-58 35,-29 50,0',
  };
  return <g transform={`translate(${rock.x} ${rock.y}) scale(${rock.width / 100} ${rock.height / (rock.shape === 'flat' ? 53 : rock.shape === 'split' ? 84 : 70)})`}>
    <ellipse cy="2" rx="57" ry="9" fill="#263740" opacity=".3"/>
    <polygon points={profiles[rock.shape]} fill="#758780" stroke="#4b6064" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d={rock.shape === 'flat' ? 'M-47-27-26-48 20-53 4-30-25-17Z' : 'M-44-30-25-55-8-65 8-48-12-27Z'} fill="#a5ada5" opacity=".8"/>
    <path d="M-12-27 8-48 32-29 48-2 4-7Z" fill="#88978e"/>
    <path d="M-43-5-22-12 4-7 43-3" fill="none" stroke="#566d6c" strokeWidth="2"/>
    {rock.shape === 'split' && <path d="m8-77-10 27 11 15-8 33" fill="none" stroke="#344951" strokeWidth="5"/>}
    <path d="m-27-17 9-3m35 6 6 2" stroke="#c5c8b5" opacity=".6" strokeWidth="2"/>
  </g>;
}

export function TrailGift({ kind }: { kind: RabbitStop }) {
  return <g stroke="#90734f" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
    <ellipse cy="3" rx="23" ry="5" fill="#263740" opacity=".25" stroke="none"/>
    <path d="M-22-8-18 1Q0 9 18 1L22-8Z" fill="#b69a68"/>
    <path d="M-18-5Q0 1 18-5M-12-3l2 7M0-2v7m12-8-2 7" fill="none" stroke="#dbc28c"/>
    {kind === 'slope' ? <>
      <path d="M-14-15Q-16-25-7-25L13-15Q15-9 8-8Z" fill="#d89b60"/>
      <path d="m-10-22 3 5m5-1 3 5" stroke="#a76f47"/>
      <path d="M-10-25q-11-13-10-3m10 3q-3-20-8-15m8 15q5-15 0-17" stroke="#80936c" strokeWidth="3" fill="none"/>
    </> : kind === 'rock' ? <>
      <path d="M-16-23v11Q0-1 16-12v-11" fill="#be9257"/>
      <ellipse cy="-23" rx="16" ry="10" fill="#dfb879"/>
      <path d="m0-30 4 5 6 2-6 2-4 5-4-5-6-2 6-2Z" fill="none" stroke="#a67d48"/>
    </> : <>
      <path d="m-8-10 5-18m9 19-5-13" stroke="#7e9267" strokeWidth="3"/>
      {[-9, 8].map((x,i)=><g key={x} transform={`translate(${x} ${i ? -23 : -31})`} fill="#ead39a">
        {[0,60,120].map(a=><ellipse key={a} rx="4" ry="10" transform={`rotate(${a})`}/>)}
        <circle r="4" fill="#b99357"/>
      </g>)}
    </>}
  </g>;
}
