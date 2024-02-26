import { getAllCategory } from '@/repositories/warehouse/category/getAllCategory';

export const getAllCategoriesAction = async () => {
  try {
    const categories = await getAllCategory();

    return {
      message: 'All categories',
      data: categories,
    };
  } catch (error) {
    throw error;
  }
};
