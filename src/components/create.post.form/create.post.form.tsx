import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../../hooks/use.posts';
import styles from './create.post.form.module.scss';
const CreatePostForm = () => {
  const { createPost } = usePosts();
  const navigate = useNavigate();
  const handleForm = (ev: SyntheticEvent) => {
    ev.preventDefault();
    const form = ev.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    createPost(formData);
    navigate('/home');
  };
  return (
    <form onSubmit={handleForm} className={styles['post-form']}>
      <input
        type="text"
        name="title"
        placeholder="Post title"
        className={styles['title']}
      ></input>
      <textarea
        className={styles['textarea']}
        name="description"
        placeholder="Description"
      ></textarea>
      <div className="file-box" id="src-box">
        <input
          type="file"
          name="image"
          placeholder="Select your best image"
        ></input>
      </div>
      <button type="submit" className={styles['submit']}>
        Post
      </button>
    </form>
  );
};

export default CreatePostForm;
