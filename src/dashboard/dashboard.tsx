import accountFallback from './account.png';
import styles from './dashboard.module.css';

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={`${styles.sidepanel} muralis-primary`}>
        <section className={styles.sidepanel__profile}>
          <img src={accountFallback} alt="" className={`${styles.profile__picture} mb-3`} />
          <p className="h3 text-center mb-0">
            Guilherme L. Mouraes
          </p>
          <p className={styles.profile__email}>
            guilherme.lmoraes.devel@gmail.com
          </p>
        </section>
        <nav>
          <ul className={styles['sidepanel__link-list']}>
            <li>teste</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Dashboard;
