import { SyntheticEvent, useState } from 'react';

type Props = {
  isOpen: boolean;
  id: string;
  addComentary: (content: string, id: string) => void;
  onClose: () => void;
};

const AddComment = (props: Props) => {
  const [getContent, setContent] = useState('');
  const handleComment = (ev: SyntheticEvent) => {
    ev.preventDefault();

    props.addComentary(getContent, props.id);
    setContent('');
  };
  const handleClose = () => {
    setContent('');
    props.onClose();
  };
  return (
    <form onSubmit={handleComment}>
      <input
        placeholder="Write you commentary"
        type="text"
        value={getContent}
        name="content"
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <button type="submit">Send</button>
      <button type="button" onClick={handleClose}>
        Cancel
      </button>
    </form>
  );
};

export default AddComment;
