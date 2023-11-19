import { PokemonSpeciesShort } from "./pokemon-species";

export interface PokedexShort {
    name: string;
    url: string;
}

export interface Pokedex {
    id: number;
    name: string;
    is_main_series: boolean;
    descriptions: { description: string; language: { name: string; url: string; }}[];
    names: { name: string; language: { name: string; url: string; }}[];
    pokemon_entries: { entry_number: number, pokemon_species: PokemonSpeciesShort }[];
    region: { name: string; url: string };
}