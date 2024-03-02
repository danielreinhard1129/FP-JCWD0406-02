import prisma from '@/prisma';
import { IProduct } from '@/types/warehouse.types';

export const createProduct = async (data: IProduct) => {
  try {
    let { title, price, weight, description, categoryId } = JSON.parse(
      JSON.stringify(data),
    );

    console.log('repooo', data);

    const product = await prisma.product.create({
      data: {
        title,
        price,
        weight,
        description,
        categoryId,
      },
    });

    return product;
  } catch (error) {
    throw error;
  }
};
