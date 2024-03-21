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

    const totalStock = product.Stock.reduce(
      (total, stockItem) => total + stockItem.quantity,
      0,
    );

    const productDataWithTotalStock = {
      ...product,
      totalStock: totalStock,
    };

    return {
      message: `Product with ID ${id} fetched successfully`,
      data: productDataWithTotalStock,
    };
  } catch (error) {
    throw error;
  }
};
