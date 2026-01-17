import { useMemo } from "react"
import { useQueryClient } from "@tanstack/react-query"
import type { PokemonListItem, Pokemon } from "@/types/pokemon"

type UsePokemonFiltersProps = {
    pokemon: PokemonListItem[]
    selectedType: string | null
    searchTerm: string
}

/**
 * Hook personalizado para manejar el filtrado de Pokémon
 */
export function usePokemonFilters({
    pokemon,
    selectedType,
    searchTerm,
}: UsePokemonFiltersProps) {
    const queryClient = useQueryClient()

    // Extraer todos los tipos únicos de los Pokémon cargados desde el caché
    const uniqueTypes = useMemo(() => {
        const types = new Set<string>()

        pokemon.forEach((p) => {
            // Leer del caché sin triggear un fetch
            const cachedData = queryClient.getQueryData<Pokemon>(["pokemon", "detail", p.name])
            cachedData?.types.forEach((t) => types.add(t.type.name))
        })

        return Array.from(types).sort()
    }, [pokemon, queryClient])

    // Filtrar Pokémon por tipo y búsqueda
    const filteredPokemon = useMemo(() => {
        let filtered = pokemon

        // Filtrar por tipo
        if (selectedType) {
            filtered = filtered.filter((p) => {
                // Leer del caché sin triggear un fetch
                const cachedData = queryClient.getQueryData<Pokemon>(["pokemon", "detail", p.name])
                return cachedData?.types.some((t) => t.type.name === selectedType)
            })
        }

        // Filtrar por búsqueda (nombre)
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase().trim()
            filtered = filtered.filter((p) => {
                return p.name.toLowerCase().includes(searchLower)
            })
        }

        return filtered
    }, [pokemon, queryClient, selectedType, searchTerm])

    return {
        uniqueTypes,
        filteredPokemon,
    }
}
