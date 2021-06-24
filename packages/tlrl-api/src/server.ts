import express from 'express';
import cors from 'cors';
import { AppError } from './helpers/errors/app_error';
import { errorHandler } from './helpers/errors/error_handler';
import authRoute from './routes/auth.route';
import bookmarkRoute from './routes/bookmark.route';
import tagRoute from './routes/tag.route';
import categoryRoute from './routes/category.route';
import { sequelize } from './sequelize';

const main = async () => {
  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:3000',
    })
  );
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
  sequelize.sync({ alter: true, match: /_dev$/ });

  app.get('/', (_, res) => {
    res.send('Hi');
  });

  // Routes
  app.use('/auth', authRoute);
  app.use('/bookmark', bookmarkRoute);
  app.use('/tag', tagRoute);
  app.use('/category', categoryRoute);

  // Catch All Unhandled routes
  app.all('*', (req, _, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

  // Error Handling
  app.use(errorHandler);

  app.listen(4000, () => {
    console.log('TL;RL Server started at http://localhost:4000');
  });
};

main();
