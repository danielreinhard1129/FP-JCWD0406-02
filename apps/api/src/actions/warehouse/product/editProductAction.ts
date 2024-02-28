import { editProduct } from '@/repositories/warehouse/product/editProduct';
import { getProductByTitle } from '@/repositories/warehouse/product/getProductByTitle';
import { IProduct } from '@/types/warehouse.types';

export const editProductAction = async (body: IProduct, id: number) => {
  try {
    const product = await editProduct(body, id);

    return {
      message: 'edit product success',
      data: product,
    };
  } catch (error) {
    throw error;
  }
};
