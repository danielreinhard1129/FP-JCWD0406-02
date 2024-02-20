import { excludeFields } from '@/helpers/excludeFields';
import { comparePassword } from '@/lib/bcrypt';
import { createToken } from '@/lib/jwt';
import { getUserByEmail } from '@/repositories/user/getUserByEmail';
import { IUser } from '@/types/user.types';

export const loginAction = async (data: IUser) => {
  try {
    const { email, password } = data;

    const user = await getUserByEmail(email);

    if (!user) {
      throw new Error('Account not found');
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const dataWithoutPassword = excludeFields(user, ['password']);

    const token = createToken({ email: user.email });

    return {
      message: 'Login successful',
      data: dataWithoutPassword,
      token,
    };
  } catch (error) {
    throw error;
  }
};
