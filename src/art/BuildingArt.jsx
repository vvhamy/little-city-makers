// Parametric toy buildings drawn as isometric SVG. One recipe per building id.
// To add a building: add a recipe to ART and an entry in data/buildings.js.
import React from 'react';
import { A, B, P, pts, quad, shade } from './iso.js';

export const COLORS = ['#FFE08A', '#FF9B85', '#8FD0F5', '#9FE0C2', '#C6B5F2', '#FFFDF8'];
export const TILE = 1.1;

const WIN = '#DDF3FF';
const TRIM = '#FFFDF8';
const DOOR = '#7A5C4F';
const ROOF_CORAL = '#F08A72';

function Box({ f, z = 0, h, c }) {
  const [x0, y0, x1, y1] = f;
  return (
    <g>
      <polygon points={pts([P(x0, y1, z), P(x1, y1, z), P(x1, y1, z + h), P(x0, y1, z + h)])} fill={c} />
      <polygon points={pts([P(x1, y1, z), P(x1, y0, z), P(x1, y0, z + h), P(x1, y1, z + h)])} fill={shade(c, -0.14)} />
      <polygon points={quad(x0, y0, x1, y1, z + h)} fill={shade(c, 0.3)} />
    </g>
  );
}

// Children are drawn in wall coordinates: u runs along the wall (100 units per tile), v runs up in pixels.
function Face({ side, f, z = 0, children }) {
  const [x0, , x1, y1] = f;
  const [e, g] = side === 'L' ? P(x0, y1, z) : P(x1, y1, z);
  const b = side === 'L' ? B / 100 : -B / 100;
  return <g transform={`matrix(${A / 100} ${b} 0 -1 ${e} ${g})`}>{children}</g>;
}

const Win = ({ u, v = 14, w = 13, h = 14 }) => (
  <g>
    <rect x={u - 1.5} y={v - 1.5} width={w + 3} height={h + 3} rx="2" fill={TRIM} />
    <rect x={u} y={v} width={w} height={h} rx="1" fill={WIN} />
  </g>
);
const Door = ({ u, w = 14, h = 22, c = DOOR }) => <rect x={u} y="0" width={w} height={h} rx="3" fill={c} />;

function Gable({ f, z, r, c, wall }) {
  const o = 0.04;
  const [x0, y0, x1, y1] = [f[0] - o, f[1] - o, f[2] + o, f[3] + o];
  const ym = (y0 + y1) / 2;
  const R0 = P(x0, ym, z + r);
  const R1 = P(x1, ym, z + r);
  return (
    <g>
      <polygon points={pts([P(x0, y0, z), P(x1, y0, z), R1, R0])} fill={shade(c, -0.25)} />
      <polygon points={pts([P(x1, y1, z), P(x1, y0, z), R1])} fill={shade(wall, -0.14)} />
      <polygon points={pts([P(x0, y1, z), P(x1, y1, z), R1, R0])} fill={c} />
    </g>
  );
}

function Hip({ f, z, r, c }) {
  const o = 0.04;
  const [x0, y0, x1, y1] = [f[0] - o, f[1] - o, f[2] + o, f[3] + o];
  const C = P((x0 + x1) / 2, (y0 + y1) / 2, z + r);
  return (
    <g>
      <polygon points={pts([P(x0, y0, z), P(x1, y0, z), C])} fill={shade(c, -0.3)} />
      <polygon points={pts([P(x0, y0, z), P(x0, y1, z), C])} fill={shade(c, -0.3)} />
      <polygon points={pts([P(x1, y1, z), P(x1, y0, z), C])} fill={shade(c, -0.14)} />
      <polygon points={pts([P(x0, y1, z), P(x1, y1, z), C])} fill={c} />
    </g>
  );
}

function Sign({ at, e }) {
  const [x, y] = P(at[0], at[1], at[2]);
  return (
    <g>
      <rect x={x - 1} y={y - 16} width="2" height="16" fill="#8A8799" />
      <circle cx={x} cy={y - 27} r="12.5" fill={TRIM} stroke="#3B3A4A" strokeWidth="1.5" />
      <text x={x} y={y - 26} fontSize="13" textAnchor="middle" dominantBaseline="central">{e}</text>
    </g>
  );
}

