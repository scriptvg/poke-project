import type { PokemonSpecies } from "@/types/pokemon";

/**
 * Formatea la altura de decímetros a metros
 */
export function formatHeight(height: number): string {
    return `${(height / 10).toFixed(1)} m`;
}

/**
 * Formatea el peso de hectogramos a kilogramos
 */
export function formatWeight(weight: number): string {
    return `${(weight / 10).toFixed(1)} kg`;
}

/**
 * Obtiene la descripción en español de un Pokemon
 */
export function getSpanishDescription(species?: PokemonSpecies): string {
    if (!species) return "Cargando descripción...";

    // Buscar la descripción en español
    const spanishEntry = species.flavor_text_entries.find(
        (entry) => entry.language.name === "es"
    );

    if (spanishEntry) {
        // Limpiar caracteres especiales y saltos de línea
        return spanishEntry.flavor_text.replace(/\f/g, " ").replace(/\n/g, " ");
    }

    // Si no hay descripción en español, usar inglés
    const englishEntry = species.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
    );

    return (
        englishEntry?.flavor_text.replace(/\f/g, " ").replace(/\n/g, " ") ||
        "No hay descripción disponible."
    );
}
