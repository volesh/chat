import { IReqUser } from './../auth/interface/request.user.interfase';
import { UserPresenter } from './user.presenter';
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
import { UserResponseDto } from './dto/user.response.dto';
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
    type: UserResponseDto,
  })
  @ApiBody({ type: CreateUserDto })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<UserResponseDto> {
    const createdUser = await this.usersService.createUser(user);
    return UserPresenter.toResponseDto(createdUser);
  }
  // .............................................................................

  // Update !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  @ApiResponse({
    status: 204,
    description: 'User has been successfully updated.',
    type: UserResponseDto,
  })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto })
  @UseGuards(AuthGuard('jwt'))
  @Put()
  async upbdateUser(
    @Body() userForUpdate: UpdateUserDto,
    @Req() req: Request,
  ): Promise<UserResponseDto> {
    const updatedUser = await this.usersService.updateuser(
      userForUpdate,
      req.user as IReqUser,
    );
    return UserPresenter.toResponseDto(updatedUser);
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
