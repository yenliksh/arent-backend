import { registerEnumType } from '@nestjs/graphql';

export enum Language {
  EN = 'en',
}

registerEnumType(Language, {
  name: 'Language',
});

const langStrings = Object.values(Language);

export function isLanguage(str: string): str is Language {
  return langStrings.includes(str as Language);
}

export function parseLanguage(str?: string) {
  if (!str || !isLanguage(str)) {
    return Language.EN;
  }
  return str;
}
