import { PokemonColorShort } from "./pokemon-color";

export interface PokemonSpeciesShort {
    name: string;
    url: string;
}

export interface PokemonSpecies {
    id: number;
    name: string;
    has_gender_differences: boolean;
    color: PokemonColorShort
}