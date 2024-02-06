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

export const registerThunk = createAsyncThunk<
  User,
  { repo: UsersRepository; userNoId: FormData }
>('user/add', async ({ repo, userNoId }) => {
  const user = repo.register(userNoId);
  return user;
});

export const loginThunk = createAsyncThunk<
  User,
  { repo: UsersRepository; user: User }
>('user/update', async ({ repo, user }) => {
  const updateuser = repo.update(user.id, user);
  return updateuser;
});
