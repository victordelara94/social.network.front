import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <form role="form" onSubmit={handleSubmit} className={styles['form']}>
      <h2>¡Welcome to SocialNetwork!</h2>
      <div className={styles['form']}>
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

        <label htmlFor="file">Photo</label>
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
  );
};

export default Register;
