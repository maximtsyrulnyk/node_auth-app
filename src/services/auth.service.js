import prisma from '../config/prisma.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateToken } from '../utils/token.js';

export const register = async ({ name, email, password }) => {
  const candidate = await prisma.user.findUnique({ where: { email } });

  if (candidate) throw new Error('User already exists');

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return user;
};

export const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error('User not found');

  const isValid = await comparePassword(password, user.password);

  if (!isValid) throw new Error('Wrong password');

  const token = generateToken({ id: user.id });

  return { user, token };
};
