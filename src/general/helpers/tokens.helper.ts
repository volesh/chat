import { envsConfig } from './../configs/envs.config';
import { JwtService } from '@nestjs/jwt';

export class TokensHelper {
  constructor(private jwtService: JwtService) {}
  async generateToken(data: { phone: string; id: string }) {
    console.log(this.jwtService);

    const accessToken = await this.jwtService.signAsync(data, {
      secret: envsConfig.access_secret_key,
      expiresIn: '1d',
    });
    const refreshToken = await this.jwtService.signAsync(data, {
      secret: envsConfig.refresh_secret_key,
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }
}
