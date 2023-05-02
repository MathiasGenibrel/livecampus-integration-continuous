import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationError } from 'joi';
import { OrdersStatus } from '../types/orders.types';

export class OrdersDto {
  private ordersSchema = Joi.object({
    usersId: Joi.number().integer().positive().required(),
    orders_lines: Joi.array()
      .items(
        Joi.object({
          product: Joi.number().integer().positive().required(),
          quantity: Joi.number().integer().positive().required(),
        })
      )
      .min(1),
  });

  private statusSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    status: Joi.string()
      .valid(...Object.values(OrdersStatus))
      .required(),
  });

  public async content({ body }: Request, res: Response, next: NextFunction) {
    try {
      // Save the data in res.locals to make them accessible in the controller.
      res.locals.content = await this.ordersSchema.validateAsync(body);

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

  public async status({ body }: Request, res: Response, next: NextFunction) {
    try {
      // Save the data in res.locals to make them accessible in the controller.
      res.locals.content = await this.statusSchema.validateAsync(body);

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
