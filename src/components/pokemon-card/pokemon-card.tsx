import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Pokemon } from "@/types/pokemon";
import { PokemonTypeBadge } from "@/components/pokemon-type";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { formatPokemonId } from "@/lib/pokemon-card-utils";
import { cn } from "@/lib/utils";

interface PokemonCardProps {
    pokemon: Pokemon;
    className?: string;
}

/**
 * Componente de tarjeta de Pokemon para la lista
 */
export function PokemonCard({ pokemon, className }: PokemonCardProps) {
    return (
        <Card
            className={cn(
                "pt-0 p-1 gap-0 bg-secondary hover:translate-y-[-5px] transition-all duration-300",
                className
            )}
        >
            <CardContent className="relative bg-secondary px-0">
                {/* Imagen del pokemon */}
                <Link to={`/pokemon/${pokemon.name}`}>
                    <img
                        src={pokemon.sprites.other["official-artwork"].front_default}
                        alt={pokemon.name}
                        className="aspect-video h-72 rounded-t-xl object-cover"
                    />
                </Link>

                {/* Badge del id del pokemon */}
                <Badge className="absolute left-2 top-2">
                    #{formatPokemonId(pokemon.id)}
                </Badge>

                {/* Tipos del pokemon */}
                <div className="absolute bottom-2 left-2 flex gap-2">
                    {pokemon.types.map((type) => (
                        <PokemonTypeBadge key={type.type.name} type={type} />
                    ))}
                </div>
            </CardContent>

            <CardHeader className="bg-background rounded">
                {/* Nombre del pokemon */}
                <CardTitle className="mt-2 font-bold group flex items-center w-full capitalize hover:underline transition-all duration-300">
                    <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
                    <ExternalLink className="ml-1 group-hover:inline-block hidden w-4 h-4" />
                </CardTitle>
            </CardHeader>
        </Card>
    );
}
