import { excludeFields } from '@/helpers/excludeFields';
import { getUserByEmail } from '@/repositories/user/getUserByEmail';

export const keepLoginAction = async (email: string) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) throw new Error('Account not found');

    const dataWithoutPassword = excludeFields(user, ['password']);

    return {
      message: 'keeplogin Success',
      data: dataWithoutPassword,
    };
  } catch (error) {
    throw error;
  }
};
