import prisma from '@/prisma';

export const getAllWarehouses = async () => {
  try {
    const warehouses = await prisma.warehouse.findMany();
    return warehouses;
  } catch (error) {
    throw error;
  }
};
