import { hashPassword } from '@/lib/bcrypt';
import { getUserByEmail } from '@/repositories/user/getUserByEmail';
import { resetPassword } from '@/repositories/user/resetPassword';
import { IReset } from '@/types/user.types';

export const resetPasswordAction = async (email: string, data: IReset) => {
  try {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) throw new Error("Password don't match");
    const user = await getUserByEmail(email);

    if (!user) throw new Error('Account not found');
    const hashedPassword = await hashPassword(password);

    const userData = await resetPassword(email, { password: hashedPassword });

    return {
      message: 'Reset Password Success',
      data: userData,
    };
  } catch (error) {
    throw error;
  }
};
