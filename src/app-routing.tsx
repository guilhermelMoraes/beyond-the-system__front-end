import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ApplicationForm from './application-form/application-form';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ApplicationForm />,
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
