import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ApplyForm from './apply-form/apply-form';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ApplyForm />,
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
