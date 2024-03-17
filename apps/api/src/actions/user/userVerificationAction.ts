import { userVerification } from '@/repositories/user/userVerification';

export const userVerificationAction = async (email: string) => {
  try {
    const user = await userVerification(email);
    return {
      message: 'your account is verified',
      data: user,
    };
  } catch (error) {
    throw error;
  }
};
