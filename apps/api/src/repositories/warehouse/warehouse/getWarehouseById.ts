import prisma from '@/prisma';

export const getWarehouseById = async (id: number) => {
  try {
    const warehouse = await prisma.warehouse.findUnique({
      where: { id },
    });

    return warehouse;
  } catch (error) {
    throw error;
  }
};
