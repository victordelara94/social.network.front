import { ImgData } from '../types/types';
import { User } from './user.model';

export type Post = {
  id: string;
  title: string;
  description: string;
  user: User;
  image: ImgData;
  isPrivate: boolean;
  likes: number;
};
