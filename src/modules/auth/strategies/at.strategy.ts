import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envsConfig } from 'src/general/configs/envs.config';
import { Repository } from 'typeorm';
import { TokensEntity } from '../entities/tokens.entity';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(TokensEntity)
    private readonly tokensRepository: Repository<TokensEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envsConfig.access_secret_key,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const accessToken = req.get('Authorization').replace('Bearer', '').trim();
    const token = await this.tokensRepository.findOne({
      where: { accessToken },
    });
    if (!token) {
      return false;
    }
    return { ...payload, token: accessToken };
  }
}
