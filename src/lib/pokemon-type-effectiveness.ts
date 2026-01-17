import type { PokeTypeVariant } from "@/types/pokemon";

/**
 * Matriz de efectividad de tipos en Pokémon
 * Clave: tipo atacante -> Valor: tipos que reciben daño multiplicado
 */
export const TYPE_EFFECTIVENESS: Record<
    PokeTypeVariant,
    {
        weakTo: PokeTypeVariant[]; // Tipos que causan daño x2
        resistantTo: PokeTypeVariant[]; // Tipos que causan daño x0.5
        immuneTo: PokeTypeVariant[]; // Tipos que causan daño x0
    }
> = {
    normal: {
        weakTo: ["fighting"],
        resistantTo: [],
        immuneTo: ["ghost"],
    },
    fire: {
        weakTo: ["water", "ground", "rock"],
        resistantTo: ["fire", "grass", "ice", "bug", "steel", "fairy"],
        immuneTo: [],
    },
    water: {
        weakTo: ["electric", "grass"],
        resistantTo: ["fire", "water", "ice", "steel"],
        immuneTo: [],
    },
    electric: {
        weakTo: ["ground"],
        resistantTo: ["electric", "flying", "steel"],
        immuneTo: [],
    },
    grass: {
        weakTo: ["fire", "ice", "poison", "flying", "bug"],
        resistantTo: ["water", "electric", "grass", "ground"],
        immuneTo: [],
    },
    ice: {
        weakTo: ["fire", "fighting", "rock", "steel"],
        resistantTo: ["ice"],
        immuneTo: [],
    },
    fighting: {
        weakTo: ["flying", "psychic", "fairy"],
        resistantTo: ["bug", "rock", "dark"],
        immuneTo: [],
    },
    poison: {
        weakTo: ["ground", "psychic"],
        resistantTo: ["grass", "fighting", "poison", "bug", "fairy"],
        immuneTo: [],
    },
    ground: {
        weakTo: ["water", "grass", "ice"],
        resistantTo: ["poison", "rock"],
        immuneTo: ["electric"],
    },
    flying: {
        weakTo: ["electric", "ice", "rock"],
        resistantTo: ["grass", "fighting", "bug"],
        immuneTo: ["ground"],
    },
    psychic: {
        weakTo: ["bug", "ghost", "dark"],
        resistantTo: ["fighting", "psychic"],
        immuneTo: [],
    },
    bug: {
        weakTo: ["fire", "flying", "rock"],
        resistantTo: ["grass", "fighting", "ground"],
        immuneTo: [],
    },
    rock: {
        weakTo: ["water", "grass", "fighting", "ground", "steel"],
        resistantTo: ["normal", "fire", "poison", "flying"],
        immuneTo: [],
    },
    ghost: {
        weakTo: ["ghost", "dark"],
        resistantTo: ["poison", "bug"],
        immuneTo: ["normal", "fighting"],
    },
    dragon: {
        weakTo: ["ice", "dragon", "fairy"],
        resistantTo: ["fire", "water", "electric", "grass"],
        immuneTo: [],
    },
    dark: {
        weakTo: ["fighting", "bug", "fairy"],
        resistantTo: ["ghost", "dark"],
        immuneTo: ["psychic"],
    },
    steel: {
        weakTo: ["fire", "fighting", "ground"],
        resistantTo: [
            "normal",
            "grass",
            "ice",
            "flying",
            "psychic",
            "bug",
            "rock",
            "dragon",
            "steel",
            "fairy",
        ],
        immuneTo: ["poison"],
    },
    fairy: {
        weakTo: ["poison", "steel"],
        resistantTo: ["fighting", "bug", "dark"],
        immuneTo: ["dragon"],
    },
};

/**
 * Calcula las debilidades de un Pokémon basándose en sus tipos
 * @param types - Array de tipos del Pokémon
 * @returns Array de tipos a los que es débil (recibe daño x2 o más)
 */
export function calculateWeaknesses(
    types: PokeTypeVariant[]
): PokeTypeVariant[] {
    const effectiveness: Record<PokeTypeVariant, number> = {} as Record<
        PokeTypeVariant,
        number
    >;

    // Inicializar todos los tipos con multiplicador 1
    const allTypes: PokeTypeVariant[] = [
        "normal",
        "fire",
        "water",
        "electric",
        "grass",
        "ice",
        "fighting",
        "poison",
        "ground",
        "flying",
        "psychic",
        "bug",
        "rock",
        "ghost",
        "dragon",
        "dark",
        "steel",
        "fairy",
    ];

    allTypes.forEach((type) => {
        effectiveness[type] = 1;
    });

    // Calcular efectividad para cada tipo del Pokémon
    types.forEach((pokemonType) => {
        const typeData = TYPE_EFFECTIVENESS[pokemonType];

        // Aplicar debilidades (x2)
        typeData.weakTo.forEach((type) => {
            effectiveness[type] *= 2;
        });

        // Aplicar resistencias (x0.5)
        typeData.resistantTo.forEach((type) => {
            effectiveness[type] *= 0.5;
        });

        // Aplicar inmunidades (x0)
        typeData.immuneTo.forEach((type) => {
            effectiveness[type] = 0;
        });
    });

    // Retornar solo los tipos con multiplicador >= 2 (débil)
    return allTypes.filter((type) => effectiveness[type] >= 2);
}

/**
 * Calcula las resistencias de un Pokémon basándose en sus tipos
 * @param types - Array de tipos del Pokémon
 * @returns Array de tipos a los que es resistente (recibe daño x0.5 o menos)
 */
export function calculateResistances(
    types: PokeTypeVariant[]
): PokeTypeVariant[] {
    const effectiveness: Record<PokeTypeVariant, number> = {} as Record<
        PokeTypeVariant,
        number
    >;

    const allTypes: PokeTypeVariant[] = [
        "normal",
        "fire",
        "water",
        "electric",
        "grass",
        "ice",
        "fighting",
        "poison",
        "ground",
        "flying",
        "psychic",
        "bug",
        "rock",
        "ghost",
        "dragon",
        "dark",
        "steel",
        "fairy",
    ];

    allTypes.forEach((type) => {
        effectiveness[type] = 1;
    });

    types.forEach((pokemonType) => {
        const typeData = TYPE_EFFECTIVENESS[pokemonType];

        typeData.weakTo.forEach((type) => {
            effectiveness[type] *= 2;
        });

        typeData.resistantTo.forEach((type) => {
            effectiveness[type] *= 0.5;
        });

        typeData.immuneTo.forEach((type) => {
            effectiveness[type] = 0;
        });
    });

    // Retornar tipos con multiplicador <= 0.5 (resistente o inmune)
    return allTypes.filter(
        (type) => effectiveness[type] > 0 && effectiveness[type] <= 0.5
    );
}
