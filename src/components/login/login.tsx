import { SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import { Login } from '../../models/user.model';
import styles from './login.module.scss';

const LoginForm = () => {
  const { loginUser } = useUsers();
  const navigate = useNavigate();
  const handleForm = async (ev: SyntheticEvent) => {
    ev.preventDefault();

    const formElement = ev.currentTarget as HTMLFormElement;
    const formData = new FormData(formElement);
    const userName = formData.get('userName') as string;
    const password = formData.get('password') as string;

    const user: Login = {
      userName,
      password,
    };
    await loginUser(user);
    navigate('/home');
  };

  return (
    <div>
      <form onSubmit={handleForm} className={styles['login-form']}>
        <input
          placeholder="User name"
          className={styles.textInput}
          type="text"
          name="userName"
          required
        />

        <input
          placeholder="Password"
          className={styles.textInput}
          type="password"
          name="password"
        />

        <button type="submit" className={styles.buttonSubmit}>
          Login
        </button>
      </form>
      <div>
        If you are not registered go to:
        <Link to="/register" className="register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
