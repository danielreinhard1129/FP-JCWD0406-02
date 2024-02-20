import { userVerification } from '@/repositories/user/userVerification';

export const userVerificationAction = async (id: number) => {
  try {
    const user = await userVerification(id);
    return {
      message: 'your account is verified',
    };
  } catch (error) {
    throw error;
  }
};
