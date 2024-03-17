import prisma from '@/prisma';
import { getProductById } from '@/repositories/warehouse/product/getProductById';
import { createStock } from '@/repositories/warehouse/stock/createStock';
import { getWarehouseById } from '@/repositories/warehouse/warehouse/getWarehouseById';
import { IStock } from '@/types/warehouse.types';

export const createStockAction = async (data: IStock) => {
  try {
    const existingStock = await prisma.stock.findFirst({
      where: {
        warehouseId: data.warehouseId,
        productId: data.productId,
      },
    });
    const product = await getProductById(data.productId);
    const warehose = await getWarehouseById(data.warehouseId);

    if (existingStock) {
      throw new Error(
        ` Warehouse ${warehose?.name} and Product ${product?.title} already exist. Please update stock.`,
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
