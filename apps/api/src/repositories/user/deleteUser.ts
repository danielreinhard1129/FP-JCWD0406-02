import prisma from '@/prisma';

export const deleteUser = async (id: number) => {
  try {
    const deleteUser = await prisma.user.update({
      where: { id },
      data: { isDeleted: true },
    });
    return deleteUser;
  } catch (error) {
    throw error;
  }
};
