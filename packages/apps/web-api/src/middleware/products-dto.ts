import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationError } from 'joi';

export class ProductsDto {
  private creationSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image_link: Joi.string()
      .uri({ scheme: ['http', 'https'] })
      .regex(/\.(png|jpe?g|webp)$/i)
      .required(),
    price: Joi.number().positive().required(),
  });

  private editSchema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    image_link: Joi.string()
      .uri({ scheme: ['http', 'https'] })
      .regex(/\.(png|jpe?g|webp)$/i),
    price: Joi.number().positive(),
  }).min(1);

  private paramsSchema = Joi.object({
    id: Joi.number().integer().positive().min(1).required(),
  });

  private idsParamSchema = Joi.object({
    ids: Joi.string()
      .regex(/^(\d+;)*\d+$/)
      .custom((value, helpers) => {
        // convertir la chaîne en un tableau de nombres
        const numbers = value.split(';').map(Number);

        // si la conversion échoue, signaler une erreur de validation
        if (numbers.some(isNaN)) {
          return helpers.error('any.invalid');
        }

        // retourner le tableau de nombres
        return numbers;
      }),
  });

  public async creation({ body }: Request, res: Response, next: NextFunction) {
    try {
      // Save the data in res.locals to make them accessible in the controller.
      res.locals.content = await this.creationSchema.validateAsync(body);

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

  public async edit({ body }: Request, res: Response, next: NextFunction) {
    try {
      // Save the data in res.locals to make them accessible in the controller.
      res.locals.content = await this.editSchema.validateAsync(body);

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

  public async id({ params }: Request, res: Response, next: NextFunction) {
    try {
      // Save the data in res.locals to make them accessible in the controller.
      res.locals.params = await this.paramsSchema.validateAsync(params);

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

  public async ids({ query }: Request, res: Response, next: NextFunction) {
    try {
      console.log('[PARAMS]: ', query);
      // Save the data in res.locals to make them accessible in the controller.
      res.locals.query = await this.idsParamSchema.validateAsync(query);

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
