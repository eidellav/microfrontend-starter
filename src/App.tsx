import { LinuiTheme } from '@linearb/linui-common';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

const router = createBrowserRouter(routes, { basename: '/microfrontend' });

function App() {
  return (
    <LinuiTheme initialMode='light'>
      <RouterProvider router={router} />
    </LinuiTheme>
  );
}

export default App;
