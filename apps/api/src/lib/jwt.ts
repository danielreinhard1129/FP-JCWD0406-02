import jwt, { Secret } from 'jsonwebtoken';
import { addHours } from 'date-fns';

const secretKey: Secret = process.env.JWT_SECRET_KEY!;

export const createToken = (data: any): string => {
  const expiresIn = '24h';
  return jwt.sign(data, secretKey, { expiresIn });
};

export const createTokenRegister = (email: string): string => {
  const expiresIn = '1hr';
  const token = jwt.sign({ email }, secretKey, { expiresIn });
  return token;
};
