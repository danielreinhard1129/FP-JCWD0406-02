import prisma from '@/prisma';
import { updateStatusTransaction } from '@/repositories/transaction/updateStatusTransaction';
import { ITransaction, ITransactionDetails } from '@/types/transaction.types';
import { automaticMutationAction } from '../warehouse/admin/automaticMutationAction';
import { getWarehouseById } from '@/repositories/warehouse/warehouse/getWarehouseById';
import { getTransactionById } from '@/repositories/transaction/getTransactionById';

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
        const stockItem = await prisma.stock.findFirst({
          where: {
            productId: detail.productId,
            warehouseId: data.warehouseId,
          },
        });

        if (!stockItem || stockItem.quantity < detail.quantity) {
          allStocksAvailable = false;
          break;
        }
      }

      if (allStocksAvailable) {
        // If all stocks are available, update the stock quantity for each transaction detail
        await Promise.all(
          transactionDetails.map(async (detail) => {
            console.log('check data detail : ', detail);
            console.log('Data :', data);

            console.log('warehouse ID:', data.warehouseId);

            const { productId, id: stockItemId, quantity } = detail;
            console.log(
              'check productId, stockId and quantity',
              productId,
              stockItemId,
              quantity,
            );
            const warehouseId = await getTransactionById(id);
            console.log('Get warehouseId from transaction', warehouseId);

            try {
              const updatedStock = await prisma.stock.updateMany({
                where: {
                  warehouseId: warehouseId?.warehouseId,
                  productId: productId,
                },
                data: {
                  quantity: {
                    decrement: quantity,
                  },
                },
              });

              const updatedStockId = await prisma.stock.findFirst({
                where: {
                  warehouseId: warehouseId?.warehouseId,
                  productId: productId,
                },
                select: {
                  id: true,
                },
              });

              console.log('Data update Stock with Id :', updatedStockId);
              if (updatedStockId?.id) {
                await prisma.journalStock.create({
                  data: {
                    stockId: updatedStockId.id,
                    quantity: quantity,
                    type: 'reduction for transaction',
                  },
                });
              } else {
                console.error('Error: Updated stock ID is undefined');
              }
              console.log('Updated stock: ', updatedStock);
            } catch (error) {
              console.error('Error updating stock: ', error);
              throw error;
            }
          }),
        );
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
