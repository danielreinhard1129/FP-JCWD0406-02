import prisma from '@/prisma';
import { IStock } from '@/types/warehouse.types';

export const updateStock = async (data: IStock, id: number) => {
  try {
    const stock = await prisma.stock.update({
      where: { id },
      data: { quantity: data.quantity },
    });

    return stock;
  } catch (error) {
    throw error;
  }
};
