// Tests for the voice chooser and the music on/off preference.
import test from 'node:test';
import assert from 'node:assert/strict';
import { pickVoice, scoreVoice, VOICE } from '../src/audio/voice.js';

const v = (name, lang = 'en-US', localService = true) => ({ name, lang, localService });

test('picks a soft English voice over a harsh one', () => {
  const best = pickVoice([v('Alex'), v('Samantha'), v('Fred'), v('Daniel', 'en-GB')]);
  assert.equal(best.name, 'Samantha');
});

test('prefers natural or neural voices', () => {
  const best = pickVoice([v('Microsoft Zira Desktop'), v('Microsoft Aria Online (Natural)')]);
  assert.equal(best.name, 'Microsoft Aria Online (Natural)');
});

test('ignores non-English voices and returns null when there is no English voice', () => {
  assert.equal(pickVoice([v('Thomas', 'fr-FR'), v('Yuna', 'ko-KR')]), null);
  assert.equal(pickVoice([]), null);
  assert.equal(pickVoice(undefined), null);
  assert.equal(scoreVoice(v('Mei-Jia', 'zh-TW')), -Infinity);
});

test('still returns an ordinary English voice when no soft one exists', () => {
  assert.equal(pickVoice([v('Voice 1', 'en-AU')]).name, 'Voice 1');
});

test('novelty voices are avoided', () => {
  assert.equal(pickVoice([v('Zarvox'), v('Bad News'), v('Google US English')]).name, 'Google US English');
});

test('speech settings are gentle', () => {
  assert.ok(VOICE.rate < 0.9);
  assert.ok(VOICE.pitch > 1 && VOICE.pitch <= 1.3);
  assert.ok(VOICE.volume <= 1);
});

function stub(initial = {}, fail = false) {
  const d = { ...initial };
  globalThis.localStorage = { getItem: (k) => d[k] ?? null, setItem: (k, x) => { if (fail) throw new Error('x'); d[k] = String(x); } };
  return d;
}

test('music is on by default and the choice is remembered', async () => {
  const d = stub();
  const m = await import('../src/audio/music.js?a');
  m._resetForTests();
  assert.equal(m.musicEnabled(), true);
  m.setMusic(false);
  assert.equal(m.musicEnabled(), false);
  assert.deepEqual(JSON.parse(d['little-city-makers.audio']), { music: false });
  m._resetForTests(); // reads the stored choice again
  assert.equal(m.musicEnabled(), false);
  m.setMusic(true);
  assert.deepEqual(JSON.parse(d['little-city-makers.audio']), { music: true });
});

test('music subscribers hear changes and storage failures do not crash', async () => {
  stub({}, true);
  const m = await import('../src/audio/music.js?a');
  m._resetForTests();
  const seen = [];
  m.subscribeMusic((on) => seen.push(on));
  m.setMusic(false);
  m.setMusic(true);
  assert.deepEqual(seen, [false, true]);
  delete globalThis.localStorage;
});

test('without Web Audio the music is reported as unsupported and unlocking does nothing', async () => {
  const m = await import('../src/audio/music.js?a');
  assert.equal(m.musicSupported, false); // Node has no AudioContext
  assert.doesNotThrow(() => m.unlockMusic());
  assert.doesNotThrow(() => m.duckMusic(true));
});
