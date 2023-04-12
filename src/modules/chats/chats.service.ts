import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity } from './entites/chat.entity';
import { Repository, In } from 'typeorm';
import { CreateChatDto } from './dto/chat.dto';
import { UserEntity } from '../users/entities/user.entity';
import { ChatsPresenter } from './presentrs/chats.presenter';
import {
  IChatResponse,
  IFullChatInfo,
} from 'src/general/interfaces/chat.interfaces';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // Create chat !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  async createChat(chat: CreateChatDto, id: string): Promise<IFullChatInfo> {
    const creator = await this.userRepository.findOne({ where: { id } });
    const membersPhones = chat.users;
    const usersInChat = await this.userRepository.find({
      where: { phone: In(membersPhones) },
    });
    const chatForCreate = new ChatEntity();
    chatForCreate.name = chat.name;
    chatForCreate.users = [...usersInChat, creator];
    const createdChat = await this.chatRepository.save(chatForCreate);
    const response = ChatsPresenter.toResponseWithUsers(createdChat);
    return response;
  }
  //...............................................................................

  // Get users chats !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  async getUsersChats(id: string): Promise<IChatResponse[]> {
    const chats = await this.chatRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.users', 'users')
      .where(`users.id = '${id}'`)
      .getMany();
    return ChatsPresenter.toResponseManyDto(chats);
  }
  //.......................................................................................

  // Change chat name !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  async updateChat(name: string, chatId: string) {
    const chatForUpdate = await this.getChatById(chatId);
    if (!chatForUpdate) {
      throw new NotFoundException(`Chat with id ${chatId} not found`);
    }
    chatForUpdate.name = name;
    await this.chatRepository.save(chatForUpdate);
    const updatedChat = await this.getChatById(chatId);
    return ChatsPresenter.toResponseDto(updatedChat);
  }
  //.....................................................................................

  // Ad user to chat !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  async addUserToChat(chatId, userPhone): Promise<IFullChatInfo> {
    const newUser = await this.userRepository.findOne({
      where: { phone: userPhone },
    });
    if (!newUser) {
      throw new NotFoundException(`User with phone: ${userPhone} not found`);
    }
    const chat = await this.chatRepository
      .createQueryBuilder('chat')
      .where(`chat.id = '${chatId}'`)
      .leftJoinAndSelect('chat.users', 'user')
      .getOne();
    if (!chat) {
      throw new NotFoundException(`Chat with id ${chatId} not found`);
    }

    const isUserExist = chat.users.find((elem) => elem.id === newUser.id);
    if (isUserExist) {
      throw new BadRequestException(
        `User with phone ${userPhone} already in chat`,
      );
    }

    chat.users.push(newUser);
    this.chatRepository.save(chat);
    return ChatsPresenter.toResponseWithUsers(chat);
  }
  //.....................................................................................

  // Remove user from chat !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  async removeUserFromChat(
    chatId: string,
    phone: string,
  ): Promise<IFullChatInfo> {
    const chat = await this.chatRepository
      .createQueryBuilder('chat')
      .where(`chat.id = '${chatId}'`)
      .leftJoinAndSelect('chat.users', 'user')
      .getOne();
    if (!chat) {
      throw new NotFoundException(`Chat with id: ${chatId} not found`);
    }
    const userForDelete = chat.users.find((user) => user.phone === phone);
    if (!userForDelete) {
      throw new NotFoundException(
        `User with phone: ${phone} not in chat ${chat.name}`,
      );
    }
    chat.users = chat.users.filter((user) => user.phone !== phone);
    await this.chatRepository.save(chat);
    return ChatsPresenter.toResponseWithUsers(chat);
  }
  //...................................................................................

  // Get chat by id !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  getChatById(id: string): Promise<ChatEntity> {
    return this.chatRepository.findOne({ where: { id } });
  }
  //....................................................................................
}
