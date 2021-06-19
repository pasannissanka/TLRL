import express from 'express';
import { sequelize } from './sequelize';

const main = async () => {
  const app = express();

  // Check DB connection
  try {
    await sequelize.authenticate();
    console.log('DB:Postgres: Connection has been established successfully.');
  } catch (error) {
    console.error(
      'DB:Postgres: ERROR: Unable to connect to the database:',
      error
    );
  }

  app.get('/', (_, res) => {
    res.send('Hi');
  });

  app.listen(3000, () => {
    console.log('TL;RL Server started at http://localhost:3000');
  });
};

main();
