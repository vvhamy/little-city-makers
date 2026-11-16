// Game state: one plain JSON object, a reducer, local persistence and derived selectors.
import { BUILDINGS, TOTAL_BUILDINGS } from '../data/buildings.js';
import { MISSIONS } from '../data/missions.js';

const KEY = 'little-city-makers.v1';

export const fresh = () => ({
  v: 1,
  started: false,
  lang: 'en',
  mode: 'little',   // 'little' (4–6) | 'junior' (7–10)
  missions: {},     // missionId -> { plays }
  plots: {},        // plotId -> { b: buildingId, c?: colorIndex, d?: decoId }
  practice: {},     // buildingId -> times practised inside the building
  skills: {},       // skillKey -> activities completed
});

// Returns { state, ok }. ok=false means this browser refuses storage; the UI says so honestly.
export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const s = JSON.parse(raw);
      if (s && s.v === 1) return { state: { ...fresh(), ...s }, ok: true };
    }
    localStorage.setItem(KEY + '.probe', '1');
    localStorage.removeItem(KEY + '.probe');
    return { state: fresh(), ok: true };
  } catch {
    return { state: fresh(), ok: false };
  }
}

export function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
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

export function reducer(s, a) {
  switch (a.type) {
    case 'START':
      return { ...s, started: true, lang: a.lang, mode: a.mode };
    case 'LANG':
      return { ...s, lang: a.lang };
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
    case 'RESET':
      return { ...fresh(), lang: s.lang };
    default:
      return s;
  }
}

// ---- selectors ----
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
