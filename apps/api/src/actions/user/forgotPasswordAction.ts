import { createToken } from '@/lib/jwt';
import { transporter } from '@/lib/nodemailer';
import { getUserByEmail } from '@/repositories/user/getUserByEmail';
import path from 'path';
import fs from 'fs/promises';
import Handlebars from 'handlebars';

export const forgotPasswordAction = async (email: string) => {
  try {
    const templatePath = path.join(
      __dirname,
      '../../templates',
      'tempEmail.hbs',
    );
    const templateSource = await fs.readFile(templatePath, 'utf-8');

    const compileTemplate = Handlebars.compile(templateSource);

    const user = await getUserByEmail(email);

    if (!user) throw new Error('Account not found');

    const token = createToken({ email: user.email });

    const baseUrl = 'http://localhost:3000';
    const link = baseUrl + `/reset-password?token=${token}`;
    const html = compileTemplate({ link });

    await transporter.sendMail({
      from: 'SmartBordilHome',
      to: email,
      subject: 'Smart Home Bordl',
      html,
    });

    return {
      message: 'Send Email Success',
    };
  } catch (error) {
    throw error;
  }
};
