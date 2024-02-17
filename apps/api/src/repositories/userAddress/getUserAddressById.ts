import prisma from '@/prisma';

export const getUserAddressById = async (id: number) => {
  try {
    const userAddress = await prisma.userAddress.findUnique({
      where: { id },
    });

    return userAddress;
  } catch (error) {
    throw error;
  }
};
