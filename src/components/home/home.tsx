// import { useUsers } from '../../hooks/use.users';

import { useEffect } from 'react';
import { useUsers } from '../../hooks/use.users';
import Search from '../search/search';

const Home = () => {
  const { loadUsers, users, actualUser } = useUsers();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (actualUser.token) {
          await loadUsers(actualUser.token);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [loadUsers, actualUser.token]);

  return (
    <main>
      <Search></Search>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.userName}</li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
