// The cast. Children are described by what they love doing, never by where their family is from.
import React from 'react';

export const KIDS = {
  mai: { name: 'Mai', skin: '#F5D0AE', hair: '#2E2A33', style: 'bob', shirt: '#FF9B85', loves: 'painting' },
  joon: { name: 'Joon', skin: '#F1C8A2', hair: '#2E2A33', style: 'short', shirt: '#8FD0F5', loves: 'football' },
  leo: { name: 'Leo', skin: '#E7B58E', hair: '#8A5A3C', style: 'curls', shirt: '#9FE0C2', loves: 'robots' },
  amara: { name: 'Amara', skin: '#8D5A3B', hair: '#2B2026', style: 'puffs', shirt: '#FFE08A', loves: 'building things' },
  sofia: { name: 'Sofia', skin: '#DDA57C', hair: '#A6542E', style: 'pony', shirt: '#C6B5F2', loves: 'gardening' },
};

const CAP = 'M20 33c0-12 9-19 20-19s20 7 20 19c-6-5-13-7-20-7s-14 2-20 7z';

function Hair({ style, c }) {
  switch (style) {
    case 'bob':
      return <path d="M17 40c0-17 10-27 23-27s23 10 23 27v9h-7V34c-7-1-12-4-16-9-4 5-9 8-16 9v15h-7z" fill={c} />;
    case 'curls':
      return <g fill={c}>{[[22, 28], [26, 20], [34, 15], [43, 14], [52, 18], [58, 26]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="7.5" />)}</g>;
    case 'puffs':
      return <g fill={c}><circle cx="17" cy="21" r="10" /><circle cx="63" cy="21" r="10" /><path d={CAP} /></g>;
    case 'pony':
      return <g fill={c}><path d="M57 24c11 2 14 15 9 27-3-7-6-11-11-13z" /><path d={CAP} /></g>;
    default:
      return <path d={CAP} fill={c} />;
  }
}

const MOUTH = {
  happy: <path d="M33 44q7 7 14 0" />,
  sad: <path d="M34 48q6-5 12 0" />,
  calm: <path d="M35 46h10" />,
};

export function Kid({ id, mood = 'happy', size = 72 }) {
  const k = KIDS[id];
  if (!k) return null;
  return (
    <svg className="kid" viewBox="0 0 80 80" width={size} height={size} role="img" aria-label={k.name}>
      <path d="M12 80c0-16 12-23 28-23s28 7 28 23z" fill={k.shirt} />
      {k.style === 'bob' && <Hair style="bob" c={k.hair} />}
      <circle cx="40" cy="36" r="20" fill={k.skin} />
      {k.style !== 'bob' && <Hair style={k.style} c={k.hair} />}
      {k.style === 'bob' && <path d="M21 33c1-11 9-17 19-17s18 6 19 17c-7-1-13-4-17-9-5 5-13 8-21 9z" fill={k.hair} />}
      <circle cx="33" cy="37" r="2.4" fill="#3B3A4A" /><circle cx="47" cy="37" r="2.4" fill="#3B3A4A" />
      <circle cx="28" cy="43" r="3.2" fill="#FF9B85" opacity=".45" /><circle cx="52" cy="43" r="3.2" fill="#FF9B85" opacity=".45" />
      {mood === 'sad' && <g stroke="#3B3A4A" strokeWidth="1.8" strokeLinecap="round"><path d="M29 32l6-2" /><path d="M51 32l-6-2" /></g>}
      <g fill="none" stroke="#3B3A4A" strokeWidth="2.4" strokeLinecap="round">{MOUTH[mood] || MOUTH.happy}</g>
    </svg>
  );
}

// Pip the builder bird: the guide. A mascot, not a person, so it never poses as a human friend.
export function Pip({ size = 64 }) {
  return (
    <svg className="pip" viewBox="0 0 80 80" width={size} height={size} role="img" aria-label="Pip">
      <ellipse cx="14" cy="54" rx="7" ry="11" fill="#7FCDAA" /><ellipse cx="66" cy="54" rx="7" ry="11" fill="#7FCDAA" />
      <circle cx="40" cy="50" r="25" fill="#9FE0C2" />
      <ellipse cx="40" cy="59" rx="14" ry="13" fill="#FFFDF8" />
      <circle cx="31" cy="44" r="3" fill="#3B3A4A" /><circle cx="49" cy="44" r="3" fill="#3B3A4A" />
      <circle cx="32" cy="43" r="1" fill="#FFFDF8" /><circle cx="50" cy="43" r="1" fill="#FFFDF8" />
      <path d="M35 49h10l-5 6z" fill="#F7A54A" />
      <path d="M19 33c0-13 9-21 21-21s21 8 21 21z" fill="#FFD45E" />
      <rect x="37" y="10" width="6" height="16" rx="3" fill="#F4BE3C" />
      <rect x="14" y="30" width="52" height="6" rx="3" fill="#F4BE3C" />
    </svg>
  );
}
