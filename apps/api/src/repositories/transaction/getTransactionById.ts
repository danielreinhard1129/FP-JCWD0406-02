import prisma from '@/prisma';

export const getTransactionById = async (id: number) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    return transaction;
  } catch (error) {
    throw error;
  }
};
