import type { PokemonGeneration } from "@/lib/pokemon-generations"
import { SearchInput } from "./primitives/search-input"
import { TypeFilter } from "./primitives/type-filter"
import { GenerationFilter } from "./primitives/generation-filter"

interface PokemonSearchBarProps {
    searchTerm: string
    onSearchChange: (value: string) => void
    selectedType: string | null
    onTypeChange: (type: string | null) => void
    uniqueTypes: string[]
    selectedGeneration: PokemonGeneration | null
    onGenerationChange: (generation: PokemonGeneration | null) => void
}

/**
 * Main search and filter bar for the Pokedex
 */
export function PokemonSearchBar({
    searchTerm,
    onSearchChange,
    selectedType,
    onTypeChange,
    uniqueTypes,
    selectedGeneration,
    onGenerationChange,
}: PokemonSearchBarProps) {
    return (
        <div className="mb-10 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 p-2  border-b  sticky top-16 z-10 transition-all duration-200 shadow-sm hover:shadow-md">
            <div className="flex flex-col sm:flex-row container mx-auto px-8 items-center justify-center gap-2">
                <div className="w-full sm:flex-1">
                    <SearchInput value={searchTerm} onChange={onSearchChange} />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <TypeFilter
                        selectedType={selectedType}
                        onTypeChange={onTypeChange}
                        uniqueTypes={uniqueTypes}
                    />
                    <GenerationFilter
                        selectedGeneration={selectedGeneration}
                        onGenerationChange={onGenerationChange}
                    />
                </div>
            </div>
        </div>
    )
}
