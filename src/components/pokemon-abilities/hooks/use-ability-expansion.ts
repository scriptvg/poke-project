import { useState, useCallback } from "react";

/**
 * Hook para gestionar el estado de expansión de habilidades
 */
export function useAbilityExpansion() {
    const [expandedAbility, setExpandedAbility] = useState<string | null>(null);

    const toggleAbility = useCallback((abilityName: string) => {
        setExpandedAbility((prev) => (prev === abilityName ? null : abilityName));
    }, []);

    const isExpanded = useCallback(
        (abilityName: string) => expandedAbility === abilityName,
        [expandedAbility]
    );

    return {
        expandedAbility,
        toggleAbility,
        isExpanded,
    };
}
