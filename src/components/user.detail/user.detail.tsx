import { useEffect, useState } from 'react';
import { usePosts } from '../../hooks/use.posts';
import { useUsers } from '../../hooks/use.users';
import { User } from '../../models/user.model';
import PostCard from '../posts.card/posts.card';
import Switch from '../switch/switch';
import styles from './user.detail.module.scss';
const UserDetail = () => {
  const { actualUser, searchedUser, updateUser } = useUsers();
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
  }, [searchedUser, actualUser]);

  useEffect(() => {
    if (userToDetail.id) {
      searchOwnPosts(userToDetail.id);
    }
  }, [userToDetail, searchOwnPosts]);

  const handleChange = (isChecked: boolean) => {
    updateUser(actualUser.user.id, actualUser.token, { isPrivate: isChecked });
  };

  return (
    <section>
      {!searchedUser.id && (
        <div className={styles['private']}>
          <span>Public</span>
          <Switch
            isPrivate={actualUser.user.isPrivate}
            onChange={handleChange}
          ></Switch>
        </div>
      )}
      {userToDetail.id && (
        <div className={styles['user-info']}>
          <img className={styles['avatar-big']} src={userToDetail.avatar.url} />
          <h2 className={styles['username']}>
            {userToDetail.userName.charAt(0).toLocaleUpperCase() +
              userToDetail.userName.slice(1)}
          </h2>
        </div>
      )}
      {userPosts.length > 0 &&
        userPosts.map((post) => (
          <PostCard key={post.id} page="profile" post={post}></PostCard>
        ))}
    </section>
  );
};
export default UserDetail;
