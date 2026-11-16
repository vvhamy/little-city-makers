// The isometric city board: land, roads, plots, buildings and the life that arrives as the city grows.
import React from 'react';
import { P, pts, quad } from './iso.js';
import { BuildingArt, PlotTile, Tree, TILE } from './BuildingArt.jsx';
import { BUILDINGS_BY_ID, PLOTS } from '../data/buildings.js';
import { KIDS } from './Characters.jsx';

const XW = 6.4; // road + plot grid width (4 plots)
const YW = 4.9; // depth (3 plots)
const M = 0.5;  // grass margin around the roads
const ROAD = 0.4;
const STEP = 1.5;

const TINT = { home: '#FBEBB0', learn: '#CDE9F8', community: '#FFD6CB', shop: '#FFE4BF', culture: '#DED4F7', green: '#BDE7C8' };
const plotXY = (p) => [ROAD + p.i * STEP, ROAD + p.j * STEP];
const ORDER = [...PLOTS].sort((a, b) => a.i + a.j - (b.i + b.j) || a.i - b.i);
const reduceMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function Land() {
  const dash = { stroke: '#E4D3AC', strokeWidth: 2, strokeDasharray: '8 8', strokeLinecap: 'round' };
  const line = (a, b, key) => <line key={key} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} {...dash} />;
  return (
    <g>
      <polygon points={pts([P(-M, YW + M), P(XW + M, YW + M), P(XW + M, YW + M, -16), P(-M, YW + M, -16)])} fill="#86CBA4" />
      <polygon points={pts([P(XW + M, YW + M), P(XW + M, -M), P(XW + M, -M, -16), P(XW + M, YW + M, -16)])} fill="#74BD95" />
      <polygon points={quad(-M, -M, XW + M, YW + M)} fill="#BDE7C8" />
      <polygon points={quad(0, 0, XW, YW)} fill="#FBF0D9" />
      {[0, 1, 2, 3].map((k) => line(P(0.15, k * STEP + 0.2), P(XW - 0.15, k * STEP + 0.2), `h${k}`))}
      {[0, 1, 2, 3, 4].map((k) => line(P(k * STEP + 0.2, 0.15), P(k * STEP + 0.2, YW - 0.15), `v${k}`))}
    </g>
  );
}

function Mover({ path, dur, begin, at, children }) {
  if (reduceMotion) return <g transform={`translate(${at[0]} ${at[1]})`}>{children}</g>;
  return <g><animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={path} />{children}</g>;
}

const Walker = ({ kid }) => (
  <g>
    <ellipse cx="0" cy="1" rx="5" ry="2" fill="#3B3A4A" opacity=".15" />
    <rect x="-3.5" y="-12" width="7" height="11" rx="3.5" fill={kid.shirt} />
    <circle cx="0" cy="-16" r="5" fill={kid.skin} />
    <path d="M-5 -17a5 5 0 0110 0z" fill={kid.hair} />
  </g>
);

const Car = () => (
  <g>
    <ellipse cx="0" cy="1" rx="12" ry="3" fill="#3B3A4A" opacity=".15" />
    <rect x="-11" y="-11" width="22" height="9" rx="4" fill="#FF9B85" />
    <rect x="-6" y="-16" width="12" height="7" rx="3" fill="#FFC2B4" />
    <rect x="-4" y="-14.5" width="8" height="4" rx="1.5" fill="#DDF3FF" />
    <circle cx="-6" cy="-2" r="2.6" fill="#3B3A4A" /><circle cx="6" cy="-2" r="2.6" fill="#3B3A4A" />
  </g>
);

const path = (list) => 'M' + list.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('L');

function BackScenery({ n }) {
  const trees = [[0.6, -0.25, 1], [5.6, -0.25, 0.9], [-0.25, 2.4, 1]];
  if (n >= 3) trees.push([2.2, -0.25, 0.85], [-0.25, 0.8, 0.9], [3.9, -0.25, 1.05]);
  if (n >= 6) trees.push([-0.25, 4.0, 0.95], [1.4, -0.28, 0.7], [4.8, -0.25, 0.8]);
  const a = P(0.2, YW - 0.2), b = P(0.2, 0.2), c = P(XW - 0.2, 0.2);
  return (
    <g>
      {trees.map(([x, y, s], k) => <Tree key={k} x={x} y={y} s={s} />)}
      {n >= 5 && <Mover path={path([a, b, c, b, a])} dur="26s" begin="0s" at={b}><Car /></Mover>}
    </g>
  );
}

