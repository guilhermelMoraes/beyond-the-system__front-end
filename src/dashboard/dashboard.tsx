/* eslint-disable consistent-return */
import axios from 'axios';
import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';
import displayError from '../common/error/display-error';

import styles from './dashboard.module.css';

const MONTHS_PT_BR = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

function Dashboard() {
  const [applicantsCount, setApplicantsCount] = useState(0);
  const barChartCanvas = useRef<null | HTMLCanvasElement>(null);

  useEffect(() => {
    const fetchApplicantsData = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/applicants?_start=0');
        setApplicantsCount(data.length);
      } catch (error) {
        displayError(error);
      }
    };

    fetchApplicantsData();

    if (barChartCanvas?.current) {
      const barChart = new Chart(barChartCanvas.current.id, {
        type: 'bar',
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Inscritos',
            },
          },
        },
        data: {
          labels: MONTHS_PT_BR,
          datasets: [
            {
              data: [8, 5, 3, 4, 5, 3, 3, 6, 5, 2, 1, 9],
              label: 'Matemática',
              backgroundColor: '#0e2c4e',
            },
            {
              data: [1, 3, 5, 7, 1, 8, 2, 6, 2, 1, 4, 5],
              label: 'Geografia',
              backgroundColor: '#ef7228',
            },
          ],
        },
      });

      return () => barChart.destroy();
    }
  }, []);

  return (
    <div className={styles.dashboard}>
      <h1 className="muralis__text-primary px-2">CONTROLE GERAL</h1>
      <div className="container-fluid">
        <div className="row pb-3">
          <section className={`${styles.dashboard__row} col`}>
            <span className={`${styles.dashboard__placeholder} shadow`} />
            <span className={`${styles.dashboard__placeholder} shadow`} />
            <span className={`${styles.dashboard__placeholder} shadow`} />
            <div className="shadow-lg p-3">
              <h5 className="text-center">
                Total de ingressantes
              </h5>
              <h3 className="text-center">{applicantsCount}</h3>
            </div>
          </section>
        </div>
        <section className="row">
          <div>
            <div id={styles.dashboard__teste} className="shadow-lg">
              <canvas
                id="dashboard__mock-bar-chart"
                ref={barChartCanvas}
                className="px-8"
                style={{ width: '100%', height: 256 }}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
