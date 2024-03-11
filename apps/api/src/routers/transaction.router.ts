import { TransactionController } from '@/controllers/transaction.controller';
import { verifyToken } from '@/middleware/jwtVerifyToken';
import { uploader } from '@/middleware/uploader';
import { Router } from 'express';

export class TransactionRouter {
  private router: Router;
  private transactionController: TransactionController;

  constructor() {
    this.transactionController = new TransactionController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/get-transaction/:id',
      this.transactionController.findTransactionAndDetailById,
    );
    this.router.get(
      '/closest-warehouse/:id',
      this.transactionController.closestWarehouseToTheUser,
    );
    this.router.post(
      '/create-transaction',
      this.transactionController.createTransaction,
    );
    this.router.patch(
      '/update-status/:id',
      this.transactionController.updateStatusTransaction,
    );
    this.router.patch(
      '/upload-payment-proof/:id',
      verifyToken,
      uploader('IMG', '/payment-proof').single('file'),
      this.transactionController.uploadPaymentProof,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
