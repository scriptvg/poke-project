import { createContext, useContext, type ReactNode } from "react";
import { useEvolutionChain } from "./hooks/use-evolution-chain";
import type { PokemonSpecies, ChainLink } from "@/types/pokemon";

interface EvolutionChainContextValue {
    chain: ChainLink | null;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    hasEvolutions: boolean;
}

const EvolutionChainContext = createContext<EvolutionChainContextValue | null>(null);

function useEvolutionChainContext() {
    const context = useContext(EvolutionChainContext);
    if (!context) {
        throw new Error("Evolution chain components must be used within EvolutionChain");
    }
    return context;
}

interface EvolutionChainProps {
    species: PokemonSpecies | undefined;
    children: ReactNode;
}

/**
 * Componente headless principal para la cadena de evolución
 * Proporciona contexto y estado a sus componentes hijos
 */
function EvolutionChainRoot({ species, children }: EvolutionChainProps) {
    const evolutionState = useEvolutionChain(species);

    return (
        <EvolutionChainContext.Provider value={evolutionState}>
            {children}
        </EvolutionChainContext.Provider>
    );
}

interface EvolutionChainLoadingProps {
    children: ReactNode;
}

/**
 * Renderiza children cuando está cargando
 */
function EvolutionChainLoading({ children }: EvolutionChainLoadingProps) {
    const { isLoading } = useEvolutionChainContext();
    return isLoading ? <>{children}</> : null;
}

interface EvolutionChainErrorProps {
    children: ReactNode;
}

/**
 * Renderiza children cuando hay un error
 */
function EvolutionChainError({ children }: EvolutionChainErrorProps) {
    const { isError } = useEvolutionChainContext();
    return isError ? <>{children}</> : null;
}

interface EvolutionChainContentProps {
    children: (chain: ChainLink) => ReactNode;
}

/**
 * Renderiza children con los datos de la cadena cuando está disponible
 */
function EvolutionChainContent({ children }: EvolutionChainContentProps) {
    const { chain, isLoading, isError, hasEvolutions } = useEvolutionChainContext();

    if (isLoading || isError || !chain || !hasEvolutions) {
        return null;
    }

    return <>{children(chain)}</>;
}

interface EvolutionChainEmptyProps {
    children: ReactNode;
}

/**
 * Renderiza children cuando no hay evoluciones
 */
function EvolutionChainEmpty({ children }: EvolutionChainEmptyProps) {
    const { hasEvolutions, isLoading, isError } = useEvolutionChainContext();
    return !isLoading && !isError && !hasEvolutions ? <>{children}</> : null;
}

/**
 * API composable para la cadena de evolución
 * 
 * @example
 * ```tsx
 * <EvolutionChain species={species}>
 *   <EvolutionChain.Loading>
 *     <EvolutionStageSkeleton />
 *   </EvolutionChain.Loading>
 *   
 *   <EvolutionChain.Error>
 *     <p>Error loading evolution chain</p>
 *   </EvolutionChain.Error>
 *   
 *   <EvolutionChain.Content>
 *     {(chain) => <div>{chain.species.name}</div>}
 *   </EvolutionChain.Content>
 *   
 *   <EvolutionChain.Empty>
 *     <p>This Pokemon has no evolutions</p>
 *   </EvolutionChain.Empty>
 * </EvolutionChain>
 * ```
 */
export const EvolutionChain = Object.assign(EvolutionChainRoot, {
    Loading: EvolutionChainLoading,
    Error: EvolutionChainError,
    Content: EvolutionChainContent,
    Empty: EvolutionChainEmpty,
});
