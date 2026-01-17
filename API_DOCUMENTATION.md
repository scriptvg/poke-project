# Capa de Conexión con la API de Pokémon

Esta documentación explica cómo usar la capa de conexión con la PokeAPI que se ha implementado.

## 📁 Estructura de Archivos

```
src/
├── types/
│   └── pokemon.ts              # Tipos TypeScript para la API
├── services/
│   └── pokemon.service.ts      # Servicio de API con axios
├── hooks/
│   └── use-pokemon.ts          # Hooks de React Query
└── lib/
    └── axios.config.ts         # Configuración de axios
```

## 🔧 Componentes de la Capa

### 1. Tipos TypeScript (`types/pokemon.ts`)

Define todas las interfaces necesarias para trabajar con la PokeAPI:

- `PokemonListResponse` - Respuesta de la lista de Pokémon
- `Pokemon` - Detalles completos de un Pokémon
- `PokemonSprites` - Imágenes del Pokémon
- `PokemonType` - Tipos del Pokémon (fuego, agua, etc.)
- `PokemonStat` - Estadísticas (HP, ataque, etc.)
- `PokemonAbility` - Habilidades del Pokémon
- `PokemonSpecies` - Información de la especie

### 2. Servicio de API (`services/pokemon.service.ts`)

Clase estática con métodos para interactuar con la API:

```typescript
// Obtener lista de Pokémon
PokemonService.getPokemonList(limit, offset)

// Obtener un Pokémon por nombre o ID
PokemonService.getPokemonByNameOrId('pikachu')
PokemonService.getPokemonByNameOrId(25)

// Obtener múltiples Pokémon en paralelo
PokemonService.getMultiplePokemon(['pikachu', 'charmander', 'bulbasaur'])

// Obtener información de la especie
PokemonService.getPokemonSpecies('pikachu')

// Buscar Pokémon por nombre
PokemonService.searchPokemon('char')
```

### 3. Hooks de React Query (`hooks/use-pokemon.ts`)

Hooks para usar en componentes React:

#### `usePokemonList(limit, offset)`
Obtiene una lista paginada de Pokémon.

```tsx
const { data, isLoading, error } = usePokemonList(20, 0);
```

#### `usePokemon(nameOrId, enabled)`
Obtiene el detalle de un Pokémon específico.

```tsx
const { data: pokemon, isLoading } = usePokemon('pikachu');
const { data: pokemon2 } = usePokemon(25);
```

#### `useMultiplePokemon(namesOrIds)`
Obtiene múltiples Pokémon en paralelo.

```tsx
const pokemonQueries = useMultiplePokemon(['pikachu', 'charmander']);
// pokemonQueries es un array de queries
```

#### `usePokemonSpecies(nameOrId, enabled)`
Obtiene información de la especie.

```tsx
const { data: species } = usePokemonSpecies('pikachu');
```

#### `useSearchPokemon(searchTerm, enabled)`
Busca Pokémon por nombre.

```tsx
const { data: results } = useSearchPokemon('char', true);
```

### 4. Configuración de Axios (`lib/axios.config.ts`)

Instancia de axios configurada con:
- Base URL de PokeAPI
- Interceptores de request para logging
- Interceptores de response para manejo de errores
- Headers por defecto

## 📖 Ejemplos de Uso

### Ejemplo 1: Lista Simple de Pokémon

```tsx
import { usePokemonList } from '@/hooks/use-pokemon';

function PokemonList() {
  const { data, isLoading, error } = usePokemonList(10, 0);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data?.results.map((pokemon) => (
        <li key={pokemon.name}>{pokemon.name}</li>
      ))}
    </ul>
  );
}
```

### Ejemplo 2: Detalle de un Pokémon

```tsx
import { usePokemon } from '@/hooks/use-pokemon';

function PokemonDetail({ name }: { name: string }) {
  const { data: pokemon, isLoading } = usePokemon(name);

  if (isLoading) return <div>Cargando...</div>;
  if (!pokemon) return null;

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Altura: {pokemon.height}</p>
      <p>Peso: {pokemon.weight}</p>
      <div>
        Tipos: {pokemon.types.map(t => t.type.name).join(', ')}
      </div>
    </div>
  );
}
```

### Ejemplo 3: Búsqueda de Pokémon

```tsx
import { useState } from 'react';
import { useSearchPokemon } from '@/hooks/use-pokemon';

function PokemonSearch() {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useSearchPokemon(search, search.length > 2);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar Pokémon..."
      />
      
      {isLoading && <div>Buscando...</div>}
      
      {data && (
        <ul>
          {data.results.map((pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Ejemplo 4: Múltiples Pokémon con Detalles

```tsx
import { usePokemonList, useMultiplePokemon } from '@/hooks/use-pokemon';

function PokemonGrid() {
  const { data: list } = usePokemonList(20, 0);
  const pokemonQueries = useMultiplePokemon(
    list?.results.map(p => p.name) || []
  );

  const isLoading = pokemonQueries.some(q => q.isLoading);

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="grid grid-cols-4 gap-4">
      {pokemonQueries.map((query) => {
        const pokemon = query.data;
        if (!pokemon) return null;

        return (
          <div key={pokemon.id}>
            <img 
              src={pokemon.sprites.other['official-artwork'].front_default} 
              alt={pokemon.name} 
            />
            <h3>{pokemon.name}</h3>
          </div>
        );
      })}
    </div>
  );
}
```

## 🎯 Características

- ✅ **TypeScript completo** - Tipos seguros en toda la capa
- ✅ **Caché inteligente** - React Query maneja el caché automáticamente
- ✅ **Estados de carga** - `isLoading`, `error`, `data` disponibles
- ✅ **Logging** - Interceptores de axios para debugging
- ✅ **Manejo de errores** - Centralizado en los interceptores
- ✅ **Optimización** - Peticiones paralelas con `useMultiplePokemon`
- ✅ **Búsqueda** - Funcionalidad de búsqueda incluida

## 🔍 Debugging

Los interceptores de axios registran automáticamente:
- Todas las peticiones: `[API Request] GET /pokemon`
- Todas las respuestas: `[API Response] /pokemon - Status: 200`
- Todos los errores: `[API Error] 404 - Not Found`

Revisa la consola del navegador para ver estos logs.

## 📝 Notas

- Los datos se cachean por 5 minutos (staleTime)
- Los datos se mantienen en memoria por 10 minutos (gcTime)
- Puedes ajustar estos valores en `main.tsx` o en cada hook individual
- La API de PokeAPI no requiere autenticación
- Si necesitas autenticación en el futuro, descomenta la línea en el interceptor de axios
