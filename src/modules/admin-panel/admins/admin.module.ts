import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminsAuthController } from './controllers';
import { AdminsTypeormRepository } from './repositories';
import { AdminsAuthService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([AdminsTypeormRepository])],
  controllers: [AdminsAuthController],
  providers: [AdminsAuthService],
})
export class AdminModule {}
