import prisma from '@/prisma';

export const getReqStock = async () => {
  try {
    const reqStocks = await prisma.reqStock.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        warehouse: true,
        product: true,
      },
    });
    return reqStocks;
  } catch (error) {
    throw error;
  }
};
