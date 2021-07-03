import express from 'express';
import cors from 'cors';
import { AppError } from './helpers/errors/app_error';
import { errorHandler } from './helpers/errors/error_handler';
import authRoute from './routes/auth.route';
import bookmarkRoute from './routes/bookmark.route';
// import tagRoute from './routes/tag.route';
// import categoryRoute from './routes/category.route';
// import articleRoute from './routes/article.route';
import { connect } from 'mongoose';

const main = async () => {
  const app = express();

  app.use(
    cors({
      origin: ['*', 'http://localhost:3000'],
    })
  );
  // parse application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: false }));
  // parse application/json
  app.use(express.json());

  // Check DB connection
  try {
    await connect('mongodb://localhost:27017/tlrl_dev', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
    console.log('DB: MongoDB connected');
  } catch (error) {
    console.error(
      'DB:MongoDb : ERROR: Unable to connect to the database:',
      error
    );
  }

  app.get('/', (_, res) => {
    res.send('Hi');
  });

  // Routes
  app.use('/auth', authRoute);
  app.use('/bookmark', bookmarkRoute);
  // app.use('/tag', tagRoute);
  // app.use('/category', categoryRoute);
  // app.use('/article', articleRoute);

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
