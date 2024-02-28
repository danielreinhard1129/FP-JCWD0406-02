import { createProduct } from '@/repositories/warehouse/product/createProduct';
import { getProductByTitle } from '@/repositories/warehouse/product/getProductByTitle';
import { IProduct } from '@/types/warehouse.types';

export const createProductAction = async (data: IProduct) => {
  try {
    const checkTitle = await getProductByTitle(data.title);
    if (checkTitle)
      throw new Error('Product with the same title already exists');

    const product = await createProduct(data);

    return {
      message: 'Create Product Success',
      data: product,
    };
  } catch (error) {
    throw error;
  }
};
