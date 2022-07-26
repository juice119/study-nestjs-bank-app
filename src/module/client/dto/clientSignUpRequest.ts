import { ApiProperty } from '@nestjs/swagger';

export class ClientSignUpRequest {
  @ApiProperty()
  name: string;
  @ApiProperty({ nullable: true })
  description?: string;

  constructor(name: string, description?: string) {
    this.name = name;
    this.description = description;
  }
}
