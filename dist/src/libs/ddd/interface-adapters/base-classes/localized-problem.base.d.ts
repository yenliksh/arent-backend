import { ProblemTypes } from '@libs/problems/types';
import { I18nService } from 'nestjs-i18n';
import { Language } from '../interfaces/localized.base.interface';
import { ProblemBase } from './problem.base';
export declare abstract class LocalizedProblem extends ProblemBase {
    protected readonly problem: ProblemTypes;
    protected readonly args?: Record<string, any> | Record<string, any>[] | undefined;
    constructor(problem: ProblemTypes, args?: Record<string, any> | Record<string, any>[] | undefined);
    useLang(lang: Language, i18n: I18nService): Promise<this>;
}
