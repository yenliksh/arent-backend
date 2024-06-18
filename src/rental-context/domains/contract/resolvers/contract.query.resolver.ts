import { UserOrmEntity } from '@infrastructure/database/entities/user.orm-entity';
import { IAM } from '@infrastructure/decorators/iam.decorator';
import { JwtAuthGuard } from '@infrastructure/guards';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { TenantContractsPaginationResponse } from '../dtos/tenant-contracts-pagination.response';
import { ContractLandlordModel, ContractTenantModel } from '../models/contract.model';
import { FindContractRequest } from '../queries/find-contract/find-contract.request';
import { LandlordActiveRentContractsService } from '../queries/landlord-active-rent-contracts/landlord-active-rent-contracts.service';
import { LandlordContractService } from '../queries/landlord-contract/landlord-contract.service';
import { TenantContractCancelationInfoRequest } from '../queries/tenant-contract-cancelation-info/tenant-contract-cancelation-info.request';
import { TenantContractCancelationInfoResponse } from '../queries/tenant-contract-cancelation-info/tenant-contract-cancelation-info.response';
import { TenantContractCancelationInfoService } from '../queries/tenant-contract-cancelation-info/tenant-contract-cancelation-info.service';
import { TenantContractPaymentInfoRequest } from '../queries/tenant-contract-payment-info/tenant-contract-payment-info.request';
import { TenantContractPaymentInfoResponse } from '../queries/tenant-contract-payment-info/tenant-contract-payment-info.response';
import { TenantContractPaymentInfoService } from '../queries/tenant-contract-payment-info/tenant-contract-payment-info.service';
import { TenantContractService } from '../queries/tenant-contract/tenant-contract.service';
import { TenantLongTermRentContractsRequest } from '../queries/tenant-long-term-rent-contracts/tenant-long-term-rent-contracts.request.dto';
import { TenantLongTermRentContractsService } from '../queries/tenant-long-term-rent-contracts/tenant-long-term-rent-contracts.service';
import { TenantShortTermRentContractsRequest } from '../queries/tenant-short-term-rent-contracts/tenant-short-term-rent-contracts.request.dto';
import { TenantShortTermRentContractsService } from '../queries/tenant-short-term-rent-contracts/tenant-short-term-rent-contracts.service';

@Resolver()
export class ContractQueryGraphqlResolver {
  constructor(
    private readonly landlordActiveRentContractsService: LandlordActiveRentContractsService,
    private readonly landlordContractService: LandlordContractService,
    private readonly tenantContractService: TenantContractService,
    private readonly tenantLongTermRentContractsService: TenantLongTermRentContractsService,
    private readonly tenantShortTermRentContractsService: TenantShortTermRentContractsService,
    private readonly tenantContractPaymentInfoService: TenantContractPaymentInfoService,
    private readonly tenantContractCancelationInfoService: TenantContractCancelationInfoService,
  ) {}

  @UseGuards(JwtAuthGuard())
  @Query(() => ContractLandlordModel, { name: 'contract__landlord_find' })
  async landlordActiveRentContract(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: FindContractRequest,
  ): Promise<ContractLandlordModel> {
    const result = await this.landlordContractService.handle(input, userId);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return ContractLandlordModel.create(result.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Query(() => ContractTenantModel, { name: 'contract__tenant_find' })
  async tenantActiveRentContract(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: FindContractRequest,
  ): Promise<ContractTenantModel> {
    const result = await this.tenantContractService.handle(input, userId);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return ContractTenantModel.create(result.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Query(() => [ContractLandlordModel], { name: 'contract__landlord_activeRents' })
  async landlordActiveRentContracts(@IAM('id') userId: UserOrmEntity['id']): Promise<ContractLandlordModel[]> {
    const result = await this.landlordActiveRentContractsService.handle(userId);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return result.unwrap().map((i) => ContractLandlordModel.create(i));
  }

  @UseGuards(JwtAuthGuard())
  @Query(() => TenantContractsPaginationResponse, { name: 'contract__tenant_shortTermRents' })
  async tenantShortTermRentContracts(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: TenantShortTermRentContractsRequest,
  ): Promise<TenantContractsPaginationResponse> {
    const result = await this.tenantShortTermRentContractsService.handle(userId, input);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return TenantContractsPaginationResponse.create(result.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Query(() => TenantContractsPaginationResponse, { name: 'contract__tenant_longTermRents' })
  async tenantLongTermRentContracts(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: TenantLongTermRentContractsRequest,
  ): Promise<TenantContractsPaginationResponse> {
    const result = await this.tenantLongTermRentContractsService.handle(userId, input);

    if (result.isErr()) {
      throw result.unwrapErr();
    }

    return TenantContractsPaginationResponse.create(result.unwrap());
  }

  @UseGuards(JwtAuthGuard())
  @Query(() => TenantContractPaymentInfoResponse, { name: 'contract__tenant_paymentInfo' })
  async tenantPaymentInfo(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: TenantContractPaymentInfoRequest,
  ): Promise<TenantContractPaymentInfoResponse> {
    const result = await this.tenantContractPaymentInfoService.handle(input, userId);

    return TenantContractPaymentInfoResponse.create(result);
  }

  @UseGuards(JwtAuthGuard())
  @Query(() => TenantContractCancelationInfoResponse, { name: 'contract__tenant_cancelationInfo' })
  async tenantCancelationInfo(
    @IAM('id') userId: UserOrmEntity['id'],
    @Args('input') input: TenantContractCancelationInfoRequest,
  ): Promise<TenantContractCancelationInfoResponse> {
    const result = await this.tenantContractCancelationInfoService.handle(input, userId);

    return TenantContractCancelationInfoResponse.create(result);
  }
}
