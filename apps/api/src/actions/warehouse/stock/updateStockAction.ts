import prisma from '@/prisma';
import { getStockById } from '@/repositories/warehouse/stock/getStockById';
import { updateStock } from '@/repositories/warehouse/stock/updateStock';
import { IStock } from '@/types/warehouse.types';

export const updateStockAction = async (data: IStock, id: number) => {
  try {
    const dataStockId = await getStockById(id);

    const stock = await updateStock(data, id);

    let journalType: string = '';

    // Calculate the difference between the new and old quantities
    const quantityDifference = data.quantity - dataStockId?.quantity!;

    // Determine the type of journal entry based on the quantity difference
    if (quantityDifference > 0) {
      journalType = 'addition';
    } else if (quantityDifference < 0) {
      journalType = 'reduction';
    }

    // Calculate the absolute quantity difference for the journal entry
    const absoluteQuantityDifference = Math.abs(quantityDifference);

    // Create the journal entry
    await prisma.journalStock.create({
      data: {
        stockId: stock.id,
        quantity: absoluteQuantityDifference,
        type: journalType,
        totalQuantity: stock.quantity,
      },
    });

    return {
      message: 'success edit ',
      data: stock,
    };
  } catch (error) {
    throw error;
  }
};
