import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Pokemon } from "@/types/pokemon";
import { useAbilityDetail } from "@/hooks/use-ability-detail";
import { formatAbilityName, getSpanishDescription } from "@/lib/pokemon-abilities-utils";
import { useAbilityExpansion } from "./hooks/use-ability-expansion";
import { AbilityItem } from "./primitives/ability-item";

interface PokemonAbilitiesCardProps {
    pokemon: Pokemon;
}

/**
 * Componente compuesto para mostrar las habilidades del Pokemon
 */
export function PokemonAbilitiesCard({ pokemon }: PokemonAbilitiesCardProps) {
    const { expandedAbility, toggleAbility, isExpanded } = useAbilityExpansion();

    // Obtener detalles de la habilidad expandida
    const { data: abilityDetail, isLoading } = useAbilityDetail(
        expandedAbility,
        !!expandedAbility
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Habilidades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {pokemon.abilities.map((ability) => (
                    <AbilityItem
                        key={ability.ability.name}
                        name={formatAbilityName(ability.ability.name)}
                        isHidden={ability.is_hidden}
                        isExpanded={isExpanded(ability.ability.name)}
                        description={getSpanishDescription(abilityDetail)}
                        isLoading={isLoading && isExpanded(ability.ability.name)}
                        onToggle={() => toggleAbility(ability.ability.name)}
                    />
                ))}
            </CardContent>
        </Card>
    );
}
