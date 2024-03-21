import { createAdminAction } from '@/actions/superAdmin/createAdminAction';
import { deleteAdminAction } from '@/actions/superAdmin/deleteAdminAction';
import { findAllUserAction } from '@/actions/user/FindAllUserAction';
import { keepLoginAction } from '@/actions/user/KeepLoginAction';
import { loginAction } from '@/actions/user/LoginAction';
import { registerAction } from '@/actions/user/RegisterAction';
import { createRegisterTokenAction } from '@/actions/user/createRegisterokenAction';
import { deleteUserAction } from '@/actions/user/deleteUserAction';
import { editUserAction } from '@/actions/user/editUserAction';
import { forgotPasswordAction } from '@/actions/user/forgotPasswordAction';
import { getAdminNotAssignedAction } from '@/actions/user/getAdminNotAsignAction';
import { getUserByIdAction } from '@/actions/user/getUserByIdAction';
import { getUserByRoleIdAction } from '@/actions/user/getUserByRoleIdAction';
import { registerByGoogleAction } from '@/actions/user/registerByGoogleAction';
import { registerUserAction } from '@/actions/user/registerUserAction';
import { resetPasswordAction } from '@/actions/user/resetPasswordAction';
import { sendEmailForVerifAction } from '@/actions/user/sendEmailForVerifAction';
import { userVerificationAction } from '@/actions/user/userVerificationAction';
import { addUserAddressAction } from '@/actions/userAddress/addUserAddressAction';
import { deleteUserAddressAction } from '@/actions/userAddress/deleteUserAddressAction';
import { editUserAddressAction } from '@/actions/userAddress/editUserAddressAction';
import { getAddresByUserIdAction } from '@/actions/userAddress/getAddressByUserIdAction';
import { getAllCitiesAction } from '@/actions/userAddress/getAllCitiesAction';
import { getAllUserAddressAction } from '@/actions/userAddress/getAllUserAddressAction';
import { getOngkirAction } from '@/actions/userAddress/getOngkirAction';
import { getUserAddressByIdAction } from '@/actions/userAddress/getUserAddressByIdAction';
import { setDefaultAddressAction } from '@/actions/userAddress/setDefaultAddressAction';
import { createTokenRegister } from '@/lib/jwt';
import prisma from '@/prisma';
import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { join } from 'path';

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

  async registerUserController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const token = req.user?.email;
      const data = req.body;

      const user = await registerUserAction(data, String(token));
      res.status(200).send(user);
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
      console.log('check email : ', email);

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
      const email = req.user?.email;
      console.log('controllerrrcheckkkk req', req.user);

      console.log('controllerrrrrrr', email);

      const result = await userVerificationAction(String(email));

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

  async createGetOngkir(req: Request, res: Response, next: NextFunction) {
    try {
      const { origin, destination, weight, courier } = req.body;

      const getOngkir = await getOngkirAction({
        origin,
        destination,
        weight,
        courier,
      });
      res.status(200).send(getOngkir);
    } catch (error) {
      next(error);
    }
  }

  async uploadPhotoProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { file } = req;
      const { id } = req.params;
      const userId = parseInt(id);

      const userData = await getUserByIdAction(Number(id));

      const defaultDir = '../../public/photo-profile';
      const isOldImageExist = fs.existsSync(
        join(__dirname, defaultDir + userData.data?.profile_picture),
      );

      if (isOldImageExist) {
        fs.unlinkSync(
          join(__dirname, defaultDir + userData.data?.profile_picture),
        );
      }

      await prisma.user.update({
        where: { id: userId },
        data: { profile_picture: `/${file?.filename}` },
      });

      res.status(200).send('update photo profile success');
    } catch (error) {
      next(error);
    }
  }

  async getAllCities(req: Request, res: Response, next: NextFunction) {
    try {
      const cities = await getAllCitiesAction();
      res.status(200).send(cities);
    } catch (error) {
      next(error);
    }
  }

  async createCities(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const cities = await prisma.city.createMany({
        data: [
          { id: '301', name: 'Nagekeo' },
          { id: '302', name: 'Natuna' },
          { id: '303', name: 'Nduga' },
          { id: '304', name: 'Ngada' },
          { id: '305', name: 'Nganjuk' },
          { id: '306', name: 'Ngawi' },
          { id: '307', name: 'Nias' },
          { id: '308', name: 'Nias Barat' },
          { id: '309', name: 'Nias Selatan' },
          { id: '310', name: 'Nias Utara' },
          { id: '311', name: 'Nunukan' },
          { id: '312', name: 'Ogan Ilir' },
          { id: '313', name: 'Ogan Komering Ilir' },
          { id: '314', name: 'Ogan Komering Ulu' },
          { id: '315', name: 'Ogan Komering Ulu Selatan' },
          { id: '316', name: 'Ogan Komering Ulu Timur' },
          { id: '317', name: 'Pacitan' },
          { id: '318', name: 'Padang' },
          { id: '319', name: 'Padang Lawas' },
          { id: '320', name: 'Padang Lawas Utara' },
          { id: '321', name: 'Padang Panjang' },
          { id: '322', name: 'Padang Pariaman' },
          { id: '323', name: 'Padang Sidempuan' },
          { id: '324', name: 'Pagar Alam' },
          { id: '325', name: 'Pakpak Bharat' },
          { id: '326', name: 'Palangka Raya' },
          { id: '327', name: 'Palembang' },
          { id: '328', name: 'Palopo' },
          { id: '329', name: 'Palu' },
          { id: '330', name: 'Pamekasan' },
          { id: '331', name: 'Pandeglang' },
          { id: '332', name: 'Pangandaran' },
          { id: '333', name: 'Pangkajene Kepulauan' },
          { id: '334', name: 'Pangkal Pinang' },
          { id: '335', name: 'Paniai' },
          { id: '336', name: 'Parepare' },
          { id: '337', name: 'Pariaman' },
          { id: '338', name: 'Parigi Moutong' },
          { id: '339', name: 'Pasaman' },
          { id: '340', name: 'Pasaman Barat' },
          { id: '341', name: 'Paser' },
          { id: '342', name: 'Pasuruan Kabupaten' },
          { id: '343', name: 'Pasuruan Kota' },
          { id: '344', name: 'Pati' },
          { id: '345', name: 'Payakumbuh' },
          { id: '346', name: 'Pegunungan Arfak' },
          { id: '347', name: 'Pegunungan Bintang' },
          { id: '348', name: 'Pekalongan Kabupaten' },
          { id: '349', name: 'Pekalongan Kota' },
          { id: '350', name: 'Pekanbaru' },
          { id: '351', name: 'Pelalawan' },
          { id: '352', name: 'Pemalang' },
          { id: '353', name: 'Pematangsiantar' },
          { id: '354', name: 'Penajam Paser Utara' },
          { id: '355', name: 'Pesawaran' },
          { id: '356', name: 'Pesisir Barat' },
          { id: '357', name: 'Pesisir Selatan' },
          { id: '358', name: 'Pidie' },
          { id: '359', name: 'Pidie Jaya' },
          { id: '360', name: 'Pinrang' },
          { id: '361', name: 'Pohuwato' },
          { id: '362', name: 'Polewali Mandar' },
          { id: '363', name: 'Ponorogo' },
          { id: '364', name: 'Pontianak Kabupaten' },
          { id: '365', name: 'Pontianak Kota' },
          { id: '366', name: 'Poso' },
          { id: '367', name: 'Prabumulih' },
          { id: '368', name: 'Pringsewu' },
          { id: '369', name: 'Probolinggo Kabupaten' },
          { id: '370', name: 'Probolinggo Kota' },
          { id: '371', name: 'Pulang Pisau' },
          { id: '372', name: 'Pulau Morotai' },
          { id: '373', name: 'Puncak' },
          { id: '374', name: 'Puncak Jaya' },
          { id: '375', name: 'Purbalingga' },
          { id: '376', name: 'Purwakarta' },
          { id: '377', name: 'Purworejo' },
          { id: '378', name: 'Raja Ampat' },
          { id: '379', name: 'Rejang Lebong' },
          { id: '380', name: 'Rembang' },
          { id: '381', name: 'Rokan Hilir' },
          { id: '382', name: 'Rokan Hulu' },
          { id: '383', name: 'Rote Ndao' },
          { id: '384', name: 'Sabang' },
          { id: '385', name: 'Sabu Raijua' },
          { id: '386', name: 'Salatiga' },
          { id: '387', name: 'Samarinda' },
          { id: '388', name: 'Sambas' },
          { id: '389', name: 'Samosir' },
          { id: '390', name: 'Sampang' },
          { id: '391', name: 'Sanggau' },
          { id: '392', name: 'Sarmi' },
          { id: '393', name: 'Sarolangun' },
          { id: '394', name: 'Sawah Lunto' },
          { id: '395', name: 'Sekadau' },
          { id: '396', name: 'Selayar (Kepulauan Selayar)' },
          { id: '397', name: 'Seluma' },
          { id: '398', name: 'Semarang Kabupaten' },
          { id: '399', name: 'Semarang Kota' },
          { id: '400', name: 'Seram Bagian Barat' },
          { id: '401', name: 'Seram Bagian Timur' },
          { id: '402', name: 'Serang Kabupaten' },
          { id: '403', name: 'Serang Kota' },
          { id: '404', name: 'Serdang Bedagai' },
          { id: '405', name: 'Seruyan' },
          { id: '406', name: 'Siak' },
          { id: '407', name: 'Sibolga' },
          { id: '408', name: 'Sidenreng Rappang/Rapang' },
          { id: '409', name: 'Sidoarjo' },
          { id: '410', name: 'Sigi' },
          { id: '411', name: 'Sijunjung (Sawah Lunto Sijunjung)' },
          { id: '412', name: 'Sikka' },
          { id: '413', name: 'Simalungun' },
          { id: '414', name: 'Simeulue' },
          { id: '415', name: 'Singkawang' },
          { id: '416', name: 'Sinjai' },
          { id: '417', name: 'Sintang' },
          { id: '418', name: 'Situbondo' },
          { id: '419', name: 'Sleman' },
          { id: '420', name: 'Solok Kabupaten' },
          { id: '421', name: 'Solok Kota' },
          { id: '422', name: 'Solok Selatan' },
          { id: '423', name: 'Soppeng' },
          { id: '424', name: 'Sorong Kabupaten' },
          { id: '425', name: 'Sorong Kota' },
          { id: '426', name: 'Sorong Selatan' },
          { id: '427', name: 'Sragen' },
          { id: '428', name: 'Subang' },
          { id: '429', name: 'Subulussalam' },
          { id: '430', name: 'Sukabumi Kabupaten' },
          { id: '431', name: 'Sukabumi Kota' },
          { id: '432', name: 'Sukamara' },
          { id: '433', name: 'Sukoharjo' },
          { id: '434', name: 'Sumba Barat' },
          { id: '435', name: 'Sumba Barat Daya' },
          { id: '436', name: 'Sumba Tengah' },
          { id: '437', name: 'Sumba Timur' },
          { id: '438', name: 'Sumbawa' },
          { id: '439', name: 'Sumbawa Barat' },
          { id: '440', name: 'Sumedang' },
          { id: '441', name: 'Sumenep' },
          { id: '442', name: 'Sungaipenuh' },
          { id: '443', name: 'Supiori' },
          { id: '444', name: 'Surabaya' },
          { id: '445', name: 'Surakarta (Solo)' },
          { id: '446', name: 'Tabalong' },
          { id: '447', name: 'Tabanan' },
          { id: '448', name: 'Takalar' },
          { id: '449', name: 'Tambrauw' },
          { id: '450', name: 'Tana Tidung' },
          { id: '451', name: 'Tana Toraja' },
          { id: '452', name: 'Tanah Bumbu' },
          { id: '453', name: 'Tanah Datar' },
          { id: '454', name: 'Tanah Laut' },
          { id: '455', name: 'Tangerang Kabupaten' },
          { id: '456', name: 'Tangerang Kota' },
          { id: '457', name: 'Tangerang Selatan' },
          { id: '458', name: 'Tanggamus' },
          { id: '459', name: 'Tanjung Balai' },
          { id: '460', name: 'Tanjung Jabung Barat' },
          { id: '461', name: 'Tanjung Jabung Timur' },
          { id: '462', name: 'Tanjung Pinang' },
          { id: '463', name: 'Tapanuli Selatan' },
          { id: '464', name: 'Tapanuli Tengah' },
          { id: '465', name: 'Tapanuli Utara' },
          { id: '466', name: 'Tapin' },
          { id: '467', name: 'Tarakan' },
          { id: '468', name: 'Tasikmalaya Kabupaten' },
          { id: '469', name: 'Tasikmalaya Kota' },
          { id: '470', name: 'Tebing Tinggi' },
          { id: '471', name: 'Tebo' },
          { id: '472', name: 'Tegal Kabupaten' },
          { id: '473', name: 'Tegal Kota' },
          { id: '474', name: 'Teluk Bintuni' },
          { id: '475', name: 'Teluk Wondama' },
          { id: '476', name: 'Temanggung' },
          { id: '477', name: 'Ternate' },
          { id: '478', name: 'Tidore Kepulauan' },
          { id: '479', name: 'Timor Tengah Selatan' },
          { id: '480', name: 'Timor Tengah Utara' },
          { id: '481', name: 'Toba Samosir' },
          { id: '482', name: 'Tojo Una-Una' },
          { id: '483', name: 'Toli-Toli' },
          { id: '484', name: 'Tolikara' },
          { id: '485', name: 'Tomohon' },
          { id: '486', name: 'Toraja Utara' },
          { id: '487', name: 'Trenggalek' },
          { id: '488', name: 'Tual' },
          { id: '489', name: 'Tuban' },
          { id: '490', name: 'Tulang Bawang' },
          { id: '491', name: 'Tulang Bawang Barat' },
          { id: '492', name: 'Tulungagung' },
          { id: '493', name: 'Wajo' },
          { id: '494', name: 'Wakatobi' },
          { id: '495', name: 'Waropen' },
          { id: '496', name: 'Way Kanan' },
          { id: '497', name: 'Wonogiri' },
          { id: '498', name: 'Wonosobo' },
          { id: '499', name: 'Yahukimo' },
          { id: '500', name: 'Yalimo' },
          { id: '501', name: 'Yogyakarta' },
        ],
      });
      res.status(200).send(cities);
    } catch (error) {
      next(error);
    }
  }

  async createTRegisteroken(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const token = await createRegisterTokenAction(email);

      res.status(200).send(token);
    } catch (error) {
      next(error);
    }
  }

  async getAdminNotAssigned(req: Request, res: Response, next: NextFunction) {
    try {
      const admins = await getAdminNotAssignedAction();
      res.status(200).json(admins);
    } catch (error) {
      next(error);
    }
  }

  async registerByGoogle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const register = await registerByGoogleAction(data);
      console.log('check controllerr', data);
      res.status(200).send(register);
    } catch (error) {
      next(error);
    }
  }
}
