import { createSlice } from '@reduxjs/toolkit';
import { User } from '../models/user.model';
import { Logued } from '../types/types';
import { loginThunk, registerThunk, usersLoadThunk } from './user.thunks';

export type UserState = {
  users: User[];
  actualUser: Logued;
  loading: 'loading' | 'load';
};
const initialState: UserState = {
  users: [],
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

    builder.addCase(usersLoadThunk.pending, (state) => {
      state.loading = 'loading';
    });
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
  },
});

export const actions = userSlice.actions;
export default userSlice.reducer;
