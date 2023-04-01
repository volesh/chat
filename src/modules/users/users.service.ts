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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly passwordHelper: PasswordHelper,
  ) {}

  // GET ALL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  async getAll() {
    return this.userRepository.find();
  }
  // .............................................................................

  // CREATE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  async createUser(user: CreateUserDto): Promise<UserEntity> {
    const isExist = await this.isUserExist({ phone: user.phone });
    if (isExist) {
      throw new BadRequestException(
        `User with phone ${user.phone} alredy exist`,
      );
    }
    const hashedPass = await this.passwordHelper.hashPass(user.password);
    return this.userRepository.save({ ...user, password: hashedPass });
  }
  // .............................................................................

  // UPDATE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  async updateuser(user: UpdateUserDto, { id }: IReqUser): Promise<UserEntity> {
    const isExist = await this.isUserExist({ id });
    if (!isExist) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({
      where: { id },
    });
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
