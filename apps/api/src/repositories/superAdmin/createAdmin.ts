import prisma from '@/prisma';

export const createAdmin = async (id: number) => {
  try {
    console.log('repooooooooooo', id);

    const admin = await prisma.user.update({
      where: { id },
      data: { roleId: 2 },
    });
    return admin;
  } catch (error) {
    throw error;
  }
};
