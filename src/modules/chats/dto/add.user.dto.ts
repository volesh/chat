import { IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddUserDto {
  @ApiProperty({
    type: String,
    example: '+380685835462',
    description: 'User phone (unique)*',
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
}
