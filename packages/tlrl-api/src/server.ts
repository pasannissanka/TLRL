import express from 'express';
import { sequelize } from './sequelize';
import authRoute from './routes/auth.route';

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

  // parse application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: false }));

  // parse application/json
  app.use(express.json());

  // Sync on development only, @todo: use migrations
  sequelize.sync({ force: true, match: /_dev$/ });

  app.get('/', (_, res) => {
    res.send('Hi');
  });

  app.use('/auth', authRoute);

  app.listen(3000, () => {
    console.log('TL;RL Server started at http://localhost:3000');
  });
};

main();
