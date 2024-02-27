import prisma from '@/prisma';

export const getStockMutationById = async (id: number) => {
  try {
    const stockMutation = await prisma.stockMutation.findUnique({
      where: { id },
    });
    return stockMutation;
  } catch (error) {
    throw error;
  }
};
