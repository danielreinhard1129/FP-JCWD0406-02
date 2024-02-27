import { findAllUserAction } from '@/actions/user/FindAllUserAction';
import { keepLoginAction } from '@/actions/user/KeepLoginAction';
import { loginAction } from '@/actions/user/LoginAction';
import { registerAction } from '@/actions/user/RegisterAction';
import { editUserAction } from '@/actions/user/editUserAction';
import { forgotPasswordAction } from '@/actions/user/forgotPasswordAction';
import { getUserByIdAction } from '@/actions/user/getUserByIdAction';
import { getUserByRoleIdAction } from '@/actions/user/getUserByRoleIdAction';
import { resetPasswordAction } from '@/actions/user/resetPasswordAction';
import { sendEmailForVerifAction } from '@/actions/user/sendEmailForVerifAction';
import { userVerificationAction } from '@/actions/user/userVerificationAction';
import { addUserAddressAction } from '@/actions/userAddress/addUserAddressAction';
import { setDefaultAddressAction } from '@/actions/userAddress/setDefaultAddressAction';
import { deleteUserAddressAction } from '@/actions/userAddress/deleteUserAddressAction';
import { editUserAddressAction } from '@/actions/userAddress/editUserAddressAction';
import { getAddresByUserIdAction } from '@/actions/userAddress/getAddressByUserIdAction';
import { getAllUserAddressAction } from '@/actions/userAddress/getAllUserAddressAction';
import { getUserAddressByIdAction } from '@/actions/userAddress/getUserAddressByIdAction';
import { deleteUserAddress } from '@/repositories/userAddress/deleteUserAddress';
import { NextFunction, Request, Response } from 'express';
import { createAdminAction } from '@/actions/superAdmin/createAdminAction';
import { deleteUserAction } from '@/actions/user/deleteUserAction';
import { deleteAdminAction } from '@/actions/superAdmin/deleteAdminAction';

export class UserController {
  async getUserData(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await findAllUserAction();
      res.status(result.status).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await getUserByIdAction(Number(id));

      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }

  async getUserByRoleId(req: Request, res: Response, next: NextFunction) {
    try {
       const roleId = parseInt(req.query.roleId as string);
      const user = await getUserByRoleIdAction(roleId);

      res.status(200).send(user);
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

  async editUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;

      const result = await editUserAction(data, Number(id));

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await forgotPasswordAction(req.body.email);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.user?.email;
      const result = await resetPasswordAction(String(email), req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async AddUserAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const userAddress = await addUserAddressAction(data);

      res.status(200).send(userAddress);
    } catch (error) {
      next(error);
    }
  }

  async getAllUserAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const userAddress = await getAllUserAddressAction();

      res.status(200).send(userAddress);
    } catch (error) {
      next(error);
    }
  }

  async getAddresByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const userAddresses = await getAddresByUserIdAction(Number(id));

      res.status(200).send(userAddresses);
    } catch (error) {
      next(error);
    }
  }

  async getUserAddressById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const userAddress = await getUserAddressByIdAction(Number(id));

      res.status(200).send(userAddress);
    } catch (error) {
      next(error);
    }
  }

  async editUserAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;

      const userAddress = await editUserAddressAction(data, Number(id));

      res.status(200).send(userAddress);
    } catch (error) {
      next(error);
    }
  }

  async deleteUserAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const userAdress = await deleteUserAddressAction(Number(id));

      res.status(200).send(userAdress);
    } catch (error) {
      next(error);
    }
  }

  async setDefaultAddressController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const addressId = Number(req.params.id); // Address ID from URL parameter
      const { userId } = req.body; // User ID from request body

      // Validate both userId and addressId
      if (!userId) {
        return res.status(400).send({ message: 'UserId is required' });
      }
      if (isNaN(addressId)) {
        return res.status(400).send({ message: 'Valid addressId is required' });
      }

      const result = await setDefaultAddressAction(userId, addressId);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async userVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await userVerificationAction(Number(id));

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async sendEmailForVerif(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await sendEmailForVerifAction(req.body.email);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async createAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const admin = await createAdminAction(Number(id));

      res.status(200).send(admin);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleteUser = await deleteUserAction(Number(id));
      res.status(200).send(deleteUser);
    } catch (error) {
      next(error);
    }
  }

  async deleteAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const admin = await deleteAdminAction(Number(id));
      res.status(200).send(admin);
    } catch (error) {
      next(error);
    }
  }
}
