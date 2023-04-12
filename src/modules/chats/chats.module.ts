import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { ChatGateway } from './gateway/chat/chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './entites/chat.entity';
import { MessagesService } from './messages.service';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity, UserEntity])],
  controllers: [ChatsController],
  providers: [ChatsService, ChatGateway, MessagesService],
})
export class ChatsModule {}
