import { useQuery, useQueries, useInfiniteQuery, type UseQueryResult, useSuspenseQuery, keepPreviousData } from "@tanstack/react-query";
import { PokemonService } from "@/services/pokemon.service";
import type { Pokemon, PokemonListResponse, PokemonSpecies, TypeListResponse, TypeResponse, PokemonListItem } from "@/types/pokemon";
import { useMemo } from "react";

/**
 * Hook para obtener una lista de Pokémon
 * @param limit - Número de Pokémon a obtener
 * @param offset - Offset para la paginación
 */
export function usePokemonList(limit = 20, offset = 0) {
    return useSuspenseQuery<PokemonListResponse>({
        queryKey: ["pokemon", "list", limit, offset],
        queryFn: () => PokemonService.getPokemonList(limit, offset),
    });
}

/**
 * Hook para obtener una lista infinita de Pokémon con paginación
 * @param limit - Número de Pokémon por página
 */
export function usePokemonInfinite(limit = 50) {
    return useInfiniteQuery<PokemonListResponse>({
        queryKey: ["pokemon", "infinite", limit],
        queryFn: ({ pageParam = 0 }) => PokemonService.getPokemonList(limit, pageParam as number),
        getNextPageParam: (lastPage, allPages) => {
            const nextOffset = allPages.length * limit;
            // La API de Pokémon tiene aproximadamente 1000+ Pokémon
            return nextOffset < (lastPage.count || 1000) ? nextOffset : undefined;
        },
        initialPageParam: 0,
        placeholderData: keepPreviousData, // Mantener datos previos durante la carga
    });
}

/**
 * Hook para obtener el detalle de un Pokémon
 * @param nameOrId - Nombre o ID del Pokémon
 * @param enabled - Si la query debe ejecutarse (por defecto true)
 */
export function usePokemon(nameOrId: string | number, enabled = true) {
    return useQuery<Pokemon>({
        queryKey: ["pokemon", "detail", nameOrId],
        queryFn: () => PokemonService.getPokemonByNameOrId(nameOrId),
        enabled: enabled && !!nameOrId,
    });
}

/**
 * Hook para obtener múltiples Pokémon en paralelo
 * @param namesOrIds - Array de nombres o IDs de Pokémon
 */
export function useMultiplePokemon(namesOrIds: (string | number)[]) {
    return useQueries({
        queries: namesOrIds.map((nameOrId) => ({
            queryKey: ["pokemon", "detail", nameOrId],
            queryFn: () => PokemonService.getPokemonByNameOrId(nameOrId),
            placeholderData: keepPreviousData,
        })),
    }) as UseQueryResult<Pokemon>[];
}

/**
 * Hook para obtener información de la especie de un Pokémon
 * @param nameOrId - Nombre o ID de la especie
 * @param enabled - Si la query debe ejecutarse (por defecto true)
 */
export function usePokemonSpecies(nameOrId: string | number, enabled = true) {
    return useQuery<PokemonSpecies>({
        queryKey: ["pokemon", "species", nameOrId],
        queryFn: () => PokemonService.getPokemonSpecies(nameOrId),
        enabled: enabled && !!nameOrId,
    });
}

/**
 * Hook para buscar Pokémon por nombre
 * @param searchTerm - Término de búsqueda
 * @param enabled - Si la query debe ejecutarse (por defecto true)
 */
export function useSearchPokemon(searchTerm: string, enabled = true) {
    return useQuery<PokemonListResponse>({
        queryKey: ["pokemon", "search", searchTerm],
        queryFn: () => PokemonService.searchPokemon(searchTerm),
        enabled: enabled && searchTerm.length > 0,
    });
}

/**
 * Hook para obtener la lista de todos los tipos de Pokémon
 */
export function useTypeList() {
    return useQuery<TypeListResponse>({
        queryKey: ["pokemon", "types"],
        queryFn: () => PokemonService.getTypeList(),
        staleTime: Infinity, // Los tipos no cambian, cachear indefinidamente
    });
}

/**
 * Hook para obtener Pokémon de un tipo específico con infinite scroll del lado del cliente
 * @param type - Nombre del tipo (ej: "fire", "water")
 * @param pageSize - Número de Pokémon por página (paginación del cliente)
 */
export function usePokemonByType(type: string | null, pageSize = 50) {
    // Fetch de todos los Pokémon del tipo
    const typeQuery = useQuery<TypeResponse>({
        queryKey: ["pokemon", "type", type],
        queryFn: () => PokemonService.getPokemonByType(type!),
        enabled: !!type,
        staleTime: 5 * 60 * 1000, // 5 minutos
    });

    // Convertir a formato de infinite query con paginación del cliente
    const allPokemon = useMemo(() => {
        if (!typeQuery.data) return [];
        return typeQuery.data.pokemon.map(tp => tp.pokemon);
    }, [typeQuery.data]);

    // Simular infinite query con paginación del cliente
    const infiniteData = useMemo(() => {
        const pages: { results: PokemonListItem[] }[] = [];
        for (let i = 0; i < allPokemon.length; i += pageSize) {
            pages.push({
                results: allPokemon.slice(i, i + pageSize)
            });
        }
        return { pages, pageParams: pages.map((_, i) => i) };
    }, [allPokemon, pageSize]);

    return {
        data: infiniteData,
        isLoading: typeQuery.isLoading,
        error: typeQuery.error,
        isFetchingNextPage: false,
        hasNextPage: false,
        fetchNextPage: () => Promise.resolve({ data: undefined, pageParam: 0 }),
    };
}

