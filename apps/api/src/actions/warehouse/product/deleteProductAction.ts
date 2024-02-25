import { deleteProduct } from '@/repositories/warehouse/product/deleteProduct';

export const deleteProductAction = async (id: number) => {
  try {
    const deletedProduct = await deleteProduct(id);

    return {
      message: 'delete product success',
      data: deletedProduct,
    };
  } catch (error) {
    throw error;
  }
};
