import { useQuery } from "@tanstack/react-query";
import { PokemonService } from "@/services/pokemon.service";
import { POKEMON_GENERATIONS, type PokemonGeneration } from "@/lib/pokemon-generations";
import type { PokemonListResponse } from "@/types/pokemon";

/**
 * Hook para obtener Pokémon de una generación específica
 * @param generation - Generación a obtener (1-9)
 */
export function usePokemonByGeneration(generation: PokemonGeneration | null) {
    return useQuery<PokemonListResponse>({
        queryKey: ["pokemon", "generation", generation],
        queryFn: async () => {
            if (!generation) {
                // Si no hay generación, obtener todos
                return PokemonService.getPokemonList(1025, 0);
            }

            const [min, max] = POKEMON_GENERATIONS[generation].range;
            const count = max - min + 1;
            const offset = min - 1;

            return PokemonService.getPokemonList(count, offset);
        },
        enabled: true,
        staleTime: 1000 * 60 * 5, // 5 minutos
        gcTime: 1000 * 60 * 30, // 30 minutos
    });
}
