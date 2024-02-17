import prisma from '@/prisma';

export const deleteUserAddress = async (id: number) => {
  try {
    const userAddress = await prisma.userAddress.delete({
      where: { id },
    });

    return userAddress;
  } catch (error) {
    throw error;
  }
};
