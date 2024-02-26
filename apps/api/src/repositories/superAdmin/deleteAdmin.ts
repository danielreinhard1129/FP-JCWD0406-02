import prisma from '@/prisma';

export const deleteAdmin = async (id: number) => {
  try {
    const admin = await prisma.user.update({
      where: { id },
      data: { roleId: 3 },
    });
    return admin;
  } catch (error) {
    throw error;
  }
};
