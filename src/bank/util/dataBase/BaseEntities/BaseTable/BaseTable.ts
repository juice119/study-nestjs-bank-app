import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { LocalDateTime } from '@js-joda/core';
import { DateTimeUtil } from '../../../DateTime/DateTimeUtil';

export class BaseTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
    transformer: {
      from: (dbReadValue: Date) => DateTimeUtil.toLocalDateTime(dbReadValue),
      to: (ormValue: LocalDateTime) => DateTimeUtil.toDate(ormValue),
    },
  })
  createdAt: LocalDateTime;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
    transformer: {
      from: (dbReadValue: Date) => DateTimeUtil.toLocalDateTime(dbReadValue),
      to: (ormValue: LocalDateTime) => DateTimeUtil.toDate(ormValue),
    },
  })
  updatedAt: LocalDateTime;

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
    transformer: {
      from: (dbReadValue?: Date) => DateTimeUtil.toLocalDateTime(dbReadValue),
      to: (ormValue?: LocalDateTime) => DateTimeUtil.toDate(ormValue),
    },
  })
  deletedAt?: LocalDateTime;
}
