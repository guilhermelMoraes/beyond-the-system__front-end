import { Outlet } from 'react-router-dom';

import styles from './root.module.css';
import SidePanel from './sidepanel';

function Root() {
  return (
    <div className={styles.root}>
      <SidePanel />
      <main className="container-fluid">
        <div className="row">
          <div className="col g-0">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Root;
