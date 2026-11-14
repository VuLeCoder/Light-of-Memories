export interface AudioSettings { music: boolean; effects: boolean }

export function readAudioSettings(): AudioSettings {
  try {
    const legacy = localStorage.getItem('cuoi.sound') !== 'off';
    const read = (key: string) => {
      const value = localStorage.getItem(key);
      return value === 'on' ? true : value === 'off' ? false : legacy;
    };
    return { music: read('cuoi.music'), effects: read('cuoi.effects') };
  } catch { return { music: true, effects: true }; }
}

export function saveAudioSetting(kind: keyof AudioSettings, enabled: boolean): boolean {
  try { localStorage.setItem(`cuoi.${kind}`, enabled ? 'on' : 'off'); return true; }
  catch { return false; }
}
