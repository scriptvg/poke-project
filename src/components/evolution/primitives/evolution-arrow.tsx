import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface EvolutionArrowProps {
    className?: string;
    size?: number;
}

/**
 * Componente primitivo para la flecha de evolución
 */
export function EvolutionArrow({ className, size = 20 }: EvolutionArrowProps) {
    return (
        <ArrowRight
            className={cn("text-muted-foreground", className)}
            style={{ width: size, height: size }}
        />
    );
}
