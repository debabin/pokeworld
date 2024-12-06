/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Poketinder
 * OpenAPI spec version: 1.0
 */
import type { PaginationPokemonsResponse } from './paginationPokemonsResponse';

export interface PokemonsResponse {
  /**
   * Error reason
   * @nullable
   */
  reason?: string | null;
  /** Pokemons with pagination */
  response: PaginationPokemonsResponse;
  /** Request status */
  success: boolean;
}
