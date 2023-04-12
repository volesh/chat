import { ApiProperty } from '@nestjs/swagger';
import { ChatEntity } from 'src/modules/chats/entites/chat.entity';
import { MessageEntity } from 'src/modules/chats/entites/message.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity()
export class UserEntity {
  @ApiProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: String, example: 'Vasyl' })
  @Column()
  name: string;

  @ApiProperty({ type: String, example: 'Olesh' })
  @Column()
  surname: string;

  @ApiProperty({ type: String, uniqueItems: true, example: '0687562845' })
  @Column({ unique: true })
  phone: string;

  @ApiProperty({ type: String, example: 'qwer1234' })
  @Column()
  password: string;

  @OneToMany(() => MessageEntity, (message: MessageEntity) => message.user, {})
  messages: MessageEntity[];

  @ManyToMany(() => ChatEntity, (chat: ChatEntity) => chat.users)
  @JoinTable({
    name: 'users_chats',
    joinColumn: {
      name: 'chat_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  chats: ChatEntity[];
}
