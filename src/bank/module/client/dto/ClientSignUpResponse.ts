import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { LocalDateTime } from '@js-joda/core';
import { DateTimeUtil } from '../../../util/DateTime/DateTimeUtil';

export class ClientSignUpResponse {
  @Exclude()
  private _id: number;
  @Exclude()
  private _name: string;
  @Exclude()
  private _email: string;
  @Exclude()
  private _createdAt: LocalDateTime;

  constructor(
    id: number,
    name: string,
    email: string,
    createdAt: LocalDateTime,
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._createdAt = createdAt;
  }

  @ApiProperty()
  @Expose()
  get id(): number {
    return this._id;
  }

  @ApiProperty()
  @Expose()
  get name(): string {
    return this._name;
  }

  @ApiProperty()
  @Expose()
  get email(): string {
    return this._email || '';
  }

  @ApiProperty()
  @Expose()
  get createdAt(): string {
    return DateTimeUtil.toString(this._createdAt);
  }
}
