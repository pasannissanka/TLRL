import express from 'express';
import { sequelize } from './sequelize';
import authRoute from './routes/auth.route';
import { AppError } from './helpers/errors/app_error';
import { errorHandler } from './helpers/errors/error_handler';

const main = async () => {
  const app = express();

  // parse application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: false }));
  // parse application/json
  app.use(express.json());

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

  // Sync force/alter on development only, @todo: use migrations
  sequelize.sync({ force: true, match: /_dev$/ });

  app.get('/', (_, res) => {
    res.send('Hi');
  });

  // Routes
  app.use('/auth', authRoute);

  // Catch All Unhandled routes
  app.all('*', (req, _, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  // Error Handling
  app.use(errorHandler);

  app.listen(3000, () => {
    console.log('TL;RL Server started at http://localhost:3000');
  });
};

main();
