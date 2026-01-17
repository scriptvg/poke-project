import { cn } from "@/lib/utils";
import { InfoField } from "./info-field";

interface InfoPhysicalStatsProps {
    height: string;
    weight: string;
    className?: string;
}

/**
 * Componente primitivo para mostrar altura y peso en grid
 */
export function InfoPhysicalStats({ height, weight, className }: InfoPhysicalStatsProps) {
    return (
        <div className={cn("grid grid-cols-2 gap-4", className)}>
            <InfoField label="Altura" value={height} />
            <InfoField label="Peso" value={weight} />
        </div>
    );
}
