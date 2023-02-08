import axios from 'axios';
import { toast } from 'react-toastify';
import AppNotification from '../components/notification';

function displayError(error: unknown):void {
  if (axios.isAxiosError(error)) {
    toast(<AppNotification message={`${error.code} - ${error.message}`} />);
    return;
  }

  console.error(error);
}

export default displayError;
