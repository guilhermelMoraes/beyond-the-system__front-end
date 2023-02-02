import styles from './apply-form.module.css';

function ApplyForm() {
  return (
    <div className={`${styles['apply-form']} bg-secondary`}>
      <main className={styles['apply-form__main']}>
        <header className="bg-primary p-3">
          <h1 className="text-white mb-0">Cadastro de Ingressantes</h1>
        </header>
        <form className={styles['apply-form__form']}>
          teste
        </form>
      </main>
    </div>
  );
}

export default ApplyForm;
