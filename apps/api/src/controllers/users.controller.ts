import { findAllUserAction } from '@/actions/user/FindAllUserAction';
import { keepLoginAction } from '@/actions/user/KeepLoginAction';
import { loginAction } from '@/actions/user/LoginAction';
import { registerAction } from '@/actions/user/RegisterAction';
import { NextFunction, Request, Response } from 'express';

export class UserController {
  async getUserData(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await findAllUserAction();
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async registerController(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const register = await registerAction(data);

      res.status(200).send(register);
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const result = await loginAction(data);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async keeplogin(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.user?.email;

      const result = await keepLoginAction(email as string);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}