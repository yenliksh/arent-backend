import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import DataLoader from 'dataloader';
import { MessageModel } from 'src/rental-context/domains/message/models/message.model';
import { UserModel } from 'src/rental-context/domains/user/models/user.model';
export declare class MessageGraphqlResolver {
    sender(message: MessageModel, senderLoader: DataLoader<string, UserOrmEntity>): Promise<UserModel | null>;
}
