import { register } from '@/repositories/user/Register';

export const registerAction = async (data: any) => {
  try {
    const user = await register(data);

    return {
      status: 200,
      message: 'create account success',
      data: user,
    };
  } catch (error) {
    throw error;
  }
};
