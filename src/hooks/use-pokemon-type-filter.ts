import { useQueries } from "@tanstack/react-query";
import { PokemonService } from "@/services/pokemon.service";
import type { PokemonListItem, Pokemon } from "@/types/pokemon";
import { useMemo } from "react";

/**
 * Hook para filtrar Pokémon por tipo cuando se tiene una lista de Pokémon
 * Hace fetch de los datos completos solo cuando es necesario
 */
export function usePokemonTypeFilter(
    pokemonList: PokemonListItem[],
    selectedType: string | null
) {
    // Solo hacer fetch si hay un tipo seleccionado
    const shouldFetch = !!selectedType && pokemonList.length > 0;

    // Obtener los datos completos de todos los Pokémon
    const pokemonQueries = useQueries({
        queries: shouldFetch
            ? pokemonList.map((pokemon) => ({
                queryKey: ["pokemon", pokemon.name],
                queryFn: () => PokemonService.getPokemonByNameOrId(pokemon.name),
                staleTime: 1000 * 60 * 10, // 10 minutos
            }))
            : [],
    });

    // Filtrar por tipo
    const filteredPokemon = useMemo(() => {
        if (!selectedType) return pokemonList;

        const filtered: PokemonListItem[] = [];

        pokemonQueries.forEach((query, index) => {
            if (query.data) {
                const pokemon = query.data as Pokemon;
                const hasType = pokemon.types.some((t) => t.type.name === selectedType);
                if (hasType) {
                    filtered.push(pokemonList[index]);
                }
            }
        });

        return filtered;
    }, [pokemonList, pokemonQueries, selectedType]);

    const isLoading = shouldFetch && pokemonQueries.some((q) => q.isLoading);

    return {
        filteredPokemon,
        isLoading,
    };
}
