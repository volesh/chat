import { IReqUser } from './interface/request.user.interfase';
import { AuthDto } from './dto/auth.dto';
import { Controller } from '@nestjs/common';
import { Get, Post, Body, UseGuards, Req } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  @Post('/login')
  async login(@Body() data: AuthDto) {
    return this.authService.login(data);
  }
  //..............................................................................

  // REFRESH !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('/refresh')
  refresh(@Req() req: Request) {
    const user = req.user as IReqUser;
    return this.authService.refresh(user);
  }
  //..............................................................................

  // LOGOUT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  logout(@Req() req: Request): Promise<{ status: string }> {
    const user = req.user as IReqUser;
    return this.authService.logout(user);
  }
  //..............................................................................
}
