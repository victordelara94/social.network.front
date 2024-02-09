import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { PostsRepository } from '../../repositories/post.repository';

export const postCreateThunk = createAsyncThunk<
  Post,
  { repo: PostsRepository; postNoId: FormData }
>('post/add', async ({ repo, postNoId }) => {
  const post = repo.create(postNoId);
  return post;
});

export const postsLoadThunk = createAsyncThunk<
  Post[],
  { repo: PostsRepository }
>('post/load', async ({ repo }) => {
  const posts = await repo.getFriendsPosts();
  return posts;
});

export const postsSearchThunk = createAsyncThunk<
  Post[],
  { repo: PostsRepository; userId: User['id'] }
>('post/search', async ({ repo, userId }) => {
  const posts = await repo.searchUserPosts(userId);
  return posts;
});

export const postUpdateThunk = createAsyncThunk<
  Post,
  { repo: PostsRepository; id: Post['id']; item: Partial<Post> }
>('post/update', async ({ repo, id, item }) => {
  const post = await repo.update(id, item);
  return post;
});
