import prisma from '@/prisma';
import { IAddress } from '@/types/user.types';

export const editUserAddress = async (body: Partial<IAddress>, id: number) => {
  try {
    const { name, contact, street, district, city, province, postal_code } =
      body;

    const userAddress = await prisma.userAddress.update({
      where: { id },
      data: {
        name,
        contact,
        street,
        district,
        city,
        province,
        postal_code,
      },
    });

    return userAddress;
  } catch (error) {
    throw error;
  }
};
