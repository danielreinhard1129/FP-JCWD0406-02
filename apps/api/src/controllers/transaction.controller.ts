import { addToCartAction } from '@/actions/transaction/createAddToCart';
import { findTransactionAndDetailsByIdAction } from '@/actions/transaction/findTransactionAndDetailByIdAction';
import { getUserCartAction } from '@/actions/transaction/getUserCartAction';

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
  async getUserCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await getUserCartAction(Number(id));
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
