import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/user.model';
import { Logued } from '../../types/types';
import {
  loginThunk,
  registerThunk,
  userFollowThunk,
  userLoadAllThunk,
  userSearchThunk,
  userUnfollowThunk,
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
  reducers: {
    logOut: (state) => {
      state.actualUser.user = {} as User;
      state.actualUser.token = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      userLoadAllThunk.fulfilled,
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
      (state, { payload }: { payload: User[] }) => {
        state.searchedUser = payload[0];
      }
    );
    builder.addCase(
      userFollowThunk.fulfilled,
      (state, { payload }: { payload: User }) => {
        console.log(payload);
        state.actualUser.user = payload;
      }
    );
    builder.addCase(
      userUnfollowThunk.fulfilled,
      (state, { payload }: { payload: User }) => {
        console.log(payload);
        state.actualUser.user = payload;
      }
    );
  },
});

export const actions = userSlice.actions;
export default userSlice.reducer;
