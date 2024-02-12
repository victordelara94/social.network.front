import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
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
  };

  const startFollow = () => {
    followUser(searchedUser, actualUser.token);
  };
  const unFollow = () => {
    unfollowUser(searchedUser, actualUser.token);
  };

  return (
    <>
      <form onSubmit={handleForm} className={styles['search-form']}>
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
      {searchedUser.id && searchedUser.id !== actualUser.user.id && (
        <div className={styles['searched-user']}>
          <h3>Searched user</h3>
          <div className={styles['searched-user_user']}>
            <img
              className={styles['avatar-little']}
              src={searchedUser.avatar.url}
              alt="User image"
            />
            <span>
              <Link to={'/user-detail'}>{searchedUser.userName}</Link>
            </span>
            {!actualUser.user.following.find(
              (user) => user.id === searchedUser.id
            ) && <button onClick={() => startFollow()}>Follow</button>}

            {actualUser.user.following.find(
              (user) => user.id === searchedUser.id
            ) && <button onClick={() => unFollow()}>Unfollow</button>}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
