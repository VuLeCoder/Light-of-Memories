/** Original pentatonic music. Synthesized timbres evoke bamboo flute, plucked
 * strings, monochord and bamboo percussion; no third-party recording is used. */
export type MusicMood = 'explore' | 'rabbit' | 'reunion';
export type SoundCue = 'touch' | 'success' | 'lamp' | 'rabbit' | 'gift' | 'hint' | 'retry' | 'dig';
export interface AudioScene { enabled: boolean; paused: boolean; mood: MusicMood; duck: boolean; stars: number }
type Timbre = 'flute' | 'tranh' | 'bau' | 'trung';
const melodies: Record<MusicMood, (number | null)[]> = {
  explore: [74,null,76,79,81,null,79,76,74,null,69,72,74,null,null,null],
  rabbit: [74,79,81,null,79,76,74,null,76,79,86,81,79,null,76,null],
  reunion: [74,null,76,79,81,null,86,null,84,81,79,76,74,null,null,null],
};
const hz = (midi: number) => 440 * 2 ** ((midi - 69) / 12);
const cueNotes: Record<SoundCue, number[]> = {
  touch:[81], success:[74,79,81], lamp:[74,76,79,81,86], rabbit:[86,81,86], gift:[76,79,86], hint:[69,74], retry:[72], dig:[50,55],
};
export class GameAudio {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private music: GainNode | null = null;
  private effects: GainNode | null = null;
  private nodes = new Map<AudioScheduledSourceNode, GainNode>();
  private timer: ReturnType<typeof setInterval> | null = null;
  private narration = false;
  private step = 0;
  private next = 0;
  private lastCue = -Infinity;
  private lastEffect = new Map<SoundCue, number>();
  private scene: AudioScene = { enabled:false, paused:true, mood:'explore', duck:false, stars:0 };
  onUnavailable?: () => void;
  async unlock() {
    try {
      if (!this.context) {
        const Constructor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Constructor) { this.onUnavailable?.(); return; }
        this.context = new Constructor();
        const ctx=this.context;
        this.master=ctx.createGain();this.music=ctx.createGain();this.effects=ctx.createGain();
        const limiter=ctx.createDynamicsCompressor();
        limiter.threshold.value=-18;limiter.knee.value=12;limiter.ratio.value=6;
        this.master.gain.value=0;this.music.gain.value=.25;this.effects.gain.value=.35;
        this.music.connect(this.master);this.effects.connect(this.master);this.master.connect(limiter);limiter.connect(ctx.destination);
        this.next=ctx.currentTime+.08;
        this.timer=setInterval(()=>this.schedule(),100);
      }
      if(this.context.state==='suspended') await this.context.resume();
      this.applyGain();this.schedule();
    } catch { this.onUnavailable?.(); }
  }
  update(next:AudioScene) {
    const silence=!next.enabled||next.paused;
    const changed=this.scene.mood!==next.mood;
    const wasSilent=!this.scene.enabled||this.scene.paused;
    this.scene=next;
    if(silence||changed) this.stopVoices();
    if(changed)this.step=0;
    if(this.context&&(changed||wasSilent))this.next=this.context.currentTime+.08;
    this.applyGain();
  }
  setNarration(active: boolean) { this.narration=active; this.applyGain(); }
  private applyGain() {
    if(!this.context||!this.master||!this.music)return;
    const now=this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setTargetAtTime(this.scene.enabled && !this.scene.paused ? .42 : 0,now,.06);
    this.music.gain.setTargetAtTime((this.scene.duck || this.narration) ? .10 : .25,now,.2);
  }
  private stopVoices() {
    if(!this.context)return;
    for(const [node, amp] of this.nodes) {
      try { const now=this.context.currentTime; amp.gain.cancelAndHoldAtTime(now);amp.gain.setTargetAtTime(.0001,now,.02);node.stop(now+.12); } catch { try {node.stop();}catch{/* Already stopped. */} }
    }
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
      osc.connect(amp);amp.connect(bus);this.nodes.set(osc,amp);
      osc.onended=()=>{this.nodes.delete(osc);osc.disconnect();amp.disconnect();};
      osc.start(when);osc.stop(when+length+.03);
    });
  }
  private schedule() {
    const ctx=this.context;
    if(!ctx||ctx.state!=='running'||!this.music||!this.scene.enabled||this.scene.paused)return;
    if(this.next<ctx.currentTime-.2)this.next=ctx.currentTime+.05;
    const beat=this.scene.mood==='rabbit'?.46:.76;
    while(this.next<ctx.currentTime+.24) {
      const index=this.step%16,note=melodies[this.scene.mood][index];
      if(note!==null)this.tone(note,this.next,beat*1.7,this.scene.mood==='rabbit'?'trung':'flute',.23,this.music);
      if(index%4===0)this.tone(index<8?50:57,this.next,beat*3.6,'bau',.16,this.music);
      if(index%2===0&&this.scene.stars>0)this.tone([62,69,74,76,79][(this.step/2)%5|0],this.next+.1,beat*1.5,'tranh',.12,this.music);
      if(this.scene.mood==='reunion'&&index%4===2)this.tone(74,this.next,beat*1.8,'tranh',.12,this.music);
      this.next+=beat;this.step++;
    }
  }
  cue(cue:SoundCue,variation=0) {
    const ctx=this.context;
    if(!ctx||ctx.state!=='running'||!this.effects||!this.scene.enabled||this.scene.paused)return;
    if(cue==='touch' && ctx.currentTime-this.lastCue<.1)return;
    if(ctx.currentTime-(this.lastEffect.get(cue) ?? -Infinity)<.12)return;
    this.lastEffect.set(cue,ctx.currentTime);this.lastCue=ctx.currentTime;
    const notes=cue==='lamp'?cueNotes.lamp.slice(0,Math.min(5,3+variation)):cueNotes[cue];
    notes.forEach((note,i)=>this.tone(note,ctx.currentTime+.012+i*.14,cue==='hint'?.8:cue==='touch'?.16:.65,cue==='rabbit'||cue==='dig'?'trung':cue==='hint'?'bau':'tranh',cue==='touch'?.09:cue==='retry'?.12:.23,this.effects!));
  }
  dispose() {
    if(this.timer)clearInterval(this.timer);this.timer=null;
    const ctx=this.context;this.stopVoices();this.nodes.clear();this.context=null;
    this.master=null;this.music=null;this.effects=null;this.narration=false;this.onUnavailable=undefined;
    if(ctx)void ctx.close().catch(()=>{});
  }
}
export const gameAudio = new GameAudio();
