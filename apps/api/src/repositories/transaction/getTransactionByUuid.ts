import prisma from '@/prisma';

export const getTransactionByUuid = async (uuid: string) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { uuid },
      include: {
        transactionDetails: {
          include: { Product: { include: { productPhotos: true } } },
        },
      },
    });
    return transaction;
  } catch (error) {
    throw error;
  }
};
