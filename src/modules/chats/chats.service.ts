import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatsService {
  createChat() {
    return 'chat created';
  }

  updateChat() {
    return 'chat updated';
  }

  createMessage() {
    return 'massage created';
  }

  getAllChats() {
    return 'all chats';
  }

  getChatById(id: string) {
    return `${id} chat`;
  }
}
