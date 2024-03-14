import { closestWarehouseToTheUser } from '@/actions/transaction/closestWarehouseToTheUser';
import { createTransactionAction } from '@/actions/transaction/createTransactionAction';
import { findTransactionAndDetailsByIdAction } from '@/actions/transaction/findTransactionAndDetailByIdAction';
import { getTransactionByUuidAction } from '@/actions/transaction/getTransactionByUuidAction';
import { getTransactionByWarehouseIdAction } from '@/actions/transaction/getTransactionByWarehouseIdAction';
import { getUserCartAction } from '@/actions/transaction/getUserCartAction';
import { getWaitingForConfirmationTransactionAction } from '@/actions/transaction/getWaitingForConfirmationTransactionAction.ts';
import { updateStatusTransactionAction } from '@/actions/transaction/updateStatusTransactionAction';
import prisma from '@/prisma';
import { getTransactionById } from '@/repositories/transaction/getTransactionById';
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
      const transactionDetailsResponse =
        await findTransactionAndDetailsByIdAction(Number(id));
      const transactionDetail =
        transactionDetailsResponse.data?.transactionDetails ?? [];
      const transaction = await updateStatusTransactionAction(
        data,
        transactionDetail,
        Number(id),
      );
      res.status(200).send(transaction);
    } catch (error) {
      next(error);
    }
  }

  async uploadPaymentProof(req: Request, res: Response, next: NextFunction) {
    try {
      const { file } = req;
      const { id } = req.params;
      console.log('cek file : ', file);

      const transactionId = parseInt(id);

      const transactionData = await getTransactionById(Number(id));

      await prisma.transaction.update({
        where: { id: transactionId },
        data: { paymentImg: `/${file?.filename}` },
      });

      await prisma.transaction.update({
        where: { id: transactionId },
        data: { TransactionStatus: 'WAITING_PAYMENT_CONFIRMATION' },
      });
      res.status(200).send('Upload Payment success');
    } catch (error) {
      next(error);
    }
  }

  async getTransactionByUuid(req: Request, res: Response, next: NextFunction) {
    try {
      const { uuid } = req.params;

      const transaction = await getTransactionByUuidAction(uuid);
      res.status(200).send(transaction);
    } catch (error) {
      next(error);
    }
  }

  async getTransactionByWarehouseId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const transaction = await getTransactionByWarehouseIdAction(Number(id));
      res.status(200).send(transaction);
    } catch (error) {
      next(error);
    }
  }
  async getWaitingForConfirmationTransaction(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const transaction = await getWaitingForConfirmationTransactionAction();
      res.status(200).send(transaction);
    } catch (error) {
      next(error);
    }
  }
}
