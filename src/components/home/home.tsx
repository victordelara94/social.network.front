import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { usePosts } from '../../hooks/use.posts';
import { useUsers } from '../../hooks/use.users';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { actions } from '../../redux/user/user.slice';
import { AppDispatch } from '../../store/store';
import AddComment from '../add.comment/add.comment';
import Search from '../search/search';
import styles from './home.module.scss';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    loadPosts,
    addReactionPost,
    addComentToPost,
    postState: { friendsPosts },
  } = usePosts();
  const { actualUser } = useUsers();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [getIsOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (actualUser.token && actualUser.user.following.length > 0) {
        await loadPosts();
      }
    };

    fetchData();
  }, [
    actualUser.token,
    actualUser.user.following.length,
    getIsOpenModal,
    loadPosts,
  ]);

  const selectUser = (user: User) => {
    dispatch(actions.selectUser(user));
  };

  const updateLikes = async (post: Post, like: number) => {
    const likes = post.likes + like;
    addReactionPost({ likes }, post.id);
    await loadPosts();
  };

  const activateComment = () => {
    setIsOpenModal(true);
  };

  const addCommentary = async (content: string, id: string) => {
    await addComentToPost({ content }, id);
    setIsOpenModal(false);
    await loadPosts();
  };

  const handleCloseComment = () => {
    setIsOpenModal(false);
  };
  const handleToggleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };
  return (
    <div className={styles['home']}>
      <Search></Search>
      {friendsPosts.length === 0 && <span>Add friends to see their posts</span>}
      {friendsPosts.length > 0 &&
        friendsPosts.map((post) => (
          <section className={styles['section']} key={post.id}>
            <h3 className={styles['title']}>
              {post.title.charAt(0).toLocaleUpperCase() + post.title.slice(1)}
            </h3>
            <div className={styles['image-box']}>
              <img
                className={styles['post-image']}
                src={post.image.url}
                alt={post.image.publicId}
              />
            </div>
            <div className={styles['likes-box']}>
              <span
                className={styles['reactions']}
                onClick={() => updateLikes(post, +1)}
              >
                👍
              </span>
              <span>likes:{post.likes}</span>
              <span
                className={styles['reactions']}
                onClick={() => updateLikes(post, -1)}
              >
                👎
              </span>
              <span
                className={styles['reactions']}
                onClick={() => activateComment()}
              >
                💬
              </span>
            </div>
            <span>
              {post.author.userName && (
                <Link
                  to={'/user-detail'}
                  onClick={() => selectUser(post.author)}
                >
                  <strong>{post.author.userName.toLocaleUpperCase()}: </strong>
                </Link>
              )}
              {post.description.charAt(0).toLocaleUpperCase() +
                post.description.slice(1)}
            </span>{' '}
            {getIsOpenModal && (
              <AddComment
                isOpen={getIsOpenModal}
                addComentary={addCommentary}
                id={post.id}
                onClose={handleCloseComment}
              ></AddComment>
            )}
            {post.comments.length > 0 && (
              <details open={isDetailsOpen}>
                <summary onClick={handleToggleDetails}>See comments</summary>
                {post.comments.map((comment) => (
                  <div key={comment.id}>
                    <span>
                      <strong>
                        {comment.author && comment.author.userName}{' '}
                      </strong>
                      {comment.content}
                    </span>
                  </div>
                ))}
              </details>
            )}
          </section>
        ))}
    </div>
  );
};

export default Home;
