export interface DocProp {
    name: string;
    type: string;
    default?: string;
    description: string;
}

export interface DocSection {
    id: string;
    title: string;
    content: string;
    demo?: {
        component: string;
        props?: any;
    };
    propsTable?: DocProp[];
    code?: string; // Optional field for standalone code blocks
}

export interface DocContent {
    title: string;
    description: string;
    sections: DocSection[];
}

export const DOCS_CONTENT: Record<string, DocContent> = {
    introduction: {
        title: "Arquitectura de Sistemas",
        description: "Análisis de decisiones arquitectónicas, compromiso técnico y escalabilidad en el ecosistema de Composable Pokedex.",
        sections: [
            {
                id: "philosophy",
                title: "Filosofía Engineering-First",
                content: "Este proyecto no busca solo renderizar datos, sino resolver los problemas comunes de las SPAs modernas: **acoplamiento excesivo**, **waterfalls de red** y **baja mantenibilidad**.\n\n[!note:Decisión Técnica] Elegimos un enfoque **Headless UI** para garantizar que la lógica de negocio pueda evolucionar independientemente de la estética visual, permitiendo pivotar el diseño sin tocar una sola línea de lógica de API.",
            },
            {
                id: "stack-justification",
                title: "Justificación del Stack",
                content: "1. **React 19 + Vite**: Para aprovechar el renderizado optimizado y tiempos de compilación mínimos.\n2. **TanStack Query**: Elegido sobre Redux porque nuestro estado es mayoritariamente **Server State**. Esto reduce el boilerplate en un 60%.\n3. **Tailwind CSS 4**: Adoptado para utilizar el motor de diseño basado en CSS nativo y variables OKLCH.\n\n[!note:Trade-off] Al elegir TanStack Query, sacrificamos el control manual granular del estado que ofrece Redux, a cambio de una gestión automática de caché, deduplicación de peticiones y lógica de 'loading/error' out-of-the-box.",
            },
            {
                id: "future-scale",
                title: "Escalabilidad a Futuro",
                content: "Si el sistema escalara a **100k+ Pokémon** o múltiples regiones de API, la arquitectura actual soportaría el cambio mediante:\n- **Micro-frontends**: Separando el motor de búsqueda del detalle.\n- **BFF (Backend-for-Frontend)**: Para normalizar respuestas de múltiples microservicios antes de llegar al cliente.",
            },
            {
                id: "maturity-model",
                title: "Modelo de Madurez del Proyecto",
                content: "Este proyecto se encuentra en una etapa de **Producción Lista**. Hemos priorizado la estabilidad del 'Core' sobre la cantidad de features, asegurando que la base sea sólida para cualquier expansión futura.\n\n[!tip:Insight] La arquitectura actual permite añadir soporte para **Offline Mode** con Service Workers en menos de una jornada laboral gracias a la abstracción de la capa de datos.",
            }
        ],
    },
    "architecture/patterns": {
        title: "Patrones de Diseño Avanzados",
        description: "Uso de patrones estructurales para manejar la complejidad del frontend.",
        sections: [
            {
                id: "compound-components",
                title: "Compound Components",
                content: "Implementamos el patrón de Componentes Compuestos para permitir interfaces flexibles sin una 'Explosión de Props'.\n\n```tsx\n<PokemonGrid>\n  <PokemonGrid.Search />\n  <PokemonGrid.Content />\n  <PokemonGrid.Pagination />\n</PokemonGrid>\n```\n\n[!tip:Beneficio] Este patrón mejora la legibilidad y permite a los consumidores del componente reordenar elementos sin modificar el código interno.",
            },
            {
                id: "headless-hooks",
                title: "Custom Hooks como Adaptadores",
                content: "Nuestros hooks actúan como una capa de adaptación (Pattern Adapter). Transforman los datos crudos del API en estructuras optimizadas para el renderizado.\n\n```typescript\n// Abstracción de lógica compleja de evolución\nconst { stages, currentStage } = usePokemonEvolution(name);\n```",
            },
        ],
    },
    "performance/optimization": {
        title: "Performance & Escalabilidad",
        description: "Cómo logramos 60fps y tiempos de carga instantáneos con miles de registros.",
        sections: [
            {
                id: "infinite-scroll",
                title: "Virtualización y Scroll Infinito",
                content: "El desafío: Renderizar 1025 Pokémon sin colapsar el DOM. \n\n**Solución**: Utilizamos `useInfiniteQuery` combinado con un `IntersectionObserver` de baja latencia. Solo mantenemos en memoria lo necesario y cargamos chunks bajo demanda.\n\n[!warning:Escalabilidad] Para datasets de +10,000 elementos, el siguiente paso sería implementar **Windowing** (con @tanstack/react-virtual) para reciclar nodos del DOM.",
                demo: {
                    component: "PokemonCard",
                    props: {}
                }
            },
            {
                id: "caching",
                title: "Estrategia de Caché",
                content: "Implementamos una estrategia de **Stale-While-Revalidate**. Los datos se sirven instantáneamente desde la caché mientras se validan en segundo plano.\n\n```typescript\n// Configuración de caché global\nconst queryClient = new QueryClient({\n  defaultOptions: {\n    queries: {\n      staleTime: 1000 * 60 * 5, // 5 minutos de frescura\n      gcTime: 1000 * 60 * 60,   // 1 hora en garbage collector\n    }\n  }\n});\n```",
            },
        ],
    },
    "components/pokemon-grid": {
        title: "Infinite Grid Engine",
        description: "El orquestador de visualización de datos masivos y scroll infinito.",
        sections: [
            {
                id: "grid-system",
                title: "Arquitectura del Grid",
                content: "El `PokemonGrid` es el corazón visual de la aplicación. Utiliza una estrategia de renderizado optimizada para manejar cientos de elementos sin degradar la experiencia de usuario.\n\n[!tip:Senior Detail] Implementamos `IntersectionObserver` para disparar la carga de la siguiente página de TanStack Query justo antes de que el usuario llegue al final de la lista.",
                propsTable: [
                    { name: "pokemons", type: "PokemonListItem[]", description: "Lista de Pokémon a renderizar." },
                    { name: "isLoading", type: "boolean", description: "Estado de carga inicial." },
                    { name: "isFetchingNextPage", type: "boolean", description: "Estado de carga de la siguiente página." },
                    { name: "hasNextPage", type: "boolean", description: "Indica si hay más datos para cargar." },
                    { name: "onLoadMore", type: "() => void", description: "Callback para cargar más datos." },
                ]
            }
        ]
    },
    "components/search-system": {
        title: "Search & Filter System",
        description: "Motor de búsqueda reactivo con filtrado múltiple.",
        sections: [
            {
                id: "search-logic",
                title: "Filtrado Multidimensional",
                content: "El sistema permite filtrar por nombre, tipo y generación de forma simultánea. Toda la lógica de filtrado se maneja de forma eficiente evitando re-renderizados innecesarios.\n\n[!note:Performance] El input de búsqueda utiliza un patrón de estado controlado con un pequeño delay para evitar procesamientos pesados en cada pulsación de tecla.",
                demo: { component: "PokemonSearchBar" },
                propsTable: [
                    { name: "searchTerm", type: "string", description: "Término de búsqueda actual." },
                    { name: "onSearchChange", type: "(v: string) => void", description: "Handler para el cambio de búsqueda." },
                    { name: "selectedType", type: "string | null", description: "Tipo seleccionado actualmente." },
                    { name: "onTypeChange", type: "(v: string | null) => void", description: "Handler para el cambio de tipo." },
                ]
            }
        ]
    },
    "components/pokemon-card": {
        title: "Pokemon Card",
        description: "Componente de presentación para la previsualización de Pokémon.",
        sections: [
            {
                id: "card-design",
                title: "Diseño Atómico",
                content: "La tarjeta es un componente atómico que encapsula la imagen, el nombre, el ID y los tipos. Utiliza efectos de hover y transiciones suaves para una sensación premium.\n\n[!tip:UX] La tarjeta cambia sutilmente su fondo basándose en el tipo principal del Pokémon para mejorar la identificación visual rápida.",
                demo: { component: "PokemonCard" },
                propsTable: [
                    { name: "name", type: "string", description: "Nombre del Pokémon (slug para navegación)." },
                    { name: "id", type: "number", description: "ID nacional del Pokémon." },
                ]
            }
        ]
    },
    "components/pokemon-type": {
        title: "Type Badge System",
        description: "Sistema de etiquetas dinámicas basadas en el tipo elemental.",
        sections: [
            {
                id: "badge-system",
                title: "Sistema de Colores Dinámicos",
                content: "Cada badge utiliza un esquema de colores específico definido por el tipo. Utilizamos utilidades de Tailwind genéricas que mapean nombres de tipos a variables CSS de color.\n\n```tsx\n// Ejemplo de uso\n<PokemonTypeBadge type={{ type: { name: 'fire' } }} />\n```",
                demo: { component: "PokemonTypeBadge" }
            }
        ]
    },
    "components/pokemon-stats": {
        title: "Stats Visualization",
        description: "Gráficos de barras para la visualización de estadísticas base.",
        sections: [
            {
                id: "stats-engine",
                title: "Motor de Normalización",
                content: "Las estadísticas se visualizan en barras porcentuales. El sistema calcula el ancho de la barra basándose en un 'max-stat' teórico para ofrecer una comparación visual coherente entre diferentes Pokémon.",
                demo: { component: "PokemonStatsCard" },
                propsTable: [
                    { name: "pokemon", type: "Pokemon", description: "Objeto Pokémon completo con estadísticas." },
                ]
            }
        ]
    },
    "components/pokemon-abilities": {
        title: "Abilities Engine",
        description: "Gestor de habilidades con visualización de detalles bajo demanda.",
        sections: [
            {
                id: "abilities-logic",
                title: "Lógica de Expansión",
                content: "Las habilidades muestran su nombre inicialmente y permiten expandirse para leer la descripción detallada. Utiliza un custom hook para manejar el estado de expansión de forma aislada por habilidad.",
                demo: { component: "PokemonAbilitiesCard" },
                propsTable: [
                    { name: "pokemon", type: "Pokemon", description: "Datos del Pokémon que incluyen el array de habilidades." },
                ]
            }
        ]
    },
    "components/evolution": {
        title: "Evolution Chain Engine",
        description: "Renderizador de grafos recursivos para cadenas evolutivas.",
        sections: [
            {
                id: "evolution-chain",
                title: "Complejidad Recursiva",
                content: "El motor de evolución procesa cadenas lineales y ramificadas. Es capaz de representar visualmente las condiciones de evolución (niveles, piedras, ítems) de forma clara.\n\n[!warning:Data] Este es el componente con el procesamiento de datos más intenso del proyecto debido a la naturaleza anidada de la PokeAPI.",
                demo: { component: "EvolutionChain" },
                propsTable: [
                    { name: "pokemonName", type: "string", description: "Nombre del Pokémon base para iniciar la cadena." },
                ]
            }
        ]
    },
    "components/pokemon-info": {
        title: "Metadata / Info Card",
        description: "Visualización de datos generales, biografía y métricas físicas.",
        sections: [
            {
                id: "info-card",
                title: "Ficha Técnica",
                content: "Muestra la descripción biográfica filtrada por idioma (español), además de los datos de peso, altura y experiencia base.\n\n[!note:UX] Los datos físicos se formatean automáticamente de 'decímetros' y 'hectogramos' (PokeAPI standard) a 'metros' y 'kilogramos'.",
                demo: { component: "PokemonInfoCard" }
            }
        ]
    },
    "components/pokemon-weakness": {
        title: "Weakness Analysis",
        description: "Calculador matricial de efectividad de tipos.",
        sections: [
            {
                id: "weakness-engine",
                title: "Matriz de Efectividad",
                content: "Calcula dinámicamente las debilidades combinando las resistencias y debilidades de los dos tipos posibles de un Pokémon. Identifica multiplicadores x2 y x4.",
                demo: { component: "PokemonWeaknessCard" }
            }
        ]
    },
    "engine/rendering-lifecycle": {
        title: "Rendering Lifecycle",
        description: "De la URL al DOM: Flujo de datos y secuencia de montaje.",
        sections: [
            {
                id: "sequence",
                title: "Secuencia de Montaje (URL -> View)",
                content: "Cuando un usuario navega a un detalle, se dispara una cascada optimizada:\n\n1. **Route Match**: React Router identifica el slug.\n2. **Hydration**: TanStack Query verifica la caché local.\n3. **Parallel Fetching**: Se disparan peticiones independientes para el Pokémon base y su Especie.\n\n[!note:Optimización] Al separar la lógica de 'Especie' del 'Pokémon', renderizamos la UI básica mucho antes de que se resuelva la cadena de evolución.",
            },
        ]
    },
    "engine/css-architecture": {
        title: "CSS & Design Tokens",
        description: "Gestión dinámica de temas con Tailwind 4 y OKLCH.",
        sections: [
            {
                id: "oklch-system",
                title: "Colores Dinámicos con OKLCH",
                content: "Usamos el espacio de color **OKLCH** para garantizar una luminosidad constante a través de todos los tipos de Pokémon, mejorando el contraste.\n\n[!tip:Deep Dive] Las variables CSS en el root son consumidas por utilidades personalizadas de Tailwind, permitiendo que un cambio en el token se propague instantáneamente.",
            },
        ]
    },
    "engine/data-normalization": {
        title: "Integridad de Datos",
        description: "Capa de normalización y seguridad de tipos.",
        sections: [
            {
                id: "normalization",
                title: "Data Normalization Layer",
                content: "La `PokemonService` actúa como un **Anti-Corruption Layer**. Normaliza los tipos crudos del API en interfaces estrictas.\n\n[!warning:Consistencia] Algunos endpoints de PokeAPI devuelven IDs como strings y otros como números; nuestra capa garantiza la coherencia.",
            },
        ]
    },
    "engine/state-management": {
        title: "Gestión de Estado Proactiva",
        description: "Server State vs Global UI State.",
        sections: [
            {
                id: "state-balance",
                title: "Balance de Estado",
                content: "Diferenciamos críticamente entre **Server State** (Pokémon) y **UI State** (filtros).\n\n[!note:Senior Decision] Evitamos Redux porque el 90% del estado es asíncrono, algo que TanStack resuelve de forma nativa.",
            }
        ]
    },
    "engineering/resilience": {
        title: "Resiliencia & Errores",
        description: "Estrategias de recuperación ante fallos de red y datos corruptos.",
        sections: [
            {
                id: "error-boundaries",
                title: "Error Boundaries Estratégicas",
                content: "No usamos un único Error Boundary global. Implementamos **Granular Boundaries** alrededor de la grilla y el detalle. \n\n[!warning:UX] Si falla la carga de un Pokémon individual, la grilla debe seguir funcionando. Esto se logra envolviendo cada tarjeta en su propio contexto de error parcial.",
            },
            {
                id: "graceful-degradation",
                title: "Degradación Graciosa",
                content: "Cuando una imagen (sprite) falla, el sistema automáticamente hace fallback a un placeholder SVG generado dinámicamente con el color del tipo del Pokémon, manteniendo la integridad visual.",
            }
        ]
    },
    "engineering/memory": {
        title: "Gestión de Memoria",
        description: "Optimización de recursos y limpieza de caché en SPAs de larga duración.",
        sections: [
            {
                id: "image-lazy",
                title: "Lazy Loading Agresivo",
                content: "Utilizamos el atributo `loading='lazy'` nativo combinado con `decoding='async'`. Esto libera el thread principal durante el scroll infinito masivo.\n\n[!note:Performance] Para Pokémon fuera del viewport, evitamos incluso la creación de los objetos de imagen en el DOM hasta que el `IntersectionObserver` los solicita.",
            },
            {
                id: "cache-eviction",
                title: "Evicción de Caché",
                content: "Configuramos `gcTime` (Garbage Collector Time) para asegurar que los datos de Pokémon consultados hace más de una hora se eliminen de la memoria, evitando memory leaks en sesiones prolongadas.",
            }
        ]
    },
    "engineering/qa-strategy": {
        title: "Estrategia de QA",
        description: "Filosofía de testing para una arquitectura Headless.",
        sections: [
            {
                id: "testing-pyramid",
                title: "Pirámide de Testing",
                content: "Nuestra arquitectura facilita el testing:\n\n1. **Unit Tests**: Probamos los `reducers` y la lógica de `PokemonService` de forma aislada.\n2. **Component Tests**: Usamos Mock Service Worker (MSW) para simular la PokeAPI.\n3. **E2E**: Recomendamos Playwright.\n\n```typescript\n// Ejemplo de test de lógica de normalización\ntest('normalizes pokemon ID', () => {\n  const raw = { id: '1' };\n  expect(normalize(raw).id).toBe(1);\n});\n```"
            }
        ]
    },
    "services/pokemon-service": {
        title: "Pokemon Service API",
        description: "Documentación técnica de la capa de comunicación con PokeAPI.",
        sections: [
            {
                id: "overview",
                title: "Core Service Methods",
                content: "La clase `PokemonService` centraliza todas las llamadas HTTP. Utiliza una instancia pre-configurada de Axios con interceptores para manejar timeouts y headers globales.\n\n### Métodos Principales:\n- `getPokemonList(limit, offset)`: Obtiene el listado base paginado.\n- `getPokemonByNameOrId(nameOrId)`: Recupera la entidad completa de un Pokémon.\n- `getMultiplePokemon(ids)`: Orquestador paralelo de peticiones múltiples.\n- `getEvolutionChain(id)`: Recupera el grafo recursivo de evolución.",
            },
            {
                id: "caching-logic",
                title: "Lógica de Búsqueda Local",
                content: "El método `searchPokemon` implementa un filtrado local sobre un dataset masivo (habitualmente limit=1000) para evitar latencia de red en cada letra escrita por el usuario.\n\n[!tip:Senior Practice] Los resultados de búsqueda se normalizan antes de retornar para asegurar que el componente de visualización reciba siempre la misma estructura de datos, independientemente del endpoint origen.",
            }
        ]
    },
    "hooks/pokemon-hooks": {
        title: "Custom Hooks Architecture",
        description: "Abstracciones de estado y lógica para un consumo de datos simplificado.",
        sections: [
            {
                id: "data-hooks",
                title: "Data Orchestration Hooks",
                content: "Nuestros hooks de datos envuelven a TanStack Query para proveer una API de 'un solo paso' a los componentes.\n\n- `usePokemonList`: Abstracción para el listado paginado.\n- `usePokemonDetail`: Orquestador que combina datos del Pokémon y su Especie.\n- `usePokemonEvolution`: Procesa y aplana el árbol de evolución.\n\n[!note:Patrón] Usamos el patrón **Selector** dentro de los hooks para transformar los datos justo en el momento de la entrega, manteniendo los componentes puros.",
            },
            {
                id: "lifecycle-hooks",
                title: "UX & Lifecycle Hooks",
                content: "- `useDebounce`: Controla la frecuencia de actualización de inputs pesados.\n- `useInfiniteScroll`: Abstrae la lógica del `IntersectionObserver` y la reconexión de queries.",
            }
        ]
    }
};
