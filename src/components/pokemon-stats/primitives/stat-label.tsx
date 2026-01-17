import { cn } from "@/lib/utils";

interface StatLabelProps {
    name: string;
    value: number;
    className?: string;
}

/**
 * Componente primitivo para la etiqueta de una estadística
 */
export function StatLabel({ name, value, className }: StatLabelProps) {
    return (
        <div className={cn("flex items-center justify-between", className)}>
            <span className="text-sm font-medium">{name}</span>
            <span className="text-sm font-bold">{value}</span>
        </div>
    );
}
