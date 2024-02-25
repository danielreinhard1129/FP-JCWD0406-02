import prisma from '@/prisma';

export const getAllCategory = async () => {
  try {
    const categories = await prisma.category.findMany({
      where: { isDeleted: false },
    });
    return categories;
  } catch (error) {
    throw error;
  }
};
