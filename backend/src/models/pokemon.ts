import { PokemonSpeciesShort } from "./pokemon-species";
import { PokemonTypeShort } from "./pokemon-type";

export interface PokemonShort {
    name: string;
    url: string;
}

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    species: PokemonSpeciesShort;
    types: PokemonTypeShort[];
    sprites: {
        front_default: string;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
    }
}

