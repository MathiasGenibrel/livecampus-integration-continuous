import { ProductsController } from './products.controller';
import { Request, Response } from 'express';
import {
  AbstractProductsController,
  ProductsEntity,
} from '../types/products.types';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

describe('ProductsController', () => {
  let controller: AbstractProductsController;
  let mockReq: Partial<Request>;
  let mockDefaultRes: Partial<Response>;
  const expectedResponse: ProductsEntity = {
    id: 1,
    name: 'Airpods',
    price: 189,
    description: 'Best wireless headphone',
    image_link: 'http://localhost:3000/public/img/img_123.webp',
  };

  beforeEach(() => {
    controller =
      new ProductsController() as unknown as AbstractProductsController;

    // Abstract repository method
    controller.repository = {
      insert: async () => {
        return (await Promise.resolve()) as unknown as Promise<InsertResult>;
      },
      update: async () => {
        return (await Promise.resolve()) as unknown as Promise<UpdateResult>;
      },
      delete: async () => {
        return (await Promise.resolve()) as unknown as Promise<DeleteResult>;
      },
    };

    controller.exists = () => Promise.resolve();

    mockReq = {};
    mockDefaultRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnValue(undefined),
    };
  });

  describe('find', () => {
    it('should return a UserCredential with a 200 status code', async () => {
      const mockRes: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnValue([expectedResponse]),
        locals: {
          ids: [1],
        },
      };

      controller.repository = {
        ...controller.repository,
        find: async (): Promise<ProductsEntity[]> => {
          return [expectedResponse];
        },
      };

      const result = await controller.find(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith([expectedResponse]);
      expect(result).toEqual([expectedResponse]);
    });
  });

  describe('findOne', () => {
    it('should return a 201 status code', async () => {
      controller.repository = {
        ...controller.repository,
        findOne: async (): Promise<ProductsEntity> => {
          return expectedResponse;
        },
      };

      const mockRes: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnValue(expectedResponse),
        locals: {
          params: {
            id: 1,
          },
        },
      };

      const result = await controller.findOne(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expectedResponse);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('create', () => {
    it('should return a 201 status code', async () => {
      const mockRes = {
        ...mockDefaultRes,
        locals: {
          content: {
            name: 'product',
          },
        },
      };

      const result = await controller.create(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockDefaultRes.status).toHaveBeenCalledWith(201);
      expect(mockDefaultRes.send).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });

  describe('edit', () => {
    it('should return a 204 status code', async () => {
      const mockRes: Partial<Response> = {
        ...mockDefaultRes,
        locals: {
          params: {
            id: 1,
          },
          content: {
            name: 'Airpods',
          },
        },
      };

      const result = await controller.edit(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockDefaultRes.status).toHaveBeenCalledWith(204);
      expect(mockDefaultRes.send).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('should return a 204 status code', async () => {
      const mockRes: Partial<Response> = {
        ...mockDefaultRes,
        locals: {
          params: {
            id: 1,
          },
        },
      };

      const result = await controller.delete(
        mockReq as Request,
        mockRes as Response
      );

      expect(mockDefaultRes.status).toHaveBeenCalledWith(204);
      expect(mockDefaultRes.send).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });
});
