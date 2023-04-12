import { IReqUser } from './../auth/interface/request.user.interfase';
import { PasswordHelper } from '../../general/helpers/password.helper';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update.user.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { UserPresenter } from './presenters/user.presenter';
import { IUserResponse } from 'src/general/interfaces/user.interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly passwordHelper: PasswordHelper,
  ) {}

  // GET ALL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // private async getAll() {
  //   return this.userRepository.find();
  // }
  // .............................................................................

  // CREATE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  async createUser(user: CreateUserDto): Promise<IUserResponse> {
    const isExist = await this.isUserExist({ phone: user.phone });
    if (isExist) {
      throw new BadRequestException(
        `User with phone ${user.phone} alredy exist`,
      );
    }
    const hashedPass = await this.passwordHelper.hashPass(user.password);
    const createdUser = await this.userRepository.save({
      ...user,
      password: hashedPass,
    });
    return UserPresenter.toResponseDto(createdUser);
  }
  // .............................................................................

  // UPDATE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  async updateuser(
    user: UpdateUserDto,
    { id }: IReqUser,
  ): Promise<IUserResponse> {
    const isExist = await this.isUserExist({ id });
    if (!isExist) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update(id, user);
    const updatedUser = await this.userRepository.findOne({
      where: { id },
    });
    return UserPresenter.toResponseDto(updatedUser);
  }
  // .............................................................................

  // DELETE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  async deleteUser(id: string): Promise<{ status: string }> {
    const result = await this.userRepository.delete(id);
    if (result.affected) {
      return { status: 'deleted' };
    }
    throw new NotFoundException('User not found');
  }
  // .............................................................................

  //IS EXIST !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  isUserExist(data: Partial<UserEntity>): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: data });
  }
  // .............................................................................
}
