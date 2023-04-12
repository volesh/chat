import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import * as Jwt from 'jsonwebtoken';
import { ChatsService } from '../../chats.service';
import { envsConfig } from 'src/general/configs/envs.config';
import { UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

interface JwtPayload {
  id: string;
}

@ApiTags('chats/io')
@WebSocketGateway({ cors: { origin: '*' }, namespace: 'chats/io' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server;

  constructor(private readonly chatsService: ChatsService) {}

  @ApiOperation({ summary: 'Handle messages' })
  @SubscribeMessage('message')
  handleMessage(): string {
    this.server.emit('message', 'hello');
    return 'Hello world!';
  }

  @ApiOperation({ summary: 'Handle connection' })
  async handleConnection(socket: Socket) {
    try {
      const token = socket.handshake.headers.authorization
        .replace('Bearer', '')
        .trim();
      const payload = Jwt.verify(
        token,
        envsConfig.access_secret_key,
      ) as JwtPayload;

      const usersChats = await this.chatsService.getUsersChats(payload.id);
      this.server.to(socket.id).emit('chats', usersChats);
    } catch (e) {
      return this.disconnnect(socket);
    }
  }

  @ApiOperation({ summary: 'Handle disconnect' })
  handleDisconnect() {
    console.log('diconected');
  }

  private disconnnect(socket: Socket) {
    socket.emit('error', new UnauthorizedException());
    socket.disconnect();
  }
}
