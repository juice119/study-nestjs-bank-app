import { Exclude, Expose } from 'class-transformer';

export class ClientLoginResponse {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _email: string;

  constructor(id: number, name: string, email: string) {
    this._id = id;
    this._name = name;
    this._email = email;
  }

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get name(): string {
    return this._name;
  }

  @Expose()
  get email(): string {
    return this._email;
  }
}
