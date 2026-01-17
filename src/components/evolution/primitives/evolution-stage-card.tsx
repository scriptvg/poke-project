import { useQuery } from "@tanstack/react-query";
import { PokemonService } from "@/services/pokemon.service";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface EvolutionStageCardProps {
    pokemonName: string;
    isFirst?: boolean;
    className?: string;
}

/**
 * Componente primitivo para mostrar una etapa individual de evolución
 */
export function EvolutionStageCard({
    pokemonName,
    className,
}: EvolutionStageCardProps) {
    const { data: pokemon, isLoading } = useQuery({
        queryKey: ["pokemon", pokemonName],
        queryFn: () => PokemonService.getPokemonByNameOrId(pokemonName),
        staleTime: 1000 * 60 * 10,
    });

    if (isLoading) {
        return (
            <div className={cn("flex flex-col items-center gap-2", className)}>
                <Skeleton className="w-32 h-32 rounded-lg" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
            </div>
        );
    }

    if (!pokemon) return null;

    return (
        <Link
            to={`/pokemon/${pokemonName}`}
            className={cn(
                "group flex flex-col items-center gap-2 hover:scale-105 transition-transform",
                className
            )}
        >
            <div className="relative bg-secondary rounded-lg p-4 w-32 h-32 flex items-center justify-center group-hover:bg-secondary/80 transition-colors">
                <img
                    src={pokemon.sprites.other["official-artwork"].front_default}
                    alt={pokemonName}
                    className="w-full h-full object-contain"
                />
            </div>
            <span className="capitalize font-medium text-sm group-hover:underline">
                {pokemonName}
            </span>
            <Badge variant="outline" className="text-xs">
                #{String(pokemon.id).padStart(3, "0")}
            </Badge>
        </Link>
    );
}
