import prisma from '@/prisma';
import { getUserByEmail } from '@/repositories/user/getUserByEmail';
import axios from 'axios';
import crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';

const generateRandomPassword = () => {
  return crypto.randomBytes(8).toString('hex');
};

export const registerByGoogleAction = async (data: string) => {
  try {
    console.log('checkkk actionn : ', data);

    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'postmessage',
    );

    const { tokens } = await oAuth2Client.getToken(data);

    const { data: userInfo } = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      },
    );

    console.log('User Info:', data);
    console.log('checkk user info', userInfo);

    const password = generateRandomPassword();

    const userEmail = await getUserByEmail(userInfo.email);

    if (userEmail == userInfo.email) {
      throw new Error('This email is already registered');
    }

    const register = await prisma.user.create({
      data: {
        email: userInfo.email,
        username: userInfo.name,
        password: password,
        roleId: 3,
      },
    });

    return {
      message: 'register by google success',
    };
  } catch (error) {
    throw error;
  }
};
