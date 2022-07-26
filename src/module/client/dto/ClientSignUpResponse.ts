import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ClientSignUpResponse {
  private _id: number;
  private _name: string;
  private _description?: string;
  private _createdAt: Date;

  constructor(id: number, name: string, description: string, createdAt: Date) {
    this._id = id;
    this._name = name;
    this._description = description;
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
  get description(): string {
    return this._description || '';
  }

  @ApiProperty()
  @Expose()
  get createdAt(): string {
    return this._createdAt.getMilliseconds().toString();
  }
}
