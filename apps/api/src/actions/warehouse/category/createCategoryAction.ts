import { createCategory } from '@/repositories/warehouse/category/createCategory';
import { getCategoryByName } from '@/repositories/warehouse/category/getCategoryByName';
import { updateCategory } from '@/repositories/warehouse/category/updateCategory';
import { Category } from '@prisma/client';

export const createCategoryAction = async (data: Category) => {
  try {
    const checkCategory = await getCategoryByName(data.category_name);
    if (checkCategory) {
      if (checkCategory.isDeleted) {
        await updateCategory({ ...checkCategory, isDeleted: false });
        return {
          message: `Category with the name ${data.category_name} was restored`,
        };
      } else {
        throw new Error(
          `Category with the name ${data.category_name} already exists`,
        );
      }
    } else {
      const category = await createCategory(data);
      return category;
    }
  } catch (error) {
    throw error;
  }
};
