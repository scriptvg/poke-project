import { useQuery } from "@tanstack/react-query";
import { PokemonService } from "@/services/pokemon.service";
import type { AbilityDetail } from "@/types/ability";

/**
 * Hook para obtener el detalle de una habilidad
 * @param abilityName - Nombre de la habilidad
 * @param enabled - Si la query debe ejecutarse
 */
export function useAbilityDetail(abilityName: string | null, enabled = true) {
    return useQuery<AbilityDetail>({
        queryKey: ["ability", abilityName],
        queryFn: () => {
            if (!abilityName) throw new Error("Ability name is required");
            return PokemonService.getAbilityDetail(abilityName);
        },
        enabled: enabled && !!abilityName,
        staleTime: 1000 * 60 * 10, // 10 minutos - las habilidades no cambian
        gcTime: 1000 * 60 * 60, // 1 hora
    });
}
