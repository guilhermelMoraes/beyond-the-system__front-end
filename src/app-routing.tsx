import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ApplicationForm from './application-form/application-form';
import Dashboard from './dashboard/dashboard';
import Root from './root/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        element: <Dashboard />,
        path: '/',
      },
      {
        element: <ApplicationForm />,
        path: 'ingressantes',
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
