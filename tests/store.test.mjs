// Tests for src/state/store.js. Run: npm test (uses Node's built-in test runner, no extra dependencies).
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MAX_PLAYERS, NICK_MAX, cleanNick, fresh, freshRoot, gameReducer, rootReducer,
  load, save, placedMap, placedCount, permitsOf, missionStatus, milestones, levelOf,
} from '../src/state/store.js';
import { MISSIONS } from '../src/data/missions.js';

// ---- helpers ----
const add = (r, id, nick = 'Mia', mode = 'little') => rootReducer(r, { type: 'PROFILE_ADD', id, nick, avatar: 'mai', mode, now: 1 });
const profile = (r, id) => r.profiles.find((p) => p.id === id);
const game = (r, id) => profile(r, id).game;

function stubStorage(initial = {}, { failWrites = false } = {}) {
  const data = { ...initial };
  globalThis.localStorage = {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => { if (failWrites) throw new Error('blocked'); data[k] = String(v); },
    removeItem: (k) => { delete data[k]; },
  };
  return data;
}
test.afterEach(() => { delete globalThis.localStorage; });

// ---- creating, selecting, deleting players ----
test('adding a player makes them active with a fresh game', () => {
  const r = add(freshRoot(), 'a', 'Mia', 'junior');
  assert.equal(r.profiles.length, 1);
  assert.equal(r.active, 'a');
  assert.equal(profile(r, 'a').nick, 'Mia');
  assert.deepEqual(game(r, 'a'), fresh('junior'));
});

test('selecting switches the active player; unknown ids are ignored', () => {
  let r = add(add(freshRoot(), 'a'), 'b');
  assert.equal(r.active, 'b');
  r = rootReducer(r, { type: 'PROFILE_SELECT', id: 'a' });
  assert.equal(r.active, 'a');
  assert.equal(rootReducer(r, { type: 'PROFILE_SELECT', id: 'nope' }), r);
});

test('deleting the active player clears active; deleting another keeps it', () => {
  let r = add(add(freshRoot(), 'a'), 'b'); // b active
  r = rootReducer(r, { type: 'PROFILE_DELETE', id: 'a' });
  assert.deepEqual(r.profiles.map((p) => p.id), ['b']);
  assert.equal(r.active, 'b');
  r = rootReducer(r, { type: 'PROFILE_DELETE', id: 'b' });
  assert.equal(r.profiles.length, 0);
  assert.equal(r.active, null);
});

test('game actions with no active player change nothing', () => {
  const r = freshRoot();
  assert.equal(rootReducer(r, { type: 'MODE', mode: 'junior' }), r);
});

test('language is stored at the root, not per player', () => {
  const r = rootReducer(add(freshRoot(), 'a'), { type: 'LANG', lang: 'vi' });
  assert.equal(r.lang, 'vi');
});

// ---- the 8-player limit ----
test('the player limit is 8 and a 9th player is refused', () => {
  assert.equal(MAX_PLAYERS, 8);
  let r = freshRoot();
  for (let i = 0; i < MAX_PLAYERS; i++) r = add(r, 'p' + i, 'P' + i);
  assert.equal(r.profiles.length, 8);
  const again = add(r, 'extra', 'Nine');
  assert.equal(again, r);
  assert.equal(again.profiles.length, 8);
  assert.equal(again.active, 'p7');
});

test('a slot frees up after deleting a player', () => {
  let r = freshRoot();
  for (let i = 0; i < MAX_PLAYERS; i++) r = add(r, 'p' + i, 'P' + i);
  r = rootReducer(r, { type: 'PROFILE_DELETE', id: 'p0' });
  r = add(r, 'new', 'New');
  assert.equal(r.profiles.length, 8);
  assert.equal(r.active, 'new');
});

// ---- nickname cleaning ----
test('cleanNick trims, collapses spaces, strips control characters and caps at 14', () => {
  assert.equal(NICK_MAX, 14);
  assert.equal(cleanNick('  Mia   Lou  '), 'Mia Lou');
  assert.equal(cleanNick('A\u0000B\u001fC\nD'), 'ABCD');
  assert.equal(cleanNick('abcdefghijklmnopqrstuvwxyz'), 'abcdefghijklmn');
  assert.equal(cleanNick('abcdefghijklmnopqrstuvwxyz').length, 14);
  assert.equal(cleanNick(null), '');
  assert.equal(cleanNick(undefined), '');
  assert.equal(cleanNick(42), '42');
});

test('a blank nickname becomes "Maker N"; a long one is cut when added', () => {
  let r = add(freshRoot(), 'a', '   ');
  assert.equal(profile(r, 'a').nick, 'Maker 1');
  r = add(r, 'b', '\u0000\u0001');
  assert.equal(profile(r, 'b').nick, 'Maker 2');
  r = add(r, 'c', 'A very long nickname indeed');
  assert.equal(profile(r, 'c').nick.length, NICK_MAX);
});

