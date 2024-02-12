import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../models/user.model';
import {
  postAddCommentThunk,
  postAddReactionThunk,
  postCreateThunk,
  postUpdateThunk,
  postsLoadThunk,
  postsSearchThunk,
} from '../redux/post/post.thunks';

import { Comment } from '../models/comments.model';
import { Post } from '../models/post.model';
import { CommentRepository } from '../repositories/comment.repository';
import { PostsRepository } from '../repositories/post.repository';
import { AppDispatch, RootState } from '../store/store';
import { useUsers } from './use.users';

export const urlBasePosts = 'http://localhost:3333/posts';
export const urlBaseComments = 'http://localhost:3333/comments';
export function usePosts() {
  const {
    actualUser: { token },
  } = useUsers();
  const commentRepo = useMemo(
    () => new CommentRepository(urlBaseComments, token),
    [token]
  );
  const repo = useMemo(() => new PostsRepository(urlBasePosts, token), [token]);

  const PostsState = useSelector((state: RootState) => state.post);
  const PostsDispatch = useDispatch<AppDispatch>();

  const createPost = useCallback(
    async (postNoId: FormData) => {
      PostsDispatch(postCreateThunk({ repo, postNoId }));
    },
    [repo, PostsDispatch]
  );

  const loadPosts = useCallback(async () => {
    PostsDispatch(postsLoadThunk({ repo }));
  }, [repo, PostsDispatch]);

  const searchOwnPosts = useCallback(
    async (userId: User['id']) => {
      PostsDispatch(postsSearchThunk({ repo, userId }));
    },
    [repo, PostsDispatch]
  );
  const updatePost = useCallback(
    async (item: Partial<Post>, id: Post['id']) => {
      PostsDispatch(postUpdateThunk({ repo, id, item }));
    },
    [repo, PostsDispatch]
  );
  const addReactionPost = useCallback(
    async (item: Partial<Post>, id: Post['id']) => {
      PostsDispatch(postAddReactionThunk({ repo, id, item }));
    },
    [repo, PostsDispatch]
  );
  const addComentToPost = useCallback(
    async (item: Partial<Comment>, id: Post['id']) => {
      PostsDispatch(postAddCommentThunk({ commentRepo, id, item }));
    },
    [commentRepo, PostsDispatch]
  );
  return {
    postState: PostsState,
    searchOwnPosts,
    loadPosts,
    updatePost,
    createPost,
    addReactionPost,
    addComentToPost,
  };
}
