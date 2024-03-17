import prisma from '@/prisma';
import { editUser } from '@/repositories/user/editUser';
import { IUser } from '@/types/user.types';
import path from 'path';
import fs from 'fs/promises';
import { transporter } from '@/lib/nodemailer';
import { createTokenRegister } from '@/lib/jwt';
import Handlebars from 'handlebars';

export const editUserAction = async (body: IUser, id: number) => {
  try {
    if (body.email) {
      await prisma.user.update({
        where: { id },
        data: {
          isVerified: false,
        },
      });

      const token = await createTokenRegister(body.email);

      const templatePath = path.join(
        __dirname,
        '../../templates',
        'tempEmailVerif.hbs',
      );
      const templateSource = await fs.readFile(templatePath, 'utf-8');

      const compileTemplate = Handlebars.compile(templateSource);

      const baseUrl = 'http://localhost:3000';
      const link = `${baseUrl}/register/verification?token=${token}`;
      const html = compileTemplate({ link });

      await transporter.sendMail({
        from: 'smartbordlhouse@gmail.com',
        to: body.email,
        subject: 'Smart Bord House - Verify your account',

        html,
      });
      const dataUser = await editUser(body, id);

      return {
        message: 'edit profile success',
        data: dataUser,
        token: token,
      };
    }
    const dataUser = await editUser(body, id);

    return {
      message: 'update email success, check your email for verify again ',
      data: dataUser,
    };
  } catch (error) {
    throw error;
  }
};
