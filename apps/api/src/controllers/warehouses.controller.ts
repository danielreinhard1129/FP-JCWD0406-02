import { createStockAction } from '@/actions/warehouse/stock/createStockAction';
import { automaticMutationAction } from '@/actions/warehouse/admin/automaticMutationAction';
import { reqStockProductAction } from '@/actions/warehouse/admin/reqStockProductAction';
import { updateStatusStockMutationAction } from '@/actions/warehouse/admin/updateStatusStockMutationAction';
import { createCategoryAction } from '@/actions/warehouse/category/createCategoryAction';
import { deleteCategoryAction } from '@/actions/warehouse/category/deleteCategoryAction';
import { getAllCategoriesAction } from '@/actions/warehouse/category/getAllCategoriesAction';
import { getCategoryByIdAction } from '@/actions/warehouse/category/getCategoryByIdAction';
import { deleteProductAction } from '@/actions/warehouse/product/deleteProductAction';
import { editProductAction } from '@/actions/warehouse/product/editProductAction';
import { getAllProductsAction } from '@/actions/warehouse/product/getAllProductsAction';
import { getProductByIdAction } from '@/actions/warehouse/product/getProductByIdAction';
import { getProductByTitleAction } from '@/actions/warehouse/product/getProductByTitleAction';
import { getRandomProductsAction } from '@/actions/warehouse/product/getRandomProductsAction';
import { uploadProductPhotosAction } from '@/actions/warehouse/product/uploadProductPhotosAction';
import { createStockMutationAction } from '@/actions/warehouse/stockMutation/createStockMutation';
import { createWarehouseAction } from '@/actions/warehouse/warehouse/createWarehouseAction';
import { getAllWarehousesAction } from '@/actions/warehouse/warehouse/getAllWarehousesAction';
import { getWarehouseByIdAction } from '@/actions/warehouse/warehouse/getWarehouseByIdAction';
import { setWarehouseAdminAction } from '@/actions/warehouse/warehouse/setWarehouseAdminAction';
import prisma from '@/prisma';
import { getProductByTitle } from '@/repositories/warehouse/product/getProductByTitle';
import { updateProduct } from '@/repositories/warehouse/product/updateProduck';
import { NextFunction, Request, Response } from 'express';
import { updateStockAction } from '@/actions/warehouse/stock/updateStockAction';
import { deleteStockAction } from '@/actions/warehouse/stock/deleteStockAction';
import { stockReportAction } from '@/actions/warehouse/stock/stockReport';
import { getReqStockAction } from '@/actions/superAdmin/getReqStockAction';
import { catalogProductAction } from '@/actions/warehouse/product/catalogProductAction';
import { journalStockReportAction } from '@/actions/stockReport/journalStockReportAction';
import { getStockMutationByInitialWarehouseAction } from '@/actions/warehouse/stockMutation/getStockMutationByInitialWarehouseAction';
import { journalStockReportByWarehouseAction } from '@/actions/stockReport/journalStockReportByWarehouseAction';
import { journalStockReportFixAction } from '@/actions/stockReport/journalStockReportFix';
import { getWarehouseByUserIdAction } from '@/actions/warehouse/warehouse/getWarehouseByUserIdAction';
import { updateReqStockStatusAction } from '@/actions/superAdmin/updateReqStockStatusAction';
import { getReqStockByWarehouseIdAction } from '@/actions/warehouse/admin/getReqStockByWarehouseIdAction';
import { deleteWarehouseAction } from '@/actions/warehouse/warehouse/deleteWarehouseAction';

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
      console.log('reqqqqqq value', req.body);
      const { title, description, price, weight, categoryId } = req.body;
      console.log('reqqq filesss', req.files);

      const files = req.files;

      console.log('checkk filee : ', files);
      console.log('check req bodyy : ', req.body);

      if (!files || !Array.isArray(files)) {
        // Handle case where multer encountered an error or no files were uploaded
        throw new Error('Please input file for photo product');
      }

      if (files.length === 0) {
        throw new Error('Please input file for photo product');
      }

      for (const file of files) {
        const maxSize = 1 * 1024 * 1024;
        if (file.size > maxSize) {
          throw new Error(`${file.originalname} size is too large!`);
        }
      }

      const checkTitle = await getProductByTitle(title);

      if (checkTitle) {
        if (checkTitle.isDeleted) {
          const restoreProduct = await updateProduct({
            ...checkTitle,
            isDeleted: false,
          });
          res.status(200).send(restoreProduct);
        } else {
          throw new Error(`Product with Title ${title} already exist`);
        }
      }

      const create = await prisma.$transaction(async (tx) => {
        const product = await tx.product.create({
          data: {
            title,
            price: parseFloat(price),
            description,
            weight: parseFloat(weight),
            categoryId: parseInt(categoryId),
          },
        });

        const productId = product.id;

        const productPhotoWithId = files.map((file) => ({
          productId,
          photo_product: file.filename,
        }));

        await tx.productPhoto.createMany({
          data: productPhotoWithId,
        });

        console.log('Photos saved successfully for product:', productId);

        return product;
      });
      console.log('dataaaaa success', create);

      res.status(200).send(create);
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
      const { data, dataDetail } = req.body;
      const stock = await createStockMutationAction(data, dataDetail);
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
      const { id } = req.params;
      const result = await automaticMutationAction(Number(id));

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

  async uploadPhotosProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const productId = Number(id);
      const files = (req as any).files as Express.Multer.File[]; // Assuming you're uploading multiple files

      const result = await uploadProductPhotosAction(productId, files);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const result = await getProductByIdAction(id);

      if (result.data === null) {
        res.status(404).send({ message: 'Product not found' });
        return;
      }

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async createStock(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const stock = await createStockAction(data);
      res.status(200).send(stock);
    } catch (error) {
      next(error);
    }
  }

  async updateStock(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;
      const stock = await updateStockAction(data, Number(id));
      res.status(200).send(stock);
    } catch (error) {
      throw error;
    }
  }

  async deleteStock(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const stock = await deleteStockAction(Number(id));
      res.status(200).send(stock);
    } catch (error) {
      throw error;
    }
  }

  async stockReport(req: Request, res: Response, next: NextFunction) {
    try {
      const stock = await stockReportAction();
      res.status(200).send(stock);
    } catch (error) {
      next(error);
    }
  }

  async getReqStock(req: Request, res: Response, next: NextFunction) {
    try {
      const stock = await getReqStockAction();
      res.status(200).send(stock);
    } catch (error) {
      next(error);
    }
  }

  async catalogProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const category = req.query.category as string;
      console.log('querrryy', req.query);

      const catalog = await catalogProductAction(category);
      res.status(200).send(catalog);
    } catch (error) {
      next(error);
    }
  }

  async journalStockReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { warehouseId, start, end } = req.query;
      console.log('check query', req.query);

      const startDate = new Date(start as string);
      const endDate = new Date(end as string);

      const formatStart = startDate.toISOString();
      const formatEnd = endDate.toISOString();

      const report = await journalStockReportAction(
        Number(warehouseId),
        formatStart,
        formatEnd,
      );

      res.status(200).send(report);
    } catch (error) {
      next(error);
    }
  }

  async journalStockReportFix(req: Request, res: Response, next: NextFunction) {
    try {
      const { warehouseId, start, end } = req.query;
      console.log('check querry : ', req.query);

      const startDate = new Date(start as string);
      const endDate = new Date(end as string);

      const formatStart = startDate.toISOString();
      const formatEnd = endDate.toISOString();

      const report = await journalStockReportFixAction(
        Number(warehouseId),
        formatStart,
        formatEnd,
      );
      res.status(200).send(report);
    } catch (error) {
      next(error);
    }
  }

  async journalStockReportByWareouse(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const { start, end } = req.query;

      const startDate = new Date(start as string);
      const endDate = new Date(end as string);

      const formatStart = startDate.toISOString();
      const formatEnd = endDate.toISOString();

      const report = await journalStockReportByWarehouseAction(
        Number(id),
        formatStart,
        formatEnd,
      );

      res.status(200).send(report);
    } catch (error) {
      next(error);
    }
  }

  async getStockMutationByInitialWarehouse(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const stockMutation = await getStockMutationByInitialWarehouseAction(
        Number(id),
      );
      res.status(200).send(stockMutation);
    } catch (error) {
      next(error);
    }
  }

  async getWarehouseByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.query;
      console.log('userrrr', userId);

      const usereWarehouse = await getWarehouseByUserIdAction(Number(userId));
      res.status(200).send(usereWarehouse);
    } catch (error) {
      next(error);
    }
  }

  async updateReqStockStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;

      const reqStock = await updateReqStockStatusAction(Number(id), data);
      res.status(200).send(reqStock);
    } catch (error) {
      next(error);
    }
  }
  async getReqStockByWarehouseId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;

      const reqStock = await getReqStockByWarehouseIdAction(Number(id));
      res.status(200).send(reqStock);
    } catch (error) {
      next(error);
    }
  }

  async deleteWarehouse(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const warehouse = await deleteWarehouseAction(Number(id));
      res.status(200).send(warehouse);
    } catch (error) {
      next(error);
    }
  }
}
