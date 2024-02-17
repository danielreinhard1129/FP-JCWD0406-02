import prisma from '@/prisma';

export const getAllUserAddress = async () => {
  try {
    const userAddress = await prisma.userAddress.findMany();

    return userAddress;
  } catch (error) {
    throw error;
  }
};
