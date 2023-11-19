import { PokemonSpecies } from "../models/pokemon-species";

export interface PokemonDTO {
    id: number;
    name: string;
    species: PokemonSpecies;
    sprites: {
        front_default: string;
    }
}