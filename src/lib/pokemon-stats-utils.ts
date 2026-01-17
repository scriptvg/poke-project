/**
 * Obtiene la variante de color basada en el valor de la estadística
 */
export function getStatVariant(value: number): "success" | "default" | "warning" | "error" {
    if (value >= 100) return "success";
    if (value >= 70) return "default";
    if (value >= 50) return "warning";
    return "error";
}

/**
 * Nombres de estadísticas en español
 */
export const STAT_NAMES: Record<string, string> = {
    hp: "HP",
    attack: "Ataque",
    defense: "Defensa",
    "special-attack": "At. Especial",
    "special-defense": "Def. Especial",
    speed: "Velocidad",
};

/**
 * Formatea el nombre de una estadística a español
 */
export function formatStatName(name: string): string {
    return STAT_NAMES[name] ?? name;
}

/**
 * Calcula el porcentaje de una estadística
 */
export function calculateStatPercentage(value: number, max: number = 255): number {
    return (value / max) * 100;
}

/**
 * Valor máximo de estadísticas en Pokemon
 */
export const MAX_STAT_VALUE = 255;
