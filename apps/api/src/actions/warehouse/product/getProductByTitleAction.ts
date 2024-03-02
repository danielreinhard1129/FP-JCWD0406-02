import { getProductByTitle } from '@/repositories/warehouse/product/getProductByTitle';

export const getProductByTitleAction = async (title: string) => {
  try {
    const product = await getProductByTitle(title);

    return {
      messsage: `product with title ${title} success fetch`,
      data: product,
    };
  } catch (error) {
    throw error;
  }
};
