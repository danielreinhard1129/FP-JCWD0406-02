import prisma from '@/prisma';

export const getWarehouseById = async (id: number) => {
  try {
    const warehouse = await prisma.warehouse.findUnique({
      where: { id },
      include: {
        stocks: {
          where: { warehouseId: id },
          include: { product: { include: { productPhotos: true } } },
        },
      },
    });

    return warehouse;
  } catch (error) {
    throw error;
  }
};
