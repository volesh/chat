import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './../users/entities/user.entity';
import { PasswordHelper } from 'src/general/helpers/password.helper';
import { TokensHelper } from 'src/general/helpers/tokens.helper';
import { TokensEntity } from './entities/tokens.entity';
import { RtStrategy } from './strategies/rt.strategy';
import { AtStrategy } from './strategies/at.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([TokensEntity, UserEntity]),
    TokensHelper,
    PasswordHelper,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy,
    TokensHelper,
    PasswordHelper,
    JwtService,
  ],
})
export class AuthModule {}
