import { configureStore } from '@reduxjs/toolkit';
import { authentication } from '../services/authentication';
import userReducer from '../app/userSlice';

export const store = configureStore({
  reducer: {
    [authentication.reducerPath]: authentication.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authentication.middleware),
});

//get the state type
export type RootState = ReturnType<typeof store.getState>;
//dispatch type
export type AppDispatch = typeof store.dispatch;
