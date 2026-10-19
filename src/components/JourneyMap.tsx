import { useState } from 'react';
import type { Language } from '../content/i18n';
import { copy } from '../content/i18n';
import { portraits } from '../content/assets';

export const journeyCopy = {
  vi: {
    title: 'Lộ trình năm ánh sao', book: 'Hành trình của Cuội', reveal: 'Đèn ông sao đang soi đường…',
    lead: 'Năm điểm sáng… Có ai ở đó biết chị Hằng đang ở đâu không nhỉ?',
    guide: 'Cùng Cuội gặp năm người bạn trên Mặt Trăng và khám phá câu chuyện của họ.',
    friend: 'Surveyor 3 — Mắt Tròn', mystery: 'Người bạn bí ẩn', enter: 'Đến gặp Mắt Tròn',
    locked: 'Hoàn thành điểm trước để khám phá.', back: 'Về lộ trình',
    chapter: '01 · Đánh thức ký ức Mắt Tròn', intro: 'Bạn là ai mà đứng đây một mình thế?',
    reply: 'Mình là Surveyor 3. Cứ gọi mình là Mắt Tròn nhé!',
    invitation: 'Cuội giúp mình tìm lại ba mảnh ký ức nhé: dụng cụ, nhiệm vụ và cuộc gặp lại.',
    note: 'Mỗi cuộc gặp sẽ để lại một kỷ niệm và thắp thêm một ánh sao trên chiếc đèn.',
    waiting: 'Chưa khám phá', ready: 'Điểm đến tiếp theo', memory: 'Ba mảnh ký ức',
  },
  en: {
    title: 'The five-star journey', book: 'Cuội’s journey', reveal: 'The star lantern lights the way…',
    lead: 'Five lights… Could someone there know where Hằng is?',
    guide: 'Join Cuội to meet five friends on the Moon and discover their stories.',
    friend: 'Surveyor 3 — Round Eyes', mystery: 'A mystery friend', enter: 'Meet Round Eyes',
    locked: 'Complete the previous stop to discover this friend.', back: 'Back to the route',
    chapter: '01 · Awakening Round Eyes’ memories', intro: 'Who are you, standing here all alone?',
    reply: 'I am Surveyor 3. You can call me Round Eyes!',
    invitation: 'Will you help me find three memories: my tools, my mission and a visit from friends?',
    note: 'Each encounter will leave a memory and light another star on the lantern.',
    waiting: 'Not yet discovered', ready: 'Your next destination', memory: 'Three memories',
  },
};

export function JourneyMap({ language, surveyor, onEnter, onBack }: { language: Language; surveyor: boolean; onEnter: () => void; onBack: () => void }) {
  const t = journeyCopy[language];
  const [locked, setLocked] = useState(false);
  return <section className="journey-view" aria-labelledby="journey-title">
    <header><span>☆ 0/5</span><h2 id="journey-title">{surveyor ? t.chapter : t.title}</h2></header>
    {surveyor ? <>
      <div className="surveyor-meeting"><img src={portraits.matTron.url} alt={t.friend} /><div><p><b>Cuội:</b> {t.intro}</p><p><b>{t.friend}:</b> {t.reply}</p><p>{t.invitation}</p></div></div>
      <button onClick={onBack}>{t.back}</button>
    </> : <>
      <p className="journey-lead">{t.lead}</p>
      <div className="journey-route">
        <svg viewBox="0 0 800 180" preserveAspectRatio="none" aria-hidden="true"><path d="M80 110 Q160 20 240 65 T400 110 T560 65 T720 110" /></svg>
        {[0, 1, 2, 3, 4].map((index) => <button key={index} className={`journey-stop stop-${index}`} onClick={index === 0 ? onEnter : () => setLocked(true)} aria-label={`${index + 1}. ${index === 0 ? t.friend : `${t.mystery}. ${t.locked}`}`} aria-disabled={index > 0}>
          <span className="stop-orb">{index === 0 ? <img src={portraits.matTron.url} alt="" /> : '?'}</span>
          <span>{index === 0 ? '01 · Surveyor 3' : `0${index + 1} · ${t.mystery}`}</span>
          {index === 0 && <small>Cuội ✦</small>}
        </button>)}
      </div>
      <p className="journey-message" role="status">{locked ? t.locked : t.guide}</p>
      <button className="journey-primary" onClick={onEnter}>{t.enter} →</button>
    </>}
  </section>;
}

export function JourneyBook({ language, surveyor }: { language: Language; surveyor: boolean }) {
  const t = journeyCopy[language];
  return <>
    <div className="book-topline"><span className="book-icon" aria-hidden="true">▤</span><span>{copy[language].bookTop}</span></div>
    <aside className="book-panel" aria-labelledby="book-title"><div className="book-sheet journey-book">
      <div className="page-corner" aria-hidden="true" /><span className="book-kicker">{surveyor ? '01 · Surveyor 3' : t.title}</span>
      <h2 id="book-title">{surveyor ? t.friend : t.book}</h2>
      <p>{surveyor ? t.invitation : t.guide}</p>
      {surveyor ? <><img className="book-friend" src={portraits.matTron.url} alt="" /><p>{t.memory} · ☆ ☆ ☆</p></> : <ol className="journey-memories">{[0, 1, 2, 3, 4].map(index => <li key={index}><span aria-hidden="true">☆</span><span>{index === 0 ? t.friend : t.mystery}<small>{index === 0 ? t.ready : t.waiting}</small></span></li>)}</ol>}
      <div className="page-bottom">☆ 0/5</div>
    </div><p className="book-note">{t.note}</p></aside>
  </>;
}
