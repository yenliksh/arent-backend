import { ApartmentRulesVO } from '@domain-value-objects/apartment-rules.value-object';
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
export interface ContractDetailsProps {
    arrivalDate?: DateTimeISOTZVO;
    departureDate?: DateTimeISOTZVO;
    rules?: ApartmentRulesVO;
}
export declare class ContractDetailsVO extends ValueObject<ContractDetailsProps> {
    constructor(props: ContractDetailsProps);
    decreaseDepartureDate(newDepartureDate: DateTimeISOTZVO): void;
    get arrivalDate(): DateTimeISOTZVO | undefined;
    get departureDate(): DateTimeISOTZVO | undefined;
    get rules(): ApartmentRulesVO | undefined;
    protected validate(props: ContractDetailsProps): void;
}