export function Tree({ x, y, s = 1 }) {
  const [sx, sy] = P(x, y);
  return (
    <g transform={`translate(${sx.toFixed(1)} ${sy.toFixed(1)}) scale(${s})`}>
      <ellipse cx="0" cy="1" rx="9" ry="4" fill="#3B3A4A" opacity=".12" />
      <rect x="-2" y="-12" width="4" height="13" rx="2" fill="#B98A62" />
      <circle cx="0" cy="-22" r="13" fill="#6FC59A" />
      <circle cx="-4" cy="-26" r="6" fill="#8BD6AE" />
    </g>
  );
}

const ART = {
  home: (c) => {
    const f = [0.25, 0.25, 0.85, 0.85];
    return (
      <>
        <Box f={f} h={40} c={c} />
        <Face side="L" f={f}><Door u={38} /><Win u={10} /></Face>
        <Face side="R" f={f}><Win u={23} /></Face>
        <Box f={[0.33, 0.33, 0.45, 0.45]} z={40} h={38} c="#E8B4A0" />
        <Gable f={f} z={40} r={28} c={ROOF_CORAL} wall={c} />
      </>
    );
  },
  bakery: (c) => {
    const f = [0.2, 0.25, 0.9, 0.85];
    return (
      <>
        <Box f={f} h={42} c={c} />
        <Face side="L" f={f}>
          <Door u={50} />
          <rect x="8" y="5" width="34" height="18" rx="2" fill={TRIM} />
          <rect x="10" y="7" width="30" height="14" fill={WIN} />
          {[0, 1, 2, 3, 4, 5, 6].map((k) => <rect key={k} x={k * 10} y="27" width="10" height="9" fill={k % 2 ? TRIM : ROOF_CORAL} />)}
        </Face>
        <Face side="R" f={f}><Win u={23} v={12} /></Face>
        <Box f={[0.3, 0.35, 0.8, 0.75]} z={42} h={5} c={shade(c, 0.35)} />
        <Sign at={[0.9, 0.85, 42]} e="🥐" />
      </>
    );
  },
  library: (c) => {
    const f = [0.15, 0.2, 0.95, 0.9];
    return (
      <>
        <Box f={[0.1, 0.15, 1.0, 0.95]} h={5} c="#EFE7D6" />
        <Box f={f} z={5} h={44} c={c} />
        <Face side="L" f={f} z={5}>
          <Door u={33} h={26} />
          {[8, 22, 52, 66].map((u) => <rect key={u} x={u} y="0" width="6" height="40" rx="1" fill={TRIM} />)}
        </Face>
        <Face side="R" f={f} z={5}><Win u={12} v={12} h={22} /><Win u={44} v={12} h={22} /></Face>
        <Hip f={f} z={49} r={26} c="#9A86D6" />
        <Sign at={[0.95, 0.9, 49]} e="📚" />
      </>
    );
  },
  toyshop: (c) => {
    const f = [0.22, 0.25, 0.88, 0.85];
    const [bx, by] = P(0.55, 0.55, 40);
    return (
      <>
        <Box f={f} h={40} c={c} />
        <Face side="L" f={f}>
          <Door u={44} c="#D9573F" />
          <circle cx="20" cy="20" r="12" fill={TRIM} /><circle cx="20" cy="20" r="9" fill={WIN} />
        </Face>
        <Face side="R" f={f}><Win u={23} v={12} /></Face>
        <Box f={[0.32, 0.35, 0.78, 0.75]} z={40} h={5} c={shade(c, 0.35)} />
        <circle cx={bx} cy={by - 16} r="13" fill="#FF9B85" />
        <path d={`M${bx - 13} ${by - 16}a13 5 0 0 0 26 0`} fill="none" stroke={TRIM} strokeWidth="3" />
        <Sign at={[0.88, 0.85, 40]} e="🧸" />
      </>
    );
  },
  hospital: (c) => {
    const f = [0.2, 0.2, 0.9, 0.9];
    const top = [0.38, 0.38, 0.72, 0.72];
    return (
      <>
        <Box f={f} h={68} c={c} />
        <Face side="L" f={f}>
          <Door u={27} w={16} c="#6FB7E3" />
          {[30, 48].map((v) => [8, 28.5, 49].map((u) => <Win key={`${u}-${v}`} u={u} v={v} h={12} />))}
        </Face>
        <Face side="R" f={f}>{[12, 30, 48].map((v) => [12, 44].map((u) => <Win key={`${u}-${v}`} u={u} v={v} h={12} />))}</Face>
        <Box f={top} z={68} h={18} c="#FFFDF8" />
        <Face side="L" f={top} z={68}>
          <rect x="14" y="2" width="6" height="14" fill="#F0715A" /><rect x="10" y="6" width="14" height="6" fill="#F0715A" />
        </Face>
      </>
    );
  },
  police: (c) => {
    const f = [0.2, 0.25, 0.9, 0.85];
    const [lx, ly] = P(0.375, 0.425, 66);
    return (
      <>
        <Box f={f} h={44} c={c} />
        <Face side="L" f={f}>
          <rect x="0" y="33" width="70" height="5" fill={TRIM} />
          <Door u={28} c="#3F5F92" /><Win u={8} v={12} /><Win u={50} v={12} />
        </Face>
        <Face side="R" f={f}><rect x="0" y="33" width="60" height="5" fill={TRIM} /><Win u={23} v={12} /></Face>
        <Box f={[0.25, 0.3, 0.5, 0.55]} z={44} h={22} c={c} />
        <circle cx={lx} cy={ly - 5} r="6" fill="#6FB7E3" /><circle cx={lx - 2} cy={ly - 7} r="2" fill={TRIM} />
        <Sign at={[0.9, 0.85, 44]} e="⭐" />
      </>
    );
  },
  center: (c) => {
    const f = [0.18, 0.22, 0.92, 0.88];
    return (
      <>
        <Box f={f} h={42} c={c} />
        <Face side="L" f={f}><Door u={28} w={18} c="#3E9B78" /><Win u={6} /><Win u={55} /></Face>
        <Face side="R" f={f}><Win u={10} /><Win u={42} /></Face>
        <Gable f={f} z={42} r={28} c="#5FBF98" wall={c} />
        <Sign at={[0.92, 0.88, 42]} e="🤝" />
      </>
    );
  },
  culture: (c) => {
    const f = [0.15, 0.2, 0.95, 0.9];
    const f2 = [0.3, 0.33, 0.8, 0.8];
    return (
      <>
        <Box f={f} h={28} c={c} />
        <Face side="L" f={f}><Door u={33} h={20} c="#6E5BB5" /><Win u={8} v={9} h={12} /><Win u={59} v={9} h={12} /></Face>
        <Face side="R" f={f}><Win u={12} v={9} h={12} /><Win u={44} v={9} h={12} /></Face>
        <Box f={[0.11, 0.16, 0.99, 0.94]} z={28} h={4} c={ROOF_CORAL} />
        <Box f={f2} z={32} h={24} c={c} />
        <Face side="L" f={f2} z={32}>{[6, 20.5, 35].map((u) => <Win key={u} u={u} v={6} w={9} h={12} />)}</Face>
        <Hip f={f2} z={56} r={22} c={ROOF_CORAL} />
        <Sign at={[0.95, 0.9, 32]} e="🌏" />
      </>
    );
  },
  park: (c) => {
    const [px, py] = P(0.62, 0.6);
    return (
      <>
        <polygon points={quad(0.07, 0.07, 1.03, 1.03)} fill="#A9DFBB" />
        <ellipse cx={px} cy={py} rx="24" ry="12" fill="#8FD0F5" />
        <ellipse cx={px - 6} cy={py - 3} rx="8" ry="3" fill="#DDF3FF" />
        <Tree x={0.22} y={0.25} /><Tree x={0.85} y={0.2} s={0.85} /><Tree x={0.2} y={0.85} s={0.9} />
        {[[0.45, 0.2], [0.55, 0.95], [0.95, 0.55], [0.4, 0.9]].map(([x, y], k) => {
          const [sx, sy] = P(x, y);
          return <g key={k}><circle cx={sx} cy={sy - 3} r="3.4" fill={c} /><circle cx={sx} cy={sy - 3} r="1.2" fill="#F4BE3C" /></g>;
        })}
        <Box f={[0.78, 0.9, 0.98, 0.97]} h={6} c="#C99A6B" />
      </>
    );
  },
  plaza: (c) => {
    const [cx, cy] = P(0.5, 0.5);
    return (
      <>
        <polygon points={quad(0.06, 0.06, 1.04, 1.04)} fill="#FFF1C9" />
        <ellipse cx={cx} cy={cy} rx="32" ry="16" fill="#FFD9CE" />
        <ellipse cx={cx} cy={cy - 3} rx="19" ry="9.5" fill={TRIM} />
        <Box f={[0.12, 0.92, 0.22, 1.02]} h={44} c={c} />
        <Box f={[0.88, 0.92, 0.98, 1.02]} h={44} c={c} />
        <Box f={[0.1, 0.92, 1.0, 1.02]} z={44} h={8} c={c} />
        {[0.34, 0.55, 0.76].map((x, k) => {
          const [sx, sy] = P(x, 1.02, 44);
          return <g key={k}><rect x={sx - 0.6} y={sy} width="1.2" height="7" fill="#8A8799" /><ellipse cx={sx} cy={sy + 12} rx="4.5" ry="5.5" fill={k === 1 ? '#F4BE3C' : '#F0715A'} /></g>;
        })}
        <Sign at={[0.55, 0.97, 52]} e="🎊" />
      </>
    );
  },
};

