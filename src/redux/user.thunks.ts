import { createAsyncThunk } from '@reduxjs/toolkit';
import { Login, User } from '../models/user.model';
import { UsersRepository } from '../repositories/user.repository';
import { Logued } from '../types/types';

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
  Logued,
  { repo: UsersRepository; login: Login }
>('user/update', async ({ repo, login }) => {
  const updateuser = repo.login(login);
  return updateuser;
});
