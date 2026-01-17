import { useQuery } from "@tanstack/react-query";
import { PokemonService } from "@/services/pokemon.service";
import type { PokemonSpecies } from "@/types/pokemon";

/**
 * Hook para obtener la cadena de evolución de un Pokémon
 * @param species - Datos de la especie del Pokémon
 */
export function usePokemonEvolution(species: PokemonSpecies | undefined) {
    // Extraer el ID de la cadena de evolución desde la URL
    const evolutionChainId = species?.evolution_chain.url
        ? parseInt(species.evolution_chain.url.split("/").slice(-2, -1)[0])
        : undefined;

    // Query para obtener la cadena de evolución
    const evolutionQuery = useQuery({
        queryKey: ["evolution-chain", evolutionChainId],
        queryFn: () => {
            if (!evolutionChainId) throw new Error("Evolution chain ID is required");
            return PokemonService.getEvolutionChain(evolutionChainId);
        },
        enabled: !!evolutionChainId,
        staleTime: 1000 * 60 * 10, // 10 minutos
        gcTime: 1000 * 60 * 60, // 1 hora
    });

    return {
        evolutionChain: evolutionQuery.data,
        isLoading: evolutionQuery.isLoading,
        isError: evolutionQuery.isError,
        error: evolutionQuery.error,
    };
}
