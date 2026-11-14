import { gameAudio } from '../../../audio/game-audio';
import type { Language } from '../../../content/i18n';
import { sparkleEndingDialogue, sparkleEndingStories } from '../../../content/friends/lap-lanh/ending-copy';
import { sparkleKeepsakes } from '../../../content/friends/lap-lanh/images';
import { type SparkleProgress } from '../../../content/friends/lap-lanh/progress';
import { EarthDialogue } from '../../shared/EarthDialogue';
import { LanternGiftPause, useLanternGiftPause } from '../../shared/LanternGiftPause';

export function SparkleEnding({ language, progress, onChange, paused, stars = 0 }: {
  language: Language; progress: SparkleProgress; onChange: (p: SparkleProgress) => void; paused: boolean; stars?: number;
}) {
  const vi = language === 'vi';
  const step = Math.min(progress.turn, 6);
  const gifting = useLanternGiftPause(step === 5, paused);
  const title = vi ? 'Câu chuyện của Lấp Lánh' : 'Twinkle’s story';
  const go = (turn: number) => {
    onChange({ ...progress, turn });
  };
  const { intro, outro } = sparkleEndingDialogue(language);
  if (step === 1 || step === 2) {
    const page = step - 1;
    const picture = sparkleKeepsakes[page === 0 ? 1 : 0];
    const stories = sparkleEndingStories(language);
    return <section className="journey-view ending-recollection sparkle-recollection" hidden={paused} lang={language} aria-label={title}>
      <header><span aria-hidden="true">★ ★ ★</span><h2>{title}</h2></header>
      <div className="surveyor-ending">
        <figure className="ending-photo"><img src={picture.src} alt={picture[language].title} /><figcaption>{picture[language].title}</figcaption></figure>
        <div className="ending-story-copy">
          <div className="ending-steps" aria-label={`${page + 1}/2`}>{[0, 1].map(i => <span key={i} className={i === page ? 'is-active' : ''} />)}</div>
          <h3>{page === 0 ? (vi ? 'Vừa đặt chân đến Mặt Trăng' : 'Just arrived on the Moon') : (vi ? 'Sẵn sàng đón lời chào ánh sáng' : 'Ready for greetings made of light')}</h3>
          <p className="ending-speech"><b>{vi ? 'Lấp Lánh' : 'Twinkle'}:</b> {stories[page]}</p>
          <p className="ending-note">{vi ? 'Hai bức ảnh và những manh mối đã được lưu trong sách của Cuội.' : 'Both pictures and the clues are in Cuội’s book.'}</p>
          <nav className="ending-actions" aria-label={title}><button disabled={page === 0} onClick={() => go(1)}>← {vi ? 'Trang trước' : 'Previous page'}</button><button className="journey-primary" onClick={() => go(page === 0 ? 2 : 4)}>{page === 0 ? (vi ? 'Trang tiếp' : 'Next page') : (vi ? 'Trở lại bên Lấp Lánh' : 'Return to Twinkle')} →</button></nav>
        </div>
      </div>
    </section>;
  }
  const lit = step >= 5;
  return <section className={`ending-scene sparkle-ending-scene`} hidden={paused} lang={language} aria-label={title}>
    <div className="surveyor-scene-hud"><span>{title}</span><strong role="status">★ {Math.max(stars, lit ? 2 : 1)}/5</strong></div>
    {gifting ? <LanternGiftPause language={language}/> : <EarthDialogue key={step === 0 ? 'intro' : 'outro'} language={language} paused={paused} title={title} lines={step === 0 ? intro : outro} initialIndex={step === 0 ? 0 : Math.max(0, step - 4)} onTurn={index => { if (step !== 0 && index + 4 !== step) go(index + 4); }} finalAction="moon" finalLabel={step === 0 ? (vi ? 'Nghe Lấp Lánh kể' : 'Listen to Twinkle') : (vi ? 'Mang theo ánh sáng' : 'Carry the light')} onComplete={() => { if (step === 0) go(1); else { if (!progress.completedOnce) gameAudio.cue('lamp', 1); onChange({ ...progress, phase: 'finished', turn: 0, completedOnce: true }); } }} />}
  </section>;
}
