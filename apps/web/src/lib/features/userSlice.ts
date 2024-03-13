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

const getRoleName = (roleId: number): string => {
  switch (roleId) {
    case 1:
      return 'Super Admin';
    case 2:
      return 'Admin';
    case 3:
      return 'User';
    default:
      return 'Unknown Role';
  }
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<UserState>) => {
      const { roleId, id, username, email } = action.payload;
      state.id = id;
      state.username = username;
      state.role = getRoleName(roleId);
      state.email = email;
      state.roleId = roleId;
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
