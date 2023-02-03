import ApplicationFormData from './application-form.interfaces';

const FORM_DATA: ApplicationFormData = {
  name: '',
  courses: [
    {
      id: '0',
      name: 'Matemática',
    },
    {
      id: '1',
      name: 'Letras',
    },
    {
      id: '2',
      name: 'Geografia',
    },
  ],
  state: [
    {
      id: '0',
      name: 'São Paulo',
    },
    {
      id: '1',
      name: 'Rio de Janeiro',
    },
    {
      id: '2',
      name: 'Minas Gerais',
    },
  ],
  city: [
    {
      id: '0',
      name: 'Mogi das Cruzes',
      stateId: '0',
    },
    {
      id: '1',
      name: 'Suzano',
      stateId: '0',
    },
    {
      id: '2',
      name: 'Poá',
      stateId: '0',
    },
    {
      id: '3',
      name: 'Guararema',
      stateId: '0',
    },
    {
      id: '4',
      name: 'Angra dos Reis',
      stateId: '1',
    },
    {
      id: '5',
      name: 'Niterói',
      stateId: '1',
    },
    {
      id: '6',
      name: 'Itaboraí',
      stateId: '1',
    },
    {
      id: '7',
      name: 'Belo Horizonte',
      stateId: '2',
    },
    {
      id: '8',
      name: 'Monte Azul',
      stateId: '2',
    },
    {
      id: '9',
      name: 'Muzambinho',
      stateId: '2',
    },
  ],
};

export default FORM_DATA;
