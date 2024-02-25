import { deleteCategory } from '@/repositories/warehouse/category/deleteCategory';

export const deleteCategoryAction = async (id: number) => {
  try {
    const category = await deleteCategory(id);

    return {
      message: 'delete category success',
      data: category,
    };
  } catch (error) {
    throw error;
  }
};
