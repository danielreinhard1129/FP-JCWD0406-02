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

    this.router.post('/add-to-cart', this.transactionController.addToCart);
    this.router.get('/cart/:id', this.transactionController.getUserCart);

    this.router.get(
      '/closest-warehouse/:id',
      this.transactionController.closestWarehouseToTheUser,
    );
    this.router.post(
      '/create-transaction',
      this.transactionController.createTransaction,
    );
    this.router.patch(
      '/update-cart/:id',
      this.transactionController.updateCartQuantity,
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
    this.router.get(
      '/details/:uuid',
      this.transactionController.getTransactionByUuid,
    );
    this.router.get(
      '/order-list/:id',
      this.transactionController.getTransactionByWarehouseId,
    );
    this.router.get(
      '/order-list',
      this.transactionController.getAllTransaction,
    );
    this.router.get(
      '/all-transaction',
      this.transactionController.getAllTransaction,
    );
    this.router.get('/sales-report', this.transactionController.salesReport);
  }

  getRouter(): Router {
    return this.router;
  }
}
