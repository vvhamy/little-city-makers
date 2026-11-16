// Screen 1 (Welcome), Screen 3 (Mission Center), Screen 7 (Achievements), Screen 8 (Parent Dashboard).
import React, { useState } from 'react';
import { Icon, Meter, TopBar } from '../components/ui.jsx';
import { CityMap } from '../art/CityMap.jsx';
import { BuildingThumb } from '../art/BuildingArt.jsx';
import { Pip } from '../art/Characters.jsx';
import { BUILDINGS, BUILDINGS_BY_ID, TOTAL_BUILDINGS } from '../data/buildings.js';
import { MISSIONS } from '../data/missions.js';
import { LANGS, loc, sup } from '../data/i18n.js';
import { levelOf, milestones, missionStatus, placedCount, placedMap } from '../state/store.js';

const Sup = ({ text, lang }) => (text ? <p className="sup" lang={lang}>{text}</p> : null);

const DEMO_PLOTS = {
  p0: { b: 'library' }, p2: { b: 'culture' }, p3: { b: 'plaza', d: 'flowers' }, p4: { b: 'home', d: 'flowers' }, p6: { b: 'hospital' },
  p7: { b: 'police' }, p8: { b: 'bakery', d: 'lights' }, p9: { b: 'toyshop' }, p10: { b: 'park' }, p5: { b: 'center', d: 'flag' },
};

// ---------- Screen 1 ----------
export function Welcome({ state, dispatch, t, lang, go }) {
  const [mode, setMode] = useState(state.mode);
  const begin = () => { dispatch({ type: 'START', lang, mode }); go('city'); };
  return (
    <div className="screen welcome">
      <div className="welcome-art"><CityMap plots={DEMO_PLOTS} demo title="Little City Makers" /></div>
      <main className="welcome-card">
        <h1 className="logo" aria-label="Little City Makers">
          <span className="l1" aria-hidden="true">Little</span>
          <span className="blocks" aria-hidden="true">{'CITY'.split('').map((ch, k) => <b key={k} className={`blk b${k}`}>{ch}</b>)}</span>
          <span className="l3" aria-hidden="true">Makers</span>
        </h1>
        <p className="tagline" lang="en">Learn. Build. Belong.</p>
        {lang !== 'en' && <Sup text={t('tagline')} lang={lang} />}

        <fieldset className="pick">
          <legend>{t('chooseLang')}</legend>
          <div className="seg">
            {LANGS.map((l) => (
              <button type="button" key={l.id} className={l.id === lang ? 'segbtn on' : 'segbtn'} aria-pressed={l.id === lang} onClick={() => dispatch({ type: 'LANG', lang: l.id })} lang={l.id}>{l.label}</button>
            ))}
          </div>
        </fieldset>

        <fieldset className="pick">
          <legend>{t('chooseAge')}</legend>
          <div className="ages">
            {['little', 'junior'].map((m) => (
              <button type="button" key={m} className={m === mode ? `agecard ${m} on` : `agecard ${m}`} aria-pressed={m === mode} onClick={() => setMode(m)}>
                <b>{t(m)}</b>
                <span className="agetag">{t(m + 'Age')}</span>
                <small>{t(m + 'Desc')}</small>
              </button>
            ))}
          </div>
        </fieldset>

        <button type="button" className="btn primary big wide" onClick={begin}><Icon name="hammer" />{state.started ? t('continue') : t('start')}</button>
        <p className="fine">{t('privacy')}</p>
      </main>
    </div>
  );
}

