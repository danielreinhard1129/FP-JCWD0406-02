import prisma from '@/prisma';
import { IUser } from '@/types/user.types';

export const createUser = async (data: IUser, token: string) => {
  try {
    console.log('repoooo', token);
    const { username, password, first_name, last_name, contact } = data;

    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        username,
        contact,
        email: token,
        password,
        roleId: 3,
        isVerified: true,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};
