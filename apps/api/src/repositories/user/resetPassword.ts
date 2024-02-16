import prisma from '@/prisma';
import { IUser } from '@/types/user.types';

export const resetPassword = async (email: string, data: Partial<IUser>) => {
  try {
    const user = await prisma.user.update({ data, where: { email } });

    return user;
  } catch (error) {
    throw error;
  }
};
