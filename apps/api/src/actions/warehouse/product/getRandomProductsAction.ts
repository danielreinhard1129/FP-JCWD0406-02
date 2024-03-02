import { getRandomProducts } from '@/repositories/warehouse/product/getRandomProducts';

export const getRandomProductsAction = async () => {
  try {
    const result = await getRandomProducts();

    return {
      status: 200,
      message: 'Random Product Success',
      data: result,
    };
  } catch (error) {
    throw error;
  }
};
