import { UserController } from '@/controllers/users.controller';
import { verifyToken } from '@/middleware/jwtVerifyToken';
import { uploader } from '@/middleware/uploader';
import axios from 'axios';
import { Router } from 'express';

axios.defaults.baseURL = 'https://api.rajaongkir.com/starter/';
axios.defaults.headers.common['key'] = '9dc867b8d79c2897da40488350f03a07';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

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
    this.router.get('/with-role', this.userController.getUserByRoleId);
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
    this.router.post(
      '/register-user',
      verifyToken,
      this.userController.registerUserController,
    );
    this.router.patch(
      '/verification',
      verifyToken,
      this.userController.userVerification,
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
      '/user-verification',
      verifyToken,
      this.userController.userVerification,
    );
    // this.router.post('/ongkirdata', this.userController.createGetOngkir);
    this.router.post(
      '/send-email-for-verif',
      this.userController.sendEmailForVerif,
    );
    this.router.post('/checkongkir', this.userController.createGetOngkir);
    this.router.patch('/create-admin/:id', this.userController.createAdmin);
    this.router.delete('/delete-user/:id', this.userController.deleteUser);
    this.router.delete('/delete-admin/:id', this.userController.deleteAdmin);
    this.router.patch(
      '/photo-profile/:id',
      verifyToken,
      uploader('IMG', '/photo-profile').single('file'),
      this.userController.uploadPhotoProfile,
    );
    this.router.get('/cities', this.userController.getAllCities);
    this.router.post('/post-city', this.userController.createCities);
    this.router.post(
      '/create-token-register',
      this.userController.createTRegisteroken,
    );
    this.router.get('/unassigned', this.userController.getAdminNotAssigned);
    this.router.post(
      '/register-by-google',
      this.userController.registerByGoogle,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
