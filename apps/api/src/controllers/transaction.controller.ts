import { addToCartAction } from '@/actions/transaction/createAddToCart';
import { getUserCartAction } from '@/actions/transaction/getUserCartAction';
import { closestWarehouseToTheUser } from '@/actions/transaction/closestWarehouseToTheUser';
import { createTransactionAction } from '@/actions/transaction/createTransactionAction';
import { findTransactionAndDetailsByIdAction } from '@/actions/transaction/findTransactionAndDetailByIdAction';
import { updateStatusTransactionAction } from '@/actions/transaction/updateStatusTransactionAction';
import { NextFunction, Request, Response } from 'express';

export class TransactionController {
  async findTransactionAndDetailById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;

      const transaction = await findTransactionAndDetailsByIdAction(Number(id));
      res.status(200).send(transaction);
    } catch (error) {
      next(error);
    }
  }

  async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, productId, quantity } = req.body;
      const result = await addToCartAction({ userId, productId, quantity });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async closestWarehouseToTheUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const closestWarehouse = await closestWarehouseToTheUser(Number(id));

      res.status(200).send(closestWarehouse);
    } catch (error) {
      next(error);
    }
  }

  async getUserCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await getUserCartAction(Number(id));
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async createTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const { data, dataDetails } = req.body;
      const transaction = await createTransactionAction(data, dataDetails);
      res.status(200).send(transaction);
    } catch (error) {
      next(error);
    }
  }

  async updateStatusTransaction(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const data = req.body;
      // const transaction = await updateStatusTransactionAction(data, Number(id));
      // res.status(200).send(transaction);
    } catch (error) {
      next(error);
    }
  }
}
