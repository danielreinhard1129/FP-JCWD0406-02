import prisma from '@/prisma';

export const deleteWarehouse = async (id: number) => {
  try {
    const warehouse = await prisma.warehouse.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
    return warehouse;
  } catch (error) {
    throw error;
  }
};
