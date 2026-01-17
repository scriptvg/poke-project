import type { ChainLink, EvolutionDetail } from "@/types/pokemon";

/**
 * Formatea el método de evolución en un string legible
 * @param detail - Detalle de la evolución
 * @returns String formateado con el método de evolución
 */
export function formatEvolutionMethod(detail: EvolutionDetail): string {
    const methods: string[] = [];

    if (detail.min_level) {
        methods.push(`Nivel ${detail.min_level}`);
    }
    if (detail.item) {
        methods.push(detail.item.name.replace("-", " "));
    }
    if (detail.min_happiness) {
        methods.push(`Felicidad ${detail.min_happiness}`);
    }
    if (detail.trigger.name === "trade") {
        methods.push("Intercambio");
    }
    if (detail.known_move) {
        methods.push(detail.known_move.name.replace("-", " "));
    }
    if (detail.time_of_day) {
        methods.push(detail.time_of_day === "day" ? "Día" : "Noche");
    }

    return methods.length > 0 ? methods.join(", ") : "Evolución especial";
}

/**
 * Verifica si un Pokémon tiene evoluciones
 * @param chain - Cadena de evolución
 * @returns true si tiene evoluciones, false si no
 */
export function hasEvolutions(chain: ChainLink): boolean {
    return (
        chain.evolves_to.length > 0 ||
        chain.evolves_to.some((evo) => evo.evolves_to.length > 0)
    );
}

/**
 * Aplana la cadena de evolución en un array de links
 * @param chain - Cadena de evolución
 * @returns Array de ChainLinks
 */
export function flattenEvolutionChain(chain: ChainLink): ChainLink[] {
    const result: ChainLink[] = [chain];

    chain.evolves_to.forEach((evolution) => {
        result.push(...flattenEvolutionChain(evolution));
    });

    return result;
}

/**
 * Obtiene el método de evolución formateado desde un ChainLink
 * @param chainLink - Link de la cadena de evolución
 * @returns String con el método de evolución o null si no hay
 */
export function getEvolutionMethodFromChain(chainLink: ChainLink): string | null {
    if (chainLink.evolution_details.length === 0) return null;
    return formatEvolutionMethod(chainLink.evolution_details[0]);
}
