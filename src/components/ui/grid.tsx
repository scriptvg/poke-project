import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot";
import type { ReactNode } from "react";

function Grid({
    className,
    cols = 1,
    gap = 4,
    mdCol = 1,
    asChild = false,
    children,
    ...props
}: {
    className?: string;
    cols?: number;
    gap?: number;
    mdCol: number | string;
    asChild?: boolean;
    children?: ReactNode;
}) {
    const Component = asChild ? Slot : "div";

    return (
        <Component
            data-slot="grid"
            className={cn(
                "grid items-center",
                `grid-cols-${cols}`,
                `gap-${gap}`,
                `md:grid-cols-${mdCol}`,
                className
            )}
            {...props}
        >
            {children}
        </Component>
    )
}
function GridItem({
    className,
    span = 1,
    asChild = false,
    children,
    ...props
}: {
    className?: string;
    span?: number | string;
    asChild?: boolean;
    children?: ReactNode;
}) {
    const Component = asChild ? Slot : "div";

    return (
        <Component
            data-slot="grid-item"
            className={cn(`col-span-${span}`, className)}
            {...props}
        >
            {children}
        </Component>
    )
}

export { Grid, GridItem }
