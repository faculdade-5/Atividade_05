export interface Pokemon {
    id: number;
    name: string;
    url: string;
    image?: string;
    stats?: PokemonStats;
    types?: PokemonType[];
    height?: number;
    weight?: number;
    abilities?: PokemonAbility[];
}

export interface PokemonStats {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    specialAttack: number;
    specialDefense: number;
}

export interface PokemonType {
    name: string;
    url: string;
}

export interface PokemonAbility {
    name: string;
    is_hidden: boolean;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}
