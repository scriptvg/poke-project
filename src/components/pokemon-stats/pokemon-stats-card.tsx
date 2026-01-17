import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Pokemon } from "@/types/pokemon";
import { formatStatName } from "@/lib/pokemon-stats-utils";
import { StatItem } from "./primitives/stat-item";

interface PokemonStatsCardProps {
    pokemon: Pokemon;
}

/**
 * Componente compuesto para mostrar las estadísticas base de un Pokemon
 */
export function PokemonStatsCard({ pokemon }: PokemonStatsCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Estadísticas Base</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                {pokemon.stats.map((stat) => (
                    <StatItem
                        key={stat.stat.name}
                        name={formatStatName(stat.stat.name)}
                        value={stat.base_stat}
                    />
                ))}
            </CardContent>
        </Card>
    );
}
