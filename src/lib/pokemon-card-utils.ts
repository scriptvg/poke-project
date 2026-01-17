/**
 * Formatea el ID de un Pokemon con ceros a la izquierda
 */
export function formatPokemonId(id: number): string {
    if (id < 10) return `00${id}`;
    if (id < 100) return `0${id}`;
    return id.toString();
}
