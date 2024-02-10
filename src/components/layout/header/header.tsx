import { Link } from 'react-router-dom';
import { useUsers } from '../../../hooks/use.users';

const Header = () => {
  const { actualUser, setLogOut } = useUsers();
  const handleLogOut = () => {
    setLogOut();
  };
  return (
    <>
      <header>
        <nav>
          {actualUser.token && (
            <div>
              <Link to={'/home'}>Home</Link>
              <Link to={'/create-posts'}>Post</Link>
              <Link to={'/login'} onClick={handleLogOut}>
                LogOut
              </Link>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};
export default Header;
