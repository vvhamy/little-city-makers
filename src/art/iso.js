// Tiny isometric toolkit. World units are plot tiles; z is in screen pixels.
export const A = 60; // half tile width on screen
export const B = 30; // half tile height on screen

export const P = (x, y, z = 0) => [(x - y) * A, (x + y) * B - z];
export const pts = (list) => list.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
export const quad = (x0, y0, x1, y1, z = 0) => pts([P(x0, y0, z), P(x1, y0, z), P(x1, y1, z), P(x0, y1, z)]);

// amt < 0 mixes toward charcoal, amt > 0 toward white.
export function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255];
  const target = amt < 0 ? [59, 58, 74] : [255, 255, 255];
  const k = Math.abs(amt);
  return '#' + c.map((v, i) => Math.round(v + (target[i] - v) * k).toString(16).padStart(2, '0')).join('');
}
