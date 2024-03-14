import { getReqStock } from '@/repositories/superAdmin/getReqStock';

export const getReqStockAction = async () => {
  try {
    const stock = await getReqStock();

    return {
      message: 'data warehouse request stock from other warehouse',
      data: stock,
    };
  } catch (error) {
    throw error;
  }
};
