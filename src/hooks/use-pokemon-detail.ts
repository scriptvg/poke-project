import { useQuery } from "@tanstack/react-query";
import { PokemonService } from "@/services/pokemon.service";

/**
 * Hook para obtener el detalle completo de un Pokémon por su nombre (slug)
 * @param slug - Nombre del Pokémon (usado como slug en la URL)
 */
export function usePokemonDetail(slug: string | undefined) {
    // Query para obtener los datos básicos del Pokémon
    const pokemonQuery = useQuery({
        queryKey: ["pokemon", slug],
        queryFn: () => {
            if (!slug) throw new Error("Slug is required");
            return PokemonService.getPokemonByNameOrId(slug);
        },
        enabled: !!slug,
        staleTime: 1000 * 60 * 5, // 5 minutos
        gcTime: 1000 * 60 * 30, // 30 minutos
    });

    // Query para obtener información de la especie (descripción, etc.)
    const speciesQuery = useQuery({
        queryKey: ["pokemon-species", slug],
        queryFn: () => {
            if (!slug) throw new Error("Slug is required");
            return PokemonService.getPokemonSpecies(slug);
        },
        enabled: !!slug && !!pokemonQuery.data,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });

    return {
        pokemon: pokemonQuery.data,
        species: speciesQuery.data,
        isLoading: pokemonQuery.isLoading || speciesQuery.isLoading,
        isError: pokemonQuery.isError || speciesQuery.isError,
        error: pokemonQuery.error || speciesQuery.error,
    };
}
