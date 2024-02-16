import prisma from '@/prisma';
import { IUser } from '@/types/user.types';

export const editUser = async (body: IUser, id: number) => {
  try {
    const { first_name, last_name, username, email, contact, profile_picture } =
      body;
    const dataUser = await prisma.user.update({
      where: { id },
      data: {
        first_name,
        last_name,
        username,
        email,
        contact,
        profile_picture,
      },
    });

    return dataUser;
  } catch (error) {
    throw error;
  }
};
