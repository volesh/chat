import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({ example: 'My chat', description: 'Chat name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '["+380738957354", "+380738957354"]',
    description: 'Users',
  })
  @IsNotEmpty()
  @IsArray()
  users: string[];
}
