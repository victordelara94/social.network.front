import { useEffect } from 'react';
import { usePosts } from '../../hooks/use.posts';
import { useUsers } from '../../hooks/use.users';
import PostCard from '../posts.card/posts.card';
import Search from '../search/search';
import styles from './home.module.scss';

const Home = () => {
  const { actualUser } = useUsers();
  const {
    loadPosts,
    postState: { friendsPosts },
  } = usePosts();

  useEffect(() => {
    if (actualUser.token) {
      loadPosts();
    }
  }, [actualUser.token, loadPosts]);

  return (
    <div className={styles['home']}>
      <Search></Search>
      {actualUser && actualUser.user.following.length === 0 && (
        <span>Add friends to see their content</span>
      )}
      {friendsPosts.length > 0 &&
        friendsPosts.map((post) => (
          <PostCard key={post.id} page="home" post={post}></PostCard>
        ))}
    </div>
  );
};

export default Home;
