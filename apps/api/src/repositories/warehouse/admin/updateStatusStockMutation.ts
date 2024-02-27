import prisma from '@/prisma';
import { Status } from '@prisma/client';

export const updateStatusStockMutation = async (id: number, status: Status) => {
  try {
    const updateStock = await prisma.stockMutation.update({
      where: { id },
      data: { status },
    });
    return updateStock;
  } catch (error) {
    throw error;
  }
};
