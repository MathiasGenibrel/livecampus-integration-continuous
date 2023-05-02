import { Request, Response } from 'express';
import {
  IProducts,
  ProductsEntity,
  ProductsParams,
} from '../types/products.types';
import { In, Repository } from 'typeorm';
import { AppDataSource } from '../database/data-source';
import { Products } from '../database/entity/Products';
import { BadRequestError } from '../error/BadRequestError';

export class ProductsController {
  private readonly repository: Repository<ProductsEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(Products);
  }

  private async exists(id: number): Promise<void> {
    const isExists = await this.repository.exist({ where: { id } });

    if (!isExists)
      throw new BadRequestError(
        `Product with id '${id}' does not exist`,
        'INVALID ID'
      );
  }

  /**
   * Find all products
   * @param req - Express Request type, body && header from the http request.
   * @param res - Express Response, used to respond to the client request.
   */
  public async find(
    req: Request,
    res: Response
  ): Promise<Response<ProductsEntity[]>> {
    try {
      const ids = res.locals.query?.ids as undefined | number[];
      const products = await this.repository.find(
        ids && {
          where: { id: In(ids) },
        }
      );

      return res.status(200).json(products);
    } catch (err: unknown) {
      console.error(err);

      res.status(500).send();
    }
  }

  /**
   * Find a product by his id
   * @param req - Express Request type, body && header from the http request.
   * @param res - Express Response, used to respond to the client request.
   */
  public async findOne(
    req: Request,
    res: Response
  ): Promise<Response<ProductsEntity>> {
    const params = res.locals.params as ProductsParams;

    try {
      const product: ProductsEntity | null = await this.repository.findOne({
        where: { id: params.id },
      });

      if (!product)
        return res.status(404).json({
          code: 'NOT FOUND',
          message: `Product with ${params.id} id, could not be found`,
        });

      return res.status(200).json(product);
    } catch (err: unknown) {
      console.error(err);

      return res.status(500).send();
    }
  }

  /**
   * Creation of a product
   * @param req - Express Request type, body && header from the http request.
   * @param res - Express Response, used to respond to the client request.
   */
  public async create(req: Request, res: Response): Promise<Response<void>> {
    const content = res.locals.content as IProducts;

    try {
      await this.repository.insert(content);

      return res.status(201).send();
    } catch (err: unknown) {
      console.error(err);

      res.status(500).send();
    }
  }

  /**
   * Partial or complete edit of a product.
   * @param req - Express Request type, body && header from the http request.
   * @param res - Express Response, used to respond to the client request.
   */
  public async edit(req: Request, res: Response): Promise<Response<void>> {
    const content = res.locals.content as IProducts;
    const params = res.locals.params as ProductsParams;

    try {
      // Check if the products exists on database
      await this.exists(params.id);

      await this.repository.update({ id: params.id }, content);

      return res.status(204).send();
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof BadRequestError)
        res.status(err.status).json({
          code: err.code,
          message: err.message,
        });

      res.status(500).send();
    }
  }

  /**
   * Delete a product.
   * @param req - Express Request type, body && header from the http request.
   * @param res - Express Response, used to respond to the client request.
   */
  public async delete(req: Request, res: Response): Promise<Response<void>> {
    const params = res.locals.params as ProductsParams;

    try {
      // Check if the products exists on database
      await this.exists(params.id);

      await this.repository.delete({ id: params.id });

      return res.status(204).send();
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof BadRequestError)
        res.status(err.status).json({
          code: err.code,
          message: err.message,
        });

      res.status(500).send();
    }
  }
}
