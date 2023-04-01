import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envsConfig } from 'src/general/configs/envs.config';
import { Request } from 'express';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envsConfig.refresh_secret_key,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    console.log(req);
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, token: refreshToken };
  }
}
