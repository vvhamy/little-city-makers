// The seven step types. Each receives { step, mission, lang, t, little, solved, onSolved }
// and calls onSolved() once. Mistakes never cost anything: the child simply tries again.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Icon, Listen, shuffle, speak } from '../components/ui.jsx';
import { Kid } from '../art/Characters.jsx';
import { loc, sup } from '../data/i18n.js';

const Sup = ({ text, lang }) => (text ? <p className="sup" lang={lang}>{text}</p> : null);

function Prompt({ q, hint, lang, t }) {
  if (!q) return null;
  return (
    <div className="prompt">
      <h2 lang="en">{q}</h2>
      <Listen text={q} label={t('listen')} />
      <Sup text={sup(hint, lang)} lang={lang} />
    </div>
  );
}

// ---- pick: choose the right picture, word or sentence ----
function Pick({ step, mission, lang, t, solved, onSolved }) {
  const opts = useMemo(() => shuffle(step.opts.map((o) => {
    if (Array.isArray(o)) return { e: o[0], l: o[1] };
    const word = mission.vocab.find((x) => x.w === o);
    return word ? { e: word.e, l: word.w, g: word } : { l: o };
  })), [step]);
  const [tried, setTried] = useState([]);
  const pics = opts.every((o) => o.e);
  const tap = (o) => {
    if (solved) return;
    if (o.l === step.a) { speak(o.l); onSolved(); } else setTried((x) => [...x, o.l]);
  };
  return (
    <div className="step">
      {step.passage && (
        <div className="passage"><p lang="en">{step.passage}</p><Listen text={step.passage} label={t('listen')} /></div>
      )}
      <Prompt q={step.q} hint={step.h} lang={lang} t={t} />
      <div className={pics ? 'opts pics' : 'opts lines'}>
        {opts.map((o) => {
          const right = solved && o.l === step.a;
          return (
            <button type="button" key={o.l} className={right ? 'opt right' : tried.includes(o.l) ? 'opt tried' : 'opt'} disabled={tried.includes(o.l)} onClick={() => tap(o)}>
              {o.e && <span className="emo" aria-hidden="true">{o.e}</span>}
              <span className="lab" lang="en">{o.l}</span>
              {right && o.g && <Sup text={sup(o.g, lang)} lang={lang} />}
            </button>
          );
        })}
      </div>
      {tried.length > 0 && !solved && <p className="gentle" role="status">{t('tryAgain')}</p>}
    </div>
  );
}

// ---- order: tap word (or letter) tiles in the right order ----
function Order({ step, lang, t, solved, onSolved }) {
  const words = step.words;
  const full = words.join(step.letters ? '' : ' ');
  const [pool] = useState(() => {
    let p = shuffle(words.map((w, i) => ({ w, i })));
    for (let k = 0; k < 5 && p.every((x, i) => x.w === words[i]); k++) p = shuffle(p);
    return p;
  });
  const [picked, setPicked] = useState([]);
  const [bad, setBad] = useState(false);
  const add = (tile) => {
    if (solved || bad || picked.includes(tile)) return;
    const next = [...picked, tile];
    setPicked(next);
    if (next.length < words.length) return;
    if (next.every((x, k) => x.w === words[k])) { speak(full); onSolved(); return; }
    setBad(true);
    setTimeout(() => {
      let keep = 0;
      while (keep < next.length && next[keep].w === words[keep]) keep++;
      setPicked(next.slice(0, keep));
      setBad(false);
    }, 900);
  };
  const remove = (tile) => !solved && !bad && setPicked((p) => p.filter((x) => x !== tile));
  return (
    <div className="step">
      {step.pic && <div className="bigpic" aria-hidden="true">{step.pic}</div>}
      <Prompt q={step.q} hint={step.h} lang={lang} t={t} />
      {!step.letters && <Listen text={full} label={t('listen')} big />}
      <div className={`slots${step.letters ? ' letters' : ''}${bad ? ' bad' : ''}${solved ? ' ok' : ''}`} aria-label={t('yourAnswer')} lang="en">
        {picked.map((tile) => <button type="button" key={tile.i} className="tile" onClick={() => remove(tile)}>{tile.w}</button>)}
        {picked.length === 0 && <span className="slot-hint">…</span>}
      </div>
      <div className={step.letters ? 'tiles letters' : 'tiles'} lang="en">
        {pool.map((tile) => (
          <button type="button" key={tile.i} className="tile" disabled={picked.includes(tile)} onClick={() => add(tile)}>{tile.w}</button>
        ))}
      </div>
      {bad && <p className="gentle" role="status">{t('tryAgain')}</p>}
    </div>
  );
}

