import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { getStatVariant, calculateStatPercentage, MAX_STAT_VALUE } from "@/lib/pokemon-stats-utils";

const progressVariants = cva("", {
    variants: {
        variant: {
            default: "",
            success: "bg-green-500",
            warning: "bg-yellow-500",
            error: "bg-red-500",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

interface StatBarProps {
    value: number;
    max?: number;
    className?: string;
}

/**
 * Componente primitivo para la barra de progreso de una estadística
 */
export function StatBar({ value, max = MAX_STAT_VALUE, className }: StatBarProps) {
    const percentage = calculateStatPercentage(value, max);
    const variant = getStatVariant(value);

    return (
        <Progress
            value={percentage}
            max={max}
            className={cn("h-2", className)}
            indicatorClassName={cn(progressVariants({ variant }))}
        />
    );
}
