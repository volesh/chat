import { Controller } from '@nestjs/common';
import { Get, Param, Post } from '@nestjs/common/decorators';
import { ChatsService } from './chats.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('chats')
@ApiTags('Chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  getAllChats() {
    return this.chatsService.getAllChats();
  }

  @Get('/:chatId')
  getById(@Param('chatId') chatId: string) {
    return this.chatsService.getChatById(chatId);
  }

  @Post('/create')
  createChat() {
    return this.chatsService.createChat();
  }

  @Post('/update')
  updateChat() {
    return this.chatsService.updateChat();
  }

  @Post('/create_message')
  createMessage() {
    return this.chatsService.createMessage();
  }
}
