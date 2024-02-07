import { SyntheticEvent } from 'react';
import styles from './login.module.scss';

const LoginForm = () => {
  const handleForm = async (ev: SyntheticEvent) => {
    ev.preventDefault();
  };

  return (
    <form onSubmit={handleForm} className={styles.loginForm}>
      <input
        className={styles.textInput}
        type="text"
        name="userName"
        required
      />

      <button type="submit" className={styles.buttonSubmit}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
