import { IReqUser } from './interface/request.user.interfase';
import { UserPresenter } from '../users/presenters/user.presenter';
import { PasswordHelper } from './../../general/helpers/password.helper';
import { TokensEntity } from './entities/tokens.entity';
import { AuthDto } from './dto/auth.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { envsConfig } from 'src/general/configs/envs.config';
import { IUserResponse } from 'src/general/interfaces/user.interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TokensEntity)
    private readonly tokensRepository: Repository<TokensEntity>,
    private readonly passwordHelper: PasswordHelper,
    private jwtService: JwtService,
  ) {}

  // LOGIN !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  async login(data: AuthDto): Promise<{
    user: IUserResponse;
    tokens: { accessToken: string; refreshToken: string };
  }> {
    const user = await this.userRepository.findOne({
      where: { phone: data.phone },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isPasswordSame = await this.passwordHelper.comparePass(
      data.password,
      user.password,
    );
    if (!isPasswordSame) {
      throw new HttpException('Bed credentials', HttpStatus.BAD_REQUEST);
    }
    const tokens = await this.generateToken({
      id: user.id,
      phone: user.phone,
    });

    await this.tokensRepository.save({ ...tokens, user_id: user.id });

    const responseUser = UserPresenter.toResponseDto(user);

    return { user: responseUser, tokens };
  }
  //..............................................................................

  // REFRESH !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  async refresh(
    user: IReqUser,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokens = await this.generateToken({
      id: user.id,
      phone: user.phone,
    });
    await this.tokensRepository.save({ ...tokens, user_id: user.id });
    return { ...tokens };
  }
  //..............................................................................

  // LOGOUT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  async logout(user: IReqUser): Promise<{ status: string }> {
    await this.tokensRepository.delete({
      accessToken: user.token,
    });
    return { status: 'Logout success' };
  }
  //..............................................................................

  // GENERATE TOKEN !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  async generateToken(data: { phone: string; id: string }) {
    const accessToken = await this.jwtService.signAsync(data, {
      secret: envsConfig.access_secret_key,
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(data, {
      secret: envsConfig.refresh_secret_key,
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }
  //..............................................................................
}
