import { getUserById } from '@/repositories/user/getUserById';
import { createProduct } from '@/repositories/warehouse/product/createProduct';
import { getProductByTitle } from '@/repositories/warehouse/product/getProductByTitle';
import { IProduct } from '@/types/warehouse.types';

export const createProductAction = async (data: IProduct, id: number) => {
  try {
    const user = await getUserById(id);
    if (user?.Role?.id !== 1)
      throw new Error('You do not have permission to create a product');

    const checkTitle = await getProductByTitle(data.title);
    if (checkTitle)
      throw new Error('Product with the same title already exists');

    const product = await createProduct(data, id);

    return {
      message: 'Create Product Success',
      data: product,
    };
  } catch (error) {
    throw error;
  }
};