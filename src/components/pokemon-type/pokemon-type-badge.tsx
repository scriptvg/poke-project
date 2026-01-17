import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PokemonType, PokeTypeVariant } from "@/types/pokemon";
import { pokeTypeVariants } from "@/lib/pokemon-type-utils";

interface PokemonTypeBadgeProps {
    type: PokemonType;
    className?: string;
}

/**
 * Componente para mostrar un badge de tipo de Pokemon
 */
export function PokemonTypeBadge({ type, className }: PokemonTypeBadgeProps) {
    return (
        <Badge
            variant="outline"
            className={cn(
                pokeTypeVariants({
                    variant: type.type.name as PokeTypeVariant,
                }),
                className
            )}
        >
            {type.type.name}
        </Badge>
    );
}
