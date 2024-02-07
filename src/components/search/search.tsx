import { SyntheticEvent } from 'react';
import { useUsers } from '../../hooks/use.users';
import styles from './search.module.scss';

const Search = () => {
  const { searchUser, searchedUser, actualUser } = useUsers();
  const handleForm = async (ev: SyntheticEvent) => {
    ev.preventDefault();
    const formElement = ev.currentTarget as HTMLFormElement;
    const formData = new FormData(formElement);
    const value = formData.get('userName');
    const key = (formElement.firstChild as HTMLInputElement).name;
    await searchUser(actualUser.token, key, value);
    console.log(searchedUser);
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
        Search
      </button>
    </form>
  );
};

export default Search;
