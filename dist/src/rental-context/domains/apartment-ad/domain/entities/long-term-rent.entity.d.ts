import { CostAndCurrencyVO } from '@domain-value-objects/cost-and-currency.value-object';
import { DocumentsVO } from '@domain-value-objects/documents.value-object';
import { LongTermRentCancellationPolicyType } from '@infrastructure/enums';
import { Entity } from '@libs/ddd/domain/base-classes/entity.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { ApartmentAdStatusVO } from '../value-objects/apartment-ad-status.value-object';
import { LongTermRentCancellationPolicyVO } from '../value-objects/long-term-rent-cancellation-policy.value-object';
export interface CreateLongTermRentProps {
    apartmentAdId: UUID;
    cost: number;
}
export interface LongTermRentProps {
    apartmentAdId: UUID;
    costAndCurrency: CostAndCurrencyVO;
    isApproved: boolean;
    status: ApartmentAdStatusVO;
    ownershipDocuments?: DocumentsVO;
    cancellationPolicy?: LongTermRentCancellationPolicyVO;
}
export declare class LongTermRentEntity extends Entity<LongTermRentProps> {
    protected readonly _id: UUID;
    static create({ apartmentAdId, cost }: CreateLongTermRentProps): LongTermRentEntity;
    get id(): UUID;
    get apartmentAdId(): UUID;
    get costAndCurrency(): CostAndCurrencyVO;
    get cancellationPolicy(): LongTermRentCancellationPolicyType | undefined;
    get status(): ApartmentAdStatusVO;
    get isApproved(): boolean;
    setCost(cost: number): void;
    sendToApprove(): this | undefined;
    pause(): this;
    publish(): this;
    get hasOwnershipDocuments(): boolean;
    approve(): this;
    reject(declineReason: string): this;
    get isPublishable(): boolean;
    setOwnershipDocuments(documents: string[]): void;
    validate(): void;
}
