import { hashPassword } from '@/lib/bcrypt';
import { register } from '@/repositories/user/Register';
import { getUserByEmail } from '@/repositories/user/getUserByEmail';
import { IUser } from '@/types/user.types';

export const registerAction = async (data: IUser) => {
  try {
    const { email, password } = data;

    const user = await getUserByEmail(email);

    if (user) throw new Error('This email already exist');

    const hashedPassword = await hashPassword(password);
    data.password = hashedPassword;
    await register(data);

    return {
      message: 'create account success',
    };
  } catch (error) {
    throw error;
  }
};
