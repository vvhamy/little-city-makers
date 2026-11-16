// Shared interface pieces: icons, audio, modal, top bar, progress bar.
import React, { useEffect, useState } from 'react';
import { LANGS } from '../data/i18n.js';
import { VOICE, englishVoices, pickVoice } from '../audio/voice.js';
import { readPrefs, writePrefs } from '../audio/prefs.js';
import { duckMusic, musicEnabled, musicSupported, setMusic, subscribeMusic } from '../audio/music.js';

const PATHS = {
  back: 'M15 5l-7 7 7 7',
  close: 'M6 6l12 12M18 6L6 18',
  speaker: 'M4 10v4h4l5 4V6L8 10H4zM16.5 9a4.5 4.5 0 010 6',
  lock: 'M6 11h12v9H6zM9 11V8a3 3 0 016 0v3',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  star: 'M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.8z',
  hammer: 'M13 4l7 7-2.5 2.5-2.2-2.2L7 19.6 4.4 17l8.3-8.3-2.2-2.2z',
  flag: 'M6 21V4M6 5h11l-2.5 4 2.5 4H6',
  trophy: 'M8 4h8v5a4 4 0 01-8 0V4zM8 6H5a3 3 0 003 4M16 6h3a3 3 0 01-3 4M12 13v4M8.5 20h7',
  people: 'M9 11a3 3 0 100-6 3 3 0 000 6zM3.5 19a5.5 5.5 0 0111 0M16 11a2.5 2.5 0 100-5M17 14.3a5 5 0 013.5 4.7',
  city: 'M4 20V10l5-4 5 4v10M14 20V8h6v12M3 20h18M8 20v-5h2v5',
  move: 'M12 3v18M3 12h18M9 6l3-3 3 3M9 18l3 3 3-3M6 9l-3 3 3 3M18 9l3 3-3 3',
  brush: 'M5 19c2.5 0 4-1 4-3l9-9-3-3-9 9c-2 0-1 3-1 6z',
  play: 'M8 5l11 7-11 7z',
  mic: 'M12 4a3 3 0 00-3 3v5a3 3 0 006 0V7a3 3 0 00-3-3zM6 11a6 6 0 0012 0M12 17v3',
  next: 'M9 5l7 7-7 7',
  plus: 'M12 5v14M5 12h14',
  music: 'M9 18V6l10-2v12M9 18a3 3 0 11-6 0 3 3 0 016 0zM19 16a3 3 0 11-6 0 3 3 0 016 0z',
  musicoff: 'M9 18V6l10-2v12M9 18a3 3 0 11-6 0 3 3 0 016 0zM19 16a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18',
  trash: 'M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13M10 11v6M14 11v6',
};

