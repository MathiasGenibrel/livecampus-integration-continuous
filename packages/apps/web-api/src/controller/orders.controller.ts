import { Request, Response } from 'express';
import { IOrders, OrdersInput, UpdateStatusInput } from '../types/orders.types';
import { Orders } from '../database/entity/Orders';
import { AppDataSource } from '../database/data-source';
import { Repository } from 'typeorm';
import { CredentialToken } from '../types/users.types';

export class OrdersController {
  private readonly repository: Repository<Orders>;

  constructor() {
    this.repository = AppDataSource.getRepository(Orders);
  }

  /**
   * Get all previous order
   * @param req - Express Request type, body && header from the http request.
   * @param res - Express Response, used to respond to the client request.
   */
  public async history(
    req: Request,
    res: Response
  ): Promise<Response<IOrders[]>> {
    const credentials = res.locals.credential as CredentialToken;

    try {
      const orders = await this.repository.find({
        where: { usersId: { id: credentials.id } },
        relations: ['orders_lines', 'orders_lines.product'],
      });

      return res.status(200).json(orders);
    } catch (err) {
      console.error(err);

      res.status(500).send();
    }
  }

  /**
   * Create an order
   * @param req - Express Request type, body && header from the http request.
   * @param res - Express Response, used to respond to the client request.
   */
  public async create(req: Request, res: Response): Promise<Response<void>> {
    const content = res.locals.content as OrdersInput;

    try {
      await this.repository.save(content);

      return res.status(201).send();
    } catch (err: unknown) {
      console.error(err);

      res.status(500).send();
    }
  }

  /**
   * Update order status
   * @param req - Express Request type, body && header from the http request.
   * @param res - Express Response, used to respond to the client request.
   */
  public async updateStatus(
    req: Request,
    res: Response
  ): Promise<Response<void>> {
    const content = res.locals.content as UpdateStatusInput;

    try {
      await this.repository.update({ id: content.id }, content);

      return res.status(204).send();
    } catch (err: unknown) {
      console.error(err);

      res.status(500).send();
    }
  }
}
