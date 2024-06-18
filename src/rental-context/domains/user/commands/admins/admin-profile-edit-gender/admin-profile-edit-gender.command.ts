import { GenderType } from '@domains/user/domain/types';

export class AdminProfileEditGenderCommand {
  public constructor(public readonly userId: string, public readonly gender: GenderType) {}
}
