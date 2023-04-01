import { UserResponseDto } from './dto/user.response.dto';
import { UserEntity } from './entities/user.entity';

export class UserPresenter {
  public static toResponseDto(data: UserEntity): UserResponseDto {
    return {
      id: data.id,
      name: data.name,
      surname: data.surname,
      phone: data.phone,
    };
  }

  public static toResponseManyDto(data: UserEntity[]): UserResponseDto[] {
    return data.map(this.toResponseDto);
  }
}
