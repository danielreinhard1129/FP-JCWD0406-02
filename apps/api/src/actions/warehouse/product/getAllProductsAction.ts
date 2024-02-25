import { getAllProducts } from '@/repositories/warehouse/product/getAllProducts';

export const getAllProductsAction = async () => {
  try {
    const products = await getAllProducts();

    return {
      message: 'All Products',
      data: products,
    };
  } catch (error) {
    throw error;
  }
};
