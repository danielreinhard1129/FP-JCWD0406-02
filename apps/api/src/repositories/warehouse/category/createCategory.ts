import prisma from '@/prisma';
import { ICategory } from '@/types/warehouse.types';

export const createCategory = async (data: ICategory) => {
  try {
    const category = await prisma.category.create({ data });

    return category;
  } catch (error) {
    throw error;
  }
};
