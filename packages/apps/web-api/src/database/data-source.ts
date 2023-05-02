import { DataSource } from 'typeorm';
import { Users } from './entity/Users';
import { Orders } from './entity/Orders';
import { OrdersLines } from './entity/OrdersLines';
import { Products } from './entity/Products';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'beepshop',
  synchronize: true,
  logging: true,
  entities: [Users, Products, Orders, OrdersLines],
});
