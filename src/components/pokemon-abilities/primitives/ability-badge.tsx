import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AbilityBadgeProps {
    name: string;
    isHidden: boolean;
    className?: string;
}

/**
 * Componente primitivo para el badge de una habilidad
 */
export function AbilityBadge({ name, isHidden, className }: AbilityBadgeProps) {
    return (
        <Badge
            variant={isHidden ? "destructive" : "secondary"}
            className={cn("text-sm", className)}
        >
            {name}
            {isHidden && " (Oculta)"}
        </Badge>
    );
}
