import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import Root from '@/pages/Root';
import Editor from '@/pages/Editor';
import Components from '@/pages/Components';
import Board from '@/pages/Board';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
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
