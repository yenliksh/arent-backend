import { MappingProperty, MappingTypeMapping } from './types';

export interface Mappings<Document> extends MappingTypeMapping {
  properties: Record<keyof Document, MappingProperty>;
}
