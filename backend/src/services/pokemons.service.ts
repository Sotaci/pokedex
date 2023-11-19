import { cached } from '../decorators/cached.decorator';
import { PaginatedResult } from '../models/paginated-result';
import { Pokemon, PokemonShort } from '../models/pokemon';

import axios from 'axios';
import { PokemonDTO } from '../dtos/pokemon-dto';
import PokemonSpeciesService from './pokemon-species.service';
import PokedexService from './pokedex-service';

export default class PokemonsService {
    readonly limit = 10000;
    readonly offset = 0;
    readonly pokeapiUrl = 'https://pokeapi.co/api/v2';

    constructor(
        private readonly pokemonSpeciesService: PokemonSpeciesService,
        private readonly pokedexService: PokedexService
    ) {}

    @cached("pokemons")
    async getRawPokemons(): Promise<PaginatedResult<PokemonShort>> {
        const { data } = await axios.get<Promise<PaginatedResult<PokemonShort>>>(`${this.pokeapiUrl}/pokemon?offset=${this.offset}&limit=${this.limit}`)
        const page = await data;

        return page;
    }

    @cached("pokemons")
    async getPokemons(offset: number, limit: number): Promise<PokemonDTO[]> {
        const { data } = await axios.get<Promise<PaginatedResult<PokemonShort>>>(`${this.pokeapiUrl}/pokemon?offset=${offset}&limit=${limit}`)
        const page = await data

        const pokemons = await Promise.all(page.results.map(p => this.getPokemonByName(p.name)))
        const species = Array.from(
            new Set(
                await Promise.all(pokemons.map((pokemon) => this.pokemonSpeciesService.getPokemonSpeciesByName(pokemon.species.name)))
            )
        );
        
        return [ ...pokemons.map(p => ({ ...p, species: species.find(s => s.name === p.species.name) ?? species[0] })) ]
    }

    /**
     * Return a page of pokemons for a given pokedex
     * 
     * @param pokedexName pokedex name
     * @param offset page start
     * @param limit page size
     * @returns list of pokemons
     */
    @cached("pokedex-pokemons")
    async getPokemonsByPokedex(pokedexName: string, offset: number, limit: number): Promise<PokemonDTO[]> {
        // very long treatments :(
        const page = await this.getRawPokemons();

        const pokedex = await this.pokedexService.getPokedexByName(pokedexName);
        const pokedexSpecies = pokedex.pokemon_entries.map((entry) => entry.pokemon_species.name);

        let i = 0;
        let offsetReached = false;
        let res: PokemonDTO[] = [];
        const pokemons = page.results

        while ((!res[offset] || res.length < limit) && i < pokemons.length) {
            // fetch complete pokemon
            let pokemon = await this.getPokemonByName(pokemons[i].name);
            
            // filter pokemons by pokedex species
            if (pokedexSpecies.find(s => s === pokemon.species.name)) {
                let pokemondto = await this.buildPokemonDTO(pokemon);    
                res.push(pokemondto);
            }

            if (!offsetReached && res[offset]) {
                res = res.slice(offset)
                offsetReached = true;
            }

            i++;
        }

        return res;
    }

    async getPokemonByName(name: string): Promise<Pokemon> {
        const { data } = await axios.get<Promise<Pokemon>>(`${this.pokeapiUrl}/pokemon/${name}`);

        return data;
    }

    private async buildPokemonDTO(pokemon: Pokemon): Promise<PokemonDTO> {
        let fetchedSpecies = await this.pokemonSpeciesService.getPokemonSpeciesByName(pokemon.species.name)
                
        return {
            id: pokemon.id,
            name: pokemon.name,
            species: fetchedSpecies,
            sprites: {
                front_default: pokemon.sprites.front_default
                }
            }
    }
}