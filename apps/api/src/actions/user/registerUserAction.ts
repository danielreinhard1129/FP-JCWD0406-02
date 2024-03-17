import { hashPassword } from '@/lib/bcrypt';
import { createUser } from '@/repositories/user/createUser';
import { getUserByEmail } from '@/repositories/user/getUserByEmail';
import { getUsernameByUsername } from '@/repositories/user/getUserByUsername';
import { IUser } from '@/types/user.types';
import { TokenExpiredError } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

export const registerUserAction = async (data: IUser, token: string) => {
  try {
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
        email: string;
      };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new Error('Token Expired');
      } else {
        throw new Error('Invalid Token');
      }
    }

    console.log('check after', token);

    const { password, username } = data;

    const userUsername = await getUsernameByUsername(username);

    if (data.username == userUsername?.username) {
      throw new Error(
        `This username ${data.username} already exist, please input  another username.`,
      );
    }

    const hashedPassword = await hashPassword(password);
    data.password = hashedPassword;
    console.log('afterr hashed', data.password);

    console.log('di bawahhhh hashedd', token);

    const user = await createUser(data, token);
    console.log('data user : ', user);

    return {
      message: 'success create account',
      data: user,
    };
  } catch (error) {
    throw error;
  }
};
