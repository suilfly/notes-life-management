import { createRoot } from 'react-dom/client';
import App from './src/App';
import GlobalIcon from './src/components/GlobalIcon/GlobalIcon';
import React from 'react';

const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <>
    <GlobalIcon />
    <App />
  </>
);
