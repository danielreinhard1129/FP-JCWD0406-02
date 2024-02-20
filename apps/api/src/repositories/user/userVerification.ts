import prisma from '@/prisma';

export const userVerification = async (id: number) => {
  try {
    const dataUser = await prisma.user.update({
      where: { id },
      data: {
        isVerified: true,
      },
    });

    return dataUser;
  } catch (error) {
    throw error;
  }
};
