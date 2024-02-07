import { Login, User } from '../models/user.model';
import { Logued } from '../types/types';

export interface Repository<T extends { id: number | string }> {
  getById?(id: T['id']): Promise<T>;
  getAll?(token: string): Promise<T[]>;
  create?(item: Omit<T, 'id'>): Promise<T>;
  register?(item: FormData): Promise<User>;
  login?(item: Login): Promise<Logued>;
  update?(id: T['id'], item: Partial<T>): Promise<T>;
  delete?(id: T['id']): Promise<void>;
}
