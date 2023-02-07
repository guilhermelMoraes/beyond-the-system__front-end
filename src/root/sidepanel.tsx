import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import accountFallback from './account.png';
import styles from './root.module.css';

function SidePanel() {
  const navLinkClasses = ({ isActive }: { isActive: boolean }): string => cx(
    `${styles['link-list__link']}`,
    'h5',
    'muralis-primary--hover',
    {
      'muralis-primary--active': isActive,
    },
  );

  return (
    <div className={`${styles.sidepanel} muralis-primary`}>
      <section className={`${styles.sidepanel__profile} text-white`}>
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
          <li>
            <NavLink
              to="/"
              className={navLinkClasses}
            >
              <i className="bi bi-house-fill me-3" />
              <span>
                Home
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ingressantes"
              className={navLinkClasses}
            >
              <i className="bi bi-person-fill-add me-3" />
              <span>
                Ingressantes
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SidePanel;
