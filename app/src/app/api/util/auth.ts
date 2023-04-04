import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NextRequest } from 'next/server';

const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET ?? 'Default Secret'
  );

  return token;
};

const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

const authCheck = (request: NextRequest) => {
  const { value: token } = request.cookies.get('token') ?? {};
  if (!token) {
    return {
      auth: false,
      message: 'No token cookie'
    };
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET ?? 'Default Secreat');
    return {
      ...user,
      auth: true
    };
  } catch (err) {
    console.log(`Could not verify token: ${err}`);
    return {
      auth: false,
      message: 'Could not verify token'
    };
  }
};

export { createJWT, comparePasswords, hashPassword, authCheck };
