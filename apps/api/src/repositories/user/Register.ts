import prisma from '@/prisma';
import { IUser } from '@/types/user.types';

export const register = async (data: IUser) => {
  try {
    const user = await prisma.user.create({
      data: {
        ...data,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};
