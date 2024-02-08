import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { PostsRepository } from '../../repositories/post.repository';

export const registerThunk = createAsyncThunk<
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
  const posts = await repo.getAll();
  return posts;
});

export const postSearchThunk = createAsyncThunk<
  Post,
  { repo: PostsRepository; userId: User['id'] }
>('post/search', async ({ repo, userId }) => {
  const posts = await repo.searchUserPost(userId);
  return posts;
});

export const postUpdateThunk = createAsyncThunk<
  Post,
  { repo: PostsRepository; id: Post['id']; item: Partial<Post> }
>('post/search', async ({ repo, id, item }) => {
  const post = await repo.update(id, item);
  return post;
});