function FrontLife({ n }) {
  const a = P(0.3, YW - 0.2), b = P(XW - 0.2, YW - 0.2), c = P(XW - 0.2, 0.3);
  const route = path([a, b, c, b, a]);
  const kids = [n >= 2 && KIDS.mai, n >= 4 && KIDS.leo, n >= 7 && KIDS.amara, n >= 9 && KIDS.joon].filter(Boolean);
  const bushes = [];
  if (n >= 1) bushes.push([1.2, YW + 0.25, 0.8], [XW + 0.25, 3.6, 0.85]);
  if (n >= 4) bushes.push([4.6, YW + 0.25, 0.95], [XW + 0.25, 1.2, 0.75]);
  if (n >= 8) bushes.push([3.0, YW + 0.28, 0.7], [XW + 0.25, 2.5, 0.9], [6.0, YW + 0.2, 0.8]);
  return (
    <g>
      {kids.map((kid, k) => (
        <Mover key={kid.name} path={route} dur="48s" begin={`${-k * 11}s`} at={P(1 + k * 1.4, YW - 0.2)}><Walker kid={kid} /></Mover>
      ))}
      {bushes.map(([x, y, s], k) => <Tree key={k} x={x} y={y} s={s} />)}
      {n >= 10 && (
        <g className="balloons">
          {[[-250, -70, '#FF9B85'], [330, -90, '#C6B5F2'], [60, -118, '#FFE08A']].map(([x, y, c], k) => (
            <g key={k} style={{ animationDelay: `${k * 0.7}s` }}>
              <path d={`M${x} ${y + 15}q4 12 0 24`} fill="none" stroke="#8A8799" strokeWidth="1" />
              <ellipse cx={x} cy={y} rx="12" ry="15" fill={c} />
            </g>
          ))}
        </g>
      )}
    </g>
  );
}

function Site() {
  const [cx, cy] = P(0.55, 0.55);
  return (
    <g className="site">
      <polygon points={quad(0.12, 0.12, 0.98, 0.98)} fill="#FFE08A" opacity=".7" stroke="#F4BE3C" strokeWidth="2" strokeDasharray="6 5" />
      <text className="hammer" x={cx} y={cy - 16} fontSize="26" textAnchor="middle">🔨</text>
      <rect x={cx - 30} y={cy + 2} width="60" height="10" rx="5" fill="#FFFDF8" stroke="#3B3A4A" strokeWidth="1.5" />
      <rect className="sitebar" x={cx - 27.5} y={cy + 4.5} width="55" height="5" rx="2.5" fill="#5FBF98" />
    </g>
  );
}

function Plus() {
  const [cx, cy] = P(0.55, 0.55);
  return (
    <g className="plus">
      <circle cx={cx} cy={cy} r="11" fill="#FFFDF8" opacity=".9" />
      <path d={`M${cx - 5} ${cy}h10M${cx} ${cy - 5}v10`} stroke="#6B697D" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );
}

/**
 * plots:   plotId -> { b, c, d }
 * glow:    highlight empty plots (build / move mode)
 * site:    plotId currently under construction
 * popped:  plotId whose building just appeared
 * lifted:  plotId of the building being moved
 * label:   (plot, building) => accessible name
 * demo:    non-interactive showcase (welcome screen)
 */
export function CityMap({ plots, onPlot, glow, site, popped, lifted, label, demo, title }) {
  const n = Object.keys(plots).length;
  return (
    <svg className="map" viewBox="-365 -138 820 540" role={demo ? 'img' : 'group'} aria-label={title} preserveAspectRatio="xMidYMid meet">
      <ellipse cx="45" cy="300" rx="420" ry="120" fill="#3B3A4A" opacity=".07" />
      <Land />
      <BackScenery n={n} />
      {ORDER.map((p) => {
        const [x, y] = plotXY(p);
        const [tx, ty] = P(x, y);
        const cur = plots[p.id];
        const b = cur && BUILDINGS_BY_ID[cur.b];
        const empty = !cur && site !== p.id;
        const cls = ['plot', empty && 'empty', empty && glow && 'glow', lifted === p.id && 'lifted'].filter(Boolean).join(' ');
        const interactive = !demo && onPlot;
        return (
          <g key={p.id} className={cls} transform={`translate(${tx.toFixed(1)} ${ty.toFixed(1)})`}
            {...(interactive ? {
              role: 'button', tabIndex: 0, 'aria-label': label ? label(p, b) : p.id,
              onClick: () => onPlot(p.id),
              onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlot(p.id); } },
            } : {})}>
            <PlotTile className="tile" fill={TINT[p.district]} />
            {site === p.id ? <Site /> : b ? <BuildingArt id={b.id} color={cur.c} defaultColor={b.color} deco={cur.d} pop={popped === p.id} /> : <Plus />}
          </g>
        );
      })}
      <FrontLife n={n} />
    </svg>
  );
}

export { TILE };
