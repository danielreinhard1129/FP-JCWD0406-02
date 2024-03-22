import { excludeFields } from '@/helpers/excludeFields';
import { createToken } from '@/lib/jwt';
import { getUserByEmail } from '@/repositories/user/getUserByEmail';
import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';

export const loginByGoogleAction = async (data: string) => {
  try {
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

    const user = await getUserByEmail(userInfo.email);

    const dataWithoutPassword = excludeFields(user, ['password']);

    const token = createToken({ email: userInfo.email });

    return {
      message: 'Login Success',
      data: dataWithoutPassword,
      token,
    };
  } catch (error) {
    throw error;
  }
};
