// Screen 2 (City Map), Screen 5 (Construction Mode) and Screen 6's entry point (building panel).
import React, { useEffect, useRef, useState } from 'react';
import { Icon, LangSelect, Meter, Modal } from '../components/ui.jsx';
import { CityMap } from '../art/CityMap.jsx';
import { BuildingThumb, COLORS } from '../art/BuildingArt.jsx';
import { Pip } from '../art/Characters.jsx';
import { BUILDINGS, BUILDINGS_BY_ID, DECOS, PLOTS_BY_ID, TOTAL_BUILDINGS } from '../data/buildings.js';
import { MISSIONS, MISSIONS_BY_ID } from '../data/missions.js';
import { loc, sup } from '../data/i18n.js';
import { levelOf, missionStatus, openMissionCount, permitsOf, placedCount, placedMap } from '../state/store.js';

const BUILD_MS = 1700;

export function City({ state, dispatch, t, lang, go, initialBuild, onPractice }) {
  const placed = placedMap(state);
  const n = placedCount(state);
  const permits = permitsOf(state);

  const [mode, setMode] = useState(() => (initialBuild && !placed[initialBuild] ? { type: 'build', b: initialBuild } : null));
  const [site, setSite] = useState(null);
  const [popped, setPopped] = useState(null);
  const [panel, setPanel] = useState(null);
  const [note, setNote] = useState(null);
  const [gate, setGate] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const bName = (id) => loc(BUILDINGS_BY_ID[id].name, lang);

  const place = (plotId, bId) => {
    setSite(plotId);
    setNote(t('constructing'));
    const rest = permits.filter((p) => p.id !== bId);
    const opensMore = openMissionCount(n + 1) > openMissionCount(n);
    timer.current = setTimeout(() => {
      dispatch({ type: 'PLACE', plot: plotId, building: bId });
      setSite(null);
      setPopped(plotId);
      const b = BUILDINGS_BY_ID[bId];
      const fit = PLOTS_BY_ID[plotId].district === b.cat;
      const msg = fit ? t('g_fit', { b: bName(bId), c: t('c_' + b.cat) }) : t('g_own', { b: bName(bId) });
      setNote(opensMore ? `${msg} ${t('g_newMissions')}` : msg);
      setMode(rest.length ? { type: 'build', b: rest[0].id } : null);
    }, BUILD_MS);
  };

  const onPlot = (id) => {
    if (site) return;
    const cur = state.plots[id];
    if (mode?.type === 'build') {
      if (cur) setNote(t('g_taken'));
      else if (mode.b) place(id, mode.b);
      else setNote(t('g_noPermit'));
    } else if (mode?.type === 'move') {
      if (id === mode.from) { setMode(null); setNote(null); }
      else if (cur) setNote(t('g_taken'));
      else {
        dispatch({ type: 'MOVE', from: mode.from, to: id });
        setPopped(id);
        setNote(t('g_moved', { b: bName(state.plots[mode.from].b) }));
        setMode(null);
      }
    } else if (cur) {
      setPanel(id);
    } else if (permits.length) {
      setMode({ type: 'build', b: permits[0].id });
      setNote(null);
    } else {
      setNote(t('g_noPermit'));
    }
  };

  const startBuild = () => { setMode({ type: 'build', b: permits[0]?.id ?? null }); setNote(null); };
  const stopMode = () => { setMode(null); setNote(null); };

  // What Pip says, and the one next step Pip offers.
  let guide;
  let cta = null;
  if (mode?.type === 'build') guide = mode.b ? t('tapPlot') : permits.length ? t('g_choose') : t('g_noPermit');
  else if (mode?.type === 'move') guide = t('g_move', { b: bName(state.plots[mode.from].b) });
  else if (permits.length) { guide = t('g_permit'); cta = { label: t('build'), icon: 'hammer', fn: startBuild }; }
  else if (n >= TOTAL_BUILDINGS) guide = t('g_done');
  else if (Object.keys(state.missions).length === 0) { guide = t('g_first'); cta = { label: t('letsGo'), icon: 'play', fn: () => go('missions') }; }
  else { guide = t('g_more'); cta = { label: t('missions'), icon: 'flag', fn: () => go('missions') }; }

  const level = levelOf(n);
  const selected = mode?.type === 'build' && mode.b ? BUILDINGS_BY_ID[mode.b] : null;
  const openCount = MISSIONS.filter((m) => missionStatus(state, m) === 'open').length;

  return (
    <div className="screen cityscreen">
      <header className="hud">
        <button type="button" className="brand" onClick={() => go('welcome')} aria-label="Little City Makers">
          <span className="brandmark" aria-hidden="true"><i /><i /><i /></span>
          <span className="brandname">Little City Makers</span>
        </button>
        <div className="levelbox">
          <b>{t('lv' + level)}</b>
          <Meter value={n} max={TOTAL_BUILDINGS} label={t('cityGrowth')} />
          <small>{t('buildingsCount', { n, total: TOTAL_BUILDINGS })}</small>
        </div>
        <LangSelect lang={lang} onChange={(l) => dispatch({ type: 'LANG', lang: l })} label={t('chooseLang')} />
        <button type="button" className="btn small" onClick={() => setGate(true)}><Icon name="people" size={18} /><span className="hide-s">{t('grownups')}</span></button>
      </header>

      <div className="mapwrap">
        <CityMap plots={state.plots} onPlot={onPlot} glow={!!mode && !site} site={site} popped={popped} lifted={mode?.type === 'move' ? mode.from : null}
          title={t('cityMap')} label={(p, b) => (b ? loc(b.name, lang) : `${t('emptyPlot')}, ${t('c_' + p.district)}`)} />
        <div className="guide" role="status">
          <Pip size={58} />
          <div className="bubble">
            <p>{note || guide}</p>
            {cta && !mode && <button type="button" className="btn mint small" onClick={cta.fn}><Icon name={cta.icon} size={18} />{cta.label}</button>}
          </div>
        </div>
      </div>

      {mode?.type === 'build' ? (
        <section className="tray-build" aria-label={t('inventory')}>
          <div className="trayhead">
            <h2><Icon name="hammer" />{t('inventory')}</h2>
            <button type="button" className="btn small" onClick={stopMode} disabled={!!site}>{t('done')}</button>
          </div>
          <div className="traybody">
          {selected && (
            <div className="preview">
              <BuildingThumb id={selected.id} defaultColor={selected.color} size={86} title={loc(selected.name, lang)} />
              <div>
                <h3 lang="en">{selected.name.en}</h3>
                {sup(selected.name, lang) && <p className="sup">{sup(selected.name, lang)}</p>}
                <p>{t('c_' + selected.cat)} · {loc(selected.learn, lang)}</p>
              </div>
            </div>
          )}
          <div className="inventory">
            {BUILDINGS.map((b) => {
              const st = placed[b.id] ? 'onMap' : state.missions[b.mission] ? 'ready' : 'locked';
              const inner = (
                <>
                  <BuildingThumb id={b.id} defaultColor={b.color} size={58} locked={st === 'locked'} title={loc(b.name, lang)} />
                  <b>{loc(b.name, lang)}</b>
                  <small>
                    {st === 'locked' && <Icon name="lock" size={12} />}
                    {st === 'ready' ? t('ready') : st === 'onMap' ? t('onMap') : t('lockedBy', { m: loc(MISSIONS_BY_ID[b.mission].title, lang) })}
                  </small>
                </>
              );
              return st === 'ready'
                ? <button type="button" key={b.id} className={mode.b === b.id ? 'inv ready sel' : 'inv ready'} disabled={!!site} aria-pressed={mode.b === b.id} onClick={() => { setMode({ type: 'build', b: b.id }); setNote(null); }}>{inner}</button>
                : <div key={b.id} className={`inv ${st}`}>{inner}</div>;
            })}
          </div>
          </div>
        </section>
      ) : mode?.type === 'move' ? (
        <nav className="dock"><button type="button" className="btn" onClick={stopMode}>{t('cancel')}</button></nav>
      ) : (
        <nav className="dock">
          <button type="button" className="btn primary big" onClick={() => go('missions')}>
            <Icon name="flag" />{t('missions')}{openCount > 0 && <span className="badge">{openCount}</span>}
          </button>
          <button type="button" className="btn big" onClick={startBuild}>
            <Icon name="hammer" />{t('build')}{permits.length > 0 && <span className="badge">{permits.length}</span>}
          </button>
          <button type="button" className="btn big" onClick={() => go('achievements')}><Icon name="trophy" />{t('myCity')}</button>
        </nav>
      )}

      {panel && state.plots[panel] && (
        <BuildingPanel plotId={panel} state={state} dispatch={dispatch} t={t} lang={lang} onClose={() => setPanel(null)}
          onPractice={onPractice} onMove={() => { setMode({ type: 'move', from: panel }); setPanel(null); setNote(null); }} />
      )}
      {gate && <ParentGate t={t} onClose={() => setGate(false)} onPass={() => go('parent')} />}
    </div>
  );
}

