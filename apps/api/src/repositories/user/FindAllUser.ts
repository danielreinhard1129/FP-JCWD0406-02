import prisma from '@/prisma';

export const findAllUser = async () => {
  try {
    // const user = await prisma.user.findMany({
    //   include: {
    //     Role: true,
    //     UserAddess: true,
    //   },
    // });
    const user = await prisma.user.findMany();
    return user;
  } catch (error) {
    throw error;
  }
};
