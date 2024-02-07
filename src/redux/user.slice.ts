import { createSlice } from '@reduxjs/toolkit';
import { User } from '../models/user.model';
import { Logued } from '../types/types';
import {
  loginThunk,
  registerThunk,
  userSearchThunk,
  usersLoadThunk,
} from './user.thunks';

export type UserState = {
  users: User[];
  searchedUser: User;
  actualUser: Logued;
  loading: 'loading' | 'load';
};
const initialState: UserState = {
  users: [],
  searchedUser: {} as User,
  actualUser: { user: {} as User, token: '' },
  loading: 'loading',
};
export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      usersLoadThunk.fulfilled,
      (state, { payload }: { payload: User[] }) => {
        state.users = payload;
        state.loading = 'load';
      }
    );

    builder.addCase(
      registerThunk.fulfilled,
      (state, { payload }: { payload: User }) => {
        state.users.push(payload);
      }
    );

    builder.addCase(
      loginThunk.fulfilled,
      (state, { payload }: { payload: Logued }) => {
        state.actualUser = payload;
      }
    );
    builder.addCase(
      userSearchThunk.fulfilled,
      (state, { payload }: { payload: User }) => {
        state.searchedUser = payload;
      }
    );
  },
});

export const actions = userSlice.actions;
export default userSlice.reducer;
