import { ApartmentAdComplaintModule } from '@domains/apartment-ad-complaint/apartment-ad-complaint.module';
import { ApartmentAdModule } from '@domains/apartment-ad/apartment-ad.module';
import { ChatModule } from '@domains/chat/chat.module';
import { ContractRequestModule } from '@domains/contract-request/contract-request.module';
import { ContractModule } from '@domains/contract/contract.module';
import { InnopayCardModule } from '@domains/innopay-card/innopay-card.module';
import { InnopayTransactionModule } from '@domains/innopay-transaction/innopay-transaction.module';
import { MessageModule } from '@domains/message/message.module';
import { PaymentTransactionModule } from '@domains/payment-transaction/payment-transaction.module';
import { TemporaryPaymentTransactionModule } from '@domains/temporary-payment-transaction/temporary-payment-transaction.module';
import { UserModule } from '@domains/user/user.module';
import { Module } from '@nestjs/common';

import { UserComplaintModule } from './domains/user-complaint/user-complaint.module';

const domains = [
  ApartmentAdModule,
  ChatModule,
  ContractModule,
  ContractRequestModule,
  InnopayCardModule,
  MessageModule,
  PaymentTransactionModule,
  UserModule,
  ApartmentAdComplaintModule,
  UserComplaintModule,
  TemporaryPaymentTransactionModule,
  InnopayTransactionModule,
];

@Module({
  imports: [...domains],
})
export class RentalContextModule {}
