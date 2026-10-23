import { useState } from 'react';
import type { Language } from '../content/i18n';
import type { StoryLine } from '../content/earth-dialogue';
import { sparkleKeepsakes, type SparkleProgress } from '../content/levels/lap-lanh';
import { EarthDialogue } from './EarthDialogue';
import { MemoryLantern } from './SurveyorEnding';
import { EndingTrail } from './EndingTrail';

export function SparkleEnding({ language, progress, onChange, paused }: {
  language: Language; progress: SparkleProgress; onChange: (p: SparkleProgress) => void; paused: boolean;
}) {
  const vi = language === 'vi';
  const step = Math.min(progress.turn, 6);
  const [gifting, setGifting] = useState(false);
  const title = vi ? 'Câu chuyện của Lấp Lánh' : 'Sparkle’s story';
  const go = (turn: number) => {
    setGifting(step === 4 && turn === 5);
    onChange({ ...progress, turn });
  };
  const intro: StoryLine[] = [{ id: 'sparkle-ending-intro', speaker: 'lapLanh', text: vi
    ? 'Đúng rồi, khoảng 384.000 ki-lô-mét trong lần đo này! Giờ mình cùng mở lại hai bức ảnh, để mình kể từ ngày đầu đến đây nhé.'
    : 'That is right, about 384,000 kilometres in this measurement! Let us open those two pictures and start my story from the day I arrived.' }];
  const outro: StoryLine[] = [
    { id: 'sparkle-ending-thanks', speaker: 'lapLanh', text: vi ? 'Cảm ơn Cuội đã tìm đến, lau bụi và cùng mình khám phá đường đi của ánh sáng. Mình tặng bạn một chút lấp lánh để mang theo nhé!' : 'Thank you for finding me, cleaning the dust and exploring light with me. Here is a little sparkle for your journey!' },
    { id: 'sparkle-ending-star', speaker: 'cuoi', text: vi ? 'Cánh sao thứ hai sáng rồi! Mỗi khi nhìn nó, mình sẽ nhớ người bạn nhỏ vẫn gửi những lời chào về Trái Đất.' : 'The second star point is shining! It will remind me of my little friend who sends greetings back to Earth.' },
    { id: 'sparkle-ending-goodbye', speaker: 'lapLanh', text: vi ? 'Kìa, những vòng gợn nhỏ phía xa! Có lẽ một người bạn đang lắng nghe mặt đất. Cuội thử đến xem nhé. Tạm biệt, nhớ ghé thăm mình!' : 'Look, little ripples in the distance! Perhaps a friend is listening to the ground. Go and see, Cuội. Goodbye, come visit again!' },
  ];
  if (step === 1 || step === 2) {
    const page = step - 1;
    const picture = sparkleKeepsakes[page === 0 ? 1 : 0];
    const stories = vi ? [
      'Năm 1969, Apollo 11 đưa mình đến Biển Yên Tĩnh. Chú Buzz Aldrin vừa đặt mình xuống rồi đi tìm chỗ cho máy đo địa chấn. Mình nằm chờ được mở ra, háo hức đón lời chào từ Trái Đất!',
      'Chú Neil Armstrong mở và căn chỉnh mình. Một trăm lăng kính gửi tia laser trở về Trái Đất mà không cần pin. Đo thời gian ánh sáng đi và về giúp các nhà khoa học biết khoảng cách đến Mặt Trăng. Cảm ơn Cuội đã giúp mình sáng trở lại!',
    ] : [
      'In 1969, Apollo 11 brought me to the Sea of Tranquility. Buzz Aldrin had just set me down before finding a spot for the seismometer. I waited to be unfolded, eager for my first greeting from Earth!',
      'Neil Armstrong unfolded and aligned me. My one hundred prisms return laser light to Earth without batteries. Timing the light’s round trip helps scientists measure the distance to the Moon. Thank you for helping me shine again, Cuội!',
    ];
    return <section className="journey-view ending-recollection sparkle-recollection" hidden={paused} lang={language} aria-label={title}>
      <header><span aria-hidden="true">★ ★ ★</span><h2>{title}</h2></header>
      <div className="surveyor-ending">
        <figure className="ending-photo"><img src={picture.src} alt={picture[language].title} /><figcaption>{picture[language].title}</figcaption></figure>
        <div className="ending-story-copy">
          <div className="ending-steps" aria-label={`${page + 1}/2`}>{[0, 1].map(i => <span key={i} className={i === page ? 'is-active' : ''} />)}</div>
          <h3>{page === 0 ? (vi ? 'Vừa đặt chân đến Mặt Trăng' : 'Just arrived on the Moon') : (vi ? 'Sẵn sàng đón lời chào ánh sáng' : 'Ready for greetings made of light')}</h3>
          <p className="ending-speech"><b>{vi ? 'Lấp Lánh' : 'Sparkle'}:</b> {stories[page]}</p>
          <p className="ending-note">{vi ? 'Hai bức ảnh và những manh mối đã được lưu trong sách của Cuội.' : 'Both pictures and the clues are in Cuội’s book.'}</p>
          <nav className="ending-actions" aria-label={title}><button disabled={page === 0} onClick={() => go(1)}>← {vi ? 'Trang trước' : 'Previous page'}</button><button className="journey-primary" onClick={() => go(page === 0 ? 2 : 4)}>{page === 0 ? (vi ? 'Trang tiếp' : 'Next page') : (vi ? 'Trở lại bên Lấp Lánh' : 'Return to Sparkle')} →</button></nav>
        </div>
      </div>
    </section>;
  }
  const lit = step >= 5;
  return <section className={`ending-scene sparkle-ending-scene${gifting ? ' is-gifting' : ''}`} hidden={paused} lang={language} aria-label={title}>
    <div className="surveyor-scene-hud"><span>{title}</span><strong role="status">★ {lit ? '2' : '1'}/5</strong></div>
    {step >= 4 && <div className={`ending-scene-lantern ${lit ? 'is-kindled' : ''}`}><MemoryLantern lit={lit} second />{gifting && <span className="ending-sparkles" aria-hidden="true">{[0, 1, 2, 3, 4].map(i => <span key={i}>✦</span>)}</span>}</div>}
    {gifting && <span className="ending-light-travel" aria-hidden="true" onAnimationEnd={() => setGifting(false)} />}
    {step === 6 && <EndingTrail language={language} ripple />}
    <EarthDialogue key={step === 0 ? 'intro' : 'outro'} language={language} paused={paused} title={title} lines={step === 0 ? intro : outro} initialIndex={step === 0 ? 0 : Math.max(0, step - 4)} onTurn={index => { if (step !== 0 && index + 4 !== step) go(index + 4); }} finalAction="moon" finalLabel={step === 0 ? (vi ? 'Nghe Lấp Lánh kể' : 'Listen to Sparkle') : (vi ? 'Mang theo ánh sáng' : 'Carry the light')} onComplete={() => step === 0 ? go(1) : onChange({ ...progress, phase: 'finished', turn: 0, completedOnce: true })} />
  </section>;
}
