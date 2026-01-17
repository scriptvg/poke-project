import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface EvolutionStageSkeletonProps {
    className?: string;
}

/**
 * Componente primitivo para el skeleton de carga de una etapa de evolución
 */
export function EvolutionStageSkeleton({ className }: EvolutionStageSkeletonProps) {
    return (
        <div className={cn("flex flex-col items-center gap-2", className)}>
            <Skeleton className="w-32 h-32 rounded-lg" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
        </div>
    );
}
