import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'User id',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'Vasyl', description: 'User name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Olesh', description: 'User surname' })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty({
    type: String,
    example: '+380685835462',
    description: 'User phone (unique)*',
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
}
