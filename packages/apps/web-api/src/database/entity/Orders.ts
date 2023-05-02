import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './Users';
import { OrdersEntity, OrdersStatus } from '../../types/orders.types';
import { OrdersLines } from './OrdersLines';

@Entity()
export class Orders implements OrdersEntity {
  @PrimaryGeneratedColumn('increment', {
    unsigned: false,
  })
  id: number;

  @Column('integer', {
    nullable: false,
    default: Date.now,
  })
  /**
   * Saving dates in timestamps
   */
  date_order: number;

  @Column('text', {
    default: OrdersStatus.VALIDATED,
    nullable: false,
  })
  status: OrdersStatus;

  @ManyToOne(() => Users, (users) => users)
  @JoinColumn({ name: 'usersId' })
  usersId: Users;

  @OneToMany(() => OrdersLines, (ordersLines) => ordersLines.order, {
    cascade: true,
  })
  orders_lines: OrdersLines[];
}
