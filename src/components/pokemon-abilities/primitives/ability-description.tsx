import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface AbilityDescriptionProps {
    description: string;
    isLoading?: boolean;
    className?: string;
}

/**
 * Componente primitivo para la descripción de una habilidad
 */
export function AbilityDescription({
    description,
    isLoading = false,
    className,
}: AbilityDescriptionProps) {
    if (isLoading) {
        return (
            <div className={cn("rounded-md bg-muted p-3 space-y-2", className)}>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        );
    }

    return (
        <div className={cn("rounded-md bg-muted p-3 text-sm", className)}>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
    );
}
