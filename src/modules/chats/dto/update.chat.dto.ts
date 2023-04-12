import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateChatDto {
  @ApiProperty({ example: 'My chat', description: 'Chat name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
