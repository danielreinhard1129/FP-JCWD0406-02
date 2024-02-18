import { getUserById } from '@/repositories/user/getUserById';

export const getUserByIdAction = async (id: number) => {
  try {
    const user = await getUserById(id);

    return {
      message: 'data  retrieved successfully',
      data: user,
    };
  } catch (error) {
    throw error;
  }
};
