import { useMemo } from "react";
import { usePokemonEvolution } from "@/hooks/use-pokemon-evolution";
import type { PokemonSpecies, ChainLink } from "@/types/pokemon";
import { hasEvolutions } from "@/lib/evolution-utils";

interface UseEvolutionChainReturn {
    chain: ChainLink | null;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    hasEvolutions: boolean;
}

/**
 * Hook headless para gestionar la cadena de evolución
 * @param species - Datos de la especie del Pokémon
 * @returns Estado y datos de la cadena de evolución
 */
export function useEvolutionChain(species: PokemonSpecies | undefined): UseEvolutionChainReturn {
    const { evolutionChain, isLoading, isError, error } = usePokemonEvolution(species);

    const chain = useMemo(() => {
        return evolutionChain?.chain ?? null;
    }, [evolutionChain]);

    const hasEvolutionsValue = useMemo(() => {
        if (!chain) return false;
        return hasEvolutions(chain);
    }, [chain]);

    return {
        chain,
        isLoading,
        isError,
        error: error as Error | null,
        hasEvolutions: hasEvolutionsValue,
    };
}
