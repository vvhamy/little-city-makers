// Game state, in two layers.
//   root: { v: 2, lang, active, profiles: [{ id, nick, avatar, created, game }] }   saved in localStorage
//   game: one player's progress (plain JSON): { mode, missions, plots, practice, skills }
// Players are local profiles on one device. There are no accounts, no passwords and no server.
import { BUILDINGS, TOTAL_BUILDINGS } from '../data/buildings.js';
import { MISSIONS } from '../data/missions.js';

const KEY = 'little-city-makers.v2';
const OLD_KEY = 'little-city-makers.v1'; // single-player saves from the first prototype are migrated

export const MAX_PLAYERS = 8;
export const NICK_MAX = 14;

export const fresh = (mode = 'little') => ({
  mode,             // 'little' (4–6) | 'junior' (7–10)
  missions: {},     // missionId -> { plays }
  plots: {},        // plotId -> { b: buildingId, c?: colorIndex, d?: decoId }
  practice: {},     // buildingId -> times practised inside the building
  skills: {},       // skillKey -> activities completed
});
export const freshRoot = () => ({ v: 2, lang: 'en', active: null, profiles: [] });

export const newId = () => 'p' + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
// eslint-disable-next-line no-control-regex
export const cleanNick = (s) => String(s || '').replace(/[\u0000-\u001f]/g, '').replace(/\s+/g, ' ').trim().slice(0, NICK_MAX);

// Returns { root, ok }. ok=false means this browser refuses storage; the UI says so honestly.
export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const r = JSON.parse(raw);
      if (r && r.v === 2 && Array.isArray(r.profiles)) {
        const profiles = r.profiles.map((p) => ({ ...p, game: { ...fresh(), ...p.game } }));
        const active = profiles.some((p) => p.id === r.active) ? r.active : null;
        return { root: { ...freshRoot(), ...r, profiles, active }, ok: true };
      }
    }
    const root = freshRoot();
    const old = localStorage.getItem(OLD_KEY);
    if (old) {
      const s = JSON.parse(old);
      if (s && s.v === 1 && (s.started || Object.keys(s.missions || {}).length)) {
        const id = newId();
        root.lang = s.lang || 'en';
        root.active = id;
        root.profiles = [{
          id, nick: 'Player 1', avatar: 'mai', created: Date.now(),
          game: { ...fresh(s.mode), missions: s.missions || {}, plots: s.plots || {}, practice: s.practice || {}, skills: s.skills || {} },
        }];
      }
    }
    localStorage.setItem(KEY + '.probe', '1');
    localStorage.removeItem(KEY + '.probe');
    return { root, ok: true };
  } catch {
    return { root: freshRoot(), ok: false };
  }
}

export function save(root) {
  try {
    localStorage.setItem(KEY, JSON.stringify(root));
    return true;
  } catch {
    return false;
  }
}

const addSkills = (a, b = {}) => {
  const out = { ...a };
  for (const k in b) out[k] = (out[k] || 0) + b[k];
  return out;
};

// One player's game.
export function gameReducer(s, a) {
  switch (a.type) {
    case 'MODE':
      return { ...s, mode: a.mode };
    case 'MISSION_DONE':
      return { ...s, missions: { ...s.missions, [a.id]: { plays: (s.missions[a.id]?.plays || 0) + 1 } }, skills: addSkills(s.skills, a.skills) };
    case 'PRACTICE':
      return { ...s, practice: { ...s.practice, [a.building]: (s.practice[a.building] || 0) + 1 }, skills: addSkills(s.skills, a.skills) };
    case 'PLACE': {
      if (s.plots[a.plot] || placedMap(s)[a.building]) return s;
      return { ...s, plots: { ...s.plots, [a.plot]: { b: a.building } } };
    }
    case 'MOVE': {
      if (s.plots[a.to] || !s.plots[a.from]) return s;
      const plots = { ...s.plots, [a.to]: s.plots[a.from] };
      delete plots[a.from];
      return { ...s, plots };
    }
    case 'DECORATE':
      if (!s.plots[a.plot]) return s;
      return { ...s, plots: { ...s.plots, [a.plot]: { ...s.plots[a.plot], ...a.patch } } };
    case 'RESET': // erase this player's progress, keep the player
      return fresh(s.mode);
    default:
      return s;
  }
}

// Whole device: language, the list of players, who is active. Game actions go to the active player.
export function rootReducer(r, a) {
  switch (a.type) {
    case 'LANG':
      return { ...r, lang: a.lang };
    case 'PROFILE_ADD': {
      if (r.profiles.length >= MAX_PLAYERS) return r;
      const nick = cleanNick(a.nick) || `Maker ${r.profiles.length + 1}`;
      const p = { id: a.id, nick, avatar: a.avatar, created: a.now, game: fresh(a.mode) };
      return { ...r, active: p.id, profiles: [...r.profiles, p] };
    }
    case 'PROFILE_SELECT':
      return r.profiles.some((p) => p.id === a.id) ? { ...r, active: a.id } : r;
    case 'PROFILE_DELETE':
      return { ...r, profiles: r.profiles.filter((p) => p.id !== a.id), active: r.active === a.id ? null : r.active };
    default:
      if (!r.active) return r;
      return { ...r, profiles: r.profiles.map((p) => (p.id === r.active ? { ...p, game: gameReducer(p.game, a) } : p)) };
  }
}

// ---- selectors (take one player's game) ----
export const placedMap = (s) => Object.fromEntries(Object.entries(s.plots).map(([plot, v]) => [v.b, plot]));
export const placedCount = (s) => Object.keys(s.plots).length;
export const permitsOf = (s) => {
  const placed = placedMap(s);
  return BUILDINGS.filter((b) => s.missions[b.mission] && !placed[b.id]);
};
export const missionStatus = (s, m) => (s.missions[m.id] ? 'done' : placedCount(s) >= m.needs ? 'open' : 'locked');
export const openMissionCount = (n) => MISSIONS.filter((m) => m.needs <= n).length;
export const levelOf = (n) => (n >= TOTAL_BUILDINGS ? 4 : n >= 6 ? 3 : n >= 3 ? 2 : n >= 1 ? 1 : 0);

export function milestones(s) {
  const d = (id) => !!s.missions[id];
  const n = placedCount(s);
  return [
    { id: 'first', on: n >= 1 },
    { id: 'polite', on: d('m-bakery') },
    { id: 'reader', on: d('m-library') },
    { id: 'green', on: d('m-park') },
    { id: 'kind', on: d('m-toy') && d('m-center') },
    { id: 'helper', on: d('m-hospital') },
    { id: 'safe', on: d('m-police') },
    { id: 'culture', on: d('m-tet') && d('m-chuseok') },
    { id: 'town', on: n >= 5 },
    { id: 'cityMaker', on: n >= TOTAL_BUILDINGS },
  ];
}
