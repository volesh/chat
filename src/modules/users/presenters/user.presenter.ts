import { IUserResponse } from 'src/general/interfaces/user.interfaces';
import { UserEntity } from '../entities/user.entity';

export class UserPresenter {
  public static toResponseDto(data: UserEntity): IUserResponse {
    return {
      id: data.id,
      name: data.name,
      surname: data.surname,
      phone: data.phone,
    };
  }

  public static toResponseManyDto(data: UserEntity[]): IUserResponse[] {
    return data.map(this.toResponseDto);
  }
}
