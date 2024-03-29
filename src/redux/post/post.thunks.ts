import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment } from '../../models/comments.model';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { CommentRepository } from '../../repositories/comment.repository';
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

export const postAddReactionThunk = createAsyncThunk<
  Post,
  { repo: PostsRepository; id: Post['id']; item: Partial<Post> }
>('post/reaction', async ({ repo, id, item }) => {
  const post = await repo.addReaction(id, item);
  return post;
});
export const postAddCommentThunk = createAsyncThunk<
  Post,
  { commentRepo: CommentRepository; id: Post['id']; item: Partial<Comment> }
>('post/comment', async ({ commentRepo, id, item }) => {
  const post = await commentRepo.addComment(id, item);
  return post;
});
