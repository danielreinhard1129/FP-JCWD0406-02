import prisma from '@/prisma';
import { ITransaction, ITransactionDetails } from '@/types/transaction.types';
import { automaticMutationAction } from '../warehouse/admin/automaticMutationAction';

export const updateStatusTransactionAction = async (
  data: ITransaction,
  transactionDetails: ITransactionDetails[],
  id: number,
) => {
  try {
    console.log('transaction details : ', transactionDetails);

    if (data.TransactionStatus == 'CANCELLED') {
      await prisma.transaction.update({
        where: { id },
        data: { TransactionStatus: data.TransactionStatus },
      });

      return {
        message: 'Transaction is cancelled ',
      };
    }

    if (data.TransactionStatus == 'ORDER_CONFIRMED') {
      let allStocksAvailable = true;

      // Check if all stocks are available for all transaction details
      for (const detail of transactionDetails) {
        const stockItems = await prisma.stock.findMany({
          where: {
            productId: detail.productId,
            warehouseId: data.warehouseId,
          },
        });

        // console.log('check stock items : ', stockItems);

        // If there are no stock items or their quantities are insufficient, set allStocksAvailable to false
        if (
          stockItems.length === 0 ||
          stockItems.some((stockItem) => stockItem.quantity < detail.quantity)
        ) {
          allStocksAvailable = false;
          break;
        }
      }

      if (allStocksAvailable) {
        // If all stocks are available, update the stock quantity for each transaction detail
        await Promise.all(
          transactionDetails.map(async (detail) => {
            // Your existing code for updating stock quantity
          }),
        );

        await prisma.transaction.update({
          where: { id },
          data: { TransactionStatus: 'SHIPPED' },
        });

        return {
          message: ' transaction success',
        };
      } else {
        const automaticMutation = await automaticMutationAction(id);
        console.log('Check data auto  mutation: ', automaticMutation);

        await prisma.transaction.update({
          where: { id },
          data: { TransactionStatus: 'IN_PROGRESS' },
        });
        return {
          message:
            "Stocks don't enough to transaction success running auto mutation",
        };
      }
    }
  } catch (error) {
    throw error;
  }
};
