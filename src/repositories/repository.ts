import { Login, User } from '../models/user.model';
import { Logued } from '../types/types';

export interface Repository<T extends { id: number | string }> {
  register?(item: FormData): Promise<User>;
  login?(item: Login): Promise<Logued>;
  getAll?(token: string): Promise<T[]>;
  getById?(id: T['id'], token: string): Promise<T>;
  follow?(followed: User, token: string): Promise<User>;
  unfollow?(unfollowed: User, token: string): Promise<User>;
  getFriendsPosts?(token: string): Promise<T[]>;
  search?(token: string, key: string, value: unknown): Promise<T>;
  create?(item: FormData): Promise<T>;
  update?(id: T['id'], item: Partial<T>, token?: string): Promise<T>;
  delete?(id: T['id'], token: string): Promise<void>;
}
