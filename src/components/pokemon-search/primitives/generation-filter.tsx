import { Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ButtonGroup } from "@/components/ui/button-group"
import { POKEMON_GENERATIONS, type PokemonGeneration } from "@/lib/pokemon-generations"

interface GenerationFilterProps {
    selectedGeneration: PokemonGeneration | null
    onGenerationChange: (generation: PokemonGeneration | null) => void
}

/**
 * Dropdown filter for Pokemon generations
 */
export function GenerationFilter({
    selectedGeneration,
    onGenerationChange,
}: GenerationFilterProps) {
    const generations = Object.entries(POKEMON_GENERATIONS).map(([gen, data]) => ({
        value: Number(gen) as PokemonGeneration,
        label: data.name,
    }));

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <ButtonGroup>
                    <Button variant="outline">
                        <Layers className="mr-2 h-4 w-4" />
                        {selectedGeneration ? (
                            <span>Gen {selectedGeneration}</span>
                        ) : (
                            "Gen"
                        )}
                    </Button>
                </ButtonGroup>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="text-center sticky bg-popover z-10">
                    Filtrar por generación
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onGenerationChange(null)}>
                    Todas las generaciones
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
                    {generations.map((gen) => (
                        <DropdownMenuItem
                            key={gen.value}
                            onClick={() => onGenerationChange(gen.value)}
                        >
                            {gen.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
