import { SyntheticEvent, useEffect } from 'react';
import { useUsers } from '../../hooks/use.users';
import styles from './search.module.scss';

const Search = () => {
  const { searchUser, followUser, unfollowUser, actualUser, searchedUser } =
    useUsers();

  const handleForm = (ev: SyntheticEvent) => {
    ev.preventDefault();
    const formElement = ev.currentTarget as HTMLFormElement;
    const formData = new FormData(formElement);

    const value = formData.get('userName');
    const key = (formElement.firstChild as HTMLInputElement).name;
    searchUser(actualUser.token, key, value);
    console.log(actualUser);
  };

  const startFollow = () => {
    followUser(searchedUser, actualUser.token);
  };
  const unFollow = () => {
    unfollowUser(searchedUser, actualUser.token);
  };

  useEffect(() => {
    // Aquí puedes realizar acciones adicionales después de seguir o dejar de seguir,
    // como cargar nuevamente la lista de usuarios, etc.
  }, [searchedUser]);

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
      {searchedUser.id && searchedUser.id !== actualUser.user.id && (
        <div>
          <h3>Searched user</h3>
          <span>{searchedUser.userName}</span>
          {!actualUser.user.following.find(
            (user) => user.id === searchedUser.id
          ) && <button onClick={() => startFollow()}>Follow</button>}

          {actualUser.user.following.find(
            (user) => user.id === searchedUser.id
          ) && <button onClick={() => unFollow()}>Unfollow</button>}
        </div>
      )}
    </form>
  );
};

export default Search;
