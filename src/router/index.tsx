import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home.tsx';
import Root from '@/pages/Root.tsx';
import Editor from '@/pages/Editor.tsx';
import Components from '@/pages/Components.tsx';
import Board from '@/pages/Board.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'editor',
        element: <Editor />,
      },
      {
        path: 'components',
        element: <Components />,
      },
      {
        path: 'draw-board',
        element: <Board />,
      },
    ],
  },
]);
