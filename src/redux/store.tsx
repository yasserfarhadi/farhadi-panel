import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import loginSlice from './features/login/loginSlice';
import usersSlice from './features/users/usersSlice';

const store = configureStore({
  reducer: {
    login: loginSlice,
    users: usersSlice,
  },
});

export const ReduxProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
