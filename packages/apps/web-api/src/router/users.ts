import { Router, Express } from 'express';
import { UsersController } from '../controller/users.controller';
import { UsersDto } from '../middleware/users-dto';
import { Authorization } from '../middleware/authorization';

const users = new UsersController();
const dto = new UsersDto();
const auth = new Authorization();

export const usersRouter = (app: Express) => {
  const router = Router({ caseSensitive: false });

  // Get user credential
  router.get(
    '/login',
    (req, res, next) => auth.connectionWithToken(req, res, next),
    (req, res) => users.login(req, res)
  );

  // Get user credential
  router.post(
    '/login',
    (req, res, next) => dto.credential(req, res, next),
    (req, res) => users.login(req, res)
  );

  // Register an new user in database
  router.post(
    '/register',
    (req, res, next) => dto.credential(req, res, next),
    (req, res) => users.register(req, res)
  );

  // Modify user data
  router.put(
    '/edit',
    (req, res, next) => auth.customer(req, res, next),
    (req, res, next) => dto.content(req, res, next),
    (req, res) => users.edit(req, res)
  );

  // Remove an user from database
  router.delete(
    '/delete',
    (req, res, next) => auth.customer(req, res, next),
    (req, res) => users.delete(req, res)
  );

  app.use('/users', router);
};
