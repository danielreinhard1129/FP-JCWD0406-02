import prisma from '@/prisma';

export const getReqStockByWarehouseId = async (warehouseId: number) => {
  try {
    const reqStock = await prisma.reqStock.findMany({
      where: {
        warehouseId: warehouseId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return reqStock;
  } catch (error) {
    throw error;
  }
};
