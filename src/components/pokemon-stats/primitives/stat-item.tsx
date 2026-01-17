import { cn } from "@/lib/utils";
import { StatLabel } from "./stat-label";
import { StatBar } from "./stat-bar";

interface StatItemProps {
    name: string;
    value: number;
    max?: number;
    className?: string;
}

/**
 * Componente primitivo que combina etiqueta y barra de progreso
 */
export function StatItem({ name, value, max, className }: StatItemProps) {
    return (
        <div className={cn("space-y-2", className)}>
            <StatLabel name={name} value={value} />
            <StatBar value={value} max={max} />
        </div>
    );
}
