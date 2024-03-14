import prisma from '@/prisma';
import { createStock } from '@/repositories/warehouse/stock/createStock';
import { IStock } from '@/types/warehouse.types';

export const createStockAction = async (data: IStock) => {
  try {
    const existingStock = await prisma.stock.findFirst({
      where: {
        warehouseId: data.warehouseId,
        productId: data.productId,
      },
    });
    if (existingStock) {
      throw new Error(
        ` WarehouseId ${data.warehouseId} and ProductId ${data.productId} already exist. Please update stock.`,
      );
    }
    const stock = await createStock(data);

    await prisma.journalStock.create({
      data: {
        stockId: stock.id,
        quantity: stock.quantity,
        type: 'added new stock',
        totalQuantity: stock.quantity,
      },
    });

    return {
      message: 'create stock success',
      data: stock,
    };
  } catch (error) {
    throw error;
  }
};
