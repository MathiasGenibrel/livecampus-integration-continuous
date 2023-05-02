import { Request, Response } from 'express';
import { Orders } from '../database/entity/Orders';

export enum UsersRoles {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

interface Users {
  id: number;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  role: UsersRoles;
}

export interface UsersCredentialsInput {
  email: string;
  password: string;
}

export type UsersContentInput = Pick<Users, 'id'> &
  Partial<Pick<Users, 'email' | 'password' | 'firstname' | 'lastname'>>;

export interface UsersEntity extends Users {
  /**
   * Corresponding to the address foreign key
   */
  orders: Orders[];
}

export interface UserCredential
  extends Pick<Users, 'email' | 'firstname' | 'lastname' | 'role'> {
  token: string;
}

export type CredentialToken = Pick<Users, 'id' | 'email' | 'role'>;

interface Repository {
  insert: () => Promise<void>;
  createQueryBuilder: () => Promise<void>;
  update: () => Promise<void>;
  set: () => Promise<void>;
  where: () => Promise<void>;
  execute: () => Promise<void>;
  delete: () => Promise<void>;
}

export interface AbstractUsersController {
  usersRepository: Partial<Repository>;
  exists: (email: string) => Promise<boolean>;
  alreadyExists: (email: string) => Promise<void>;
  getUser: (email: string) => Promise<Users>;
  comparePassword: (password: string, hashedPassword: string) => Promise<void>;
  login: (req: Request, res: Response) => Promise<Response<UserCredential>>;
  register: (req: Request, res: Response) => Promise<Response<void>>;
  edit: (req: Request, res: Response) => Promise<Response<void>>;
  delete: (req: Request, res: Response) => Promise<Response<void>>;
}
