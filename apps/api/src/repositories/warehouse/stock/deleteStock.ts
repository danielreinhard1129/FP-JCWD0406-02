import prisma from '@/prisma';

export const deleteStock = async (id: number) => {
  try {
    const stock = await prisma.stock.delete({
      where: { id },
    });

    return stock;
  } catch (error) {
    throw error;
  }
};
