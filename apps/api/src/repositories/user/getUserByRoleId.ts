import prisma from '@/prisma';

export const getUserByRoleId = async (roleId: number) => {
  try {
    const user = await prisma.user.findMany({
      where: { roleId: roleId },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
