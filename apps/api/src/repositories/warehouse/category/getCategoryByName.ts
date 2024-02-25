import prisma from '@/prisma';

export const getCategoryByName = async (category_name: string) => {
  try {
    const category = await prisma.category.findUnique({
      where: { category_name },
    });
    return category;
  } catch (error) {
    throw error;
  }
};
