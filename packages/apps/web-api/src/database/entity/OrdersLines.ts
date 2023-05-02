import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from './Products';
import { Orders } from './Orders';

@Entity()
export class OrdersLines {
  @PrimaryGeneratedColumn('increment', {
    unsigned: false,
  })
  id: number;

  @ManyToOne(() => Products, (products) => products.orders_lines)
  @JoinColumn({ name: 'product' })
  product: Products;

  @ManyToOne(() => Orders, (orders) => orders.orders_lines)
  @JoinColumn({ name: 'order' })
  order: Orders;

  @Column('integer')
  quantity: number;
}
