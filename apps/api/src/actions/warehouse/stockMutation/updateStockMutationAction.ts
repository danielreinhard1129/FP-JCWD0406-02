import prisma from '@/prisma';
import { getStockMutationById } from '@/repositories/warehouse/stockMutation/getStockMutationById';
import { IStockMutation } from '@/types/warehouse.types';

export const updateStockMutationAction = async (
  data: IStockMutation,
  id: number,
) => {
  try {
    const stock = await getStockMutationById(id);

    return {
      message: `The Mutation stock was updated check data  stock`,
    };
  } catch (error) {
    throw error;
  }
};
