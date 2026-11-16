// App shell: owns game state, persistence and which screen is showing.
import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { makeT } from './data/i18n.js';
import { BUILDINGS_BY_ID } from './data/buildings.js';
import { MISSIONS_BY_ID } from './data/missions.js';
import { fresh, load, placedMap, rootReducer, save } from './state/store.js';
import { armMusic } from './audio/music.js';
import { City } from './screens/City.jsx';
import { MissionPlayer } from './screens/MissionPlayer.jsx';
import { Achievements, Missions, Parent, Welcome } from './screens/Pages.jsx';

const SCREENS = ['welcome', 'city', 'missions', 'achievements', 'parent'];

export default function App({ boot }) {
  const [init] = useState(load);
  const [root, dispatch] = useReducer(rootReducer, boot?.root?.v === 2 ? boot.root : init.root);
  const [saved, setSaved] = useState(init.ok);
  // With one player we go straight to their city. With several, each child picks themselves first.
  const [screen, setScreen] = useState(() => (SCREENS.includes(boot?.screen) ? boot.screen : root.profiles.length === 1 && root.active ? 'city' : 'welcome'));
  const [play, setPlay] = useState(null);           // { missionId, practice }
  const [buildNext, setBuildNext] = useState(null); // building to pre-select in construction mode
  const [session, setSession] = useState(0);        // new missions finished in this visit (for the break reminder)

  const active = root.profiles.find((p) => p.id === root.active) || null;
  // Screens read one flat object: the active player's game plus the device language.
  const state = useMemo(() => ({ ...(active ? active.game : fresh()), lang: root.lang }), [active, root.lang]);
  const player = active ? { nick: active.nick, avatar: active.avatar } : null;
  const t = useMemo(() => makeT(root.lang), [root.lang]);
  const live = useRef({ root, screen });
  live.current = { root, screen };

  useEffect(() => { setSaved(save(root)); }, [root]);
  // Browsers only allow sound after a tap, so the music starts at the child's first touch or key press.
  useEffect(() => armMusic(), []);
  useEffect(() => { document.documentElement.lang = root.lang; }, [root.lang]);
  // Keep a child's place if the page is republished while they are playing.
  useEffect(() => { window.claude?.hot?.snapshot?.(() => live.current); }, []);

  const go = (name) => {
    setPlay(null);
    if (name !== 'city') setBuildNext(null);
    if (name === 'welcome') setSession(0);
    setScreen(name);
  };
  const startMission = (missionId, practice = false) => { setPlay({ missionId, practice }); setScreen('activity'); };

  const common = { state, dispatch, t, lang: root.lang, go, player };
  const view = active ? screen : 'welcome';

  if (view === 'activity' && play) {
    const mission = MISSIONS_BY_ID[play.missionId];
    const building = BUILDINGS_BY_ID[mission.building];
    return (
      <MissionPlayer
        key={`${active.id}-${play.missionId}-${play.practice}-${state.mode}`}
        mission={mission} building={building} mode={state.mode} lang={state.lang} t={t}
        practice={play.practice}
        wasDone={!!state.missions[mission.id]}
        placed={!!placedMap(state)[building.id]}
        practiceBefore={state.practice[building.id] || 0}
        session={session}
        onComplete={(skills) => {
          if (play.practice) dispatch({ type: 'PRACTICE', building: building.id, skills });
          else {
            if (!state.missions[mission.id]) setSession((n) => n + 1);
            dispatch({ type: 'MISSION_DONE', id: mission.id, skills });
          }
        }}
        onExit={() => go(play.practice ? 'city' : state.missions[mission.id] ? 'city' : 'missions')}
        onBuild={() => { setPlay(null); setBuildNext(building.id); setScreen('city'); }}
      />
    );
  }
  if (view === 'missions') return <Missions {...common} onPlay={(id) => startMission(id)} />;
  if (view === 'achievements') return <Achievements {...common} />;
  if (view === 'parent') return <Parent {...common} saved={saved} />;
  if (view === 'city' || view === 'activity') {
    return <City {...common} key={`${active.id}-${buildNext || 'city'}`} initialBuild={buildNext} onPractice={(bId) => startMission(BUILDINGS_BY_ID[bId].mission, true)} />;
  }
  return <Welcome {...common} profiles={root.profiles} activeId={root.active} />;
}
