import { TransactionStatus } from '@prisma/client';

export interface ITransaction {
  id: number;
  uuid: string;
  userId: number;
  warehouseId: number;
  shippingCost: number;
  totalPrice: number;
  paymentImg: string;
  TransactionStatus: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransactionDetails {
  id: number;
  transactionId: number;
  productId: number;
  quantity: number;
}
