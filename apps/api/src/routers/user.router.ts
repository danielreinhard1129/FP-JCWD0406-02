import { UserController } from '@/controllers/users.controller';
import { verifyToken } from '@/middleware/jwtVerifyToken';
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
    this.router.get('/user/:id', this.userController.getUserById);
    this.router.post('/register', this.userController.registerController);
    this.router.post('/login', this.userController.loginUser);
    this.router.get('/keeplogin', verifyToken, this.userController.keeplogin);
    this.router.patch('/edituser/:id', this.userController.editUser);
    this.router.post('/forgot-password', this.userController.forgotPassword);
    this.router.patch(
      '/reset-password',
      verifyToken,
      this.userController.resetPassword,
    );
    this.router.get('/user-address', this.userController.getAllUserAddress);
    this.router.post('/add-address', this.userController.AddUserAddress);
    this.router.get(
      '/user-addresses/:id',
      this.userController.getAddresByUserId,
    );
    this.router.get(
      '/user-address/:id',
      this.userController.getUserAddressById,
    );
    this.router.patch('/edit-address/:id', this.userController.editUserAddress);
    this.router.delete(
      '/delete-address/:id',
      this.userController.deleteUserAddress,
    );
    this.router.patch(
      '/default-address/:id',
      this.userController.setDefaultAddressController,
    );
    this.router.patch(
      '/user-verification/:id',
      this.userController.userVerification,
    );
    this.router.post('/checkemail', this.userController.sendEmailForVerif);
  }

  getRouter(): Router {
    return this.router;
  }
}
