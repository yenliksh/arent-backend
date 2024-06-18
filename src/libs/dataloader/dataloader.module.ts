import { ApartmentAdForContractLoader } from '@domains/chat/dataloader/apartment-ad-for-contract.dataloader';
import { IsActiveChatLoader } from '@domains/chat/dataloader/is-active-chat.dataloader';
import { UnreadMessageCountLoader } from '@domains/chat/dataloader/unread-message-count.dataloader';
import { ContractByContractRequestIdLoader } from '@domains/contract-request/dataloader/contract-by-contract-request-id.dataloader';
import { InnopayCardByContractIdOrmEntityLoader } from '@domains/payment-transaction/dataloader/innopay-card-by-contract-id.dataloader';
import { ApartmentAdOrmEntityLoader } from '@infrastructure/dataloader/apartment-ad.dataloader';
import { ContractCancelationOrmEntityLoader } from '@infrastructure/dataloader/contract-cancelation.dataloader';
import { ContractOrmEntityLoader } from '@infrastructure/dataloader/contract.dataloader';
import { InnopayCardOrmEntityLoader } from '@infrastructure/dataloader/innopay-card.dataloader';
import { InnopayPaymentPageByContractIdLoader } from '@infrastructure/dataloader/innopay-payment-page-by-contract-id.dataloader';
import { PaymentTransactionOrmEntityLoader } from '@infrastructure/dataloader/payment-transaction.dataloader';
import { ShortTermRentLockedDateOrmEntityLoader } from '@infrastructure/dataloader/short-term-rent-locked-date.dataloader';
import { UserOrmEntityLoader } from '@infrastructure/dataloader/user.dataloader';
import { Module } from '@nestjs/common';
import { ApartmentAdLongTermRentOrmEntityLoader } from 'src/rental-context/domains/apartment-ad/dataloader/apartment-ad-long-term-rent.dataloader';
import { ApartmentAdShortTermRentOrmEntityLoader } from 'src/rental-context/domains/apartment-ad/dataloader/apartment-ad-short-term-rent.dataloader';
import { ChatMembersLoader } from 'src/rental-context/domains/chat/dataloader/chat-members.dataloader';
import { LastMessageLoader } from 'src/rental-context/domains/chat/dataloader/last-message.dataloader';

const dataloadersProviders = [
  {
    provide: UserOrmEntityLoader.name,
    useClass: UserOrmEntityLoader,
  },
  {
    provide: ApartmentAdOrmEntityLoader.name,
    useClass: ApartmentAdOrmEntityLoader,
  },
  {
    provide: ApartmentAdShortTermRentOrmEntityLoader.name,
    useClass: ApartmentAdShortTermRentOrmEntityLoader,
  },
  {
    provide: ApartmentAdLongTermRentOrmEntityLoader.name,
    useClass: ApartmentAdLongTermRentOrmEntityLoader,
  },
  {
    provide: ChatMembersLoader.name,
    useClass: ChatMembersLoader,
  },
  {
    provide: LastMessageLoader.name,
    useClass: LastMessageLoader,
  },
  {
    provide: ApartmentAdForContractLoader.name,
    useClass: ApartmentAdForContractLoader,
  },
  {
    provide: ContractOrmEntityLoader.name,
    useClass: ContractOrmEntityLoader,
  },
  {
    provide: ShortTermRentLockedDateOrmEntityLoader.name,
    useClass: ShortTermRentLockedDateOrmEntityLoader,
  },
  {
    provide: UnreadMessageCountLoader.name,
    useClass: UnreadMessageCountLoader,
  },
  {
    provide: IsActiveChatLoader.name,
    useClass: IsActiveChatLoader,
  },
  {
    provide: ContractByContractRequestIdLoader.name,
    useClass: ContractByContractRequestIdLoader,
  },
  {
    provide: PaymentTransactionOrmEntityLoader.name,
    useClass: PaymentTransactionOrmEntityLoader,
  },
  {
    provide: InnopayCardOrmEntityLoader.name,
    useClass: InnopayCardOrmEntityLoader,
  },
  {
    provide: InnopayCardByContractIdOrmEntityLoader.name,
    useClass: InnopayCardByContractIdOrmEntityLoader,
  },
  {
    provide: ContractCancelationOrmEntityLoader.name,
    useClass: ContractCancelationOrmEntityLoader,
  },
  {
    provide: InnopayPaymentPageByContractIdLoader.name,
    useClass: InnopayPaymentPageByContractIdLoader,
  },
];

@Module({
  providers: dataloadersProviders,
})
export class DataloaderModule {}