// ---- placing and moving buildings ----
test('PLACE puts a building on a plot', () => {
  const g = gameReducer(fresh(), { type: 'PLACE', plot: 'p4', building: 'home' });
  assert.deepEqual(g.plots, { p4: { b: 'home' } });
  assert.equal(placedCount(g), 1);
  assert.equal(placedMap(g).home, 'p4');
});

test('PLACE refuses an occupied plot and a building already placed', () => {
  const g = gameReducer(fresh(), { type: 'PLACE', plot: 'p4', building: 'home' });
  assert.equal(gameReducer(g, { type: 'PLACE', plot: 'p4', building: 'bakery' }), g);
  assert.equal(gameReducer(g, { type: 'PLACE', plot: 'p5', building: 'home' }), g);
});

test('MOVE relocates a building and keeps its decoration', () => {
  let g = gameReducer(fresh(), { type: 'PLACE', plot: 'p4', building: 'home' });
  g = gameReducer(g, { type: 'DECORATE', plot: 'p4', patch: { d: 'flowers', c: 2 } });
  g = gameReducer(g, { type: 'MOVE', from: 'p4', to: 'p9' });
  assert.equal(g.plots.p4, undefined);
  assert.deepEqual(g.plots.p9, { b: 'home', d: 'flowers', c: 2 });
});

test('MOVE is ignored for an empty source or an occupied target', () => {
  let g = gameReducer(fresh(), { type: 'PLACE', plot: 'p4', building: 'home' });
  g = gameReducer(g, { type: 'PLACE', plot: 'p5', building: 'bakery' });
  assert.equal(gameReducer(g, { type: 'MOVE', from: 'p4', to: 'p5' }), g);
  assert.equal(gameReducer(g, { type: 'MOVE', from: 'p0', to: 'p1' }), g);
});

test('DECORATE on an empty plot does nothing', () => {
  const g = fresh();
  assert.equal(gameReducer(g, { type: 'DECORATE', plot: 'p0', patch: { d: 'flag' } }), g);
});

test('the café can be built once its mission is done', () => {
  let g = gameReducer(fresh(), { type: 'MISSION_DONE', id: 'm-cafe', skills: { polite: 1 } });
  assert.deepEqual(permitsOf(g).map((b) => b.id), ['cafe']);
  g = gameReducer(g, { type: 'PLACE', plot: 'p1', building: 'cafe' });
  assert.deepEqual(permitsOf(g), []);
});

// ---- mission completion ----
test('MISSION_DONE counts plays and adds skills', () => {
  let g = gameReducer(fresh(), { type: 'MISSION_DONE', id: 'm-home', skills: { belonging: 1 } });
  assert.deepEqual(g.missions['m-home'], { plays: 1 });
  g = gameReducer(g, { type: 'MISSION_DONE', id: 'm-home', skills: { belonging: 1 } });
  assert.equal(g.missions['m-home'].plays, 2);
  assert.equal(g.skills.belonging, 2);
});

test('PRACTICE counts per building and adds skills', () => {
  const g = gameReducer(fresh(), { type: 'PRACTICE', building: 'bakery', skills: { polite: 1 } });
  assert.equal(g.practice.bakery, 1);
  assert.equal(g.skills.polite, 1);
});

test('mission status is locked, open, then done', () => {
  const bakery = MISSIONS.find((m) => m.id === 'm-bakery'); // needs 1 building
  let g = fresh();
  assert.equal(missionStatus(g, bakery), 'locked');
  g = gameReducer(g, { type: 'PLACE', plot: 'p4', building: 'home' });
  assert.equal(missionStatus(g, bakery), 'open');
  g = gameReducer(g, { type: 'MISSION_DONE', id: 'm-bakery', skills: {} });
  assert.equal(missionStatus(g, bakery), 'done');
});

test('milestones and level follow progress', () => {
  let g = gameReducer(fresh(), { type: 'PLACE', plot: 'p4', building: 'home' });
  g = gameReducer(g, { type: 'MISSION_DONE', id: 'm-bakery', skills: {} });
  const on = Object.fromEntries(milestones(g).map((m) => [m.id, m.on]));
  assert.equal(on.first, true);
  assert.equal(on.polite, true);
  assert.equal(on.safe, false);
  assert.equal(levelOf(0), 0);
  assert.equal(levelOf(1), 1);
  assert.equal(levelOf(3), 2);
  assert.equal(levelOf(6), 3);
});

