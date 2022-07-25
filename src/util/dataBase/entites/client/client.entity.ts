import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'timestamp with time zone',
  })
  createdAt: Date;
}
