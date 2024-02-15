import { findAllUser } from '@/repositories/user/FindAllUser';

export const findAllUserAction = async () => {
  try {
    const user = await findAllUser();

    return {
      status: 200,
      message: 'success',
      data: user,
    };
  } catch (error) {
    throw error;
  }
};
