# Evolution Component System

A headless, modular architecture for displaying Pokemon evolution chains.

## Architecture

### 🔧 Utilities (`lib/evolution-utils.ts`)
Pure functions for evolution data processing:
- `formatEvolutionMethod()` - Format evolution requirements
- `hasEvolutions()` - Check if Pokemon has evolutions
- `flattenEvolutionChain()` - Flatten chain for iteration
- `getEvolutionMethodFromChain()` - Get formatted method from chain

### 🎣 Hooks (`components/evolution/hooks/`)
Headless logic hooks:
- `useEvolutionChain()` - Main evolution chain state management
- `useEvolutionMethod()` - Evolution method formatting with memoization

### 🧱 Primitives (`components/evolution/primitives/`)
Small, focused UI components:
- `EvolutionStageCard` - Single Pokemon display
- `EvolutionMethodBadge` - Evolution method indicator
- `EvolutionArrow` - Arrow separator
- `EvolutionStageSkeleton` - Loading skeleton

### 🎨 Composed (`components/evolution/`)
High-level composable components:
- `EvolutionChain` - Headless container with compound component API

## Usage Examples

### Basic Usage

```tsx
import { EvolutionChain, EvolutionStageCard, EvolutionStageSkeleton } from "@/components/evolution";

<EvolutionChain species={species}>
  <EvolutionChain.Loading>
    <EvolutionStageSkeleton />
  </EvolutionChain.Loading>
  
  <EvolutionChain.Content>
    {(chain) => (
      <div>
        <EvolutionStageCard pokemonName={chain.species.name} />
      </div>
    )}
  </EvolutionChain.Content>
</EvolutionChain>
```

### Custom Rendering

```tsx
<EvolutionChain species={species}>
  <EvolutionChain.Content>
    {(chain) => (
      <div className="custom-layout">
        {/* Your custom evolution display */}
        <h2>{chain.species.name}</h2>
        {chain.evolves_to.map(evo => (
          <EvolutionStageCard key={evo.species.name} pokemonName={evo.species.name} />
        ))}
      </div>
    )}
  </EvolutionChain.Content>
</EvolutionChain>
```

### Using Primitives Independently

```tsx
import { EvolutionStageCard, EvolutionMethodBadge, EvolutionArrow } from "@/components/evolution";

// Use primitives anywhere
<div className="flex gap-4">
  <EvolutionStageCard pokemonName="pikachu" />
  <EvolutionArrow />
  <EvolutionStageCard pokemonName="raichu" />
</div>

<EvolutionMethodBadge method="Thunder Stone" variant="secondary" />
```

### Using Hooks Directly

```tsx
import { useEvolutionChain, useEvolutionMethod } from "@/components/evolution";

function MyComponent({ species }) {
  const { chain, isLoading, hasEvolutions } = useEvolutionChain(species);
  const method = useEvolutionMethod(chain?.evolution_details);
  
  // Build your own UI
}
```

## Benefits

✅ **Modular** - Each component has a single responsibility  
✅ **Reusable** - Primitives can be used independently  
✅ **Flexible** - Compose your own layouts  
✅ **Testable** - Easy to test in isolation  
✅ **Type-safe** - Full TypeScript support  
✅ **Headless** - Logic separated from presentation
