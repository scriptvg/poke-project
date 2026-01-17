import { cn } from "@/lib/utils";

interface InfoFieldProps {
    label: string;
    value: string | number;
    className?: string;
}

/**
 * Componente primitivo para un campo de información
 */
export function InfoField({ label, value, className }: InfoFieldProps) {
    return (
        <div className={cn("", className)}>
            <h3 className="mb-1 text-sm font-semibold text-muted-foreground">{label}</h3>
            <p className="text-lg font-bold">{value}</p>
        </div>
    );
}
