import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { AbilityBadge } from "./ability-badge";
import { AbilityDescription } from "./ability-description";

interface AbilityItemProps {
    name: string;
    isHidden: boolean;
    isExpanded: boolean;
    description?: string;
    isLoading?: boolean;
    onToggle: () => void;
    className?: string;
}

/**
 * Componente primitivo que combina badge, botón y descripción
 */
export function AbilityItem({
    name,
    isHidden,
    isExpanded,
    description,
    isLoading = false,
    onToggle,
    className,
}: AbilityItemProps) {
    return (
        <div className={cn("space-y-2", className)}>
            {/* Badge y botón de expansión */}
            <div className="flex items-center justify-between">
                <AbilityBadge name={name} isHidden={isHidden} />

                <Button
                    size="icon-xs"
                    variant="ghost"
                    onClick={onToggle}
                    className="rounded-full"
                >
                    {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                    ) : (
                        <ChevronDown className="h-4 w-4" />
                    )}
                </Button>
            </div>

            {/* Descripción expandible */}
            {isExpanded && (
                <AbilityDescription
                    description={description || ""}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
}
