import { PokemonSpecies } from "./pokemon-species";

export interface PokemonShort {
    name: string;
    url: string;
}


export interface Pokemon {
    id: number;
    name: string;
    species?: PokemonSpecies;
    sprites: {
        front_default: string;
    }
}