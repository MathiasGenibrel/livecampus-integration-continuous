import { OrdersController } from './orders.controller';
import { Request, Response } from 'express';
import {
  AbstractOrdersController,
  IOrders,
  OrdersStatus,
} from '../types/orders.types';
import { UpdateResult } from 'typeorm';

describe('OrdersController', () => {
  let controller: AbstractOrdersController;
  let mockReq: Partial<Request>;

  const orders: IOrders[] = [
    {
      id: 1,
      date_order: 1677612786,
      status: OrdersStatus.VALIDATED,
    },
    {
      id: 2,
      date_order: 1675654797,
      status: OrdersStatus.PAID,
    },
  ];

  beforeEach(() => {
    controller = new OrdersController() as unknown as AbstractOrdersController;
    mockReq = {};

    controller.repository = {
      save: async () => {
        return (await Promise.resolve()) as any; // No type equal to SaveResult
      },
      find: async () => {
        return new Promise((resolve) => resolve(orders)) as Promise<IOrders[]>;
      },
      update: async () => {
        return (await Promise.resolve()) as unknown as Promise<UpdateResult>;
      },
    };
  });

  describe('history', () => {
    it('should return a Orders list with a 200 status code', async () => {
      const mockRes: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnValue(orders),
        locals: {
          credential: {
            id: 5,
          },
        },
      };

      const result = await controller.history(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(orders);
      expect(result).toEqual(orders);
    });
  });

  describe('create', () => {
    it('should return a 201 status code', async () => {
      const mockRes: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnValue(undefined),
        locals: {
          content: {
            orders_lines: [
              {
                productsId: 1,
                quantity: 12,
              },
              {
                productsId: 5,
                quantity: 1,
              },
              {
                productsId: 8,
                quantity: 2,
              },
            ],
            date_order: 1677794945723,
            usersId: 5,
          },
        },
      };
      const result = await controller.create(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.send).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });

  describe('updateStatus', () => {
    it('should return a 204 status code', async () => {
      const mockRes: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnValue(undefined),
        locals: {
          content: {
            id: 1,
            status: OrdersStatus.PAID,
          },
        },
      };

      const result = await controller.updateStatus(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(204);
      expect(mockRes.send).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
});
