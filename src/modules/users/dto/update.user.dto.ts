import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Vasyl' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'Olesh' })
  @IsString()
  @IsOptional()
  surname: string;
}
