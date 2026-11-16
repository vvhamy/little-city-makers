// Screen 4 (Learning Activity) and the practice activity inside each building (Screen 6).
// Flow: intro -> steps -> reward. Completion = every step solved.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Icon, Listen, canSpeak, shuffle, speak } from '../components/ui.jsx';
import { Kid } from '../art/Characters.jsx';
import { BuildingThumb } from '../art/BuildingArt.jsx';
import { PRAISE, loc, sup } from '../data/i18n.js';
import { STEPS, skillOf, spokenPrompt } from '../activities/steps.jsx';

const Sup = ({ text, lang }) => (text ? <p className="sup" lang={lang}>{text}</p> : null);

export function MissionPlayer({ mission, building, mode, lang, t, practice, wasDone, placed, practiceBefore, session, onComplete, onExit, onBuild }) {
  const init = useRef({ wasDone, placed, practiceBefore, session }).current;
  const little = mode === 'little';
  const steps = useMemo(() => {
    const all = mission.steps[mode];
    if (!practice) return all;
    const say = all.find((s) => s.t === 'say');
    const pool = shuffle(all.filter((s) => s.t !== 'learn' && s.t !== 'say')).slice(0, 3);
    return say ? [...pool, say] : pool;
  }, [mission.id, mode, practice]);

  const [phase, setPhase] = useState(practice ? 'steps' : 'intro');
  const [i, setI] = useState(0);
  const [solved, setSolved] = useState(false);
  const solvedRef = useRef(false);
  const tally = useRef({});
  const praise = useRef(PRAISE[0]);
  const step = steps[i];

  useEffect(() => {
    if (phase === 'steps' && little) speak(spokenPrompt(step));
  }, [phase, i]);

  const solve = () => {
    if (solvedRef.current) return;
    solvedRef.current = true;
    const k = skillOf(step, mode);
    tally.current[k] = (tally.current[k] || 0) + 1;
    praise.current = PRAISE[Math.floor(Math.random() * PRAISE.length)];
    setSolved(true);
  };
  const next = () => {
    if (i + 1 < steps.length) {
      solvedRef.current = false;
      setSolved(false);
      setI(i + 1);
      return;
    }
    for (const k of mission.skills) tally.current[k] = (tally.current[k] || 0) + 1;
    onComplete(tally.current);
    setPhase('reward');
  };

  const Step = phase === 'steps' ? STEPS[step.t] : null;
  const bName = loc(building.name, lang);

  return (
    <div className="screen play">
      <header className="playbar">
        <button type="button" className="round" onClick={onExit} aria-label={t('leave')}><Icon name="close" /></button>
        {phase === 'steps' ? (
          <div className="stepdots" role="img" aria-label={t('stepOf', { n: i + 1, total: steps.length })}>
            {steps.map((_, k) => <i key={k} className={k < i || (k === i && solved) ? 'done' : k === i ? 'cur' : ''} />)}
          </div>
        ) : <span />}
        <span className="pill">{t(mode)}</span>
      </header>

      <main className="playmain">
        {phase === 'intro' && (
          <div className="intro">
            <div className="cast">{mission.who.map((id) => <Kid key={id} id={id} size={88} />)}</div>
            <span className={`pill p-${mission.pillar}`}>{t('p_' + mission.pillar)} · {bName}</span>
            <h2 lang="en">{mission.title.en}</h2>
            <Sup text={sup(mission.title, lang)} lang={lang} />
            <div className="prompt">
              <p className="scenario" lang="en">{mission.scenario.en}</p>
              <Listen text={mission.scenario.en} label={t('listen')} />
              <Sup text={sup(mission.scenario, lang)} lang={lang} />
            </div>
            <section>
              <h3>{t('newWords')}</h3>
              <div className="vocab">
                {mission.vocab.map((w) => {
                  const inner = (<><span className="emo" aria-hidden="true">{w.e}</span><b lang="en">{w.w}</b><Sup text={sup(w, lang)} lang={lang} /></>);
                  return canSpeak
                    ? <button type="button" key={w.w} className="word" onClick={() => speak(w.w)} aria-label={`${t('listen')}: ${w.w}`}>{inner}</button>
                    : <div key={w.w} className="word">{inner}</div>;
                })}
              </div>
            </section>
            <section className="targetbox">
              <h3>{t('weSay')}</h3>
              <p className="fact" lang="en">“{mission.target}”</p>
              <Listen text={mission.target} label={t('listen')} big />
              <Sup text={sup(mission.targetHelp, lang)} lang={lang} />
            </section>
            <p className="goalline"><b>{t('goal')}:</b> {loc(mission.objective, lang)}</p>
            <button type="button" className="btn primary big" onClick={() => setPhase('steps')}><Icon name="play" />{t('startMission')}</button>
          </div>
        )}

        {phase === 'steps' && (
          <>
            <p className="instr">{t('i_' + step.t)}</p>
            <Step key={i} step={step} mission={mission} lang={lang} t={t} little={little} solved={solved} onSolved={solve} />
          </>
        )}

        {phase === 'reward' && (
          <Reward {...{ mission, building, lang, t, practice, init, onExit, onBuild }} />
        )}
      </main>

      {phase === 'steps' && solved && (
        <footer className="praisebar" role="status">
          <div>
            <b lang="en">{praise.current}</b>
            {lang !== 'en' && <Sup text={t('praise')} lang={lang} />}
          </div>
          <button type="button" className="btn mint big" onClick={next} autoFocus>
            {i + 1 < steps.length ? t('next') : t('finish')}<Icon name="next" size={20} />
          </button>
        </footer>
      )}
    </div>
  );
}

function Reward({ mission, building, lang, t, practice, init, onExit, onBuild }) {
  const canBuild = !practice && !init.placed;
  const newDeco = practice ? (init.practiceBefore === 0 ? 'flag' : init.practiceBefore === 1 ? 'lights' : null) : null;
  const sessionNow = init.session + (!practice && !init.wasDone ? 1 : 0);
  const showBreak = !practice && !init.wasDone && sessionNow >= 3;
  useEffect(() => { speak(mission.feedback.en); }, []);
  return (
    <div className="reward">
      <div className="confetti" aria-hidden="true">{Array.from({ length: 14 }, (_, k) => <i key={k} style={{ '--k': k }} />)}</div>
      <h2>{practice ? t('practiced') : t('missionDone')}</h2>
      <p className="fact" lang="en">{mission.feedback.en}</p>
      <Sup text={sup(mission.feedback, lang)} lang={lang} />

      <section className="lesson">
        <h3>{t('cityLesson')}</h3>
        <p lang="en">{mission.lesson.en}</p>
        <Sup text={sup(mission.lesson, lang)} lang={lang} />
      </section>

      {canBuild && (
        <section className="permit">
          <BuildingThumb id={building.id} defaultColor={building.color} size={120} title={loc(building.name, lang)} />
          <div>
            <h3>{t('permit')}</h3>
            <p className="fact" lang="en">{building.name.en}</p>
            <Sup text={sup(building.name, lang)} lang={lang} />
          </div>
        </section>
      )}
      {newDeco && <p className="unlock"><Icon name="star" />{t('decoUnlocked', { d: t('d_' + newDeco) })}</p>}
      {showBreak && <p className="breaknote">{t('breakTime', { n: sessionNow })}</p>}

      <div className="row center">
        {canBuild && <button type="button" className="btn primary big" onClick={onBuild}><Icon name="hammer" />{t('buildNow')}</button>}
        <button type="button" className={canBuild ? 'btn' : 'btn primary big'} onClick={onExit}>{t('backCity')}</button>
      </div>
    </div>
  );
}
