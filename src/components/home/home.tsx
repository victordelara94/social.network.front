// import { useEffect } from 'react';
// import { useUsers } from '../../hooks/use.users';
import Search from '../search/search';

const Home = () => {
  // const { loadUsers, searchedUser, actualUser } = useUsers();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (actualUser.token) {
  //         await loadUsers(actualUser.token);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, [loadUsers, actualUser.token]);

  return (
    <main>
      <Search></Search>
      {/* {searchedUser && (
        <div>
          <span>{searchedUser.userName}</span>
        </div>
      )} */}
    </main>
  );
};

export default Home;
