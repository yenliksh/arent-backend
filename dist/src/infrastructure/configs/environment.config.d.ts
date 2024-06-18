import * as Joi from 'joi';
declare type EnvironmentTypes = 'development' | 'staging' | 'production';
export declare let currentEnvironment: EnvironmentTypes;
export declare const loadConfiguration: () => Record<string, unknown>;
export declare const validationSchema: Joi.ObjectSchema<any>;
export {};
