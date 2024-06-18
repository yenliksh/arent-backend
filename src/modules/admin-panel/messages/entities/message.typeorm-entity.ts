import { ISystemMessageOrmData, MessageStatus, MessageType, SystemMessageType } from '@domains/message/domain/types';
import { MessageOrmEntity } from '@infrastructure/database/entities/message.orm-entity';
import { Model } from 'objection';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

const tableName = 'messages';

type IMessage = Omit<MessageOrmEntity, keyof Model>;

@Entity({ name: tableName })
export class MessageTypeormEntity implements IMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  chatId: string;

  @Column({ type: 'uuid' })
  senderId: string;

  @Column({ type: 'enum', enum: MessageType })
  type: MessageType;

  @Column({ type: 'enum', enum: MessageStatus })
  status: MessageStatus;

  @Column({ type: 'text', nullable: true })
  text?: string | null;

  @Column({ type: 'text', nullable: true })
  fileKey?: string | null;

  @Column({ type: 'text', nullable: true })
  fileName?: string | null;

  @Column({ type: 'text', nullable: true })
  fileWeight?: number | null;

  @Column({ type: 'enum', enum: SystemMessageType, nullable: true })
  systemMessageType?: SystemMessageType | null;

  @Column({ type: 'json', nullable: true })
  contractData?: ISystemMessageOrmData | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
