import { IReqUser } from './interface/request.user.interfase';
import { AuthDto } from './dto/auth.dto';
import { Controller } from '@nestjs/common';
import { Get, Post, Body, UseGuards, Req } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { TokensDto } from './dto/tokens.dto';
import { IUserResponse } from 'src/general/interfaces/user.interfaces';

class LoginResponseDto {
  @ApiProperty()
  user: IUserResponse;

  @ApiProperty()
  tokens: TokensDto;
}

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  @ApiResponse({
    type: LoginResponseDto,
  })
  @Post('/login')
  async login(@Body() data: AuthDto) {
    return this.authService.login(data);
  }
  //..............................................................................

  // REFRESH !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  @ApiBearerAuth()
  @ApiResponse({
    type: TokensDto,
  })
  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('/refresh')
  refresh(@Req() req: Request) {
    const user = req.user as IReqUser;
    return this.authService.refresh(user);
  }
  //..............................................................................

  // LOGOUT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  @ApiBearerAuth('defaultBearerAuth')
  @ApiResponse({
    schema: {
      properties: {
        status: {
          type: 'string',
          example: 'Logout success',
        },
      },
      type: 'object',
    },
    description: 'Logout status',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  logout(@Req() req: Request): Promise<{ status: string }> {
    const user = req.user as IReqUser;
    return this.authService.logout(user);
  }
  //..............................................................................
}
