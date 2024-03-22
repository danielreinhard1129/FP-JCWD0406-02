import prisma from '@/prisma';

export const getWarehouseByUserId = async (userId: number) => {
  try {
    const userWarehouse = await prisma.warehouse.findMany({
      where: { userId: userId },
    });
    return userWarehouse;
  } catch (error) {
    throw error;
  }
};
