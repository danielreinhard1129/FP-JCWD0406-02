import prisma from '@/prisma';

export const getAddresByUserId = async (userId: number) => {
  try {
    const userAddresses = await prisma.userAddress.findMany({
      where: {
        userId,
        isDeleted: false,
      },
      include: { City: true },
    });

    return userAddresses;
  } catch (error) {
    throw error;
  }
};
