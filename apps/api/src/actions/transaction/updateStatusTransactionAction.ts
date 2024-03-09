import prisma from '@/prisma';
import { updateStatusTransaction } from '@/repositories/transaction/updateStatusTransaction';
import {
  ITransaction,
  ITransactionDetails,
  TransactionStatus,
} from '@/types/transaction.types';

export const updateStatusTransactionAction = async (
  data: ITransaction,
  transactionDetails: ITransactionDetails[],
  id: number,
) => {
  try {
    if (data.transactionStatus === TransactionStatus.ORDER_CONFIRMED) {
      const stockItems = await prisma.stock.findMany({
        where: {
          warehouseId: data.warehouseId,
          productId: {
            in: transactionDetails.map((detail) => detail.productId),
          }, // Use transactionDetails from parameter
        },
        select: {
          productId: true,
          quantity: true,
        },
      });

      // Check if stock is sufficient for all products in the transaction details
      const insufficientStock = transactionDetails.some((detail) => {
        const stockItem = stockItems.find(
          (item: any) => item.productId === detail.productId,
        );
        return !stockItem || stockItem.quantity < detail.quantity;
      });

      if (insufficientStock) {
        throw new Error('Insufficient stock for one or more products');
      }
    }

    const transaction = await updateStatusTransaction(id, data);

    return {
      message: 'success update status',
      data: transaction,
    };
  } catch (error) {
    throw error;
  }
};
