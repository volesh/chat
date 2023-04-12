import {
  Controller,
  Body,
  Put,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateChatDto } from './dto/chat.dto';
import { AuthGuard } from '@nestjs/passport';
import { IReqUser } from '../auth/interface/request.user.interfase';
import { Request } from 'express';
import {
  ChatResponse,
  IFullChatInfo,
} from 'src/general/interfaces/chat.interfaces';
import { ChatFullResponse } from 'src/general/interfaces/chat.interfaces';
import { AddUserDto } from './dto/add.user.dto';
import { UpdateChatDto } from './dto/update.chat.dto';

@Controller('chats')
@ApiTags('Chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  // Get chat by Id !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // @Get('/:id')
  // @ApiCreatedResponse({
  //   type: ChatFullResponse,
  // })
  // @ApiParam({ name: 'id', example: '8e240072-3c0b-4793-b2bc-4423091df740' })
  // getById(@Param('chatId') chatId: string): IFullChatInfo {
  //   return this.chatsService.getChatById(chatId);
  // }
  //................................................................

  // Create chat !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  @ApiCreatedResponse({
    description: 'Chat has been successfully created.',
    type: ChatFullResponse,
  })
  @ApiBearerAuth()
  @ApiBody({ type: CreateChatDto })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createChat(
    @Body() data: CreateChatDto,
    @Req() req: Request,
  ): Promise<IFullChatInfo> {
    const user = req.user as IReqUser;
    return this.chatsService.createChat(data, user.id);
  }
  //....................................................................

  // Add user to chat !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  @ApiCreatedResponse({
    description: 'User has been successfully added.',
    type: ChatFullResponse,
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', example: '8e240072-3c0b-4793-b2bc-4423091df740' })
  @ApiBody({ type: AddUserDto })
  @UseGuards(AuthGuard('jwt'))
  @Put('/add-user/:id')
  addUserToChat(
    @Param('id') id,
    @Body() { phone }: AddUserDto,
  ): Promise<IFullChatInfo> {
    return this.chatsService.addUserToChat(id, phone);
  }
  //.......................................................................

  // Remove user from chat !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  @ApiCreatedResponse({
    description: 'User has been successfully removed.',
    type: ChatFullResponse,
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', example: '8e240072-3c0b-4793-b2bc-4423091df740' })
  @ApiBody({ type: AddUserDto })
  @UseGuards(AuthGuard('jwt'))
  @Put('/remove-user/:id')
  removeUserFromChat(
    @Param('id') id,
    @Body() { phone }: AddUserDto,
  ): Promise<IFullChatInfo> {
    return this.chatsService.removeUserFromChat(id, phone);
  }
  //.......................................................................

  // Change chat name !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  @ApiCreatedResponse({
    description: 'Chat has been successfully updated.',
    type: ChatResponse,
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', example: '8e240072-3c0b-4793-b2bc-4423091df740' })
  @ApiBody({ type: UpdateChatDto })
  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  updateChat(@Body() { name }: UpdateChatDto, @Param('id') id) {
    return this.chatsService.updateChat(name, id);
  }
  //.....................................................................
}
