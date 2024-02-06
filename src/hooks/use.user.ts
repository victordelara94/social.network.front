import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../models/user.model';
import {
  loginThunk,
  registerThunk,
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

  const loginUser = async (user: User) => {
    usersDispatch(loginThunk({ repo, user }));
  };

  const loadUsers = useCallback(async () => {
    usersDispatch(usersLoadThunk(repo));
  }, [repo, usersDispatch]);

  return {
    users: usersState.users,
    registerUser,
    loginUser,
    loadUsers,
  };
}
