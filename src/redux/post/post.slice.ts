import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../models/post.model';
import {
  postAddCommentThunk,
  postAddReactionThunk,
  postCreateThunk,
  postUpdateThunk,
  postsLoadThunk,
  postsSearchThunk,
} from './post.thunks';

export type postState = {
  friendsPosts: Post[];
  userPosts: Post[];
};
const initialState: postState = {
  friendsPosts: [],
  userPosts: [],
};
export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      postsLoadThunk.fulfilled,
      (state, { payload }: { payload: Post[] }) => {
        state.friendsPosts = payload;
      }
    );
    builder.addCase(
      postsSearchThunk.fulfilled,
      (state, { payload }: { payload: Post[] }) => {
        state.userPosts = payload;
      }
    );

    builder.addCase(
      postCreateThunk.fulfilled,
      (state, { payload }: { payload: Post }) => {
        state.userPosts.push(payload);
      }
    );

    builder.addCase(
      postUpdateThunk.fulfilled,
      (state, { payload }: { payload: Post }) => {
        state.userPosts = state.userPosts.map((post) =>
          post.id === payload.id ? payload : post
        );
        state.friendsPosts = state.friendsPosts.map((post) =>
          post.id === payload.id ? payload : post
        );
      }
    );

    builder.addCase(
      postAddReactionThunk.fulfilled,
      (state, { payload }: { payload: Post }) => {
        state.userPosts = state.userPosts.map((post) =>
          post.id === payload.id ? payload : post
        );
        state.friendsPosts = state.friendsPosts.map((post) =>
          post.id === payload.id ? payload : post
        );
      }
    );
    builder.addCase(
      postAddCommentThunk.fulfilled,
      (state, { payload }: { payload: Post }) => {
        state.userPosts = state.userPosts.map((post) =>
          post.id === payload.id ? payload : post
        );
        state.friendsPosts = state.friendsPosts.map((post) =>
          post.id === payload.id ? payload : post
        );
      }
    );
  },
});

export const actions = postSlice.actions;
export default postSlice.reducer;
