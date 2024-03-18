import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { last } from 'lodash';

interface UserState {
  roleId: number;
  id: number;
  username: string;
  role: string;
  email: string;
  profile_picture: string;
  first_name: string;
  last_name: string;
}

const initialState: UserState = {
  id: 0,
  username: '',
  role: '',
  email: '',
  roleId: 0,
  profile_picture: '',
  first_name: '',
  last_name: '',
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
      const {
        roleId,
        id,
        username,
        email,
        profile_picture,
        first_name,
        last_name,
      } = action.payload;
      state.id = id;
      state.username = username;
      state.role = getRoleName(roleId);
      state.email = email;
      state.roleId = roleId;
      state.profile_picture = profile_picture;
      state.first_name = first_name;
      state.last_name = last_name;
    },
    logoutAction: (state) => {
      state.id = 0;
      (state.username = ''), (state.role = '');
      state.email = '';
      state.roleId = 0;
      state.profile_picture = '';
      state.first_name = '';
      state.last_name = '';
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
