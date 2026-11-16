// Content QA: every mission is complete and solvable, and every interface key used in the code exists.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { MISSIONS } from '../src/data/missions.js';
import { BUILDINGS } from '../src/data/buildings.js';
import { UI } from '../src/data/i18n.js';

const errors = [];
const need3 = (o, where) => ['en', 'vi', 'ko'].forEach((l) => { if (!o?.[l]) errors.push(`${where}: missing ${l}`); });

for (const m of MISSIONS) {
  const b = BUILDINGS.find((x) => x.id === m.building);
  if (!b || b.mission !== m.id) errors.push(`${m.id}: building link`);
  ['title', 'objective', 'scenario', 'lesson', 'feedback'].forEach((k) => need3(m[k], `${m.id}.${k}`));
  if (!m.target || !m.targetHelp?.vi || !m.targetHelp?.ko) errors.push(`${m.id}: target`);
  m.skills.forEach((k) => { if (!UI['sk_' + k]) errors.push(`${m.id}: skill ${k}`); });
  for (const mode of ['little', 'junior']) {
    const steps = m.steps[mode];
    if (!steps?.length) { errors.push(`${m.id}.${mode}: no steps`); continue; }
    steps.forEach((s, i) => {
      const at = `${m.id}.${mode}[${i}]`;
      if (s.t === 'pick') {
        const labels = s.opts.map((o) => (Array.isArray(o) ? o[1] : o));
        if (!labels.includes(s.a)) errors.push(`${at}: answer not in options`);
        if (new Set(labels).size !== labels.length) errors.push(`${at}: duplicate options`);
      } else if (s.t === 'order') { if (s.words.length < 2) errors.push(`${at}: order too short`); }
      else if (s.t === 'type') { if (!s.a || s.pre == null || s.post == null) errors.push(`${at}: type`); }
      else if (s.t === 'choice') { if (!s.opts.some((o) => o.good)) errors.push(`${at}: no good option`); need3(s.story, `${at}.story`); s.opts.forEach((o, k) => need3(o.out, `${at}.opt${k}`)); }
      else if (s.t === 'sort') { s.items.forEach((it) => { if (!s.bins.some((bn) => bn.id === it.bin)) errors.push(`${at}: bin ${it.bin}`); }); }
      else if (s.t === 'learn') { if (!s.cards.length) errors.push(`${at}: no cards`); }
      else if (s.t !== 'say') errors.push(`${at}: unknown type ${s.t}`);
    });
  }
}
for (const [k, val] of Object.entries(UI)) need3(val, `UI.${k}`);

const walk = (dir) => readdirSync(dir).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const used = new Set();
for (const file of walk('src').filter((f) => /\.jsx?$/.test(f))) {
  for (const m of readFileSync(file, 'utf8').matchAll(/\bt\('([a-zA-Z_0-9]+)'\s*[,)]/g)) used.add(m[1]);
}
for (const k of used) if (!UI[k]) errors.push(`UI key used but missing: ${k}`);
['lv0', 'lv1', 'lv2', 'lv3', 'lv4', 'little', 'junior', 'littleAge', 'juniorAge', 'littleDesc', 'juniorDesc'].forEach((k) => { if (!UI[k]) errors.push(`UI key missing: ${k}`); });

console.log(`${MISSIONS.length} missions, ${BUILDINGS.length} buildings, ${Object.keys(UI).length} interface strings`);
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('Content check passed.');
