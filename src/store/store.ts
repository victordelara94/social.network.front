import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/user.slice';

export const appStore = configureStore({
  reducer: { user: userReducer },
});

export type AppDispatch = typeof appStore.dispatch;
export type RootState = ReturnType<typeof appStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
