import { IGuests } from '@domain-value-objects/apartment-guests.value-object';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ApartmentGuestsModel implements IGuests {
  @Field(() => Int)
  numberOfChildren: number;

  @Field(() => Int)
  numberOfAdult: number;

  @Field(() => Int)
  numberOfPets: number;

  static create(props: IGuests) {
    const payload = new ApartmentGuestsModel();

    const assignObject: ApartmentGuestsModel = {
      numberOfAdult: props.numberOfAdult ?? 0,
      numberOfChildren: props.numberOfChildren ?? 0,
      numberOfPets: props.numberOfPets ?? 0,
    };

    Object.assign(payload, assignObject);

    return payload;
  }
}
