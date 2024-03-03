import { getUserByEmail } from '@/repositories/user/getUserByEmail';

export const uploadPhotoProfileAction = async (email: string) => {
  try {
    const userData = getUserByEmail(email);
  } catch (error) {
    throw error;
  }
};
