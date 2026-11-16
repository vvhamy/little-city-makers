// App shell: owns game state, persistence and which screen is showing.
import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { makeT } from './data/i18n.js';
import { BUILDINGS_BY_ID } from './data/buildings.js';
import { MISSIONS_BY_ID } from './data/missions.js';
import { load, placedMap, reducer, save } from './state/store.js';
import { City } from './screens/City.jsx';
import { MissionPlayer } from './screens/MissionPlayer.jsx';
import { Achievements, Missions, Parent, Welcome } from './screens/Pages.jsx';

const SCREENS = ['welcome', 'city', 'missions', 'achievements', 'parent'];

export default function App({ boot }) {
  const [init] = useState(load);
  const [state, dispatch] = useReducer(reducer, boot?.state?.v === 1 ? boot.state : init.state);
  const [saved, setSaved] = useState(init.ok);
  const [screen, setScreen] = useState(() => (SCREENS.includes(boot?.screen) ? boot.screen : state.started ? 'city' : 'welcome'));
  const [play, setPlay] = useState(null);         // { missionId, practice }
  const [buildNext, setBuildNext] = useState(null); // building to pre-select in construction mode
  const [session, setSession] = useState(0);        // new missions finished in this visit (for the break reminder)

  const t = useMemo(() => makeT(state.lang), [state.lang]);
  const live = useRef({ state, screen });
  live.current = { state, screen };

  useEffect(() => { setSaved(save(state)); }, [state]);
  useEffect(() => { document.documentElement.lang = state.lang; }, [state.lang]);
  // Keep a child's place if the page is republished while they are playing.
  useEffect(() => { window.claude?.hot?.snapshot?.(() => live.current); }, []);

  const go = (name) => { setPlay(null); if (name !== 'city') setBuildNext(null); setScreen(name); };
  const startMission = (missionId, practice = false) => { setPlay({ missionId, practice }); setScreen('activity'); };

  const common = { state, dispatch, t, lang: state.lang, go };

  if (screen === 'activity' && play) {
    const mission = MISSIONS_BY_ID[play.missionId];
    const building = BUILDINGS_BY_ID[mission.building];
    return (
      <MissionPlayer
        key={`${play.missionId}-${play.practice}-${state.mode}`}
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
  if (screen === 'missions') return <Missions {...common} onPlay={(id) => startMission(id)} />;
  if (screen === 'achievements') return <Achievements {...common} />;
  if (screen === 'parent') return <Parent {...common} saved={saved} />;
  if (screen === 'city' || screen === 'activity') {
    return <City {...common} key={buildNext || 'city'} initialBuild={buildNext} onPractice={(bId) => startMission(BUILDINGS_BY_ID[bId].mission, true)} />;
  }
  return <Welcome {...common} />;
}
