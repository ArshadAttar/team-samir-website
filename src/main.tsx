import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { pageFromPath } from './lib/routes';
import { PAGES, prefetchPages } from './pages/registry';
import './index.css';

// Load the current page's chunk first so the prerendered HTML is replaced without a blank frame.
const current = pageFromPath(window.location.pathname);
(current ? PAGES[current].load() : Promise.resolve())
  .catch(() => undefined)
  .then(() => {
    createRoot(document.getElementById('root')!).render(<App />);
    prefetchPages();
  });
