import { prisma } from '../db';
import { comparePasswords, createJWT, hashPassword } from '../util/auth';

export const createNewUser = async (email: string, password: string) => {
  try {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.users.create({
      data: {
        email: email,
        password: hashedPassword
      }
    });
    return createJWT(user);
  } catch (err) {
    console.log(`Error: Could not create user: ${err}`);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email
      }
    });
    if (user) {
      const isValid = await comparePasswords(password, user.password);
      if (isValid) {
        return createJWT(user);
      }
    }
  } catch (err) {
    console.log(`User: ${email} could not sign in: ${err}`);
  }
};
