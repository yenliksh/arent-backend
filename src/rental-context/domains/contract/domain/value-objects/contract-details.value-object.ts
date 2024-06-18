import { ApartmentRulesVO } from '@domain-value-objects/apartment-rules.value-object';
import { ValueObject } from '@libs/ddd/domain/base-classes/value-object.base';
import { Guard } from '@libs/ddd/domain/guard';
import { DateTimeISOTZVO } from '@libs/ddd/domain/value-objects/date-time-iso-tz.value-object';
import { ArgumentInvalidException } from '@libs/exceptions';
import { IllegalOperationException } from '@libs/exceptions/illegal-operation.exception';

export interface ContractDetailsProps {
  arrivalDate?: DateTimeISOTZVO;
  departureDate?: DateTimeISOTZVO;
  rules?: ApartmentRulesVO;
}

export class ContractDetailsVO extends ValueObject<ContractDetailsProps> {
  constructor(props: ContractDetailsProps) {
    super(props);
  }

  decreaseDepartureDate(newDepartureDate: DateTimeISOTZVO) {
    const { arrivalDate, departureDate } = this.props;

    if (!arrivalDate || !departureDate) {
      throw new IllegalOperationException(
        'You can decrease departure date only if arrival date and departure date exists',
      );
    }
    if (departureDate.getDate().getTime() <= newDepartureDate.getDate().getTime()) {
      throw new ArgumentInvalidException('New departure date must be less than old departure date');
    }

    this.props.departureDate = newDepartureDate;
  }

  get arrivalDate() {
    return this.props.arrivalDate;
  }

  get departureDate() {
    return this.props.departureDate;
  }

  get rules() {
    return this.props.rules;
  }

  protected validate(props: ContractDetailsProps): void {
    const { departureDate, arrivalDate } = props;
    if (departureDate && arrivalDate && !Guard.isDateMoreThan(arrivalDate.value, departureDate.value)) {
      throw new ArgumentInvalidException('End date must be more that start date');
    }
  }
}
