import styles from './dashboard.module.css';

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <h1 className="muralis__text-primary px-2">CONTROLE GERAL</h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-lg-3 mb-3">
            <span className={styles.dashboard__placeholder} />
          </div>
          <div className="col-sm-12 col-lg-3 mb-3">
            <span className={styles.dashboard__placeholder} />
          </div>
          <div className="col-sm-12 col-lg-3 mb-3">
            <span className={styles.dashboard__placeholder} />
          </div>
          <div className="col-sm-12 col-lg-3 mb-3">
            <span className={styles.dashboard__placeholder} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
