import { getUserByRoleId } from '@/repositories/user/getUserByRoleId';

export const getUserByRoleIdAction = async (roleId: number) => {
  try {
    const user = await getUserByRoleId(roleId);

    return {
      message: 'Successfully fetched the user by role id',
      data: user,
    };
  } catch (error) {
    throw error;
  }
};
