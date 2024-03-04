import { getProductById } from '@/repositories/warehouse/product/getProductById';

export const getProductByIdAction = async (id: number) => {
  try {
    const product = await getProductById(id);

    if (!product) {
      return {
        message: 'Product not found',
        data: null,
      };
    }

    return {
      message: `Product with ID ${id} fetched successfully`,
      data: product,
    };
  } catch (error) {
    throw error;
  }
};
