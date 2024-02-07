import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
// import { useUsers } from '../../hooks/use.users';
import { useUsers } from '../../hooks/use.users';
import { Login } from '../../models/user.model';
import styles from './login.module.scss';

const LoginForm = () => {
  const { loginUser, actualUser } = useUsers();

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
    console.log(actualUser);
  };

  return (
    <main>
      <form onSubmit={handleForm} className={styles.loginForm}>
        <h2>Login</h2>
        <label>Username:</label>
        <input
          className={styles.textInput}
          type="text"
          name="userName"
          required
        />
        <label>Password:</label>
        <input className={styles.textInput} type="password" name="password" />
        <button type="submit" className={styles.buttonSubmit}>
          Login
        </button>

        <div>
          If you are not registered go to:
          <Link to="/register" className="register">
            Register
          </Link>
        </div>
      </form>
    </main>
  );
};

export default LoginForm;
