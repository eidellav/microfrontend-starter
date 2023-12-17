import { About } from 'routes/About';
import { Root } from 'routes/Root';
import { Help } from 'routes/Help';
import type { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/help',
    element: <Help />,
  },
];
