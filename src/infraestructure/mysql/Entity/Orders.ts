import 'reflect-metadata';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from './Product';

@Entity('orders')
export class Orders {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({ type: 'int' })
  table_number!: number;

  @Column({ type: 'varchar', length: 255 })
  user!: string;

  @Column({ type: 'json' })
  products!: Product[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  tax!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  discount!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  tips!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total!: number;

  @Column({ type: 'varchar', length: 255 })
  status!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at!: Date;

  @Column({ type: 'varchar', length: 255 })
  created_by!: string;

  @Column({ type: 'varchar', length: 255 })
  updated_by!: string;
}
