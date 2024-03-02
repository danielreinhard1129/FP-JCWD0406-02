import prisma from '@/prisma';

export const getStockByWarehouseId = async (warehouseId: number) => {
  try {
    const stock = await prisma.stock.findMany({
      where: { warehouseId: warehouseId },
    });
    return stock;
  } catch (error) {
    throw error;
  }
};
