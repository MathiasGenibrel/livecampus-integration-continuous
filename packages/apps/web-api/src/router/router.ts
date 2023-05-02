import { Express } from 'express';
import { usersRouter } from './users';
import { ordersRouter } from './orders';
import { productsRouter } from './products';

export const router = (app: Express) => {
  usersRouter(app);
  ordersRouter(app);
  productsRouter(app);
};
