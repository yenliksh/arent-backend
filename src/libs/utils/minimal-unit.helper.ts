import { TransformFnParams } from 'class-transformer';
import { MINIMAL_UNIT_FACTOR } from 'src/rental-context/constants';

export const toSmallestUnitTransformer = (params: TransformFnParams) => {
  if (!params.value) {
    return params.value;
  }

  if (typeof params.value === 'number') {
    return toSmallestUnit(Number(params.value));
  }

  return params.value;
};

export const toMinorUnitTransformer = (params: TransformFnParams) => {
  if (!params.value) {
    return params.value;
  }

  if (typeof params.value === 'number') {
    return toMinorUnit(Number(params.value));
  }

  return params.value;
};

export const toMinorUnit = (value: number) => {
  return Math.ceil(value / MINIMAL_UNIT_FACTOR);
};

export const toSmallestUnit = (value: number) => {
  return value * MINIMAL_UNIT_FACTOR;
};

export const toMinorUnitString = (value: number) => {
  return toMinorUnit(value).toString();
};

export const toSmallestUnitString = (value: number) => {
  return toSmallestUnit(value).toString();
};
