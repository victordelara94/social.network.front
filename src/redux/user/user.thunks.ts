import { createAsyncThunk } from '@reduxjs/toolkit';
import { Login, User } from '../../models/user.model';
import { UsersRepository } from '../../repositories/user.repository';
import { Logued } from '../../types/types';

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

export const userLoadAllThunk = createAsyncThunk<
  User[],
  { repo: UsersRepository; token: string }
>('user/load', async ({ repo, token }) => {
  const users = await repo.getAll(token);
  return users;
});

export const userLoadOneThunk = createAsyncThunk<
  User,
  { repo: UsersRepository; token: string; id: User['id'] }
>('user/search', async ({ repo, id, token }) => {
  const users = await repo.getById(id, token);
  return users;
});

export const userSearchThunk = createAsyncThunk<
  User,
  { repo: UsersRepository; token: string; key: string; value: unknown }
>('user/search', async ({ repo, token, key, value }) => {
  const users = await repo.search(token, key, value);
  return users;
});
export const userDeleteThunk = createAsyncThunk<
  void,
  { repo: UsersRepository; token: string; id: string }
>('user/delete', async ({ repo, token, id }) => {
  await repo.delete(token, id);
});
