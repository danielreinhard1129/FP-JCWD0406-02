import { excludeFields } from '@/helpers/excludeFields';
import { comparePassword } from '@/lib/bcrypt';
import { createToken } from '@/lib/jwt';
import { getUserByEmail } from '@/repositories/user/getUserByEmail';
import { IUser } from '@/types/user.types';

export const loginAction = async (data: IUser) => {
  try {
    const { email, password } = data;

    const user = await getUserByEmail(email);

    if (!user) throw new Error('Accounnt no found');

    const isPasswordValid = comparePassword(password, user.password);

    if (!isPasswordValid) throw new Error('Invalid Password');

    const dataWithoutPassword = excludeFields(user, ['password']);

    const token = createToken({ email: user.email });

    return {
      message: 'login account success',
      data: dataWithoutPassword,
      token,
    };
  } catch (error) {
    throw error;
  }
};
