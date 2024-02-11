import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { usePosts } from '../../hooks/use.posts';
import { useUsers } from '../../hooks/use.users';
import { User } from '../../models/user.model';
import { actions } from '../../redux/user/user.slice';
import { AppDispatch } from '../../store/store';
import Search from '../search/search';
import styles from './home.module.scss';
const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    loadPosts,
    postState: { friendsPosts },
  } = usePosts();

  const { actualUser } = useUsers();
  useEffect(() => {
    const fetchData = async () => {
      if (actualUser.token && actualUser.user.following.length > 0) {
        await loadPosts();
      }
    };
    fetchData();
  }, [actualUser, loadPosts]);
  const selectUser = (user: User) => {
    dispatch(actions.selectUser(user));
  };
  return (
    <div className={styles['home']}>
      <Search></Search>
      {friendsPosts.length === 0 && <span>Add friends to see their posts</span>}
      {friendsPosts.length > 0 &&
        friendsPosts.map((post) => (
          <section className={styles['section']} key={post.id}>
            <h3>{post.title}</h3>
            <div className={styles['image-box']}>
              <img
                className={styles['post-image']}
                src={post.image.url}
                alt={post.image.publicId}
              />
            </div>
            <div className={styles['likes-box']}>
              <span>👍</span>
              <span>likes:{post.likes}</span>
              <span>👎</span>
              <span>💬</span>
            </div>
            <span>
              <Link to={'/user-detail'} onClick={() => selectUser(post.author)}>
                <strong>{post.author.userName}</strong>
              </Link>
              {post.description}
            </span>{' '}
          </section>
        ))}
    </div>
  );
};

export default Home;
