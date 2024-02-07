// import { useUsers } from '../../hooks/use.users';

import { useEffect } from 'react';
import { useUsers } from '../../hooks/use.users';

const Home = () => {
  const { loadUsers, users, actualUser } = useUsers();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadUsers(actualUser.token);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [loadUsers, actualUser]);

  return (
    <main>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.userName}</li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
