import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Skeleton for an individual Pokemon card in the grid
 */
export function PokemonGridSkeleton() {
    return (
        <Card className="p-4">
            <Skeleton className="mb-4 h-32 w-full" />
            <Skeleton className="mx-auto h-6 w-3/4" />
        </Card>
    )
}
