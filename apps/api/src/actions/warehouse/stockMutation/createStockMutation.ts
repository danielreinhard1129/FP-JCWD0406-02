import { createStockMutation } from '@/repositories/warehouse/stockMutation/createStockMutation';
import { findStockMutationDetails } from '@/repositories/warehouse/stockMutation/findStockMutationDetails';
import { IStockMutation, IStockMutationDetail } from '@/types/warehouse.types';

export const createStockMutationAction = async (
  data: IStockMutation,
  dataDetail: IStockMutationDetail[],
) => {
  console.log('dattaaaaa actionnnnn', data, dataDetail);

  try {
    const stock = await createStockMutation(data, dataDetail);

    const stockMutationDetails = await findStockMutationDetails(data);

    return {
      message: 'Success req stock',
      data: stock,
      stockMutationDetails,
    };
  } catch (error) {
    throw error;
  }
};
