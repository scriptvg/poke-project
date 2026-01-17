import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Pokemon, PokemonSpecies } from "@/types/pokemon";
import { formatHeight, formatWeight, getSpanishDescription } from "@/lib/pokemon-info-utils";
import { InfoDescription } from "./primitives/info-description";
import { InfoPhysicalStats } from "./primitives/info-physical-stats";
import { InfoField } from "./primitives/info-field";

interface PokemonInfoCardProps {
    pokemon: Pokemon;
    species?: PokemonSpecies;
}

/**
 * Componente compuesto para mostrar información general del Pokemon
 */
export function PokemonInfoCard({ pokemon, species }: PokemonInfoCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Información General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Descripción */}
                <InfoDescription description={getSpanishDescription(species)} />

                {/* Datos físicos */}
                <InfoPhysicalStats
                    height={formatHeight(pokemon.height)}
                    weight={formatWeight(pokemon.weight)}
                />

                {/* Experiencia base */}
                <InfoField 
                    label="Experiencia Base" 
                    value={`${pokemon.base_experience} XP`} 
                />
            </CardContent>
        </Card>
    );
}
