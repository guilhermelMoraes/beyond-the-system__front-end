import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, SchemaOf, string } from 'yup';
import { toast } from 'react-toastify';

import AppNotification from '../components/notification';
import Select from '../components/select';
import FORM_DATA from './application-form.data';
import { ApplicationFormValues, OptionData } from './application-form.interfaces';
import styles from './application-form.module.css';

function ApplicationForm() {
  const [cities, setCities] = useState<OptionData[]>([]);

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

  const filterCitiesByState = (choosenStateId: string) => {
    const citiesByState = FORM_DATA.city.filter(({ stateId }) => stateId === choosenStateId);
    setCities(citiesByState);
  };

  useEffect(() => {
    const { unsubscribe } = watch((values, triggeredBy) => {
      if (triggeredBy.name === 'state' && triggeredBy.type === 'change') {
        setValue('city', '');
        filterCitiesByState(values.state as string);
      }
    });

    return () => unsubscribe();
  }, [watch]);

  const sendApplicantData = async (data: ApplicationFormValues) => {
    try {
      await axios.post('http://localhost:3000/applisadcations', data);
    } catch (error) {
      toast(<AppNotification message="teste" />);
    }
  };

  return (
    <div className={styles['application-form']}>
      <main className={styles['application-form__main']}>
        <header className={`${styles['application-form__header']} muralis-primary p-3`}>
          <h1 className="mb-0">Cadastro de ingressantes</h1>
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
            options={FORM_DATA.courses}
            errorMsg={errors.courses?.message}
            control={control}
          />
          <Select
            id="state"
            labelMsg="Estado"
            defaultOptionMsg="Selecione um estado"
            options={FORM_DATA.state}
            errorMsg={errors.state?.message}
            control={control}
          />
          <Select
            id="city"
            labelMsg="Cidade"
            defaultOptionMsg="Selecione uma cidade"
            options={cities}
            errorMsg={errors.city?.message}
            control={control}
            disabled={cities.length === 0}
          />
          <button
            type="submit"
            className="btn w-100 muralis-primary muralis-primary--hover"
            disabled={!isValid || !isDirty}
          >
            ENVIAR
          </button>
        </form>
      </main>
    </div>
  );
}

export default ApplicationForm;
