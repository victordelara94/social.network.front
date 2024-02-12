import { Link } from 'react-router-dom';
import { useUsers } from '../../../hooks/use.users';
import styles from './header.module.scss';
const Header = () => {
  const { actualUser, setLogOut, deleteSearchedUser } = useUsers();
  const handleLogOut = () => {
    setLogOut();
  };
  const handleDeleteSearchedUser = () => {
    deleteSearchedUser();
  };
  return (
    <header className={styles['header']}>
      <h1 className={styles['title']}>SocialNet</h1>
      {actualUser.token && (
        <nav className={styles['nav']}>
          <Link to={'/home'} onClick={handleDeleteSearchedUser}>
            Home
          </Link>
          <Link to={'/user-detail'} onClick={handleDeleteSearchedUser}>
            Profile
          </Link>
          <Link to={'/create-posts'} onClick={handleDeleteSearchedUser}>
            Post
          </Link>
          <Link
            className={styles['log-out']}
            to={'/login'}
            onClick={handleLogOut}
          >
            LogOut
          </Link>
        </nav>
      )}
    </header>
  );
};
export default Header;
