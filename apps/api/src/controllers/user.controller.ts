import { findAllUserAction } from '@/actions/user/FindAllUserAction';
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
      const newUser = await registerAction(data);

      res.status(newUser.status).send(newUser);
    } catch (error) {
      next(error);
    }
  }
}
