import prisma from '@/prisma';

export const setDefaultAddress = async (userId: number, addressId: number) => {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      await prisma.userAddress.updateMany({
        where: {
          userId: userId,
          isPrimary: true,
        },
        data: {
          isPrimary: false,
        },
      });

      const updatedAddress = await prisma.userAddress.update({
        where: { id: addressId },
        data: { isPrimary: true },
      });

      return updatedAddress;
    });

    return result;
  } catch (error) {
    throw error;
  }
};
