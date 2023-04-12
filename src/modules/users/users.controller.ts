import {
  IUserResponse,
  UserResponse,
} from './../../general/interfaces/user.interfaces';
import { IReqUser } from './../auth/interface/request.user.interfase';
import { UpdateUserDto } from './dto/update.user.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { HttpCode, Req } from '@nestjs/common/decorators';
import { Request } from 'express';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Register !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  @ApiCreatedResponse({
    description: 'User has been successfully created.',
    type: UserResponse,
  })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<IUserResponse> {
    return this.usersService.createUser(user);
  }
  // .............................................................................

  // Update !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  @ApiResponse({
    status: 204,
    description: 'User has been successfully updated.',
    type: UserResponse,
  })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto })
  @UseGuards(AuthGuard('jwt'))
  @Put()
  async upbdateUser(
    @Body() userForUpdate: UpdateUserDto,
    @Req() req: Request,
  ): Promise<IUserResponse> {
    return this.usersService.updateuser(userForUpdate, req.user as IReqUser);
  }
  // .............................................................................

  //Delete !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 204,
    description: 'User has been successfully deleted.',
  })
  @ApiBearerAuth()
  @HttpCode(204)
  @Delete()
  async deleteUser(@Req() req: Request): Promise<{ status: string }> {
    const user = req.user as IReqUser;
    return this.usersService.deleteUser(user.id);
  }
  // .............................................................................
}
