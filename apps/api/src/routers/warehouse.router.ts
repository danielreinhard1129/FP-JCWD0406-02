import { WarehouseController } from '@/controllers/warehouses.controller';
import { Router } from 'express';

export class WarehouseRouter {
  private router: Router;
  private warehouseController: WarehouseController;

  constructor() {
    this.warehouseController = new WarehouseController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/products', this.warehouseController.getProducts);
    this.router.post(
      '/create-product/:id',
      this.warehouseController.createProduct,
    );
    this.router.patch(
      '/edit-product/:id',
      this.warehouseController.editProduct,
    );
    this.router.delete(
      '/delete-product/:id',
      this.warehouseController.deleteProduct,
    );
    this.router.post(
      '/create-category',
      this.warehouseController.createCategory,
    );
    this.router.get('/categories', this.warehouseController.getAllCategories);
    this.router.get(
      '/category-id/:id',
      this.warehouseController.getCategoryById,
    );
    this.router.delete(
      '/delete-category/:id',
      this.warehouseController.deleteCategory,
    );
    this.router.post('/req-stock', this.warehouseController.reqStockProduct);
    this.router.post(
      '/create-stock-mutation',
      this.warehouseController.createStockMutation,
    );
    this.router.patch(
      '/update-status-stock/:id',
      this.warehouseController.updateStatusStockMutation,
    );
    this.router.get('/get-geo', this.warehouseController.automaticMutation);
    this.router.post(
      '/create-warehouse',
      this.warehouseController.createWarehouse,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
