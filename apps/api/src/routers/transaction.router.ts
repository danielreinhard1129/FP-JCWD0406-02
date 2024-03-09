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
    this.router.post('/add-to-cart', this.transactionController.addToCart);
    this.router.get('/cart/:id', this.transactionController.getUserCart);
  }

  getRouter(): Router {
    return this.router;
  }
}