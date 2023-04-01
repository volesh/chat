import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