function Deco({ d }) {
  if (d === 'flowers') {
    return (
      <g>
        {[0.14, 0.3, 0.46, 0.62, 0.78, 0.94].map((x, k) => {
          const [sx, sy] = P(x, 1.05);
          return (
            <g key={k}>
              <rect x={sx - 0.6} y={sy - 2} width="1.2" height="4" fill="#5FBF98" />
              <circle cx={sx} cy={sy - 4} r="3.4" fill={['#FF9B85', '#FFE08A', '#C6B5F2'][k % 3]} />
              <circle cx={sx} cy={sy - 4} r="1.2" fill={TRIM} />
            </g>
          );
        })}
      </g>
    );
  }
  if (d === 'flag') {
    const [sx, sy] = P(0.08, 1.02);
    return (
      <g>
        <rect x={sx - 1} y={sy - 54} width="2" height="54" fill="#8A8799" />
        <polygon points={`${sx + 1},${sy - 54} ${sx + 21},${sy - 47} ${sx + 1},${sy - 40}`} fill="#C6B5F2" />
        <circle cx={sx} cy={sy - 55} r="2.5" fill="#F4BE3C" />
      </g>
    );
  }
  if (d === 'lights') {
    const a = P(0.04, 1.05);
    const b = P(1.06, 1.05);
    const at = (t) => [a[0] + (b[0] - a[0]) * t, a[1] - 30 + (b[1] - a[1]) * t + 36 * t * (1 - t)];
    const mid = at(0.5);
    return (
      <g>
        <rect x={a[0] - 1} y={a[1] - 30} width="2" height="30" fill="#8A8799" />
        <rect x={b[0] - 1} y={b[1] - 30} width="2" height="30" fill="#8A8799" />
        <path d={`M${a[0]} ${a[1] - 30}Q${mid[0]} ${mid[1] + 9} ${b[0]} ${b[1] - 30}`} fill="none" stroke="#6B697D" strokeWidth="1" />
        {[0.14, 0.28, 0.42, 0.58, 0.72, 0.86].map((t, k) => {
          const [x, y] = at(t);
          return <circle key={k} cx={x} cy={y + 1} r="3" fill={['#FFE08A', '#FF9B85', '#8FD0F5'][k % 3]} />;
        })}
      </g>
    );
  }
  return null;
}

// Drawn with the plot's back corner at (0,0). `pop` plays the "just built" bounce.
export function BuildingArt({ id, color, defaultColor = 0, deco, pop }) {
  const draw = ART[id];
  if (!draw) return null;
  const c = COLORS[color ?? defaultColor] ?? COLORS[0];
  return (
    <g className={pop ? 'art pop' : 'art'}>
      {draw(c)}
      <Deco d={deco} />
    </g>
  );
}

export function PlotTile({ fill = '#BDE7C8', className }) {
  return <polygon className={className} points={quad(0, 0, TILE, TILE)} fill={fill} />;
}

// Stand-alone picture of a building for cards, permits and panels.
export function BuildingThumb({ id, color, defaultColor, deco, size = 96, locked, title }) {
  return (
    <svg className={locked ? 'thumb locked' : 'thumb'} viewBox="-74 -100 148 176" width={size} height={size * 1.19} role="img" aria-label={title || id}>
      <PlotTile fill="#D9F0DF" />
      <BuildingArt id={id} color={color} defaultColor={defaultColor} deco={deco} />
    </svg>
  );
}
