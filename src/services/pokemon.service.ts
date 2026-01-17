import axiosConfig from "@/lib/axios.config";
import type { Pokemon, PokemonListResponse, PokemonSpecies, TypeListResponse, TypeResponse } from "@/types/pokemon";

/**
 * Servicio para interactuar con la PokeAPI
 */
export class PokemonService {
    /**
     * Obtiene una lista paginada de Pokémon
     * @param limit - Número de Pokémon a obtener (por defecto 20)
     * @param offset - Offset para la paginación (por defecto 0)
     */
    static async getPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
        const response = await axiosConfig.get<PokemonListResponse>("/pokemon", {
            params: { limit, offset },
        });
        return response.data;
    }

    /**
     * Obtiene el detalle de un Pokémon por su nombre o ID
     * @param nameOrId - Nombre o ID del Pokémon
     */
    static async getPokemonByNameOrId(nameOrId: string | number): Promise<Pokemon> {
        const response = await axiosConfig.get<Pokemon>(`/pokemon/${nameOrId}`);
        return response.data;
    }

    /**
     * Obtiene múltiples Pokémon en paralelo
     * @param namesOrIds - Array de nombres o IDs de Pokémon
     */
    static async getMultiplePokemon(namesOrIds: (string | number)[]): Promise<Pokemon[]> {
        const promises = namesOrIds.map((nameOrId) => this.getPokemonByNameOrId(nameOrId));
        return Promise.all(promises);
    }

    /**
     * Obtiene información de la especie de un Pokémon
     * @param nameOrId - Nombre o ID de la especie
     */
    static async getPokemonSpecies(nameOrId: string | number): Promise<PokemonSpecies> {
        const response = await axiosConfig.get<PokemonSpecies>(`/pokemon-species/${nameOrId}`);
        return response.data;
    }

    /**
     * Busca Pokémon por nombre (búsqueda local en la lista)
     * @param searchTerm - Término de búsqueda
     * @param limit - Límite de resultados a buscar
     */
    static async searchPokemon(searchTerm: string, limit = 1000): Promise<PokemonListResponse> {
        const response = await axiosConfig.get<PokemonListResponse>("/pokemon", {
            params: { limit },
        });

        const filteredResults = response.data.results.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return {
            ...response.data,
            results: filteredResults,
            count: filteredResults.length,
        };
    }

    /**
     * Obtiene la lista de todos los tipos de Pokémon disponibles
     */
    static async getTypeList(): Promise<TypeListResponse> {
        const response = await axiosConfig.get<TypeListResponse>("/type");
        return response.data;
    }

    /**
     * Obtiene todos los Pokémon de un tipo específico
     * @param type - Nombre del tipo (ej: "fire", "water", "grass")
     */
    static async getPokemonByType(type: string): Promise<TypeResponse> {
        const response = await axiosConfig.get<TypeResponse>(`/type/${type}`);
        return response.data;
    }

    /**
     * Obtiene el detalle de una habilidad por su nombre o ID
     * @param nameOrId - Nombre o ID de la habilidad
     */
    static async getAbilityDetail(nameOrId: string | number): Promise<import("@/types/ability").AbilityDetail> {
        const response = await axiosConfig.get<import("@/types/ability").AbilityDetail>(`/ability/${nameOrId}`);
        return response.data;
    }

    /**
     * Obtiene la cadena de evolución de un Pokémon
     * @param id - ID de la cadena de evolución
     */
    static async getEvolutionChain(id: number): Promise<import("@/types/pokemon").EvolutionChain> {
        const response = await axiosConfig.get<import("@/types/pokemon").EvolutionChain>(`/evolution-chain/${id}`);
        return response.data;
    }
}
