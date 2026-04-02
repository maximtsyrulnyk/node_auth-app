import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('auth_db', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

export const initDb = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
};
