import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { object, SchemaOf, string } from 'yup';

import AppNotification, { AppNotificationVariants } from '../common/components/notification';
import Select from '../common/components/select';
import ApplicationFormData, {
  ApplicationFormValues,
  City,
  Course,
  OptionData,
  State,
} from './application-form.interfaces';
import styles from './application-form.module.css';

const FAKE_API_BASE_URL = 'http://localhost:3000';

function ApplicationForm() {
  const [availableCities, setAvailableCities] = useState<OptionData[]>([]);
  const [selectOptions, setSelectOptions] = useState<ApplicationFormData>({
    cities: [],
    courses: [],
    states: [],
  });

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
    reset,
    formState: {
      errors,
      isDirty,
      isValid,
      isSubmitting,
    },
    control,
    handleSubmit,
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

  const displayError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      toast(<AppNotification message={`${error.code} - ${error.message}`} />);
      return;
    }
    console.error(error);
  };

  useEffect(() => {
    const fetchSelectOptions = async () => {
      try {
        const availableCourses = axios.get<Course[]>(`${FAKE_API_BASE_URL}/courses`);
        const brStates = axios.get<State[]>(`${FAKE_API_BASE_URL}/states`);
        const brCities = axios.get<City[]>(`${FAKE_API_BASE_URL}/cities`);

        const data = await Promise.all([availableCourses, brStates, brCities]);

        setSelectOptions({
          courses: data[0].data,
          states: data[1].data,
          cities: data[2].data,
        });
      } catch (error) {
        displayError(error);
      }
    };

    fetchSelectOptions();
  }, []);

  useEffect(() => {
    const filterCitiesByState = (choosenStateId: string) => {
      const citiesByState = selectOptions
        .cities.filter(({ stateId }) => stateId === choosenStateId);
      setAvailableCities(citiesByState);
    };

    const { unsubscribe } = watch((values, triggeredBy) => {
      if (triggeredBy.name === 'state' && triggeredBy.type === 'change') {
        setValue('city', '');
        filterCitiesByState(values.state as string);
      }
    });

    return () => unsubscribe();
  }, [watch, selectOptions]);

  const sendApplicantData = async (data: ApplicationFormValues): Promise<void> => {
    try {
      await axios.post(`${FAKE_API_BASE_URL}/applicants`, data);
      reset();
      toast(<AppNotification type={AppNotificationVariants.SUCCESS} message="Ingressante cadastrado com sucesso" />);
    } catch (error) {
      displayError(error);
    }
  };

  return (
    <div className={styles['application-form']}>
      <main className={styles['application-form__main']}>
        <header className={`${styles['application-form__header']} muralis-primary p-3`}>
          <h1 className="text-white mb-0">Cadastro de ingressantes</h1>
        </header>
        <form className={styles['application-form__form']} onSubmit={handleSubmit(sendApplicantData)}>
          <div className="mb-3">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              className={cx('form-control', {
                'is-invalid': errors.name,
              })}
              placeholder="Fulano Silva"
              disabled={isSubmitting}
              {...register('name')}
            />
            <small className="d-inline-block invalid-feedback">
              {errors.name?.message}
            </small>
          </div>
          <Select
            id="courses"
            labelMsg="Curso"
            defaultOptionMsg="Selecione um curso"
            options={selectOptions.courses}
            errorMsg={errors.courses?.message}
            control={control}
            disabled={isSubmitting}
          />
          <Select
            id="state"
            labelMsg="Estado"
            defaultOptionMsg="Selecione um estado"
            options={selectOptions.states}
            errorMsg={errors.state?.message}
            control={control}
            disabled={isSubmitting}
          />
          <Select
            id="city"
            labelMsg="Cidade"
            defaultOptionMsg="Selecione uma cidade"
            options={availableCities}
            errorMsg={errors.city?.message}
            control={control}
            disabled={availableCities.length === 0 || isSubmitting}
          />
          <button
            type="submit"
            className="btn muralis-primary muralis-primary--hover w-100"
            disabled={!isValid || !isDirty || isSubmitting}
          >
            {!isSubmitting ? 'ENVIAR' : (
              <>
                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
                ENVIANDO
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
}

export default ApplicationForm;
