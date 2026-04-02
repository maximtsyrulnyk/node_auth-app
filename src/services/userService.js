import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';
// ❌ import crypto from 'crypto';  <-- ВИДАЛЕНО

const create = async ({ name, email, password }) => {
  // crypto є глобальним → використовуємо без import
  const activationToken = crypto.randomBytes(32).toString('hex');

  const hashedPassword = await bcrypt.hash(password, 10);

  return User.create({
    name,
    email,
    password: hashedPassword,
    activationToken,
  });
};

const getByEmail = (email) => User.findOne({ where: { email } });

const getByActivationToken = (token) =>
  User.findOne({ where: { activationToken: token } });

const activate = async (user) => {
  user.isActivated = true;
  user.activationToken = null;

  return user.save();
};

export const userService = {
  create,
  getByEmail,
  getByActivationToken,
  activate,
};
