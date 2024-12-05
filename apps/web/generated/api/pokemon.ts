/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Poketinder
 * OpenAPI spec version: 1.0
 */

export interface Pokemon {
  /** Описание покемона */
  description: string;
  /** Уникальный идентификатор покемона */
  id: string;
  /** URL изображения покемона */
  image: string;
  /** Имя покемона */
  name: string;
  /** ID покемона */
  pokemonId: number;
  /** Список типов покемона */
  types: string[];
}