// ---- type: write the missing word ----
function TypeIn({ step, t, solved, onSolved }) {
  const [val, setVal] = useState('');
  const [misses, setMisses] = useState(0);
  const submit = (e) => {
    e.preventDefault();
    if (solved || !val.trim()) return;
    if (val.trim().toLowerCase() === step.a.toLowerCase()) { speak(`${step.pre} ${step.a} ${step.post}`); onSolved(); } else setMisses((m) => m + 1);
  };
  return (
    <form className="step" onSubmit={submit}>
      {step.pic && <div className="bigpic" aria-hidden="true">{step.pic}</div>}
      <p className="cloze" lang="en">
        {step.pre}{' '}
        <input id="type-answer" type="text" value={solved ? step.a : val} onChange={(e) => setVal(e.target.value)} readOnly={solved}
          autoComplete="off" autoCapitalize="none" spellCheck="false" size={Math.max(6, step.a.length + 1)} aria-label={t('yourAnswer')} className={solved ? 'ok' : ''} />
        {step.post.startsWith(',') ? '' : ' '}{step.post}
      </p>
      {!solved && <button type="submit" className="btn mint">{t('check')}</button>}
      {misses > 0 && !solved && (
        <p className="gentle" role="status">{t('tryAgain')} {t('hint', { x: step.a.slice(0, Math.min(misses, step.a.length - 1)) })}</p>
      )}
    </form>
  );
}

