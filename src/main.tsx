import { ToastContainer } from 'react-toastify';
import ReactDOM from 'react-dom/client';
import AppRouter from './app-routing';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <ToastContainer
      hideProgressBar
      toastClassName="notification__container"
      limit={1}
      closeButton={false}
    />
    <AppRouter />
  </>,
);
