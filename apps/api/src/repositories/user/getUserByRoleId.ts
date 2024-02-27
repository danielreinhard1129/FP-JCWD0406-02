import prisma from '@/prisma';

export const getUserByRoleId = async (roleId: number) => {
  try {
    const user = await prisma.user.findMany({
      where: { roleId: roleId, isDeleted: false },
      include: { Role: true },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
