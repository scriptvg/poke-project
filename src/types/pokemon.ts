// Tipos para la respuesta de la lista de Pokémon
export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}

export interface PokemonListItem {
    name: string;
    url: string;
}

// Tipos para el detalle de un Pokémon
export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    sprites: PokemonSprites;
    types: PokemonType[];
    stats: PokemonStat[];
    abilities: PokemonAbility[];
}

export interface PokemonSprites {
    front_default: string;
    front_shiny: string;
    front_female: string | null;
    front_shiny_female: string | null;
    back_default: string;
    back_shiny: string;
    back_female: string | null;
    back_shiny_female: string | null;
    other: {
        dream_world: {
            front_default: string;
            front_female: string | null;
        };
        home: {
            front_default: string;
            front_female: string | null;
            front_shiny: string;
            front_shiny_female: string | null;
        };
        "official-artwork": {
            front_default: string;
            front_shiny: string;
        };
    };
}

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

/* variantes de tipos */
export type PokeTypeVariant =
    | "normal"
    | "fire"
    | "water"
    | "electric"
    | "grass"
    | "ice"
    | "fighting"
    | "poison"
    | "ground"
    | "flying"
    | "psychic"
    | "bug"
    | "rock"
    | "ghost"
    | "dragon"
    | "dark"
    | "steel"
    | "fairy"

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface PokemonAbility {
    is_hidden: boolean;
    slot: number;
    ability: {
        name: string;
        url: string;
    };
}

// Tipos para especies de Pokémon (información adicional)
export interface PokemonSpecies {
    id: number;
    name: string;
    color: {
        name: string;
        url: string;
    };
    evolution_chain: {
        url: string;
    };
    flavor_text_entries: FlavorTextEntry[];
    genera: Genera[];
}

export interface FlavorTextEntry {
    flavor_text: string;
    language: {
        name: string;
        url: string;
    };
    version: {
        name: string;
        url: string;
    };
}

export interface Genera {
    genus: string;
    language: {
        name: string;
        url: string;
    };
}

// Tipos para la respuesta del endpoint /type
export interface TypeResponse {
    id: number;
    name: string;
    pokemon: TypePokemon[];
}

export interface TypePokemon {
    slot: number;
    pokemon: PokemonListItem;
}

// Tipos para la lista de tipos disponibles
export interface TypeListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}

// Tipos para la cadena de evolución
export interface EvolutionChain {
    id: number;
    chain: ChainLink;
}

export interface ChainLink {
    is_baby: boolean;
    species: {
        name: string;
        url: string;
    };
    evolution_details: EvolutionDetail[];
    evolves_to: ChainLink[];
}

export interface EvolutionDetail {
    item: {
        name: string;
        url: string;
    } | null;
    trigger: {
        name: string;
        url: string;
    };
    gender: number | null;
    held_item: {
        name: string;
        url: string;
    } | null;
    known_move: {
        name: string;
        url: string;
    } | null;
    known_move_type: {
        name: string;
        url: string;
    } | null;
    location: {
        name: string;
        url: string;
    } | null;
    min_level: number | null;
    min_happiness: number | null;
    min_beauty: number | null;
    min_affection: number | null;
    needs_overworld_rain: boolean;
    party_species: {
        name: string;
        url: string;
    } | null;
    party_type: {
        name: string;
        url: string;
    } | null;
    relative_physical_stats: number | null;
    time_of_day: string;
    trade_species: {
        name: string;
        url: string;
    } | null;
    turn_upside_down: boolean;
}
