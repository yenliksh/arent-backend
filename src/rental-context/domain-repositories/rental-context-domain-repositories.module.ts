import { Module } from '@nestjs/common';

import { ApartmentAdComplaintRepository } from './apartment-ad-complaint/apartment-ad-complaint.repository';
import { ApartmentAdIdentificatorRepository } from './apartment-ad-identificator/apartment-ad-identificator.repository';
import { ApartmentAdRepository } from './apartment-ad/apartment-ad.repository';
import { ChatRepository } from './chat/chat.repository';
import { ContractRequestRepository } from './contract-request/contract-request.repository';
import { ContractRepository } from './contract/contract.repository';
import { InnopayCardRepository } from './innopay-card/innopay-card.repository';
import { MessageRepository } from './message/message.repository';
import { PaymentTransactionRepository } from './payment-transaction/payment-transaction.repository';
import { RentPeriodVersionRepository } from './rent-period-version/rent-period-version.repository';
import { ReversingInnopayTransactionRepository } from './reversing-innopay-transaction/reversing-innopay-transaction.repository';
import { TemporaryPaymentTransactionRepository } from './temporary-payment-transaction/temporary-payment-transaction.repository';
import { UserComplaintRepository } from './user-complaint/user-complaint.repository';
import { UserRepository } from './user/user.repository';

const repositories = [
  ApartmentAdRepository,
  ApartmentAdIdentificatorRepository,
  ChatRepository,
  ContractRepository,
  ContractRequestRepository,
  InnopayCardRepository,
  MessageRepository,
  PaymentTransactionRepository,
  RentPeriodVersionRepository,
  UserRepository,
  ApartmentAdComplaintRepository,
  UserComplaintRepository,
  TemporaryPaymentTransactionRepository,
  ReversingInnopayTransactionRepository,
];

@Module({
  providers: repositories,
  exports: repositories,
})
export class RentalContextDomainRepositoriesModule {}
