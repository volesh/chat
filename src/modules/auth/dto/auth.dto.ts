import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    type: String,
    example: '+380685835462',
    description: 'User phone (unique)*',
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: String,
    example: 'qwer1234',
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
