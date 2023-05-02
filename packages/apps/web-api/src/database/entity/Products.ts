import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductsEntity } from '../../types/products.types';
import { OrdersLines } from './OrdersLines';

@Entity()
export class Products implements ProductsEntity {
  @PrimaryGeneratedColumn('increment', {
    unsigned: false,
  })
  id: number;

  @Column('text', {
    nullable: false,
  })
  name: string;

  @Column('text', {
    nullable: false,
  })
  description: string;

  @Column('text', {
    nullable: false,
  })
  image_link: string;

  @Column('int', {
    nullable: false,
  })
  price: number;

  @OneToMany(() => OrdersLines, (ordersLines) => ordersLines.product)
  orders_lines: OrdersLines[];
}
