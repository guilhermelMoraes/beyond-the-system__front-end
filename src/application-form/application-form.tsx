import styles from './application-form.module.css';

function ApplicationForm() {
  return (
    <div className={`${styles['application-form']} bg-secondary`}>
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
            />
          </div>
          <div className="mb-3">
            <label htmlFor="courses">
              Curso
            </label>
            <select id="courses" className="form-select" aria-label="Seleção de curso">
              <option value="" disabled selected>Selecione um curso</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="state">
              Estado
            </label>
            <select id="state" className="form-select" aria-label="Seleção de estado">
              <option value="" disabled selected>Selecione um estado</option>
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
