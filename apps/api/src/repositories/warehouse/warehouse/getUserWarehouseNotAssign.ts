import prisma from '@/prisma';

export const getAdminNotAssign = async () => {
  try {
    const admin = await prisma.user.findMany({
      where: {
        roleId: 2,
        NOT: {
          warehouse: {
            none: {},
          },
        },
      },
    });
    return admin;
  } catch (error) {
    throw error;
  }
};
