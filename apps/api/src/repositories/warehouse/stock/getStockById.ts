import prisma from '@/prisma';

export const getStockById = async (id: number) => {
  try {
    const stock = await prisma.stock.findUnique({
      where: { id },
    });
    return stock;
  } catch (error) {
    throw error;
  }
};
