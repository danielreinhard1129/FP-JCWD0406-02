import prisma from '@/prisma';
import { IStockMutation } from '@/types/warehouse.types';

export const findStockMutationDetails = async (data: IStockMutation) => {
  try {
    const stockMutations = await prisma.stockMutation.findMany({
      where: {
        AND: [
          { initialWarehouseId: data.initialWarehouseId },
          { destinationWarehouseId: data.destinationWarehouseId },
        ],
      },
      include: {
        stockMutationDetail: true,
      },
    });

    const stockMutationDetails = stockMutations.flatMap(
      (mutation) => mutation.stockMutationDetail,
    );

    return stockMutationDetails;
  } catch (error) {
    throw error;
  }
};
