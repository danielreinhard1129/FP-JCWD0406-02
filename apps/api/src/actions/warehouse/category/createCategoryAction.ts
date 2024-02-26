import { createCategory } from '@/repositories/warehouse/category/createCategory';
import { getCategoryByName } from '@/repositories/warehouse/category/getCategoryByName';
import { Category } from '@prisma/client';

export const createCategoryAction = async (data: Category) => {
  try {
    const checkCategory = await getCategoryByName(data.category_name);
    if (checkCategory?.category_name == data.category_name)
      throw new Error(`Category with ${data.category_name} already exists`);

    const category = await createCategory(data);

    return category;
  } catch (error) {
    throw error;
  }
};
