import { useForm } from 'react-hook-form';

import FORM_DATA from './application-form.data';
import { OptionData } from './application-form.interfaces';
import styles from './application-form.module.css';

function ApplicationForm() {
  const { register, watch } = useForm({
    defaultValues: {
      name: '',
      courses: '',
      state: '',
      city: '',
    },
  });
  const stateInputValue = watch('state');

  const renderSelectOptions = (options: OptionData[]) => options
    .map(({ id, name }) => (
      <option key={id} value={id}>{name}</option>
    ));

  const filterCitiesByState = (choosenStateId: string) => {
    const citiesByState = FORM_DATA.city.filter(({ stateId }) => stateId === choosenStateId);
    return renderSelectOptions(citiesByState);
  };

  return (
    <div className={styles['application-form']}>
      <main className={styles['application-form__main']}>
        <header className={`${styles['application-form__header']} muralis-primary p-3`}>
          <h1 className="mb-0">Cadastro de ingressantes</h1>
        </header>
        <form className={styles['application-form__form']}>
          <div className="mb-3">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              className="form-control"
              placeholder="Fulano Silva"
              {...register('name')}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="courses">
              Curso
            </label>
            <select
              id="courses"
              className="form-select"
              aria-label="Seleção de curso"
              {...register('courses')}
            >
              <option value="" disabled defaultValue="">Selecione um curso</option>
              {renderSelectOptions(FORM_DATA.courses)}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="state">
              Estado
            </label>
            <select
              id="state"
              className="form-select"
              aria-label="Seleção de estado"
              {...register('state')}
            >
              <option value="" disabled defaultValue="">Selecione um estado</option>
              {renderSelectOptions(FORM_DATA.state)}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="city">
              Cidade
            </label>
            <select
              id="city"
              className="form-select"
              aria-label="Seleção de cidade"
              disabled={stateInputValue === ''}
              {...register('city')}
            >
              <option value="" disabled defaultValue="">Selecione uma cidade</option>
              {filterCitiesByState(stateInputValue)}
            </select>
          </div>
          <button
            type="submit"
            className="btn w-100 muralis-primary muralis-primary--hover"
          >
            ENVIAR
          </button>
        </form>
      </main>
    </div>
  );
}

export default ApplicationForm;
