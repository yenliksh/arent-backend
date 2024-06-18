import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminModule } from './admins/admin.module';
import { ApartmentAdComplaintModule } from './apartment-ad-complaints/apartment-ad-complaint.module';
import { ApartmentAdAdminModule } from './apartment-ads/apartment-ad-admin.module';
import { ChatMemberAdminModule } from './chat-members/chat-member-admin.module';
import { ChatAdminModule } from './chats/chat-admin.module';
import { ContractAdminModule } from './contracts/contract-admin.module';
import { LongTermRentRequestsAdminModule } from './long-term-rents-requests/long-term-rent-requests-admin.module';
import { LongTermRentAdminModule } from './long-term-rents/long-term-rent-admin.module';
import { MessageAdminModule } from './messages/message-admin.module';
import { ShortTermRentRequestsAdminModule } from './short-term-rents-requests/short-term-rent-requests-admin.module';
import { ShortTermRentAdminModule } from './short-term-rents/short-term-rent-admin.module';
import { UserComplaintModule } from './user-complaints/user-complaint.module';
import { UserIdentityRequestsAdminModule } from './user-identity-requests/user-identity-requests-admin.module';
import { UserAdminModule } from './users/user-admin.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.dbName'),
        entities: [__dirname + '/**/*.typeorm-entity{.ts,.js}'],
        synchronize: false,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    AdminModule,
    UserAdminModule,
    ShortTermRentRequestsAdminModule,
    LongTermRentRequestsAdminModule,
    UserIdentityRequestsAdminModule,
    ApartmentAdAdminModule,
    ShortTermRentAdminModule,
    LongTermRentAdminModule,
    ApartmentAdComplaintModule,
    UserComplaintModule,
    ChatAdminModule,
    MessageAdminModule,
    ContractAdminModule,
    ChatMemberAdminModule,
  ],
})
export class AdminPanelModule {}
