import { envsConfig } from 'src/general/configs/envs.config';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import { TokensEntity } from '../auth/entities/tokens.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { ChatsModule } from '../chats/chats.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ChatsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envsConfig.postgres_host, // envsConfig.postgres_docker_host (in docker)
      port: Number(envsConfig.postgres_port),
      username: envsConfig.postgres_user,
      password: envsConfig.postgres_password,
      database: envsConfig.postgres_name,
      entities: [UserEntity, TokensEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
