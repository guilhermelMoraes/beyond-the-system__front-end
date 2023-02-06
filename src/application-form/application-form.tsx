import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, SchemaOf, string } from 'yup';

import FORM_DATA from './application-form.data';
import { ApplicationFormValues, OptionData } from './application-form.interfaces';
import styles from './application-form.module.css';

function ApplicationForm() {
  const validationSchema: SchemaOf<ApplicationFormValues> = object().shape({
    name: string().required('Nome é um campo obrigatório'),
    courses: string().required('Curso é uma campo obrigatório').not([''], 'Selecione um curso válido'),
    state: string().required('Estado é uma campo obrigatório').not([''], 'Selecione um estado válido'),
    city: string().required('Cidade é uma campo obrigatório').not([''], 'Selecione uma cidade válida'),
  });

  const {
    watch,
    register,
    setValue,
    formState: {
      errors,
      isDirty,
      isValid,
    },
  } = useForm<ApplicationFormValues>({
    mode: 'all',
    defaultValues: {
      name: '',
      courses: '',
      state: '',
      city: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const renderSelectOptions = (options: OptionData[]) => options
    .map(({ id, name }) => (
      <option key={id} value={id}>{name}</option>
    ));

  const filterCitiesByState = (choosenStateId: string) => {
    if (getValues('city') !== '') {
      setValue('city', '');
    }

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
              className={cx('form-control', {
                'is-invalid': errors.name,
              })}
              placeholder="Fulano Silva"
              {...register('name')}
            />
            <small className="d-inline-block invalid-feedback">
              {errors.name?.message}
            </small>
          </div>
          <div className="mb-3">
            <label htmlFor="courses">
              Curso
            </label>
            <select
              id="courses"
              className={cx('form-select', {
                'is-invalid': errors.courses,
              })}
              aria-label="Seleção de curso"
              defaultValue=""
              {...register('courses')}
            >
              <option value="" disabled>Selecione um curso</option>
              {renderSelectOptions(FORM_DATA.courses)}
            </select>
            <small className="d-inline-block invalid-feedback">
              {errors.courses?.message}
            </small>
          </div>
          <div className="mb-3">
            <label htmlFor="state">
              Estado
            </label>
            <select
              id="state"
              className={cx('form-select', {
                'is-invalid': errors.state,
              })}
              aria-label="Seleção de estado"
              defaultValue=""
              {...register('state')}
            >
              <option value="" disabled>Selecione um estado</option>
              {renderSelectOptions(FORM_DATA.state)}
            </select>
            <small className="d-inline-block invalid-feedback">
              {errors.state?.message}
            </small>
          </div>
          <div className="mb-3">
            <label htmlFor="city">
              Cidade
            </label>
            <select
              id="city"
              className={cx('form-select', {
                'is-invalid': errors.city,
              })}
              aria-label="Seleção de cidade"
              defaultValue=""
              disabled={cities.length === 0}
              {...register('city')}
            >
              <option value="" disabled>Selecione uma cidade</option>
              {cities}
            </select>
            <small className="d-inline-block invalid-feedback">
              {errors.city?.message}
            </small>
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
