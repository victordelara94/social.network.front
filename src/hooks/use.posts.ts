import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../models/user.model';
import {
  postAddReactionThunk,
  postCreateThunk,
  postUpdateThunk,
  postsLoadThunk,
  postsSearchThunk,
} from '../redux/post/post.thunks';

import { Post } from '../models/post.model';
import { PostsRepository } from '../repositories/post.repository';
import { AppDispatch, RootState } from '../store/store';
import { useUsers } from './use.users';

export const urlBasePosts = 'http://localhost:3333/posts';

export function usePosts() {
  const {
    actualUser: { token },
  } = useUsers();
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

  return {
    postState: PostsState,
    searchOwnPosts,
    loadPosts,
    updatePost,
    createPost,
    addReactionPost,
  };
}
