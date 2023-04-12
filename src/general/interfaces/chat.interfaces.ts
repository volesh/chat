import { MessageEntity } from 'src/modules/chats/entites/message.entity';
import { IUserResponse, UserResponse } from './user.interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class ChatFullResponse implements IFullChatInfo {
  @ApiProperty({
    description: 'Chat ID',
    example: '8e240072-3c0b-4793-b2bc-4423091df740',
  })
  id: string;

  @ApiProperty({ description: 'Chat name', example: 'My chat' })
  name: string;

  @ApiProperty({
    description: 'Participans',
    example:
      '[{"id": "8e240072-3c0b-4793-b2bc-4423091df740","name": "Oleg","surname": "Ivanov","phone": "+380685682375"}]',
  })
  users: UserResponse[];

  @ApiProperty({
    description: 'Messages',
    example:
      '[{"id": "8e240072-3c0b-4793-b2bc-4423091df740","user_id": "8e240072-3c0b-4793-b2bc-4423091df740","content": "My message","created_at": "11.01.2022"}]',
  })
  messages: MessageEntity[];
}

export class ChatResponse implements IChatResponse {
  @ApiProperty({
    description: 'Chat ID',
    example: '8e240072-3c0b-4793-b2bc-4423091df740',
  })
  id: string;

  @ApiProperty({ description: 'Chat name', example: 'My chat' })
  name: string;
}

export interface IFullChatInfo {
  id: string;
  name: string;
  users: IUserResponse[];
  messages: MessageEntity[];
}

export interface IChatResponse {
  id: string;
  name: string;
}
