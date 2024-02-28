import prisma from '@/prisma';
import { IWarehouse } from '@/types/warehouse.types';

export const createWarehouse = async (data: IWarehouse) => {
  try {
    const warehouse = await prisma.warehouse.create({ data });

    return warehouse;
  } catch (error) {
    throw error;
  }
};
