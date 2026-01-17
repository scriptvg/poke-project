import { PokemonTypeBadge } from "@/components/pokemon-type";
import type { PokeTypeVariant } from "@/types/pokemon";
import { cn } from "@/lib/utils";

interface WeaknessBadgeProps {
    type: PokeTypeVariant;
    className?: string;
}

/**
 * Componente primitivo para mostrar un badge de debilidad
 */
export function WeaknessBadge({ type, className }: WeaknessBadgeProps) {
    return (
        <PokemonTypeBadge
            className={cn("text-sm", className)}
            type={{
                slot: 0,
                type: {
                    name: type,
                    url: "",
                },
            }}
        />
    );
}