export function Icon({ name, size = 22 }) {
  return (
    <svg className="icon" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}

// Audio uses the device's built-in speech voice. If the browser has none, Listen buttons are not shown.
export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance === 'function';

// Voices load late in some browsers, so the choice is made on first use and again when the list changes.
let voice = null;
const choose = () => { try { voice = pickVoice(window.speechSynthesis.getVoices(), readPrefs().voice); } catch { voice = null; } };
if (canSpeak) {
  choose();
  try { window.speechSynthesis.addEventListener('voiceschanged', choose); } catch { /* older browsers */ }
}

export function speak(text) {
  if (!canSpeak || !text) return;
  try {
    if (!voice) choose(); // some browsers fill the voice list late
    const clean = String(text).replace(/[^\p{L}\p{N}\p{P}\s]/gu, '').replace(/_+/g, ' ');
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = 'en-US';
    if (voice) { u.voice = voice; u.lang = voice.lang; }
    u.rate = VOICE.rate;
    u.pitch = VOICE.pitch;
    u.volume = VOICE.volume;
    u.onstart = () => duckMusic(true);
    u.onend = () => duckMusic(false);
    u.onerror = () => duckMusic(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch {
    /* audio is a helper; the game works without it */
  }
}

// Grown-ups can pick which of the device's English voices reads aloud. Saved on this device only.
export function VoicePicker({ t }) {
  const [list, setList] = useState(() => (canSpeak ? englishVoices(window.speechSynthesis.getVoices()) : []));
  const [name, setName] = useState(() => readPrefs().voice || '');
  useEffect(() => {
    if (!canSpeak) return undefined;
    const sync = () => setList(englishVoices(window.speechSynthesis.getVoices()));
    sync();
    window.speechSynthesis.addEventListener('voiceschanged', sync);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', sync);
  }, []);
  if (!canSpeak || list.length === 0) return <p className="fine left">{t('voiceNone')}</p>;
  const pick = (v) => { setName(v); writePrefs({ voice: v || null }); choose(); };
  return (
    <div className="voicepick">
      <label htmlFor="voice-select" className="sr">{t('voiceTitle')}</label>
      <div className="row">
        <select id="voice-select" value={name} onChange={(e) => pick(e.target.value)}>
          <option value="">{t('voiceAuto')}</option>
          {list.map((v) => <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>)}
        </select>
        <button type="button" className="btn small" onClick={() => speak("Hello! Let's build a city together.")}><Icon name="speaker" size={18} />{t('voiceTest')}</button>
      </div>
      <p className="fine left">{t('voiceHelp')}</p>
    </div>
  );
}

// On/off button for the background music. Hidden when the browser cannot play generated audio.
export function MusicToggle({ t }) {
  const [on, setOn] = useState(musicEnabled());
  useEffect(() => subscribeMusic(setOn), []);
  if (!musicSupported) return null;
  const label = t(on ? 'musicOff' : 'musicOn');
  return (
    <button type="button" className="round music-toggle" onClick={() => setMusic(!on)} aria-label={label} aria-pressed={on} title={label}>
      <Icon name={on ? 'music' : 'musicoff'} />
    </button>
  );
}

export function Listen({ text, label, big }) {
  if (!canSpeak) return null;
  return (
    <button type="button" className={big ? 'listen big' : 'listen'} onClick={() => speak(text)} aria-label={`${label}: ${text}`}>
      <Icon name="speaker" size={big ? 28 : 20} />
      {big && <span>{label}</span>}
    </button>
  );
}

export function Modal({ title, onClose, closeLabel, children, wide }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="veil" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={wide ? 'modal wide' : 'modal'} role="dialog" aria-modal="true" aria-label={title}>
        <header className="modal-head">
          <h2>{title}</h2>
          <button type="button" className="round" onClick={onClose} aria-label={closeLabel}><Icon name="close" /></button>
        </header>
        {children}
      </div>
    </div>
  );
}

export function TopBar({ title, onBack, backLabel, children }) {
  return (
    <header className="topbar">
      {onBack && (
        <button type="button" className="btn small" onClick={onBack}><Icon name="back" size={18} />{backLabel}</button>
      )}
      <h1>{title}</h1>
      <div className="topbar-right">{children}</div>
    </header>
  );
}

export function Meter({ value, max, label }) {
  const pct = max ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div className="meter" role="progressbar" aria-valuemin="0" aria-valuemax={max} aria-valuenow={value} aria-label={label}>
      <i style={{ width: `${pct}%` }} />
    </div>
  );
}

export function LangSelect({ lang, onChange, label }) {
  return (
    <label className="langsel">
      <span className="sr">{label}</span>
      <select id="lang-select" value={lang} onChange={(e) => onChange(e.target.value)}>
        {LANGS.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
      </select>
    </label>
  );
}

export const shuffle = (list) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// A light gate so small children do not wander into grown-up actions. It is not a security feature.
export function ParentGate({ t, onClose, onPass }) {
  const [q] = useState(() => ({ a: 3 + Math.floor(Math.random() * 6), b: 3 + Math.floor(Math.random() * 6) }));
  const [val, setVal] = useState('');
  const [wrong, setWrong] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (Number(val) === q.a * q.b) onPass(); else setWrong(true);
  };
  return (
    <Modal title={t('grownups')} onClose={onClose} closeLabel={t('close')}>
      <form className="gate" onSubmit={submit}>
        <label htmlFor="gate-answer">{t('gateQ', q)}</label>
        <div className="row">
          <input id="gate-answer" type="text" inputMode="numeric" autoComplete="off" autoFocus value={val} onChange={(e) => { setVal(e.target.value); setWrong(false); }} />
          <button type="submit" className="btn primary">{t('open')}</button>
        </div>
        {wrong && <p className="gentle" role="alert">{t('gateWrong')}</p>}
      </form>
    </Modal>
  );
}
