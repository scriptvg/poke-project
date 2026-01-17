import type { AbilityDetail } from "@/types/ability";

/**
 * Formatea el nombre de una habilidad
 */
export function formatAbilityName(name: string): string {
    return name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

/**
 * Obtiene la descripción en español de una habilidad
 */
export function getSpanishDescription(abilityDetail: AbilityDetail | undefined): string {
    if (!abilityDetail) return "";

    // Buscar el efecto en español
    const spanishEffect = abilityDetail.effect_entries?.find(
        (entry) => entry.language.name === "es"
    );

    if (spanishEffect) {
        return spanishEffect.short_effect || spanishEffect.effect;
    }

    // Si no hay en español, buscar en inglés
    const englishEffect = abilityDetail.effect_entries?.find(
        (entry) => entry.language.name === "en"
    );

    return (
        englishEffect?.short_effect ||
        englishEffect?.effect ||
        "No hay descripción disponible."
    );
}
