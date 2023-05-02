import { Request, Response } from 'express';
import { UserCredential } from './users.types';
import { Users } from '../database/entity/Users';
import { Repository } from 'typeorm';

export interface IProducts {
  name: string;
  description: string;
  image_link: string;
  price: number;
}

export interface ProductsEntity extends IProducts {
  id: number;
}

export interface AbstractProductsController {
  repository: Partial<Repository<unknown>>;
  exists: (id: number) => Promise<void>;
  find: (req: Request, res: Response) => Promise<boolean>;
  findOne: (req: Request, res: Response) => Promise<void>;
  create: (req: Request, res: Response) => Promise<Users>;
  edit: (req: Request, res: Response) => Promise<void>;
  delete: (req: Request, res: Response) => Promise<Response<UserCredential>>;
}

export type ProductsParams = Pick<ProductsEntity, 'id'>;
