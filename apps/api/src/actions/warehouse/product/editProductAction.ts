import { editProduct } from '@/repositories/warehouse/product/editProduct';
import { getProductByTitle } from '@/repositories/warehouse/product/getProductByTitle';
import { IProduct } from '@/types/warehouse.types';

export const editProductAction = async (body: IProduct, id: number) => {
  try {
    const checkTitle = await getProductByTitle(body.title);

    if (checkTitle)
      throw new Error('Product with the same title already exists');

    const product = await editProduct(body, id);

    return {
      message: 'edit product success',
      data: product,
    };
  } catch (error) {
    throw error;
  }
};
