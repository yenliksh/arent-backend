import { ProblemTypes } from '@libs/problems/types';
import { ObjectType } from '@nestjs/graphql';
import { I18nService } from 'nestjs-i18n';

import { Language } from '../interfaces/localized.base.interface';
import { ProblemBase } from './problem.base';

@ObjectType()
export abstract class LocalizedProblem extends ProblemBase {
  constructor(
    protected readonly problem: ProblemTypes,
    protected readonly args?: Record<string, any> | Record<string, any>[],
  ) {
    super(problem);
  }

  public async useLang(lang: Language, i18n: I18nService) {
    this.message = await i18n.translate('problems.' + this.problem, {
      lang,
      args: this.args,
    });
    return this;
  }
}
