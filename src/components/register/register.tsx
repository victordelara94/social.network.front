import { SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/use.users';
import styles from './register.module.scss';

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useUsers();
  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();

    const formElement = ev.currentTarget as HTMLFormElement;
    const formData = new FormData(formElement);
    registerUser(formData);
    navigate('/login');
  };

  return (
    <div className={styles['register-box']}>
      {' '}
      <form role="form" onSubmit={handleSubmit} className={styles['form']}>
        <h2>¡Welcome to SocialNetwork!</h2>
        <input
          type="text"
          placeholder="Username"
          name="userName"
          className={styles['textInput']}
          required
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className={styles['textInput']}
          required
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          className={styles['textInput']}
          required
        />

        <div className="file-box" id="src-box">
          <input
            id="file"
            type="file"
            placeholder="Select your avatar"
            name="avatar"
            className={styles['fileInput']}
            accept="image/png, image/jpeg, image/webp"
          />
        </div>
        <button className={styles['submit']} type="submit">
          Send
        </button>
      </form>
      <Link to={'/login'}>You already haven an acount?</Link>
    </div>
  );
};

export default Register;
