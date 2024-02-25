import { createCategoryAction } from '@/actions/warehouse/category/createCategoryAction';
import { deleteCategoryAction } from '@/actions/warehouse/category/deleteCategoryAction';
import { getAllCategoriesAction } from '@/actions/warehouse/category/getAllCategoriesAction';
import { getCategoryByIdAction } from '@/actions/warehouse/category/getCategoryByIdAction';
import { createProductAction } from '@/actions/warehouse/product/createProductAction';
import { deleteProductAction } from '@/actions/warehouse/product/deleteProductAction';
import { editProductAction } from '@/actions/warehouse/product/editProductAction';
import { getAllProductsAction } from '@/actions/warehouse/product/getAllProductsAction';
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
      const id = req.params.id;
      const data = req.body;
      const product = await createProductAction(data, Number(id));

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
}
