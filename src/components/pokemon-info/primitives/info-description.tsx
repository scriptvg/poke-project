import { cn } from "@/lib/utils";

interface InfoDescriptionProps {
    description: string;
    className?: string;
}

/**
 * Componente primitivo para la descripción del Pokemon
 */
export function InfoDescription({ description, className }: InfoDescriptionProps) {
    return (
        <div className={cn("", className)}>
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Descripción</h3>
            <p className="text-sm leading-relaxed">{description}</p>
        </div>
    );
}
