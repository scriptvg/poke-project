import { usePokemon } from "@/hooks/use-pokemon"
import type { PokemonListItem } from "@/types/pokemon"
import { PokemonCard } from "@/components/pokemon-card"
import { PokemonGridSkeleton } from "./grid-skeleton"

interface PokemonGridItemProps {
    pokemonItem: PokemonListItem
}

/**
 * Handles individual Pokemon data fetching and card rendering
 */
export function PokemonGridItem({ pokemonItem }: PokemonGridItemProps) {
    const { data: pokemon, isLoading } = usePokemon(pokemonItem.name)

    if (isLoading) {
        return <PokemonGridSkeleton />
    }

    if (!pokemon) {
        return null
    }

    return <PokemonCard pokemon={pokemon} />
}
