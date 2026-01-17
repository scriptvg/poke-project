// Tipo para la respuesta de la API de habilidades
export interface AbilityDetail {
    id: number;
    name: string;
    effect_entries: EffectEntry[];
    flavor_text_entries: FlavorTextEntry[];
    generation: {
        name: string;
        url: string;
    };
}

export interface EffectEntry {
    effect: string;
    short_effect: string;
    language: {
        name: string;
        url: string;
    };
}

export interface FlavorTextEntry {
    flavor_text: string;
    language: {
        name: string;
        url: string;
    };
    version_group: {
        name: string;
        url: string;
    };
}
