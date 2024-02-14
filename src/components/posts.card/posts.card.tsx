import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { usePosts } from '../../hooks/use.posts';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { actions } from '../../redux/user/user.slice';
import { AppDispatch } from '../../store/store';
import AddComment from '../add.comment/add.comment';
import styles from './posts.card.module.scss';
type Props = {
  page: string;
  post: Post;
};
const PostCard = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { addReactionPost, addComentToPost } = usePosts();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [getIsOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (isDetailsOpen) {
      setIsDetailsOpen(true);
    }
  }, [isDetailsOpen]);

  const selectUser = (user: User) => {
    dispatch(actions.selectUser(user));
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
  const handleToggleDetails = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

  return (
    <section className={styles['section']} key={props.post.id}>
      <h3 className={styles['title']}>
        {props.post.title.charAt(0).toLocaleUpperCase() +
          props.post.title.slice(1)}
      </h3>
      <div className={styles['image-box']}>
        <img
          className={styles['post-image']}
          src={props.post.image.url}
          alt={props.post.image.publicId}
        />
      </div>
      <div className={styles['likes-box']}>
        <span
          className={styles['reactions']}
          onClick={() => updateLikes(props.post, +1)}
        >
          👍
        </span>
        <span>likes:{props.post.likes}</span>
        <span
          className={styles['reactions']}
          onClick={() => updateLikes(props.post, -1)}
        >
          👎
        </span>
        <span className={styles['reactions']} onClick={() => activateComment()}>
          💬
        </span>
      </div>
      <span>
        {props.post.author.userName && (
          <Link
            to={'/user-detail'}
            onClick={() => selectUser(props.post.author)}
          >
            <strong>{props.post.author.userName.toLocaleUpperCase()}: </strong>
          </Link>
        )}
        {props.post.description.charAt(0).toLocaleUpperCase() +
          props.post.description.slice(1)}
        <span> {isDetailsOpen.toString()}</span>{' '}
      </span>{' '}
      {getIsOpenModal && (
        <AddComment
          isOpen={getIsOpenModal}
          addComentary={addCommentary}
          id={props.post.id}
          onClose={handleCloseComment}
        ></AddComment>
      )}
      {props.post.comments.length > 0 && (
        <details key={props.post.id} open={isDetailsOpen}>
          <summary onClick={handleToggleDetails}>See comments</summary>
          {props.post.comments.map((comment) => (
            <div key={comment.id}>
              <span>
                <strong>{comment.author && comment.author.userName} </strong>
                {comment.content}
              </span>
            </div>
          ))}
        </details>
      )}
    </section>
  );
};
export default PostCard;
