import prisma from '@/prisma';

export const getAllUserAddress = async () => {
  try {
    const userAddress = await prisma.userAddress.findMany({
      where: { isDeleted: false },
    });

    return userAddress;
  } catch (error) {
    throw error;
  }
};
