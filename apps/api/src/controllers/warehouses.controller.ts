import { automaticMutationAction } from '@/actions/warehouse/admin/automaticMutationAction';
import { reqStockProductAction } from '@/actions/warehouse/admin/reqStockProductAction';
import { updateStatusStockMutationAction } from '@/actions/warehouse/admin/updateStatusStockMutationAction';
import { createCategoryAction } from '@/actions/warehouse/category/createCategoryAction';
import { deleteCategoryAction } from '@/actions/warehouse/category/deleteCategoryAction';
import { getAllCategoriesAction } from '@/actions/warehouse/category/getAllCategoriesAction';
import { getCategoryByIdAction } from '@/actions/warehouse/category/getCategoryByIdAction';
import { createProductAction } from '@/actions/warehouse/product/createProductAction';
import { deleteProductAction } from '@/actions/warehouse/product/deleteProductAction';
import { editProductAction } from '@/actions/warehouse/product/editProductAction';
import { getAllProductsAction } from '@/actions/warehouse/product/getAllProductsAction';
import { getProductByTitleAction } from '@/actions/warehouse/product/getProductByTitleAction';
import { getRandomProductsAction } from '@/actions/warehouse/product/getRandomProductsAction';
import { createStockMutationAction } from '@/actions/warehouse/stockMutation/createStockMutation';
import { createWarehouseAction } from '@/actions/warehouse/warehouse/createWarehouseAction';
import { getAllWarehousesAction } from '@/actions/warehouse/warehouse/getAllWarehousesAction';
import { getWarehouseByIdAction } from '@/actions/warehouse/warehouse/getWarehouseByIdAction';
import { setWarehouseAdminAction } from '@/actions/warehouse/warehouse/setWarehouseAdminAction';
import { NextFunction, Request, Response } from 'express';

export class WarehouseController {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await getAllProductsAction();

      res.status(200).send(products);
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const product = await createProductAction(data);

      res.status(200).send(product);
    } catch (error) {
      next(error);
    }
  }

  async editProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;

      const product = await editProductAction(data, Number(id));

      res.status(200).send(product);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const deletedProduct = await deleteProductAction(Number(id));

      res.status(200).send(deletedProduct);
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const category = await createCategoryAction(data);

      res.status(200).send(category);
    } catch (error) {
      next(error);
    }
  }

  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await getAllCategoriesAction();
      res.status(200).send(categories);
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category = await getCategoryByIdAction(Number(id));
      res.status(200).send(category);
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category = await deleteCategoryAction(Number(id));
      res.status(200).send(category);
    } catch (error) {
      next(error);
    }
  }

  async reqStockProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const stock = await reqStockProductAction(data);
      res.status(200).send(stock);
    } catch (error) {
      next(error);
    }
  }

  async createStockMutation(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const stock = await createStockMutationAction(data);
      res.status(200).send(stock);
    } catch (error) {
      next(error);
    }
  }

  async updateStatusStockMutation(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const data = req.body;

      const stock = await updateStatusStockMutationAction(Number(id), data);

      res.status(200).send(stock);
    } catch (error) {
      next(error);
    }
  }

  async automaticMutation(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await automaticMutationAction();

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async createWarehouse(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const warehouse = await createWarehouseAction(data);
      res.status(200).send(warehouse);
    } catch (error) {
      next(error);
    }
  }

  async getAllWarehouses(req: Request, res: Response, next: NextFunction) {
    try {
      const warehouses = await getAllWarehousesAction();
      res.status(200).send(warehouses);
    } catch (error) {
      next(error);
    }
  }

  async getWarehouseById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const warehouse = await getWarehouseByIdAction(Number(id));
      res.status(200).send(warehouse);
    } catch (error) {
      next(error);
    }
  }

  async setWarehouseAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await setWarehouseAdminAction(Number(id), data);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getRandomProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const randomProducts = await getRandomProductsAction();
      res.status(200).send(randomProducts);
    } catch (error) {
      next(error);
    }
  }

  async getProductByTitle(req: Request, res: Response, next: NextFunction) {
    try {
      const title = req.query.title;
      console.log('querrryyyy', title);

      const product = await getProductByTitleAction(String(title));
      res.status(200).send(product);
    } catch (error) {
      next(error);
    }
  }
}
