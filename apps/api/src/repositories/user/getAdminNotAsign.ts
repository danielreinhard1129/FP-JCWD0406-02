import prisma from '@/prisma';

export const getAdminNotAssignedRepository = async () => {
  const admins = await prisma.user.findMany({
    where: {
      roleId: 2,
      warehouse: {
        none: {},
      },
      isDeleted: false,
    },
    include: { Role: true },
  });
  return admins;
};
