import LeftNav from './components/LeftNav/LeftNav';
import './assets/style.scss';
import { RouterProvider } from 'react-router';
import { router } from './router/index';

export default function App() {
  return (
    <div className="note-app-wrapper">
      <LeftNav isRouteNav={false} />
      <RouterProvider router={router} />
    </div>
  );
}
