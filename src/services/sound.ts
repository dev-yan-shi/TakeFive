// TakeFive sound FX service
// Sounds must be placed at assets/sounds/<name>.mp3
// Missing files are silently skipped so the app works before assets are added.

import { Audio } from 'expo-av';

type SoundKey =
  | 'tap'         // brush snare — generic navigation
  | 'log'         // bass note — entry logged
  | 'habit'       // ride cymbal ting
  | 'save'        // vinyl crackle + chord resolve
  | 'open'        // piano key press
  | 'delete'      // bass slide
  | 'error';      // soft horn

// Lazy-loaded sound cache
const cache: Partial<Record<SoundKey, Audio.Sound>> = {};

const FILES: Record<SoundKey, any> = {
  tap:    (() => { try { return require('../../assets/sounds/tap.mp3'); } catch { return null; } })(),
  log:    (() => { try { return require('../../assets/sounds/log.mp3'); } catch { return null; } })(),
  habit:  (() => { try { return require('../../assets/sounds/habit.mp3'); } catch { return null; } })(),
  save:   (() => { try { return require('../../assets/sounds/save.mp3'); } catch { return null; } })(),
  open:   (() => { try { return require('../../assets/sounds/open.mp3'); } catch { return null; } })(),
  delete: (() => { try { return require('../../assets/sounds/delete.mp3'); } catch { return null; } })(),
  error:  (() => { try { return require('../../assets/sounds/error.mp3'); } catch { return null; } })(),
};

let enabled = true;

export function setSoundEnabled(v: boolean) {
  enabled = v;
}

export async function play(key: SoundKey) {
  if (!enabled) return;
  const src = FILES[key];
  if (!src) return;

  try {
    if (!cache[key]) {
      const { sound } = await Audio.Sound.createAsync(src, { volume: 0.55 });
      cache[key] = sound;
    }
    const s = cache[key]!;
    await s.setPositionAsync(0);
    await s.playAsync();
  } catch {
    // fail silently — sound is non-critical
  }
}

export async function unloadAll() {
  for (const key of Object.keys(cache) as SoundKey[]) {
    await cache[key]?.unloadAsync();
    delete cache[key];
  }
}
