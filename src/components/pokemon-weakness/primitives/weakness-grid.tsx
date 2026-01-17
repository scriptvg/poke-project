import { cn } from "@/lib/utils";
import type { PokeTypeVariant } from "@/types/pokemon";
import { WeaknessBadge } from "./weakness-badge";

interface WeaknessGridProps {
    weaknesses: PokeTypeVariant[];
    className?: string;
}

/**
 * Componente primitivo para mostrar las debilidades en un grid
 */
export function WeaknessGrid({ weaknesses, className }: WeaknessGridProps) {
    return (
        <div className={cn("flex flex-wrap gap-2", className)}>
            {weaknesses.map((type) => (
                <WeaknessBadge key={type} type={type} />
            ))}
        </div>
    );
}
