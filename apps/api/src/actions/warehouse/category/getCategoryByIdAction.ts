import { getAllCategory } from '@/repositories/warehouse/category/getAllCategory';
import { getCategoryById } from '@/repositories/warehouse/category/getCategoryById';

export const getCategoryByIdAction = async (id: number) => {
  try {
    const category = await getCategoryById(id);
    if (!category) throw new Error(`category with ${id} not found`);

    return {
      message: 'Successfully fetched the category by id',
      data: category,
    };
  } catch (error) {
    throw error;
  }
};
