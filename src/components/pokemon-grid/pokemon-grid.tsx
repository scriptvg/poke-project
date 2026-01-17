import { useRef, useEffect } from "react"
import type { PokemonListItem } from "@/types/pokemon"
import { Grid, GridItem } from "@/components/ui/grid"
import { PokemonGridItem } from "./primitives/grid-item"
import { PokemonGridSkeleton } from "./primitives/grid-skeleton"
import { PokemonGridEmpty } from "./primitives/grid-empty"

interface PokemonGridProps {
    pokemon: PokemonListItem[]
    isLoading: boolean
    isFetchingNextPage: boolean
    hasNextPage: boolean
    fetchNextPage: () => void
    searchTerm?: string
    selectedType?: string | null
}

/**
 * Main Pokemon grid with infinite scroll functionality
 */
export function PokemonGrid({
    pokemon,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    searchTerm,
    selectedType,
}: PokemonGridProps) {
    const loadMoreRef = useRef<HTMLDivElement>(null)

    // Intersection Observer for infinite scroll
    useEffect(() => {
        if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage()
                }
            },
            { threshold: 0.1 }
        )

        observer.observe(loadMoreRef.current)

        return () => observer.disconnect()
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    const hasFilters = !!(searchTerm || selectedType)

    return (
        <Grid
            cols={1}
            gap={4}
            mdCol={4}
            className="my-6 items-center px-6 md:grid-cols-4"
        >
            {/* Initial loading state */}
            {isLoading && pokemon.length === 0 ? (
                Array.from({ length: 20 }).map((_, i) => (
                    <GridItem key={`initial-skeleton-${i}`}>
                        <PokemonGridSkeleton />
                    </GridItem>
                ))
            ) : pokemon.length > 0 ? (
                <>
                    {/* Render Pokemon cards */}
                    {pokemon.map((p) => (
                        <GridItem key={p.name}>
                            <PokemonGridItem pokemonItem={p} />
                        </GridItem>
                    ))}

                    {/* Skeletons for infinite scroll fetching */}
                    {isFetchingNextPage &&
                        Array.from({ length: 8 }).map((_, i) => (
                            <GridItem key={`fetching-skeleton-${i}`}>
                                <PokemonGridSkeleton />
                            </GridItem>
                        ))}

                    {/* Sentinel for Intersection Observer */}
                    {hasNextPage && (
                        <div ref={loadMoreRef} className="col-span-full h-1" />
                    )}
                </>
            ) : (
                <GridItem span="full">
                    <PokemonGridEmpty hasFilters={hasFilters} />
                </GridItem>
            )}
        </Grid>
    )
}
