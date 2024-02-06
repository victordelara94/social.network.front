import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../models/user.model';
import { UsersRepository } from '../repositories/user.repository';

export const usersLoadThunk = createAsyncThunk<User[], UsersRepository>(
  'user/load',
  async (repo) => {
    const users = await repo.getAll();
    return users;
  }
);

export const usersCreateThunk = createAsyncThunk<
  User,
  { repo: UsersRepository; userNoId: Omit<User, 'id'> }
>('user/add', async ({ repo, userNoId }) => {
  const user = repo.create(userNoId);
  return user;
});

export const userUpdateThunk = createAsyncThunk<
  User,
  { repo: UsersRepository; user: User }
>('user/update', async ({ repo, user }) => {
  const updateuser = repo.update(user.id, user);
  return updateuser;
});

export const userDeleteThunk = createAsyncThunk<
  User['id'],
  {
    repo: UsersRepository;
    user: User;
  }
>('user/delete', async ({ repo, user }) => {
  repo.delete(user.id);
  return user.id;
});
