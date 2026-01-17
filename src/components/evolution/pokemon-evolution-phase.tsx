import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import type { PokemonSpecies, ChainLink } from "@/types/pokemon";
import { getEvolutionMethodFromChain } from "@/lib/evolution-utils";
import { EvolutionChain } from "./evolution-chain";
import { EvolutionStageCard } from "./primitives/evolution-stage-card";
import { EvolutionMethodBadge } from "./primitives/evolution-method-badge";
import { EvolutionArrow } from "./primitives/evolution-arrow";
import { EvolutionStageSkeleton } from "./primitives/evolution-stage-skeleton";

interface PokemonEvolutionPhaseProps {
    species: PokemonSpecies | undefined;
}

interface EvolutionStageProps {
    chainLink: ChainLink;
    isFirst?: boolean;
}

/**
 * Componente que renderiza una etapa de evolución con su método
 */
function EvolutionStage({ chainLink, isFirst = false }: EvolutionStageProps) {
    const evolutionMethod = getEvolutionMethodFromChain(chainLink);

    return (
        <div className="flex flex-col items-center gap-2">
            {/* Método de evolución o badge de forma base */}
            {!isFirst && evolutionMethod && (
                <div className="flex items-center gap-2 mb-2">
                    <EvolutionArrow />
                    <EvolutionMethodBadge method={evolutionMethod} />
                </div>
            )}

            {isFirst && (
                <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                        Forma Base
                    </Badge>
                </div>
            )}

            {/* Tarjeta del Pokémon */}
            <EvolutionStageCard pokemonName={chainLink.species.name} isFirst={isFirst} />
        </div>
    );
}

/**
 * Componente recursivo que renderiza la cadena de evolución completa
 */
function EvolutionChainDisplay({ chainLink, isFirst = false }: EvolutionStageProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 flex-wrap justify-center">
                <EvolutionStage chainLink={chainLink} isFirst={isFirst} />

                {chainLink.evolves_to.length > 0 && (
                    <div className="flex gap-4 items-center flex-wrap justify-center">
                        {chainLink.evolves_to.map((evolution, index) => (
                            <EvolutionChainDisplay
                                key={`${evolution.species.name}-${index}`}
                                chainLink={evolution}
                                isFirst={false}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

/**
 * Componente principal que muestra la cadena de evolución de un Pokémon
 * Utiliza la arquitectura headless con componentes primitivos
 */
export function PokemonEvolutionPhase({ species }: PokemonEvolutionPhaseProps) {
    return (
        <EvolutionChain species={species}>
            {/* Estado de carga */}
            <EvolutionChain.Loading>
                <Card>
                    <CardHeader>
                        <CardTitle>Evoluciones</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4 justify-center items-center">
                            <EvolutionStageSkeleton />
                            <EvolutionArrow />
                            <EvolutionStageSkeleton />
                            <EvolutionArrow />
                            <EvolutionStageSkeleton />
                        </div>
                    </CardContent>
                </Card>
            </EvolutionChain.Loading>

            {/* Estado de error - no mostrar nada */}
            <EvolutionChain.Error>{null}</EvolutionChain.Error>

            {/* Sin evoluciones - no mostrar nada */}
            <EvolutionChain.Empty>{null}</EvolutionChain.Empty>

            {/* Contenido principal */}
            <EvolutionChain.Content>
                {(chain) => (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                Cadena de Evolución
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <EvolutionChainDisplay chainLink={chain} isFirst={true} />
                        </CardContent>
                    </Card>
                )}
            </EvolutionChain.Content>
        </EvolutionChain>
    );
}