function BuildingPanel({ plotId, state, dispatch, t, lang, onClose, onPractice, onMove }) {
  const cur = state.plots[plotId];
  const b = BUILDINGS_BY_ID[cur.b];
  const practised = state.practice[b.id] || 0;
  const color = cur.c ?? b.color;
  const deco = cur.d ?? 'none';
  const patch = (p) => dispatch({ type: 'DECORATE', plot: plotId, patch: p });
  return (
    <Modal title={b.name.en} onClose={onClose} closeLabel={t('close')} wide>
      <div className="panel">
        <BuildingThumb id={b.id} color={color} deco={deco} size={150} title={loc(b.name, lang)} />
        <div className="panelinfo">
          {sup(b.name, lang) && <p className="sup">{sup(b.name, lang)}</p>}
          <h3>{t('weLearn')}</h3>
          <p>{loc(b.learn, lang)}</p>
          <div className="row">
            <button type="button" className="btn primary" onClick={() => onPractice(b.id)}><Icon name="play" />{t('practiceHere')}</button>
            <button type="button" className="btn" onClick={onMove}><Icon name="move" />{t('move')}</button>
          </div>
        </div>
      </div>
      <section className="decorate">
        <h3><Icon name="brush" />{t('decorate')}</h3>
        <p className="minih">{t('color')}</p>
        <div className="swatches">
          {COLORS.map((c, k) => (
            <button type="button" key={c} className={k === color ? 'swatch sel' : 'swatch'} style={{ background: c }} aria-label={`${t('color')} ${k + 1}`} aria-pressed={k === color} onClick={() => patch({ c: k })} />
          ))}
        </div>
        <p className="minih">{t('decoration')}</p>
        <div className="chips">
          {DECOS.map((d) => {
            const locked = practised < d.needs;
            return (
              <button type="button" key={d.id} className={d.id === deco ? 'chip sel' : 'chip'} disabled={locked} aria-pressed={d.id === deco} onClick={() => patch({ d: d.id })}>
                {locked && <Icon name="lock" size={14} />}
                <span>{t('d_' + d.id)}</span>
                {locked && <small>{t('practiceToUnlock', { n: d.needs })}</small>}
              </button>
            );
          })}
        </div>
      </section>
    </Modal>
  );
}

// A light gate so small children do not wander into the grown-up area. It is not a security feature.
function ParentGate({ t, onClose, onPass }) {
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
          <input id="gate-answer" type="text" inputMode="numeric" autoComplete="off" value={val} onChange={(e) => { setVal(e.target.value); setWrong(false); }} />
          <button type="submit" className="btn primary">{t('open')}</button>
        </div>
        {wrong && <p className="gentle" role="alert">{t('gateWrong')}</p>}
      </form>
    </Modal>
  );
}
