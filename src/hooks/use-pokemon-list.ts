import { useQuery } from "@tanstack/react-query";
import { PokemonService } from "@/services/pokemon.service";

/**
 * Hook para obtener la lista básica de Pokémon (nombres y URLs)
 * Útil para navegación y búsqueda
 */
export function usePokemonList() {
    return useQuery({
        queryKey: ["pokemon-list"],
        queryFn: () => PokemonService.getPokemonList(1025, 0), // Todos los Pokémon
        staleTime: 1000 * 60 * 60, // 1 hora - la lista no cambia frecuentemente
        gcTime: 1000 * 60 * 60 * 24, // 24 horas
    });
}

/**
 * Hook para obtener información de navegación (anterior/siguiente) de un Pokémon
 * @param currentId - ID del Pokémon actual
 */
export function usePokemonNavigation(currentId: number) {
    const { data: pokemonList } = usePokemonList();

    if (!pokemonList) {
        return {
            previous: null,
            next: null,
        };
    }

    // Encontrar el índice del Pokémon actual (ID - 1 porque el array es 0-indexed)
    const currentIndex = currentId - 1;

    const previous = currentIndex > 0 ? pokemonList.results[currentIndex - 1] : null;
    const next = currentIndex < pokemonList.results.length - 1 ? pokemonList.results[currentIndex + 1] : null;

    return {
        previous,
        next,
    };
}
