import prisma from '@/prisma';

export const getCategoryById = async (id: number) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });
    return category;
  } catch (error) {
    throw error;
  }
};
