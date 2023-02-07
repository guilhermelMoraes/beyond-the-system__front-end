import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ApplicationForm from './application-form/application-form';
import Dashboard from './dashboard/dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        element: <ApplicationForm />,
        path: 'applicant',
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
