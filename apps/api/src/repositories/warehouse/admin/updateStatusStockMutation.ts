import prisma from '@/prisma';
import { IStockMutation } from '@/types/warehouse.types';
import { Status } from '@prisma/client';

export const updateStatusStockMutation = async (
  id: number,
  data: IStockMutation,
) => {
  try {
    const updateStock = await prisma.stockMutation.update({
      where: { id },
      data,
    });
    return updateStock;
  } catch (error) {
    throw error;
  }
};
