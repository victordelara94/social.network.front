import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Login, User } from '../models/user.model';
import { actions } from '../redux/user/user.slice';
import {
  loginThunk,
  registerThunk,
  userFollowThunk,
  userLoadAllThunk,
  userSearchThunk,
  userUnfollowThunk,
} from '../redux/user/user.thunks';
import { UsersRepository } from '../repositories/user.repository';
import { AppDispatch, RootState } from '../store/store';
export const urlBaseUsers = 'http://localhost:3333/users';

export function useUsers() {
  const repo = useMemo(() => new UsersRepository(urlBaseUsers), []);

  const usersState = useSelector((state: RootState) => state.user);
  const usersDispatch = useDispatch<AppDispatch>();

  const registerUser = async (userNoId: FormData) => {
    usersDispatch(registerThunk({ repo, userNoId }));
  };

  const loginUser = async (login: Login) => {
    usersDispatch(loginThunk({ repo, login }));
  };

  const setLogOut = async () => {
    usersDispatch(actions.logOut());
  };
  const loadUsers = useCallback(
    async (token: string) => {
      usersDispatch(userLoadAllThunk({ repo, token: token }));
    },
    [repo, usersDispatch]
  );
  const searchUser = useCallback(
    async (token: string, key: string, value: unknown) => {
      usersDispatch(userSearchThunk({ repo, token, key, value }));
    },
    [repo, usersDispatch]
  );
  const followUser = useCallback(
    async (userToFollow: User, token: string) => {
      usersDispatch(userFollowThunk({ repo, userToFollow, token }));
    },
    [repo, usersDispatch]
  );
  const unfollowUser = useCallback(
    async (userToUnfollow: User, token: string) => {
      usersDispatch(userUnfollowThunk({ repo, userToUnfollow, token }));
    },
    [repo, usersDispatch]
  );

  return {
    users: usersState.users,
    actualUser: usersState.actualUser,
    searchedUser: usersState.searchedUser,
    registerUser,
    loginUser,
    loadUsers,
    searchUser,
    followUser,
    setLogOut,
    unfollowUser,
  };
}
