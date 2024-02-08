import { Post } from './post.model';
import { User } from './user.model';

export type Comment = {
  id: string;
  content: string;
  user: User;
  post: Post;
  isPrivate: boolean;
  likes: number;
};
