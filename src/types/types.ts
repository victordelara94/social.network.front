import { User } from '../models/user.model';
export type ImgData = {
  publicId: string;
  width: number;
  height: number;
  format: string;
  url: string;
};

export type Logued = {
  user: User;
  token: string;
};
