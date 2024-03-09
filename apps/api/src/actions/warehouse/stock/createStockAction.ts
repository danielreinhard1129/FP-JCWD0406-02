import prisma from '@/prisma';
import { createStock } from '@/repositories/warehouse/stock/createStock';
import { IStock } from '@/types/warehouse.types';

export const createStockAction = async (data: IStock) => {
  try {
    const { warehouseId, productId } = data;
    const existingStock = await prisma.stock.findMany({
      where: {
        warehouseId: warehouseId,
        productId: productId,
      },
    });
    if (existingStock) {
      throw new Error(
        ` WarehouseId ${warehouseId} and ProductId ${productId} already exist. Please update stock.`,
      );
    }
    const stock = await createStock(data);

    await prisma.journalStock.create({
      data: {
        stockId: stock.id,
        quantity: stock.quantity,
        type: 'added new stock',
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
