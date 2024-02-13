import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../../hooks/use.posts';
import { useUsers } from '../../hooks/use.users';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import AddComment from '../add.comment/add.comment';
import Switch from '../switch/switch';
import styles from './user.detail.module.scss';
const UserDetail = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [getIsOpenModal, setIsOpenModal] = useState(false);
  const { actualUser, searchedUser, updateUser } = useUsers();
  const {
    searchOwnPosts,
    addComentToPost,
    addReactionPost,
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
  }, [
    searchedUser,
    actualUser,
    userToDetail,
    searchOwnPosts,
    setUserToDetail,
    getIsOpenModal,
  ]);

  const handleChange = (isChecked: boolean) => {
    updateUser(actualUser.user.id, actualUser.token, { isPrivate: isChecked });
  };
  const handleToggleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };
  const updateLikes = async (post: Post, like: number) => {
    const likes = post.likes + like;
    addReactionPost({ likes }, post.id);
  };

  const activateComment = () => {
    setIsOpenModal(true);
  };
  const addCommentary = async (content: string, id: string) => {
    await addComentToPost({ content }, id);
    setIsOpenModal(false);
  };

  const handleCloseComment = () => {
    setIsOpenModal(false);
  };
  console.log(userToDetail);
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
          <span></span>
        </div>
      )}
      <div className={styles['user-content']}>
        {userPosts.length === 0 && (
          <span>
            You have no content.{' '}
            <Link to={'/create-posts'}>Lets go and create content</Link>
          </span>
        )}
        {userToDetail.id &&
          userPosts.map((post) => (
            <article key={post.id} className={styles['content-info']}>
              <h3 className={styles['title']}> {post.title}</h3>
              <img className={styles['post-image']} src={post.image.url} />
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
                  <strong>{post.author.userName.toLocaleUpperCase()}: </strong>
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
                <details key={post.id} open={isDetailsOpen}>
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
            </article>
          ))}
      </div>
    </section>
  );
};
export default UserDetail;
