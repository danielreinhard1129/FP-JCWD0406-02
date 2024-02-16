import { editUser } from '@/repositories/user/editUser';
import { IUser } from '@/types/user.types';

export const editUserAction = async (body: IUser, id: number) => {
  try {
    const dataUser = await editUser(body, id);

    return {
      message: 'edit profile success',
      data: dataUser,
    };
  } catch (error) {
    throw error;
  }
};
