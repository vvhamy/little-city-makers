import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));
const start = (boot) => root.render(<App boot={boot} />);

// Inside the Claude artifact viewer, `hot` restores the last snapshot after a republish. Elsewhere it is absent.
const hot = window.claude?.hot;
if (hot?.ready) hot.ready(start);
else start(hot?.data ?? {});
