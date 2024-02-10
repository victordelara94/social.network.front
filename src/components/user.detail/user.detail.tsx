import { useEffect, useState } from 'react';
import { usePosts } from '../../hooks/use.posts';
import { useUsers } from '../../hooks/use.users';
import { User } from '../../models/user.model';
import styles from './user.detail.module.scss';

const UserDetail = () => {
  const { actualUser, searchedUser } = useUsers();
  const {
    searchOwnPosts,
    postState: { userPosts },
  } = usePosts();
  const [userToDetail, setUserToDetail] = useState({} as User);
  useEffect(() => {
    if (searchedUser.id) {
      setUserToDetail(searchedUser);
    } else {
      setUserToDetail(actualUser.user);
    }
    if (userToDetail.id) {
      searchOwnPosts(userToDetail.id);
    }
  }, [searchedUser, actualUser, userToDetail, searchOwnPosts]);
  return (
    <section>
      <div className={styles['userInfo']}>
        <img />
        <span></span>
      </div>
      <div className={styles['userContent']}>
        {userToDetail.id &&
          userPosts.map((post) => (
            <article key={post.id}>{post.title}</article>
          ))}
      </div>
    </section>
  );
};
export default UserDetail;
