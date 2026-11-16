// Sound preferences for this device only: { music: boolean, voice: string|null }. Stored under one key.
const KEY = 'little-city-makers.audio';

export function readPrefs() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '{}');
    return { music: v.music !== false, voice: typeof v.voice === 'string' ? v.voice : null };
  } catch {
    return { music: true, voice: null };
  }
}

export function writePrefs(patch) {
  try { localStorage.setItem(KEY, JSON.stringify({ ...readPrefs(), ...patch })); return true; } catch { return false; }
}
