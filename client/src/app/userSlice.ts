import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

type User = {
  id: string | null;
  email: string | null;
  name: string | null;
  accessToken: string | null;
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    email: null,
    name: null,
    accessToken: null,
  } as User,
  reducers: {
    setUser: (
      state,
      { payload: { id, name, email, accessToken } }: PayloadAction<User>
    ) => {
      state.id = id;
      state.name = name;
      state.email = email;
      state.accessToken = accessToken;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state: RootState) => state.user;
