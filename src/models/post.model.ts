import { ImgData } from '../types/types';
import { User } from './user.model';

export type Post = {
  id: string;
  title: string;
  description: string;
  author: User;
  likes: number;
  image: ImgData;
  comments: Comment[];
};
