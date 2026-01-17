import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface EvolutionMethodBadgeProps {
    method: string;
    variant?: "default" | "secondary" | "outline" | "destructive";
    showIcon?: boolean;
    className?: string;
}

/**
 * Componente primitivo para mostrar el método de evolución
 */
export function EvolutionMethodBadge({
    method,
    variant = "secondary",
    showIcon = true,
    className,
}: EvolutionMethodBadgeProps) {
    return (
        <Badge variant={variant} className={cn("capitalize text-xs", className)}>
            {showIcon && <Sparkles className="w-3 h-3 mr-1" />}
            {method}
        </Badge>
    );
}
