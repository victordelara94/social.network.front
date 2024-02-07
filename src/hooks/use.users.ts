import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from '../models/user.model';
import {
  loginThunk,
  registerThunk,
  userSearchThunk,
  usersLoadThunk,
} from '../redux/user.thunks';
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

  const loadUsers = useCallback(
    async (token: string) => {
      usersDispatch(usersLoadThunk({ repo, token: token }));
    },
    [repo, usersDispatch]
  );
  const searchUser = useCallback(
    async (token: string, key: string, value: unknown) => {
      usersDispatch(userSearchThunk({ repo, token, key, value }));
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
  };
}
