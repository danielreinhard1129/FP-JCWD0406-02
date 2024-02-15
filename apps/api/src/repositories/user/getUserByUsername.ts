import prisma from '@/prisma';

export const getUsernameByUsername = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    return user;
  } catch (error) {
    throw error;
  }
};
