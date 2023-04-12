import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MessageEntity } from './message.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Entity()
export class ChatEntity {
  @ApiProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => UserEntity, (user: UserEntity) => user.chats)
  users: UserEntity[];

  @OneToMany(() => MessageEntity, (message: MessageEntity) => message.chat, {
    cascade: true,
  })
  @JoinColumn({ name: 'messages' })
  messages: MessageEntity[];
}
