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
>('user/login', async ({ repo, login }) => {
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
>('user/loadOne', async ({ repo, id, token }) => {
  const users = await repo.getById(id, token);
  return users;
});

export const userSearchThunk = createAsyncThunk<
  User[],
  { repo: UsersRepository; token: string; key: string; value: unknown }
>('user/search', async ({ repo, token, key, value }) => {
  const user = await repo.search(token, key, value);
  return user;
});

export const userFollowThunk = createAsyncThunk<
  User,
  { repo: UsersRepository; userToFollow: User; token: string }
>('user/follow', async ({ repo, userToFollow, token }) => {
  const updatedUser = repo.follow(userToFollow, token);
  return updatedUser;
});

export const userUnfollowThunk = createAsyncThunk<
  User,
  { repo: UsersRepository; userToUnfollow: User; token: string }
>('user/unfollow', async ({ repo, userToUnfollow, token }) => {
  const updatedUser = repo.unfollow(userToUnfollow, token);
  return updatedUser;
});

export const userDeleteThunk = createAsyncThunk<
  void,
  { repo: UsersRepository; token: string; id: string }
>('user/delete', async ({ repo, token, id }) => {
  await repo.delete(token, id);
});

export const userUpdateThunk = createAsyncThunk<
  User,
  {
    repo: UsersRepository;
    id: string;
    token: string;
    partialUser: Partial<User>;
  }
>('user/update', async ({ repo, id, token, partialUser }) => {
  const updatedUser = await repo.update(id, partialUser, token);
  return updatedUser;
});
