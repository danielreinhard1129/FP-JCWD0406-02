import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  roleId: number;
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
  roleId: 0,
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
      state.roleId = action.payload.roleId;
    },
    logoutAction: (state) => {
      state.id = 0;
      (state.username = ''), (state.role = '');
      state.email = '';
      state.roleId = 0;
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
