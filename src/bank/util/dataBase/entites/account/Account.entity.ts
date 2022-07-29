import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from '../client/client.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false, comment: '계좌 개설 목적' })
  purposeDescription;

  @ManyToOne(() => Client, (client) => client.accounts)
  client: Client[];
}
