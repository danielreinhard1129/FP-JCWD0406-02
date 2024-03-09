import { WarehouseController } from '@/controllers/warehouses.controller';
import { uploader } from '@/middleware/uploader';
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
      '/create-product',
      uploader('IMG', '/photo-product').array('files', 4),
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
    this.router.get(
      '/auto-mutation/:id',
      this.warehouseController.automaticMutation,
    );
    this.router.post(
      '/create-warehouse',
      this.warehouseController.createWarehouse,
    );
    this.router.get(
      '/get-all-warehouses',
      this.warehouseController.getAllWarehouses,
    );
    this.router.get('/branch/:id', this.warehouseController.getWarehouseById);
    this.router.patch(
      '/set-warehouse-admin/:id',
      this.warehouseController.setWarehouseAdmin,
    );

    this.router.get(
      '/random-products',
      this.warehouseController.getRandomProducts,
    );
    this.router.get(
      '/get-product-by-title/filter',
      this.warehouseController.getProductByTitle,
    );
    this.router.patch(
      '/upload-photos-product/:id',
      uploader('IMG', '/photo-product').array('files'),
      this.warehouseController.uploadPhotosProduct,
    );
    this.router.get('/product/:id', this.warehouseController.getProductById);
    this.router.post('/create-stock', this.warehouseController.createStock);
    this.router.patch(
      '/update-stock/:id',
      this.warehouseController.updateStock,
    );
    this.router.delete(
      '/delete-stock/:id',
      this.warehouseController.deleteStock,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
