import prisma from '@/prisma';

export const getUserById = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { Role: true },
    });

    return user;
  } catch (error) {
    throw error;
  }
};