// ---------- Screen 3 ----------
export function Missions({ state, t, lang, go, onPlay }) {
  const doneN = Object.keys(state.missions).length;
  return (
    <div className="screen paper">
      <TopBar title={t('missionCenter')} onBack={() => go('city')} backLabel={t('city')}><span className="pill">{t(state.mode)}</span></TopBar>
      <main className="page">
        <div className="progressline">
          <Meter value={doneN} max={MISSIONS.length} label={t('missionCenter')} />
          <span>{t('missionsProgress', { n: doneN, total: MISSIONS.length })}</span>
        </div>
        <div className="cards">
          {MISSIONS.map((m) => {
            const st = missionStatus(state, m);
            const b = BUILDINGS_BY_ID[m.building];
            return (
              <article key={m.id} className={`mcard ${st}`}>
                <BuildingThumb id={b.id} defaultColor={b.color} size={78} locked={st === 'locked'} title={loc(b.name, lang)} />
                <div className="mbody">
                  <div className="tags">
                    <span className={`pill p-${m.pillar}`}>{t('p_' + m.pillar)}</span>
                    <span className={`status ${st}`}>
                      {st === 'done' && <><Icon name="check" size={14} />{t('st_done')}</>}
                      {st === 'open' && t('st_new')}
                      {st === 'locked' && <><Icon name="lock" size={14} />{t('st_locked', { n: m.needs })}</>}
                    </span>
                  </div>
                  <h3 lang="en">{m.title.en}</h3>
                  <Sup text={sup(m.title, lang)} lang={lang} />
                  <p className="goalline"><b>{t('goal')}:</b> {loc(m.objective, lang)}</p>
                  <p className="where">{loc(b.name, lang)} · {m.age}</p>
                  {st !== 'locked' && (
                    <button type="button" className={st === 'open' ? 'btn primary' : 'btn'} onClick={() => onPlay(m.id)}><Icon name="play" size={18} />{st === 'open' ? t('play') : t('playAgain')}</button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}

// ---------- Screen 7 ----------
export function Achievements({ state, t, lang, go }) {
  const n = placedCount(state);
  const placed = placedMap(state);
  const done = MISSIONS.filter((m) => state.missions[m.id]);
  return (
    <div className="screen paper">
      <TopBar title={t('achievements')} onBack={() => go('city')} backLabel={t('city')} />
      <main className="page">
        <section className="sheet growth">
          <Pip size={64} />
          <div>
            <h2>{t('cityGrowth')}: {t('lv' + levelOf(n))}</h2>
            <Meter value={n} max={TOTAL_BUILDINGS} label={t('cityGrowth')} />
            <p>{t('buildingsCount', { n, total: TOTAL_BUILDINGS })} · {t('missionsProgress', { n: done.length, total: MISSIONS.length })}</p>
          </div>
        </section>

        <section className="sheet">
          <h2>{t('milestones')}</h2>
          <ul className="badges">
            {milestones(state).map((m) => (
              <li key={m.id} className={m.on ? 'badgeitem on' : 'badgeitem'}>
                <span className="medal"><Icon name={m.on ? 'star' : 'lock'} size={22} /></span>
                <span>{t('ms_' + m.id)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="sheet">
          <h2>{t('missionsDone')}</h2>
          {done.length === 0 ? <p className="empty">{t('noneYet')}</p> : (
            <ul className="donelist">
              {done.map((m) => (
                <li key={m.id}><Icon name="check" size={18} /><div><b lang="en">{m.title.en}</b><Sup text={sup(m.title, lang)} lang={lang} /><small lang="en">“{m.target}”</small></div></li>
              ))}
            </ul>
          )}
        </section>

        <section className="sheet">
          <h2>{t('buildingsUnlocked')}</h2>
          <div className="bgrid">
            {BUILDINGS.map((b) => {
              const unlocked = !!state.missions[b.mission];
              return (
                <figure key={b.id} className={unlocked ? 'bfig' : 'bfig locked'}>
                  <BuildingThumb id={b.id} defaultColor={b.color} size={84} locked={!unlocked} title={loc(b.name, lang)} />
                  <figcaption>{loc(b.name, lang)}<small>{placed[b.id] ? t('onMap') : unlocked ? t('ready') : ''}</small></figcaption>
                </figure>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

// ---------- Screen 8 ----------
const ENGLISH = ['listening', 'speaking', 'reading', 'writing', 'vocabulary'];
const LIFE = ['polite', 'kindness', 'empathy', 'responsibility', 'safety', 'courage', 'culture', 'thinking', 'belonging'];

function SkillRows({ keys, skills, t }) {
  const max = Math.max(4, ...keys.map((k) => skills[k] || 0));
  return (
    <ul className="skills">
      {keys.map((k) => {
        const v = skills[k] || 0;
        return (
          <li key={k}>
            <span>{t('sk_' + k)}</span>
            <Meter value={v} max={max} label={t('sk_' + k)} />
            <small>{v ? t('activities', { n: v }) : t('notYet')}</small>
          </li>
        );
      })}
    </ul>
  );
}

export function Parent({ state, dispatch, t, lang, go, saved }) {
  const [ask, setAsk] = useState(false);
  const done = MISSIONS.filter((m) => state.missions[m.id]);
  const words = [...new Map(done.flatMap((m) => m.vocab).map((w) => [w.w, w])).values()];
  const n = placedCount(state);
  return (
    <div className="screen paper">
      <TopBar title={t('parentTitle')} onBack={() => go('city')} backLabel={t('city')} />
      <main className="page">
        <section className="sheet">
          <h2>{t('overview')}</h2>
          <div className="stats">
            <div><b>{done.length}/{MISSIONS.length}</b><span>{t('missionsDone')}</span></div>
            <div><b>{n}/{TOTAL_BUILDINGS}</b><span>{t('cityGrowth')}: {t('lv' + levelOf(n))}</span></div>
            <div><b>{words.length}</b><span>{t('words')}</span></div>
          </div>
          <h3>{t('modeLabel')}</h3>
          <div className="seg">
            {['little', 'junior'].map((m) => (
              <button type="button" key={m} className={state.mode === m ? 'segbtn on' : 'segbtn'} aria-pressed={state.mode === m} onClick={() => dispatch({ type: 'MODE', mode: m })}>{t(m)} · {t(m + 'Age')}</button>
            ))}
          </div>
          <p className="fine left">{t('modeNote')}</p>
        </section>

        <section className="sheet"><h2>{t('engSkills')}</h2><SkillRows keys={ENGLISH} skills={state.skills} t={t} /></section>
        <section className="sheet"><h2>{t('lifeSkills')}</h2><SkillRows keys={LIFE} skills={state.skills} t={t} /></section>

        <section className="sheet">
          <h2>{t('missionsDone')}</h2>
          {done.length === 0 ? <p className="empty">{t('noneYet')}</p> : (
            <ul className="donelist">
              {done.map((m) => (
                <li key={m.id}><Icon name="check" size={18} /><div><b>{loc(m.title, lang)}</b><small>{loc(m.objective, lang)}</small></div></li>
              ))}
            </ul>
          )}
          {done.length > 0 && (
            <>
              <h3>{t('sentences')}</h3>
              <ul className="plainlist" lang="en">{done.map((m) => <li key={m.id}>{m.target}</li>)}</ul>
              <h3>{t('words')}</h3>
              <p className="wordcloud" lang="en">{words.map((w) => <span key={w.w}>{w.w}</span>)}</p>
            </>
          )}
        </section>

        <section className="sheet">
          <h2>{t('aboutData')}</h2>
          <ul className="plainlist">
            <li>{saved ? t('savedOk') : t('savedNo')}</li>
            <li>{t('noPersonal')}</li>
            <li>{t('contentNote')}</li>
          </ul>
          {ask ? (
            <div className="confirm" role="alertdialog" aria-label={t('reset')}>
              <p>{t('resetAsk')}</p>
              <div className="row">
                <button type="button" className="btn danger" onClick={() => { dispatch({ type: 'RESET' }); go('welcome'); }}>{t('resetYes')}</button>
                <button type="button" className="btn" onClick={() => setAsk(false)}>{t('cancel')}</button>
              </div>
            </div>
          ) : (
            <button type="button" className="btn" onClick={() => setAsk(true)}>{t('reset')}</button>
          )}
        </section>
      </main>
    </div>
  );
}
