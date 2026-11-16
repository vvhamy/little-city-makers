// Prototype build only: React comes from the CDN <script> tags in index.html.
// For a production build (Vite, Next…), delete /shims and the alias in build.mjs and `npm install react react-dom`.
const R = window.React;
export default R;
export const { useState, useEffect, useMemo, useReducer, useRef, useCallback, Fragment, createElement } = R;
