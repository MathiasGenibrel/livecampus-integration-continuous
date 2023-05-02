import { Router, Express } from 'express';
import { OrdersController } from '../controller/orders.controller';
import { OrdersDto } from '../middleware/orders-dto';
import { Authorization } from '../middleware/authorization';

const orders = new OrdersController();
const dto = new OrdersDto();
const auth = new Authorization();

export const ordersRouter = (app: Express) => {
  const router = Router({ caseSensitive: false });

  router.get(
    '/history',
    (req, res, next) => auth.customer(req, res, next),
    (req, res) => orders.history(req, res)
  );

  router.post(
    '/',
    (res, req, next) => auth.customer(res, req, next),
    (res, req, next) => dto.content(res, req, next),
    (res, req) => orders.create(res, req)
  );

  router.put(
    '/updateStatus',
    (res, req, next) => auth.admin(res, req, next),
    (res, req, next) => dto.status(res, req, next),
    (res, req) => orders.updateStatus(res, req)
  );

  app.use('/orders', router);
};
