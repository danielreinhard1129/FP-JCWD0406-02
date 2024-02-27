import prisma from '@/prisma';

export const getAllStockWarehous = async () => {
  try {
    const stock = await prisma.stock.findMany();
    return stock;
  } catch (error) {
    throw error;
  }
};
