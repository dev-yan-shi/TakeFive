import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { setSoundEnabled } from '../services/sound';

const KEY = 'takefive_sound_enabled';

interface State {
  enabled: boolean;
  loadPref: () => Promise<void>;
  setEnabled: (v: boolean) => Promise<void>;
}

export const useSoundStore = create<State>((set) => ({
  enabled: true, // opt-in by default — music is our concept
  async loadPref() {
    try {
      const v = await SecureStore.getItemAsync(KEY);
      const enabled = v === null ? true : v === 'true';
      setSoundEnabled(enabled);
      set({ enabled });
    } catch {
      setSoundEnabled(true);
      set({ enabled: true });
    }
  },
  async setEnabled(v) {
    await SecureStore.setItemAsync(KEY, String(v));
    setSoundEnabled(v);
    set({ enabled: v });
  },
}));
