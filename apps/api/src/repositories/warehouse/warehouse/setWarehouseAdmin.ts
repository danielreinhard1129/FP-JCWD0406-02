import prisma from '@/prisma';
import { IWarehouse } from '@/types/warehouse.types';

export const setWarehouseAdmin = async (id: number, data: IWarehouse) => {
  try {
    const warehouse = await prisma.warehouse.update({
      where: { id },
      data,
    });

    return warehouse;
  } catch (error) {
    throw error;
  }
};
