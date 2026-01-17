/**
 * Rangos de IDs para cada generación de Pokémon
 */
export const POKEMON_GENERATIONS = {
    1: { name: "Generación I (Kanto)", range: [1, 151], region: "Kanto" },
    2: { name: "Generación II (Johto)", range: [152, 251], region: "Johto" },
    3: { name: "Generación III (Hoenn)", range: [252, 386], region: "Hoenn" },
    4: { name: "Generación IV (Sinnoh)", range: [387, 493], region: "Sinnoh" },
    5: { name: "Generación V (Unova)", range: [494, 649], region: "Unova" },
    6: { name: "Generación VI (Kalos)", range: [650, 721], region: "Kalos" },
    7: { name: "Generación VII (Alola)", range: [722, 809], region: "Alola" },
    8: { name: "Generación VIII (Galar)", range: [810, 905], region: "Galar" },
    9: { name: "Generación IX (Paldea)", range: [906, 1025], region: "Paldea" },
} as const;

export type PokemonGeneration = keyof typeof POKEMON_GENERATIONS;

/**
 * Determina a qué generación pertenece un Pokémon según su ID
 * @param id - ID del Pokémon
 * @returns Número de generación (1-9) o null si no se encuentra
 */
export function getPokemonGeneration(id: number): PokemonGeneration | null {
    for (const [gen, data] of Object.entries(POKEMON_GENERATIONS)) {
        const [min, max] = data.range;
        if (id >= min && id <= max) {
            return Number(gen) as PokemonGeneration;
        }
    }
    return null;
}

/**
 * Verifica si un Pokémon pertenece a una generación específica
 * @param id - ID del Pokémon
 * @param generation - Generación a verificar
 * @returns true si el Pokémon pertenece a la generación
 */
export function isPokemonInGeneration(
    id: number,
    generation: PokemonGeneration
): boolean {
    const [min, max] = POKEMON_GENERATIONS[generation].range;
    return id >= min && id <= max;
}

/**
 * Extrae el ID de un Pokémon desde su URL de la API
 * @param url - URL del Pokémon (ej: "https://pokeapi.co/api/v2/pokemon/25/")
 * @returns ID del Pokémon o null si no se puede extraer
 */
export function extractPokemonIdFromUrl(url: string): number | null {
    const match = url.match(/\/pokemon\/(\d+)\//);
    return match ? parseInt(match[1], 10) : null;
}