// ---- choice: explore what happens with each idea; no idea is punished ----
function Choice({ step, lang, t, solved, onSolved }) {
  const [seen, setSeen] = useState([]);
  const [cur, setCur] = useState(null);
  const pickOpt = (k) => {
    setCur(k);
    const o = step.opts[k];
    speak(o.out.en);
    if (o.good) onSolved(); else setSeen((x) => [...x, k]);
  };
  const o = cur != null ? step.opts[cur] : null;
  const mood = o ? (o.good ? 'happy' : 'sad') : 'calm';
  return (
    <div className="step">
      <div className="cast">{step.who.map((id) => <Kid key={id} id={id} mood={mood} size={84} />)}</div>
      <div className="prompt">
        <h2 lang="en">{step.story.en}</h2>
        <Listen text={step.story.en} label={t('listen')} />
        <Sup text={sup(step.story, lang)} lang={lang} />
      </div>
      {o ? (
        <div className={o.good ? 'outcome good' : 'outcome'} role="status">
          <p className="said" lang="en">“{o.l}”</p>
          <p lang="en">{o.out.en}</p>
          <Sup text={sup(o.out, lang)} lang={lang} />
          {!o.good && <button type="button" className="btn" onClick={() => setCur(null)}>{t('tryAnother')}</button>}
        </div>
      ) : (
        <div className="opts lines">
          {step.opts.map((opt, k) => (
            <button type="button" key={k} className={seen.includes(k) ? 'opt tried' : 'opt'} disabled={seen.includes(k) || solved} onClick={() => pickOpt(k)}>
              <span className="lab" lang="en">{opt.l}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- sort: drag (or tap, then tap) each item into its bin ----
function Sort({ step, lang, t, solved, onSolved }) {
  const [left, setLeft] = useState(() => shuffle(step.items.map((it, i) => ({ ...it, i }))));
  const [sel, setSel] = useState(null);
  const [oops, setOops] = useState(null);
  const [filled, setFilled] = useState({});
  const drag = useRef(null);
  const dragged = useRef(false);

  const drop = (it, binId) => {
    if (it.bin !== binId) { setOops(it.i); setTimeout(() => setOops(null), 700); return; }
    const rest = left.filter((x) => x.i !== it.i);
    setLeft(rest);
    setFilled((f) => ({ ...f, [binId]: [...(f[binId] || []), it.e] }));
    setSel(null);
    speak(it.l);
    if (!rest.length) onSolved();
  };
  const down = (e, it) => {
    drag.current = { it, x: e.clientX, y: e.clientY, el: e.currentTarget, moved: false };
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* tap still works */ }
  };
  const move = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 10) d.moved = true;
    if (d.moved) d.el.style.transform = `translate(${dx}px, ${dy}px) scale(1.08)`;
  };
  const up = (e) => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    d.el.style.transform = '';
    if (!d.moved) return;
    dragged.current = true;
    setTimeout(() => { dragged.current = false; }, 0);
    d.el.style.pointerEvents = 'none';
    const target = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-bin]');
    d.el.style.pointerEvents = '';
    if (target) drop(d.it, target.dataset.bin);
  };
  const tapItem = (it) => { if (!dragged.current) setSel((s) => (s === it.i ? null : it.i)); };
  const tapBin = (binId) => { const it = left.find((x) => x.i === sel); if (it) drop(it, binId); };

  return (
    <div className="step">
      <Prompt q={step.q} hint={step.h} lang={lang} t={t} />
      <div className="tray">
        {left.map((it) => (
          <button type="button" key={it.i} className={`thing${sel === it.i ? ' sel' : ''}${oops === it.i ? ' oops' : ''}`}
            onPointerDown={(e) => down(e, it)} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onClick={() => tapItem(it)}>
            <span className="emo" aria-hidden="true">{it.e}</span><span className="lab" lang="en">{it.l}</span>
          </button>
        ))}
        {left.length === 0 && <span className="emo" aria-hidden="true">✨</span>}
      </div>
      <div className="bins">
        {step.bins.map((b) => (
          <button type="button" key={b.id} data-bin={b.id} className={sel != null ? 'bin ready' : 'bin'} onClick={() => tapBin(b.id)} disabled={solved}>
            <span className="emo" aria-hidden="true">{b.e}</span>
            <span className="lab" lang="en">{b.l}</span>
            <Sup text={sup(b, lang)} lang={lang} />
            <span className="in" aria-hidden="true">{(filled[b.id] || []).join(' ')}</span>
          </button>
        ))}
      </div>
      {oops != null && <p className="gentle" role="status">{t('tryAgain')}</p>}
    </div>
  );
}

// ---- learn: look-and-listen cards ----
function Learn({ step, lang, t, little, onSolved }) {
  const [c, setC] = useState(0);
  const last = step.cards.length - 1;
  const card = step.cards[c];
  useEffect(() => {
    if (little) speak(card.s);
    if (c === last) onSolved();
  }, [c]);
  return (
    <div className="step">
      <div className="factcard">
        <div className="bigpic" aria-hidden="true">{card.e}</div>
        <p className="fact" lang="en">{card.s}</p>
        <Listen text={card.s} label={t('listen')} big />
        <Sup text={sup(card.h, lang)} lang={lang} />
      </div>
      <div className="dots" aria-hidden="true">{step.cards.map((_, k) => <i key={k} className={k <= c ? 'on' : ''} />)}</div>
      {c < last && <button type="button" className="btn" onClick={() => setC(c + 1)}>{t('next')}<Icon name="next" size={18} /></button>}
    </div>
  );
}

// ---- say: a speaking prompt. Nothing is recorded or checked, and the UI says so. ----
function Say({ step, t, solved, onSolved }) {
  return (
    <div className="step">
      <div className="saybox">
        <Icon name="mic" size={34} />
        <p className="fact" lang="en">“{step.s}”</p>
        <Listen text={step.s} label={t('listen')} big />
      </div>
      {!solved && <button type="button" className="btn mint" onClick={onSolved}>{t('iSaidIt')}</button>}
      <p className="fine">{t('noRecord')}</p>
    </div>
  );
}

export const STEPS = { pick: Pick, order: Order, type: TypeIn, choice: Choice, sort: Sort, learn: Learn, say: Say };

// Which English skill a solved step counts toward (shown in the Parent Dashboard).
export function skillOf(step, mode) {
  switch (step.t) {
    case 'pick': return step.passage || mode === 'junior' ? 'reading' : 'vocabulary';
    case 'order':
    case 'type': return 'writing';
    case 'say': return 'speaking';
    case 'sort': return 'vocabulary';
    case 'learn': return 'listening';
    case 'choice': return mode === 'junior' ? 'reading' : 'listening';
    default: return 'vocabulary';
  }
}

// What Pip reads aloud when a step opens in Little Makers mode.
export const spokenPrompt = (step) => step.q || (step.story && loc(step.story, 'en')) || null;
