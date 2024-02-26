import { deleteUser } from '@/repositories/user/deleteUser';

export const deleteUserAction = async (id: number) => {
  try {
    const deletedUser = await deleteUser(id);

    return {
      message: 'Delete user success',
      data: deletedUser,
    };
  } catch (error) {
    throw error;
  }
};
