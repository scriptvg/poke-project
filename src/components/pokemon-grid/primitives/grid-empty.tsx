import { Info } from "lucide-react"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

interface PokemonGridEmptyProps {
    hasFilters: boolean
}

/**
 * Displayed when no Pokemon are found
 */
export function PokemonGridEmpty({ hasFilters }: PokemonGridEmptyProps) {
    return (
        <Empty className="border rounded py-16 text-center text-muted-foreground w-full">
            <EmptyMedia>
                <Info className="mx-auto h-12 w-12 opacity-50" />
            </EmptyMedia>
            <EmptyHeader>
                <EmptyTitle>
                    {hasFilters
                        ? "No se encontraron Pokémon con esos criterios de búsqueda"
                        : "No hay Pokémon disponibles"}
                </EmptyTitle>
                <EmptyDescription>
                    {hasFilters
                        ? "Intenta con otros términos de búsqueda o filtros"
                        : ""}
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}
