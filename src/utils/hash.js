import bcrypt from 'bcrypt';

export const hashPassword = (password) => bcrypt.hash(password, 5);
export const comparePassword = (password, hash) =>
  bcrypt.compare(password, hash);
