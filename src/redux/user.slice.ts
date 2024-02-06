import { createSlice } from '@reduxjs/toolkit';
import { User } from '../models/user.model';
import {
  loginThunk,
  registerThunk,
  userDeleteThunk,
  usersLoadThunk,
} from './user.thunks';

export type UserState = {
  users: User[];
  error: Error | null;
  loading: 'loading' | 'load';
};
const initialState: UserState = {
  users: [],
  error: null,
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
    builder.addCase(usersLoadThunk.rejected, (state) => {
      const error = new Error('Error loading users');
      state.error = error;
    });
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
      (state, { payload }: { payload: User }) => {
        state.users = state.users.map((user) =>
          user.id === payload.id ? payload : user
        );
      }
    );

    builder.addCase(
      userDeleteThunk.fulfilled,
      (state, { payload }: { payload: User['id'] }) => {
        state.users = state.users.filter((user) => user.id !== payload);
      }
    );
  },
});

export const actions = userSlice.actions;
export default userSlice.reducer;
