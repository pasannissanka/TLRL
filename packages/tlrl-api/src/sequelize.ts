import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('tlrl_dev', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  database: 'tlrl_dev',
  username: 'postgres',
  password: 'postgres',
});