test('mission progress goes to the active player only', () => {
  let r = add(add(freshRoot(), 'a'), 'b');
  r = rootReducer(r, { type: 'MISSION_DONE', id: 'm-home', skills: {} }); // b is active
  assert.ok(game(r, 'b').missions['m-home']);
  assert.deepEqual(game(r, 'a').missions, {});
});

// ---- resetting one player ----
test('RESET erases one player and leaves the others untouched', () => {
  let r = add(add(freshRoot(), 'a', 'Ann', 'little'), 'b', 'Ben', 'junior');
  r = rootReducer(r, { type: 'PLACE', plot: 'p4', building: 'home' });
  r = rootReducer(r, { type: 'MISSION_DONE', id: 'm-home', skills: { belonging: 1 } });
  r = rootReducer(r, { type: 'PROFILE_SELECT', id: 'a' });
  r = rootReducer(r, { type: 'PLACE', plot: 'p1', building: 'bakery' });
  const benBefore = game(r, 'b');
  r = rootReducer(r, { type: 'RESET' }); // a is active
  assert.deepEqual(game(r, 'a'), fresh('little'));
  assert.equal(profile(r, 'a').nick, 'Ann');
  assert.equal(game(r, 'b'), benBefore);
  assert.equal(r.profiles.length, 2);
  assert.equal(r.active, 'a');
});

test('RESET keeps the player’s mode', () => {
  const g = gameReducer({ ...fresh('junior'), plots: { p1: { b: 'home' } } }, { type: 'RESET' });
  assert.equal(g.mode, 'junior');
  assert.deepEqual(g.plots, {});
});

// ---- save, load and migration ----
test('save then load round-trips the state', () => {
  const data = stubStorage();
  const r = rootReducer(add(freshRoot(), 'a', 'Ann'), { type: 'PLACE', plot: 'p4', building: 'home' });
  assert.equal(save(r), true);
  assert.ok(data['little-city-makers.v2']);
  const out = load();
  assert.equal(out.ok, true);
  assert.equal(out.root.active, 'a');
  assert.deepEqual(out.root.profiles[0].game.plots, { p4: { b: 'home' } });
});

test('load with nothing saved gives an empty root', () => {
  stubStorage();
  const { root, ok } = load();
  assert.equal(ok, true);
  assert.deepEqual(root, freshRoot());
});

test('load drops an active id that no longer exists', () => {
  stubStorage({ 'little-city-makers.v2': JSON.stringify({ v: 2, lang: 'ko', active: 'ghost', profiles: [{ id: 'a', nick: 'A', avatar: 'mai', game: {} }] }) });
  const { root } = load();
  assert.equal(root.active, null);
  assert.equal(root.lang, 'ko');
  assert.deepEqual(root.profiles[0].game, fresh()); // missing fields are filled in
});

test('migrates a v1 single-player save into one profile', () => {
  stubStorage({
    'little-city-makers.v1': JSON.stringify({
      v: 1, lang: 'vi', mode: 'junior', started: true,
      missions: { 'm-home': { plays: 2 } }, plots: { p4: { b: 'home' } }, practice: { home: 1 }, skills: { belonging: 2 },
    }),
  });
  const { root, ok } = load();
  assert.equal(ok, true);
  assert.equal(root.v, 2);
  assert.equal(root.lang, 'vi');
  assert.equal(root.profiles.length, 1);
  const p = root.profiles[0];
  assert.equal(root.active, p.id);
  assert.equal(p.nick, 'Player 1');
  assert.equal(p.game.mode, 'junior');
  assert.deepEqual(p.game.missions, { 'm-home': { plays: 2 } });
  assert.deepEqual(p.game.plots, { p4: { b: 'home' } });
  assert.deepEqual(p.game.practice, { home: 1 });
  assert.deepEqual(p.game.skills, { belonging: 2 });
});

test('an empty v1 save is not migrated', () => {
  stubStorage({ 'little-city-makers.v1': JSON.stringify({ v: 1, lang: 'en', mode: 'little', started: false, missions: {} }) });
  assert.deepEqual(load().root.profiles, []);
});

test('a v2 save wins over an old v1 save', () => {
  stubStorage({
    'little-city-makers.v1': JSON.stringify({ v: 1, started: true, missions: { 'm-home': { plays: 1 } } }),
    'little-city-makers.v2': JSON.stringify({ v: 2, lang: 'en', active: null, profiles: [] }),
  });
  assert.deepEqual(load().root.profiles, []);
});

test('corrupt storage does not crash and is reported as not ok', () => {
  stubStorage({ 'little-city-makers.v2': '{not json' });
  const { root, ok } = load();
  assert.equal(ok, false);
  assert.deepEqual(root, freshRoot());
});

test('save reports failure when storage refuses writes', () => {
  stubStorage({}, { failWrites: true });
  assert.equal(save(freshRoot()), false);
  assert.equal(load().ok, false);
});
