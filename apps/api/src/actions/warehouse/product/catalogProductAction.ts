import { catalogProduct } from '@/repositories/warehouse/product/catalogProduct';

export const catalogProductAction = async (category: string) => {
  try {
    const catalog = await catalogProduct(category);

    const catalogWithData = catalog.map((product) => {
      const totalStock = product.Stock.reduce(
        (total, stockItem) => total + stockItem.quantity,
        0,
      );
      return {
        ...product,
        totalStock: totalStock,
      };
    });

    return {
      message: 'catalog section',
      data: catalogWithData,
    };
  } catch (error) {
    throw error;
  }
};
