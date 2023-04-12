import {
  IChatResponse,
  IFullChatInfo,
} from 'src/general/interfaces/chat.interfaces';
import { ChatEntity } from '../entites/chat.entity';
import { UserPresenter } from 'src/modules/users/presenters/user.presenter';

export class ChatsPresenter {
  public static toResponseManyDto(data: ChatEntity[]): IChatResponse[] {
    return data.map((elem) => this.toResponseDto(elem));
  }

  public static toResponseDto(data: ChatEntity): IChatResponse {
    return {
      id: data.id,
      name: data.name,
    };
  }

  public static toResponseWithUsers(data: ChatEntity): IFullChatInfo {
    return {
      id: data.id,
      name: data.name,
      messages: data.messages,
      users: UserPresenter.toResponseManyDto(data.users),
    };
  }

  public static toResponseManyWithUsers(data: ChatEntity[]): IFullChatInfo[] {
    return data.map((elem) => this.toResponseWithUsers(elem));
  }
}
