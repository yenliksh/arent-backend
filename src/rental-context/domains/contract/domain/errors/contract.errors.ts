import { ExceptionBase } from '@libs/exceptions';

export class ContractHasEmptyFieldsError extends ExceptionBase {
  static readonly message = 'Contract entity has empty fields';

  public readonly code = 'CONTRACT.HAS_EMPTY_FIELDS';

  constructor(metadata?: unknown) {
    super(`${ContractHasEmptyFieldsError.message}: ${metadata}`, metadata);
  }
}
