import type { NamedAPIResource } from './resource';

/**
 * The localized name for an API resource in a specific language
 */
export interface Name {
  /** The language this name is in */
  language: NamedAPIResource;
  /** The localized name for an API resource in a specific language */
  name: string;
}
