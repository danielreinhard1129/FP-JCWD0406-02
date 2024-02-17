import prisma from '@/prisma';
import { IAddress } from '@/types/user.types';

export const addUserAddress = async (data: IAddress) => {
  try {
    const userAddress = await prisma.userAddress.create({ data });

    return userAddress;
  } catch (error) {
    throw error;
  }
};
