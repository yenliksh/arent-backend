import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { UserOrmEntityLoader } from '@infrastructure/dataloader/user.dataloader';
import { Loader } from '@libs/dataloader';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { MessageModel } from 'src/rental-context/domains/message/models/message.model';
import { UserModel } from 'src/rental-context/domains/user/models/user.model';

@Resolver(() => MessageModel)
export class MessageGraphqlResolver {
  @ResolveField(() => UserModel, { nullable: true })
  async sender(
    @Parent() message: MessageModel,
    @Loader(UserOrmEntityLoader.name) senderLoader: DataLoader<string, UserOrmEntity>,
  ) {
    const { senderId } = message;

    if (!senderId) {
      return null;
    }

    const result = await senderLoader.load(senderId);

    return UserModel.create(result);
  }
}
