import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import { Users } from '../database/entity/Users';

export enum OrdersStatus {
  VALIDATED = 'Validated',
  PAID = 'Paid',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
}

export interface IOrders {
  id: number;
  date_order: number;
  status: OrdersStatus;
}

export interface OrdersEntity extends IOrders {
  /**
   * Corresponding to the users foreign key
   */
  usersId: Users;
}

interface OrdersLines {
  productsId: number;
  quantity: number;
}

export interface OrdersInput {
  date_order: number;
  usersId: Pick<Users, 'id'>;
  orders_lines: OrdersLines[];
}

export type UpdateStatusInput = Pick<IOrders, 'id' | 'status'>;

export interface AbstractOrdersController {
  repository: Partial<Repository<unknown>>;
  history: (req: Request, res: Response) => Promise<Response<IOrders[]>>;
  create: (req: Request, res: Response) => Promise<Response<void>>;
  updateStatus: (req: Request, res: Response) => Promise<Response<void>>;
}
