import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number;
  username: string;
  role: string;
  email: string;
}

const initialState: UserState = {
  id: 0,
  username: '',
  role: '',
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.email = action.payload.email;
    },
    logoutAction: (state) => {
      state.id = 0;
      (state.username = ''), (state.role = '');
      state.email = '';
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
