import { UserChatRole } from '@domains/chat/domain/types';
import { ChatMemberOrmEntity } from '@infrastructure/database/entities/chat-member.orm-entity';
import { Model } from 'objection';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

const tableName = 'chat_members';

type IChatMember = Omit<ChatMemberOrmEntity, keyof Model>;

@Entity({ name: tableName })
export class ChatMemberTypeormEntity implements IChatMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  chatId: string;
  @Column({ type: 'uuid' })
  memberId: string;
  @Column({ type: 'enum', enum: UserChatRole })
  role: UserChatRole;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
