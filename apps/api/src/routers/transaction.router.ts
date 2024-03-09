import { TransactionController } from '@/controllers/transaction.controller';
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
  }

  getRouter(): Router {
    return this.router;
  }
}
