import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity, UsersRoles } from '../../types/users.types';
import { Orders } from './Orders';

@Entity()
export class Users implements UsersEntity {
  @PrimaryGeneratedColumn('increment', {
    unsigned: false,
  })
  id: number;

  @Column('text', {
    nullable: false,
    unique: true,
  })
  email: string;

  @Column('text', {
    nullable: false,
  })
  password: string;

  @Column('text', {
    nullable: true,
  })
  firstname?: string;

  @Column('text', {
    nullable: true,
  })
  lastname?: string;

  @Column('text', {
    default: UsersRoles.CUSTOMER,
    nullable: false,
  })
  role: UsersRoles;

  @OneToMany(() => Orders, (orders) => orders.usersId)
  orders: Orders[];
}
