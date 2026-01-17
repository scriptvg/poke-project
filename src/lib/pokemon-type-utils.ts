import { cva } from "class-variance-authority";
import type { PokeTypeVariant } from "@/types/pokemon";

/**
 * Variantes de colores para los tipos de Pokemon
 */
export const pokeTypeVariants = cva("backdrop-blur-sm shadow-lg", {
    variants: {
        variant: {
            normal: "bg-slate-500/40 border-slate-500",
            fire: "bg-red-500/40 border-red-500",
            water: "bg-blue-500/40 border-blue-500",
            electric: "bg-yellow-500/40 border-yellow-500",
            grass: "bg-green-500/40 border-green-500",
            ice: "bg-cyan-500/40 border-cyan-500",
            fighting: "bg-orange-500/40 border-orange-500",
            poison: "bg-purple-500/40 border-purple-500",
            ground: "bg-amber-500/40 border-amber-500",
            flying: "bg-sky-500/40 border-sky-500",
            psychic: "bg-pink-500/40 border-pink-500",
            bug: "bg-lime-500/40 border-lime-500",
            rock: "bg-stone-500/40 border-stone-500",
            ghost: "bg-indigo-500/40 border-indigo-500",
            dragon: "bg-violet-500/40 border-violet-500",
            dark: "bg-neutral-500/40 border-neutral-500",
            steel: "bg-zinc-500/40 border-zinc-500",
            fairy: "bg-fuchsia-500/40 border-fuchsia-500",
        },
    },
});

/**
 * Mapa de colores para tipos de Pokemon
 */
export const TYPE_COLORS: Record<PokeTypeVariant, string> = {
    normal: "slate",
    fire: "red",
    water: "blue",
    electric: "yellow",
    grass: "green",
    ice: "cyan",
    fighting: "orange",
    poison: "purple",
    ground: "amber",
    flying: "sky",
    psychic: "pink",
    bug: "lime",
    rock: "stone",
    ghost: "indigo",
    dragon: "violet",
    dark: "neutral",
    steel: "zinc",
    fairy: "fuchsia",
};

/**
 * Obtiene el color de un tipo de Pokemon
 */
export function getTypeColor(type: PokeTypeVariant): string {
    return TYPE_COLORS[type] || "slate";
}
