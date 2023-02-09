/* eslint-disable consistent-return, no-restricted-syntax */
import axios from 'axios';
import Chart from 'chart.js/auto';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Applicant, Course } from '../application-form/application-form.interfaces';
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

function getEnrollmentPerCourse(courses: Course[], applicants: Applicant[]) {
  return courses.map(({ id, name }) => {
    let enrollment = 0;

    for (const { courseId } of applicants) {
      if (courseId === id) {
        enrollment += 1;
      }
    }

    return {
      name,
      enrollment,
    };
  });
}

function Dashboard() {
  const [applicantsCount, setApplicantsCount] = useState(0);
  const [enrollment, setEnrollment] = useState<Record<string, string | number>[]>([]);
  const barChartCanvas = useRef<null | HTMLCanvasElement>(null);
  const doughnutChartCanvas = useRef<null | HTMLCanvasElement>(null);

  const fetchAppData = useCallback(async () => {
    try {
      const availableCourses = await axios.get<Course[]>('http://localhost:3000/courses');
      const response = await axios.get('http://localhost:3000/applicants?_start=0');
      setEnrollment(getEnrollmentPerCourse(availableCourses.data, response.data));
      setApplicantsCount(response.data.length);
    } catch (error) {
      displayError(error);
    }
  }, []);

  useEffect(() => {
    fetchAppData();
  }, []);

  useEffect(() => {
    if (barChartCanvas?.current && doughnutChartCanvas?.current) {
      const barChart = new Chart(barChartCanvas.current.id, {
        type: 'bar',
        options: {
          maintainAspectRatio: false,
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

      const doughnutChart = new Chart(doughnutChartCanvas.current.id, {
        type: 'doughnut',
        options: {
          responsive: true,
        },
        data: {
          labels: enrollment.map(({ name }) => name),
          datasets: [{
            label: 'Cursos',
            data: enrollment.map(({ enrollment: enrollmentCount }) => enrollmentCount),
            hoverOffset: 4,
          }],
        },
      });

      return () => {
        barChart.destroy();
        doughnutChart.destroy();
      };
    }
  }, [enrollment]);

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
          <div className="col-12 col-lg-9">
            <div className={`${styles['dashboard__bar-chart']} shadow-lg px-8 mb-3`}>
              <canvas
                id="dashboard__mock-bar-chart"
                ref={barChartCanvas}
                className={`${styles.dashboard__chart} px-8`}
                style={{ width: '100%', height: 256 }}
              />
            </div>
            <div className={`${styles['dashboard__bar-chart']} shadow-lg p-0`}>
              <span className={`${styles.dashboard__placeholder} ${styles['dashboard__placeholder--chart']}`} />
            </div>
          </div>
          <div className="col-12 col-lg-3 px-2">
            <div className={`${styles.dashboard__doughnut} shadow-lg`}>
              <canvas
                id="dashboard__donut-chart"
                ref={doughnutChartCanvas}
                style={{ height: 500 }}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
