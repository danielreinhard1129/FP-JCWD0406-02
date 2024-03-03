import prisma from '@/prisma';

export const uploadPhotoProfileRepo = async (email: string, file: string) => {
  try {
    const update = await prisma.user.update({
      where: { email },
      data: { profile_picture: file },
    });
  } catch (error) {
    throw error;
  }
};
