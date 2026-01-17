import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Pokemon } from "@/types/pokemon";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PokemonTypeBadge } from "@/components/pokemon-type";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { usePokemonNavigation } from "@/hooks/use-pokemon-list";
import { formatPokemonId } from "@/lib/pokemon-card-utils";

interface PokemonDetailHeaderProps {
    pokemon: Pokemon;
}

/**
 * Componente de header para la página de detalle de Pokemon
 */
export function PokemonDetailHeader({ pokemon }: PokemonDetailHeaderProps) {
    const { previous, next } = usePokemonNavigation(pokemon.id);

    return (
        <Card className="overflow-hidden p-0 gap-0">
            <CardContent className="p-0">
                <div className="relative">
                    {/* Botón de regreso */}
                    <div className="absolute left-4 top-4 z-10">
                        <Button size="sm" asChild>
                            <Link to="/">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Volver
                            </Link>
                        </Button>
                    </div>

                    {/* Badge del ID */}
                    <div className="absolute right-4 bottom-4 z-10">
                        <Badge className="text-lg font-bold">
                            #{formatPokemonId(pokemon.id)}
                        </Badge>
                    </div>

                    {/* Navegación */}
                    <ButtonGroup className="absolute right-4 top-4 z-10">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button size="icon-sm" asChild disabled={!previous}>
                                    <Link to={previous ? `/pokemon/${previous.name}` : "#"}>
                                        <ChevronLeft />
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                {previous ? (
                                    <div className="text-center">
                                        <p className="font-bold">
                                            #{formatPokemonId(pokemon.id - 1)}
                                        </p>
                                        <p className="text-xs capitalize">{previous.name}</p>
                                    </div>
                                ) : (
                                    <p className="text-xs">No hay anterior</p>
                                )}
                            </TooltipContent>
                        </Tooltip>
                        <ButtonGroupSeparator className="border-card" />
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button size="icon-sm" asChild disabled={!next}>
                                    <Link to={next ? `/pokemon/${next.name}` : "#"}>
                                        <ChevronRight />
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                {next ? (
                                    <div className="text-center">
                                        <p className="font-bold">
                                            #{formatPokemonId(pokemon.id + 1)}
                                        </p>
                                        <p className="text-xs capitalize">{next.name}</p>
                                    </div>
                                ) : (
                                    <p className="text-xs">No hay siguiente</p>
                                )}
                            </TooltipContent>
                        </Tooltip>
                    </ButtonGroup>

                    {/* Imagen del Pokémon */}
                    <div className="flex items-center justify-center p-12 border-b">
                        <img
                            src={pokemon.sprites.other["official-artwork"].front_default}
                            alt={pokemon.name}
                            className="h-64 w-64 object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>
            </CardContent>
            <CardHeader className="p-0 gap-0">
                <div className="bg-background p-6">
                    <h1 className="mb-4 text-4xl font-bold capitalize">{pokemon.name}</h1>
                    <div className="flex gap-2">
                        {pokemon.types.map((type) => (
                            <PokemonTypeBadge key={type.type.name} type={type} />
                        ))}
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
}
