import { hashPassword } from '@/lib/bcrypt';
import { createToken } from '@/lib/jwt';
import { transporter } from '@/lib/nodemailer';
import { register } from '@/repositories/user/Register';
import { getUserByEmail } from '@/repositories/user/getUserByEmail';
import { IUser } from '@/types/user.types';
import path from 'path';
import fs from 'fs/promises';
import Handlebars from 'handlebars';
import scheduler from 'node-schedule';
import { getUsernameByUsername } from '@/repositories/user/getUserByUsername';

export const registerAction = async (data: IUser) => {
  try {
    const templatePath = path.join(
      __dirname,
      '../../templates',
      'tempEmailVerif.hbs',
    );
    const templateSource = await fs.readFile(templatePath, 'utf-8');

    const compileTemplate = Handlebars.compile(templateSource);

    const { email, password, roleId, username } = data;

    if (roleId == 2) {
      const user = await getUserByEmail(email);

      if (user?.email) throw new Error('This email already exist');
      if (user?.username) throw new Error('This username already exist');

      const hashedPassword = await hashPassword(password);
      data.password = hashedPassword;
      await register(data);
    }
    if (roleId == 3) {
      const userEmail = await getUserByEmail(email);
      const userUsername = await getUsernameByUsername(username);

      if (data.email == userEmail?.email)
        throw new Error('This email already exist');
      if (data.username == userUsername?.username) {
        throw new Error('This username already exist');
      }

      const hashedPassword = await hashPassword(password);
      data.password = hashedPassword;
      await register(data);

      const token = createToken({ email: data.email });

      const baseUrl = 'http://localhost:3000';
      const link = `${baseUrl}/register/verification?token=${token}`;
      const html = compileTemplate({ link });

      await transporter.sendMail({
        from: 'smartbordlhouse@gmail.com',
        to: email,
        subject: 'Smart Bord House - Verify your account',

        html,
      });

      return {
        message: 'create account success',
        token: token,
      };
    }

    return {
      message: 'create account success',
    };
  } catch (error) {
    throw error;
  }
};
