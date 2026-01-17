import { useParams } from "react-router-dom";
import { usePokemonDetail } from "@/hooks/use-pokemon-detail";
import { PokemonDetailHeader } from "@/components/pokemon-header";
import { PokemonStatsCard } from "@/components/pokemon-stats";
import { PokemonAbilitiesCard } from "@/components/pokemon-abilities";
import { PokemonWeaknessCard } from "@/components/pokemon-weakness";
import { PokemonInfoCard } from "@/components/pokemon-info";
import { PokemonEvolutionPhase } from "@/components/evolution";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function Pokemon() {
    const { slug } = useParams<{ slug: string }>();
    const { pokemon, species, isLoading, isError, error } = usePokemonDetail(slug);

    // Estado de carga
    if (isLoading) {
        return (
            <main className="mx-auto max-w-6xl px-4 py-8">
                <div className="space-y-6">
                    {/* Skeleton del header */}
                    <Card className="pt-0">
                        <CardContent className="p-0">
                            <Skeleton className="h-96 w-full rounded-t-lg" />
                            <div className="p-6 space-y-4">
                                <Skeleton className="h-10 w-48" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-6 w-20" />
                                    <Skeleton className="h-6 w-20" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Skeleton del grid */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <Skeleton className="h-96" />
                        <Skeleton className="h-96" />
                        <Skeleton className="h-64" />
                        <Skeleton className="h-64" />
                    </div>
                </div>
            </main>
        );
    }

    // Estado de error
    if (isError || !pokemon) {
        return (
            <main className="mx-auto max-w-2xl px-4 py-16">
                <Card className="border-destructive">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        <AlertCircle className="mb-4 h-16 w-16 text-destructive" />
                        <h2 className="mb-2 text-2xl font-bold">
                            Pokémon no encontrado
                        </h2>
                        <p className="mb-6 text-muted-foreground">
                            {error instanceof Error
                                ? error.message
                                : `No se pudo encontrar el Pokémon "${slug}"`}
                        </p>
                        <Button asChild>
                            <Link to="/">Volver al inicio</Link>
                        </Button>
                    </CardContent>
                </Card>
            </main>
        );
    }

    // Estado exitoso - renderizar componentes modulares
    return (
        <main className="mx-auto container px-8 py-8">
            <div className="space-y-6">
                {/* Header con imagen, nombre, ID y tipos */}
                <PokemonDetailHeader pokemon={pokemon} />

                {/* Grid de información */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Estadísticas */}
                    <PokemonStatsCard pokemon={pokemon} />
                    <div className="flex flex-col gap-6">
                        {/* Información general */}
                        <PokemonInfoCard pokemon={pokemon} species={species} />
                        {/* Debilidades */}
                        <PokemonWeaknessCard pokemon={pokemon} />
                    </div>

                </div>
                    {/* Habilidades */}
                    <PokemonAbilitiesCard pokemon={pokemon} />
                    {/* Cadena de evolución - ancho completo */}
                    <PokemonEvolutionPhase species={species} />
            </div>
        </main>
    );
}