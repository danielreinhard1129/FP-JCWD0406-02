import prisma from '@/prisma';

export const deleteCategory = async (id: number) => {
  try {
    const category = await prisma.category.update({
      where: { id },
      data: { isDeleted: true },
    });
    return category;
  } catch (error) {
    throw error;
  }
};
