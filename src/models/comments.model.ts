import { User } from './user.model';

export type Comment = {
  id: string;
  content: string;
  author: User;
  likes: number;
};
