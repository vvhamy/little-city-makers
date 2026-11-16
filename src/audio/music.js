// Quiet background music, generated live with the Web Audio API: no audio files, no network, no services.
// A slow, soft loop (music-box bells over a warm pad) in C major. It is deliberately quiet, ducks while the
// voice is speaking, pauses when the tab is hidden, and never starts before the child's first tap
// (browsers do not allow sound before that). The on/off choice is remembered on this device only.

const KEY = 'little-city-makers.audio';
const LEVEL = 0.07;    // master loudness (0–1). Kept low so it never competes with the voice.
const DUCKED = 0.35;   // fraction of the level while the voice speaks
const BPM = 76;
const BEAT = 60 / BPM;

// Four bars of 4 beats. Chord tones (MIDI) for the pad, a bass note, and a pentatonic pool for the melody.
const BARS = [
  { bass: 48, pad: [60, 64, 67, 71], mel: [72, 74, 76, 79, 81] },  // Cmaj7
  { bass: 45, pad: [57, 60, 64, 67], mel: [69, 72, 74, 76, 79] },  // Am7
  { bass: 41, pad: [57, 60, 64, 65], mel: [72, 74, 76, 77, 81] },  // Fmaj7
  { bass: 43, pad: [59, 62, 65, 67], mel: [71, 74, 76, 79, 81] },  // G6/9
];

const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);

const AC = typeof window !== 'undefined' ? window.AudioContext || window.webkitAudioContext : null;
export const musicSupported = !!AC;

let enabled = readPref();
let ctx = null;
let master = null;
let timer = null;
let nextBarTime = 0;
let bar = 0;
let lastMel = 2;
let ducked = false;
const listeners = new Set();

function readPref() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '{}');
    return v.music !== false; // on unless a grown-up turned it off
  } catch {
    return true;
  }
}
function writePref() {
  try { localStorage.setItem(KEY, JSON.stringify({ music: enabled })); } catch { /* the choice just is not remembered */ }
}
const emit = () => listeners.forEach((f) => f(enabled));

export const musicEnabled = () => enabled;
export function subscribeMusic(f) { listeners.add(f); return () => listeners.delete(f); }

function target() { return enabled ? LEVEL * (ducked ? DUCKED : 1) : 0; }
function ramp(seconds) {
  if (!ctx || !master) return;
  const t = ctx.currentTime;
  master.gain.cancelScheduledValues(t);
  master.gain.setValueAtTime(master.gain.value, t);
  master.gain.linearRampToValueAtTime(target(), t + seconds);
}

// A soft note: sine with a quiet octave partial, quick attack, long gentle release.
function note(when, midi, len, vol, type = 'sine', partial = 0) {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, when);
  g.gain.exponentialRampToValueAtTime(vol, when + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, when + len);
  g.connect(master);
  const o = ctx.createOscillator();
  o.type = type;
  o.frequency.value = hz(midi);
  o.connect(g);
  o.start(when);
  o.stop(when + len + 0.05);
  if (partial) {
    const h = ctx.createOscillator();
    const hg = ctx.createGain();
    hg.gain.value = partial;
    h.frequency.value = hz(midi + 12);
    h.connect(hg).connect(g);
    h.start(when);
    h.stop(when + len + 0.05);
  }
}

function pad(when, midi, len, vol) {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, when);
  g.gain.linearRampToValueAtTime(vol, when + len * 0.4);
  g.gain.linearRampToValueAtTime(0.0001, when + len);
  g.connect(master);
  for (const detune of [-5, 5]) {
    const o = ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.value = hz(midi);
    o.detune.value = detune;
    o.connect(g);
    o.start(when);
    o.stop(when + len + 0.05);
  }
}

function scheduleBar(when) {
  const b = BARS[bar % BARS.length];
  const len = BEAT * 4;
  b.pad.forEach((m) => pad(when, m, len * 1.1, 0.16));
  note(when, b.bass, BEAT * 3, 0.5);
  // Sparse melody: gentle steps along the pentatonic pool, some beats left empty so it breathes.
  for (let k = 0; k < 8; k++) {
    if (Math.random() < 0.45) continue;
    lastMel = Math.max(0, Math.min(b.mel.length - 1, lastMel + Math.floor(Math.random() * 3) - 1));
    note(when + k * BEAT * 0.5, b.mel[lastMel], BEAT * 1.6, 0.34, 'sine', 0.12);
  }
  bar++;
}

function tick() {
  if (!ctx || ctx.state !== 'running') return;
  while (nextBarTime < ctx.currentTime + 1.2) {
    scheduleBar(nextBarTime);
    nextBarTime += BEAT * 4;
  }
}

function ensure() {
  if (ctx || !AC) return !!ctx;
  try {
    ctx = new AC();
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 2400;
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(filter).connect(ctx.destination);
    nextBarTime = ctx.currentTime + 0.2;
    timer = setInterval(tick, 300);
    document.addEventListener('visibilitychange', () => {
      if (!ctx) return;
      if (document.hidden) ctx.suspend();
      else if (enabled) ctx.resume();
    });
    return true;
  } catch {
    ctx = null;
    return false;
  }
}

// Call from a tap or key press. Safe to call many times.
export function unlockMusic() {
  if (!enabled || !musicSupported || !ensure()) return;
  const go = () => { nextBarTime = Math.max(nextBarTime, ctx.currentTime + 0.2); ramp(3); };
  if (ctx.state === 'suspended') ctx.resume().then(go).catch(() => {}); else go();
}

export function setMusic(on) {
  enabled = !!on;
  writePref();
  if (enabled) unlockMusic(); else ramp(0.6);
  emit();
}

// The voice is speaking: lower the music so the words are clear.
export function duckMusic(on) {
  ducked = !!on;
  ramp(0.25);
}

// Exposed for tests and for stopping cleanly.
export function _resetForTests() {
  if (timer) clearInterval(timer);
  timer = null; ctx = null; master = null; ducked = false; enabled = readPref(); listeners.clear();
}
