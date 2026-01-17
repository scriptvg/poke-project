"use client"

import React from "react"
import { usePokemonInfinite, usePokemonByType, useTypeList } from "@/hooks/use-pokemon"
import { usePokemonByGeneration } from "@/hooks/use-pokemon-by-generation"
import { usePokemonTypeFilter } from "@/hooks/use-pokemon-type-filter"
import { useDebounce } from "@/hooks/use-debounce"
import { PokemonSearchBar } from "@/components/pokemon-search"
import { PokemonGrid } from "@/components/pokemon-grid"
import { type PokemonGeneration } from "@/lib/pokemon-generations"

export default function Home() {
  const [selectedType, setSelectedType] = React.useState<string | null>(null)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedGeneration, setSelectedGeneration] = React.useState<PokemonGeneration | null>(null)

  // Aplicar debounce al término de búsqueda para mejorar el rendimiento
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Obtener lista de tipos desde la API
  const { data: typeListData } = useTypeList()
  const uniqueTypes = React.useMemo(
    () => typeListData?.results.map(t => t.name).sort() || [],
    [typeListData]
  )

  // Usar diferentes hooks según los filtros activos
  const normalQuery = usePokemonInfinite(50) // 50 Pokémon por página
  const typeQuery = usePokemonByType(selectedType, 50)
  const generationQuery = usePokemonByGeneration(selectedGeneration)

  // Seleccionar la query apropiada según los filtros
  // Prioridad: Generación > Tipo > Normal
  const activeQuery = React.useMemo(() => {
    if (selectedGeneration) {
      // Si hay filtro de generación, usar ese query
      return {
        data: generationQuery.data ? { pages: [generationQuery.data], pageParams: [0] } : undefined,
        isLoading: generationQuery.isLoading,
        error: generationQuery.error,
        isFetchingNextPage: false,
        hasNextPage: false,
        fetchNextPage: () => Promise.resolve({ data: undefined, pageParam: 0 }),
      }
    } else if (selectedType) {
      return typeQuery
    } else {
      return normalQuery
    }
  }, [selectedGeneration, selectedType, generationQuery, typeQuery, normalQuery])

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = activeQuery

  // Extraer todos los Pokémon cargados de todas las páginas
  const allPokemon = React.useMemo(
    () => data?.pages.flatMap((page) => page.results) || [],
    [data]
  )

  // Filtrar por tipo cuando hay generación seleccionada
  const { filteredPokemon: pokemonFilteredByType, isLoading: isFilteringByType } = usePokemonTypeFilter(
    allPokemon,
    selectedGeneration && selectedType ? selectedType : null
  )

  // Filtrar por búsqueda (nombre)
  const filteredPokemon = React.useMemo(() => {
    const baseList = selectedGeneration && selectedType ? pokemonFilteredByType : allPokemon

    if (!debouncedSearchTerm) return baseList

    const searchLower = debouncedSearchTerm.toLowerCase().trim()
    return baseList.filter((p) =>
      p.name.toLowerCase().includes(searchLower)
    )
  }, [allPokemon, pokemonFilteredByType, debouncedSearchTerm, selectedGeneration, selectedType])

  if (error) {
    return (
      <main className="mx-auto mt-10 max-w-7xl px-4 text-center text-red-500">
        <h2 className="mb-2 text-2xl font-bold">
          Error al cargar los Pokémon
        </h2>
        <p>{error instanceof Error ? error.message : "Error desconocido"}</p>
      </main>
    )
  }

  return (
    <>
      <PokemonSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        uniqueTypes={uniqueTypes}
        selectedGeneration={selectedGeneration}
        onGenerationChange={setSelectedGeneration}
      />
      <main className="mx-auto container px-2">

        <PokemonGrid
          pokemon={filteredPokemon}
          isLoading={isLoading || isFilteringByType}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          searchTerm={searchTerm}
          selectedType={selectedType}
        />
      </main>
    </>
  )
}
