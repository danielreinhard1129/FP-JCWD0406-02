import { findTransactionAndDetailsByIdAction } from '@/actions/transaction/findTransactionAndDetailByIdAction';
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
}
