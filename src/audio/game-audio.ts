/** Original pentatonic music. Synthesized timbres evoke bamboo flute, plucked
 * strings, monochord and bamboo percussion; no third-party recording is used. */
import { musicScores, type MusicMood, type MusicInstrument } from './music-score';
export type { MusicMood } from './music-score';
export type SoundCue = 'touch' | 'success' | 'lamp' | 'gift' | 'hint' | 'retry' | 'dig';
export interface AudioScene { endingMusic?: boolean; endingSuspended?: boolean; musicEnabled: boolean; effectsEnabled: boolean; paused: boolean; effectsPaused: boolean; mood: MusicMood; duck: boolean }
type Timbre = 'flute' | 'tranh' | 'bau' | 'trung';
const hz = (midi: number) => 440 * 2 ** ((midi - 69) / 12);
const cueNotes: Record<SoundCue, number[]> = {
  touch:[81], success:[74,79,81], lamp:[74,76,79,81,86], gift:[76,79,86], hint:[69,74], retry:[72], dig:[50,55],
};
export class GameAudio {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private music: GainNode | null = null;
  private effects: GainNode | null = null;
  private musicTrack: GainNode | null = null;
  private ending: HTMLAudioElement | null = null;
  private endingFailed = false;
  private active = true;
  private syncEnding() {
    const wanted = !!this.scene.endingMusic && !this.scene.endingSuspended;
    if (wanted && !this.ending && !this.endingFailed) {
      this.ending = new Audio(`${import.meta.env.BASE_URL}audio/music/five-points-of-light.mp3`);
      this.ending.loop = true;
      this.ending.volume = .3;
      this.ending.onerror = () => { this.endingFailed = true; this.ending?.pause(); };
    }
    if (!this.ending) return;
    if (wanted && this.active && !this.scene.paused && this.scene.musicEnabled && !this.endingFailed) {
      void this.ending.play().catch(() => {});
    } else this.ending.pause();
  }
  private nodes = new Map<AudioScheduledSourceNode, { amp: GainNode; bus: GainNode; track?: GainNode }>();
  private timer: ReturnType<typeof setInterval> | null = null;
  private step = 0;
  private next = 0;
  private lastCue = -Infinity;
  private lastEffect = new Map<SoundCue, number>();
  private scene: AudioScene = { musicEnabled:false, effectsEnabled:false, paused:true, effectsPaused:true, mood:'home', duck:false };
  onUnavailable?: (unavailable: boolean) => void;
  async unlock() {
    try {
      if (!this.context) {
        const Constructor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Constructor) { this.onUnavailable?.(true); return; }
        this.context = new Constructor();
        const ctx=this.context;
        this.master=ctx.createGain();this.music=ctx.createGain();this.effects=ctx.createGain();
        const limiter=ctx.createDynamicsCompressor();
        limiter.threshold.value=-18;limiter.knee.value=12;limiter.ratio.value=6;
        this.master.gain.value=0;this.music.gain.value=0;this.effects.gain.value=0;
        this.music.connect(this.master);this.effects.connect(this.master);this.master.connect(limiter);limiter.connect(ctx.destination);
        this.next=ctx.currentTime+.08;
        this.timer=setInterval(()=>this.schedule(),100);
      }
      const context = this.context;
      if (context.state === 'suspended') await context.resume();
      if (this.context !== context) return;
      if (context.state !== 'running') { this.onUnavailable?.(true); return; }
      this.onUnavailable?.(false);
      this.applyGain();this.syncEnding();this.schedule();
    } catch { this.onUnavailable?.(true); }
  }
  update(next: AudioScene) {
    const previous = this.scene;
    if (!previous.endingMusic && next.endingMusic && this.ending) this.ending.currentTime = 0;
    this.scene = next;
    if (previous.endingMusic !== next.endingMusic || previous.endingSuspended !== next.endingSuspended) this.retireMusicTrack();
    this.syncEnding();
    if (next.paused) this.stopVoices();
    else {
      if (!next.musicEnabled) this.stopBus(this.music);
      else if (previous.mood !== next.mood) this.retireMusicTrack();
      if (!next.effectsEnabled || next.effectsPaused) this.stopBus(this.effects);
    }
    if (previous.mood !== next.mood) this.step = 0;
    if (this.context && (previous.mood !== next.mood || previous.paused || !previous.musicEnabled)) {
      this.next = this.context.currentTime + .08;
    }
    this.applyGain();
  }
  setActive(active: boolean) {
    this.active = active;
    this.syncEnding();
    if (!active) this.stopVoices();
    this.applyGain();
  }
  private retireMusicTrack() {
    const track = this.musicTrack, ctx = this.context;
    if (!track || !ctx) return;
    track.gain.cancelAndHoldAtTime(ctx.currentTime);
    track.gain.linearRampToValueAtTime(0, ctx.currentTime + .5);
    for (const [node, voice] of this.nodes) {
      if (voice.track === track) node.stop(ctx.currentTime + .5);
    }
    this.musicTrack = null;
    if (![...this.nodes.values()].some(voice => voice.track === track)) track.disconnect();
  }
  private stopBus(bus: GainNode | null) {
    if (!this.context || !bus) return;
    const now = this.context.currentTime;
    for (const [node, voice] of this.nodes) {
      if (voice.bus !== bus) continue;
      try { voice.amp.gain.cancelAndHoldAtTime(now); voice.amp.gain.setTargetAtTime(.0001, now, .02); node.stop(now + .12); }
      catch { try { node.stop(); } catch { /* Already stopped. */ } }
    }
  }
  private applyGain() {
    if (!this.context || !this.master || !this.music || !this.effects) return;
    const now = this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setTargetAtTime(this.active && !this.scene.paused ? .55 : 0, now, .06);
    this.music.gain.cancelScheduledValues(now);
    this.music.gain.setTargetAtTime(this.scene.musicEnabled ? (this.scene.duck ? .10 : .25) : 0, now, .2);
    this.effects.gain.cancelScheduledValues(now);
    this.effects.gain.setTargetAtTime(this.scene.effectsEnabled && !this.scene.effectsPaused ? .35 : 0, now, .03);
  }
  private stopVoices() {
    this.stopBus(this.music);
    this.stopBus(this.effects);
  }
  /** Music has its own envelopes and tuning; effect synthesis below stays unchanged. */
  private musicTone(midi: number, when: number, length: number, instrument: MusicInstrument, volume: number) {
    const ctx = this.context, bus = this.music;
    if (!ctx || !bus) return;
    if (!this.musicTrack) {
      this.musicTrack = ctx.createGain();
      this.musicTrack.gain.setValueAtTime(0, ctx.currentTime);
      this.musicTrack.gain.linearRampToValueAtTime(1, ctx.currentTime + .5);
      this.musicTrack.connect(bus);
    }
    const track = this.musicTrack;
    const partials: Record<MusicInstrument, number[]> = {
      flute: [1, 2, 3], tranh: [1, 2, 3, 4, 5], bau: [1, 2, 3], trung: [1, 2.76, 5.4],
    };
    const weights: Record<MusicInstrument, number[]> = {
      flute: [1, .09, .025], tranh: [1, .24, .10, .035, .012], bau: [1, .12, .025], trung: [1, .14, .035],
    };
    partials[instrument].forEach((ratio, i) => {
      const osc = ctx.createOscillator(), amp = ctx.createGain();
      const frequency = hz(midi) * ratio;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency * (instrument === 'bau' ? .995 : 1), when);
      if (instrument === 'bau') {
        osc.frequency.exponentialRampToValueAtTime(frequency, when + .12);
        for (let t = .3; t < length - .1; t += .14) {
          osc.frequency.linearRampToValueAtTime(frequency * (Math.round(t / .14) % 2 ? 1.002 : .998), when + t);
        }
      }
      const plucked = instrument === 'tranh' || instrument === 'trung';
      const attack = plucked ? .008 : instrument === 'flute' ? .035 : .06;
      const peak = volume * weights[instrument][i];
      amp.gain.setValueAtTime(0, when);
      amp.gain.linearRampToValueAtTime(peak, when + attack);
      if (plucked) amp.gain.exponentialRampToValueAtTime(Math.max(.0002, peak * .18), when + length * .4);
      else amp.gain.linearRampToValueAtTime(peak * .75, when + length * .45);
      amp.gain.exponentialRampToValueAtTime(.0001, when + length);
      osc.connect(amp); amp.connect(track);
      this.nodes.set(osc, { amp, bus, track });
      osc.onended = () => {
        this.nodes.delete(osc); osc.disconnect(); amp.disconnect();
        if (track !== this.musicTrack && ![...this.nodes.values()].some(voice => voice.track === track)) track.disconnect();
      };
      osc.start(when); osc.stop(when + length + .03);
    });
  }
  private tone(midi:number,when:number,length:number,timbre:Timbre,volume:number,bus:GainNode) {
    const ctx=this.context;if(!ctx)return;
    const harmonics = timbre==='trung'?[1,2.76,5.4]:timbre==='tranh'?[1,2,3,5]:timbre==='flute'?[1,2,3]:[1,2];
    const weights = timbre==='trung'?[1,.18,.06]:timbre==='tranh'?[1,.3,.12,.04]:timbre==='flute'?[1,.06,.02]:[1,.07];
    harmonics.forEach((ratio,i)=>{
      const osc=ctx.createOscillator(),amp=ctx.createGain();
      osc.type='sine';osc.frequency.setValueAtTime(hz(midi)*ratio*(timbre==='bau'?.97:1),when);
      if(timbre==='bau')osc.frequency.exponentialRampToValueAtTime(hz(midi)*ratio,when+.18);
      const attack=timbre==='flute'?.12:timbre==='bau'?.08:.008;
      amp.gain.setValueAtTime(0,when);amp.gain.linearRampToValueAtTime(volume*weights[i],when+attack);
      amp.gain.exponentialRampToValueAtTime(.0001,when+length);
      osc.connect(amp);amp.connect(bus);this.nodes.set(osc,{amp,bus});
      osc.onended=()=>{this.nodes.delete(osc);osc.disconnect();amp.disconnect();};
      osc.start(when);osc.stop(when+length+.03);
    });
  }
  private schedule() {
    const ctx=this.context;
    if (this.scene.endingMusic && !this.scene.endingSuspended && !this.endingFailed) return;
    if(!ctx||ctx.state!=='running'||!this.music||!this.active||!this.scene.musicEnabled||this.scene.paused)return;
    if(this.next<ctx.currentTime-.2)this.next=ctx.currentTime+.05;
    const score = musicScores[this.scene.mood];
    while (this.next < ctx.currentTime + .24) {
      for (const note of score.steps[this.step % score.steps.length]) {
        this.musicTone(note.midi, this.next, note.duration * score.beat, note.instrument, note.volume);
      }
      this.next += score.beat / 2; this.step++;
    }
  }
  cue(cue:SoundCue,variation=0) {
    const ctx=this.context;
    if(!ctx||ctx.state!=='running'||!this.effects||!this.active||!this.scene.effectsEnabled||this.scene.paused||this.scene.effectsPaused)return;
    if(cue==='touch' && ctx.currentTime-this.lastCue<.1)return;
    if(ctx.currentTime-(this.lastEffect.get(cue) ?? -Infinity)<.12)return;
    this.lastEffect.set(cue,ctx.currentTime);this.lastCue=ctx.currentTime;
    const notes=cue==='lamp'?cueNotes.lamp.slice(0,Math.min(5,3+variation)):cueNotes[cue];
    notes.forEach((note,i)=>this.tone(note,ctx.currentTime+.012+i*.14,cue==='hint'?.8:cue==='touch'?.16:.65,cue==='dig'?'trung':cue==='hint'?'bau':'tranh',cue==='touch'?.09:cue==='retry'?.12:.23,this.effects!));
  }
  dispose() {
    this.ending?.pause(); this.ending?.removeAttribute("src"); this.ending = null; this.endingFailed = false;
    this.lastCue = -Infinity; this.lastEffect.clear();
    if(this.timer)clearInterval(this.timer);this.timer=null;
    const ctx=this.context;this.stopVoices();this.musicTrack?.disconnect();this.musicTrack=null;this.nodes.clear();this.context=null;
    this.master=null;this.music=null;this.effects=null;this.onUnavailable=undefined;
    if(ctx)void ctx.close().catch(()=>{});
  }
}
export const gameAudio = new GameAudio();
