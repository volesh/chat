import { ApiProperty } from '@nestjs/swagger';

export class UserResponse implements IUserResponse {
  @ApiProperty({
    description: 'User ID',
    example: '8e240072-3c0b-4793-b2bc-4423091df740',
  })
  id: string;

  @ApiProperty({ description: 'User name', example: 'Oleg' })
  name: string;

  @ApiProperty({ description: 'User surname', example: 'Ivanov' })
  surname: string;

  @ApiProperty({ description: 'User phone number', example: '+380685682375' })
  phone: string;
}

export interface IUserResponse {
  id: string;
  name: string;
  surname: string;
  phone: string;
}
