export interface ITransaction {
  id: number;
  uuid: string;
  userId: number;
  warehouseId: number;
  shippingCost: number;
  totalPrice: number;
  paymentImg: string;
  transactionStatus: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransactionDetails {
  id: number;
  transactionId: number;
  productId: number;
  quantity: number;
}

export enum TransactionStatus {
  WAITING_FOR_PAYMENT = 'Menunggu Pembayaran',
  WAITING_PAYMENT_CONFIRMATION = 'Menunggu Konfirmasi Pembayaran',
  IN_PROGRESS = 'Diproses',
  SHIPPED = 'Dikirim',
  ORDER_CONFIRMED = 'Pesanan Dikonfirmasi',
  CANCELLED = 'Dibatalkan',
}
