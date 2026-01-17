import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Pokemon, PokeTypeVariant } from "@/types/pokemon";
import { calculateWeaknesses } from "@/lib/pokemon-type-effectiveness";
import { WeaknessGrid } from "./primitives/weakness-grid";

interface PokemonWeaknessCardProps {
    pokemon: Pokemon;
}

/**
 * Componente compuesto para mostrar las debilidades del Pokemon
 */
export function PokemonWeaknessCard({ pokemon }: PokemonWeaknessCardProps) {
    // Extraer los tipos del Pokémon
    const pokemonTypes = pokemon.types.map((t) => t.type.name as PokeTypeVariant);

    // Calcular debilidades basadas en los tipos
    const weaknesses = calculateWeaknesses(pokemonTypes);

    if (weaknesses.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Debilidades</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Este Pokémon no tiene debilidades significativas.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Debilidades</CardTitle>
            </CardHeader>
            <CardContent>
                <WeaknessGrid weaknesses={weaknesses} />
            </CardContent>
        </Card>
    );
}
