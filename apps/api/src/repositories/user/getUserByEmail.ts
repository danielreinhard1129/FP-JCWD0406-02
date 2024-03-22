import prisma from '@/prisma';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        Role: true,
        warehouse: true,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};
