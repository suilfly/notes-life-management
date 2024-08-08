import { createRoot } from 'react-dom/client';
import App from './src/App';
import GlobalIcon from '@/components/GlobalIcon/GlobalIcon.tsx';

const root = createRoot(document.getElementById('app'));
root.render(
  <>
    <GlobalIcon />
    <App />
  </>
);
