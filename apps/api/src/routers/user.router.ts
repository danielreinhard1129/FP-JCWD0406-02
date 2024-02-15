import { UserController } from '@/controllers/users.controller';
import { Router } from 'express';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/getdata', this.userController.getUserData);
    this.router.post('/register', this.userController.registerController);
    this.router.post('/login', this.userController.loginUser);
  }

  getRouter(): Router {
    return this.router;
  }
}
