// Picks the gentlest English voice the device offers. Voice quality depends on the browser and operating
// system; production should use recorded audio by teachers or voice actors (see ROADMAP.md).

const SOFT = /(samantha|ava\b|allison|susan|karen|moira|tessa|serena|fiona|aria|jenny|sara|emma|zira|joanna|salli|ivy|kendra|kimberly|google us english|google uk english female|female)/i;
const NATURAL = /(natural|neural|premium|enhanced|online)/i;
const HARSH = /(alex\b|fred|daniel|david|mark\b|george|ralph|albert|junior|kathy|male\b|espeak|compact|bad news|good news|bells|boing|bubbles|cellos|deranged|hysterical|organ|trinoids|whisper|zarvox|superstar|wobble|jester|bahh)/i;

// Higher score = softer and friendlier. Returns null when the device has no English voice.
export function scoreVoice(v) {
  const lang = String(v.lang || '').replace('_', '-').toLowerCase();
  if (!lang.startsWith('en')) return -Infinity;
  let s = 0;
  if (lang === 'en-us') s += 3;
  else if (lang === 'en-gb' || lang === 'en-au' || lang === 'en-ca') s += 2;
  else s += 1;
  if (SOFT.test(v.name)) s += 4;
  if (NATURAL.test(v.name)) s += 3;
  if (HARSH.test(v.name)) s -= 8;
  if (v.localService === false) s += 0.5; // networked voices are often the more natural ones
  return s;
}

export function pickVoice(voices, preferred) {
  const chosen = preferred && (voices || []).find((v) => v.name === preferred && scoreVoice(v) !== -Infinity);
  if (chosen) return chosen; // a grown-up picked this voice in the Grown-ups area
  let best = null;
  let bestScore = -Infinity;
  for (const v of voices || []) {
    const s = scoreVoice(v);
    if (s > bestScore) { best = v; bestScore = s; }
  }
  return bestScore === -Infinity ? null : best;
}

// A little slower and warmer than the default, never loud.
export const VOICE = { rate: 0.8, pitch: 1.12, volume: 0.9 };

// English voices on this device, softest first (used by the voice picker).
export const englishVoices = (voices) => (voices || []).filter((v) => scoreVoice(v) !== -Infinity).sort((a, b) => scoreVoice(b) - scoreVoice(a));
