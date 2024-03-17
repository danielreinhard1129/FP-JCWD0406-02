import { catalogProduct } from '@/repositories/warehouse/product/catalogProduct';

export const catalogProductAction = async (category: string) => {
  try {
    const catalog = await catalogProduct(category);

    return {
      message: 'catalog section',
      data: catalog,
    };
  } catch (error) {
    throw error;
  }
};
