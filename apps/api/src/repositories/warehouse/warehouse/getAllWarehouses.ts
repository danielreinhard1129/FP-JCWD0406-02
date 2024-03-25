import prisma from '@/prisma';

export const getAllWarehouses = async () => {
  try {
    const warehouses = await prisma.warehouse.findMany({
      where: { isDeleted: false },
    });
    return warehouses;
  } catch (error) {
    throw error;
  }
};
