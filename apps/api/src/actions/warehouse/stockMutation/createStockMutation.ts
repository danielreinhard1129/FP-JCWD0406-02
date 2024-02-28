import prisma from '@/prisma';
import { createStockMutation } from '@/repositories/warehouse/stockMutation/createStockMutation';
import { IStockMutation } from '@/types/warehouse.types';

export const createStockMutationAction = async (data: IStockMutation) => {
  try {
    const stock = await createStockMutation(data);

    return {
      message: 'Success req stock',
      data: stock,
    };
  } catch (error) {
    throw error;
  }
};
