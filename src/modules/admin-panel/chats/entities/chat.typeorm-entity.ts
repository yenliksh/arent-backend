import { ChatOrmEntity } from '@infrastructure/database/entities/chat.orm-entity';
import { Model } from 'objection';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

const tableName = 'chats';

type IChat = Omit<ChatOrmEntity, keyof Model>;

@Entity({ name: tableName })
export class ChatTypeormEntity implements IChat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  contractId: string;

  @Column({ type: 'uuid', nullable: true })
  lastMessageId?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
