import { createTokenRegister } from '@/lib/jwt';
import { transporter } from '@/lib/nodemailer';
import path from 'path';
import fs from 'fs/promises';
import Handlebars from 'handlebars';
import { getUserByEmail } from '@/repositories/user/getUserByEmail';

export const createRegisterTokenAction = async (email: string) => {
  try {
    const user = await getUserByEmail(email);
    if (email == user?.email) throw new Error(`email ${email} already exist`);

    const token = await createTokenRegister(email);

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
      to: email,
      subject: 'Smart Bord House - Verify your account',

      html,
    });

    return {
      message: 'check your email to sign up',
      token: token,
    };
  } catch (error) {
    throw error;
  }
};
