import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../../hooks/use.posts';

const CreatePostForm = () => {
  const { createPost } = usePosts();
  const navigate = useNavigate();
  const handleForm = (ev: SyntheticEvent) => {
    ev.preventDefault();
    const form = ev.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    console.log(formData.get('title'), formData.get('description'));
    createPost(formData);
    navigate('/home');
  };
  return (
    <form onSubmit={handleForm}>
      <input type="text" name="title" placeholder="Post title"></input>
      <textarea name="description" placeholder="Description"></textarea>
      <div className="file-box">
        <input
          type="file"
          name="image"
          placeholder="Select your best image"
        ></input>
      </div>
      <button type="submit">Post</button>
    </form>
  );
};

export default CreatePostForm;
