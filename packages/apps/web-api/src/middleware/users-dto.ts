import Joi, { ValidationError } from 'joi';
import { NextFunction, Request, Response } from 'express';

/**
 * Used to control input to correspond to current schema.
 */
export class UsersDto {
  private credentialSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(12).required(),
  });

  private contentSchema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(12),
    firstname: Joi.string(),
    lastname: Joi.string(),
  }).min(1);

  public async credential(req: Request, res: Response, next: NextFunction) {
    try {
      // Save the data in res.locals to make them accessible in the controller.
      res.locals.usersCredential = await this.credentialSchema.validateAsync(
        req.body
      );

      return next();
    } catch (err) {
      console.log(err);

      if (err instanceof ValidationError)
        return res.status(400).json({
          code: err.name,
          message: err.message,
        });

      return res.status(500).send();
    }
  }

  public async content(req: Request, res: Response, next: NextFunction) {
    try {
      // Save the data in res.locals to make them accessible in the controller.
      res.locals.usersContent = await this.contentSchema.validateAsync(
        req.body
      );

      return next();
    } catch (err) {
      console.log(err);

      if (err instanceof ValidationError)
        return res.status(400).json({
          code: err.name,
          message: err.message,
        });

      return res.status(500).send();
    }
  }
}
