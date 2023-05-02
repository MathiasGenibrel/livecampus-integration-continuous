import { Router, Express } from 'express';
import { ProductsController } from '../controller/products.controller';
import { ProductsDto } from '../middleware/products-dto';
import { Authorization } from '../middleware/authorization';

const products = new ProductsController();
const dto = new ProductsDto();
const auth = new Authorization();

export const productsRouter = (app: Express) => {
  const router = Router({ caseSensitive: false });

  router.get(
    '/',
    (req, res, next) => dto.ids(req, res, next),
    (req, res) => products.find(req, res)
  );
  router.get(
    '/:id',
    (req, res, next) => dto.id(req, res, next),
    (req, res) => products.findOne(req, res)
  );

  router.post(
    '/create',
    (req, res, next) => auth.admin(req, res, next),
    (req, res, next) => dto.creation(req, res, next),
    (req, res) => products.create(req, res)
  );

  router.put(
    '/edit/:id',
    (req, res, next) => auth.admin(req, res, next),
    (req, res, next) => dto.id(req, res, next),
    (req, res, next) => dto.edit(req, res, next),
    (req, res) => products.edit(req, res)
  );

  router.delete(
    '/delete/:id',
    (req, res, next) => auth.admin(req, res, next),
    (req, res, next) => dto.id(req, res, next),
    (req, res) => products.delete(req, res)
  );

  app.use('/products', router);
};
