import prisma from '@/prisma';

export const deleteUserAddress = async (id: number) => {
  try {
    const userAddress = await prisma.userAddress.update({
      where: { id },
      data: { isDeleted: true },
    });

    return userAddress;
  } catch (error) {
    throw error;
  }
};
