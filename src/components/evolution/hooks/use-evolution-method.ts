import { useMemo } from "react";
import type { EvolutionDetail } from "@/types/pokemon";
import { formatEvolutionMethod } from "@/lib/evolution-utils";

/**
 * Hook para obtener el método de evolución formateado
 * @param evolutionDetails - Detalles de la evolución
 * @returns Método de evolución formateado o null
 */
export function useEvolutionMethod(evolutionDetails: EvolutionDetail[] | undefined) {
    return useMemo(() => {
        if (!evolutionDetails || evolutionDetails.length === 0) return null;
        return formatEvolutionMethod(evolutionDetails[0]);
    }, [evolutionDetails]);
}
