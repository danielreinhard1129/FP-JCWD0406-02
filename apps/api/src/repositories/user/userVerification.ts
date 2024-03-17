import prisma from '@/prisma';

export const userVerification = async (email: string) => {
  try {
    console.log('emaill repoooo', email);

    const dataUser = await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
      },
    });

    return dataUser;
  } catch (error) {
    throw error;
  }
};
