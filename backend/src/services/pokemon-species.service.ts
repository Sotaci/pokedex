import  axios from 'axios'
import { PokemonSpecies } from '../models/pokemon-species'
import { PaginatedResult } from '../models/paginated-result'

export default class PokemonSpeciesService {
    constructor() {}

    async getPokemonSpecies(): Promise<PokemonSpecies[]> {
        const { data } = await axios.get<PaginatedResult<PokemonSpecies>>('https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=2000');

        return (await data).results
    }

    async getPokemonSpeciesByName(name: string): Promise<PokemonSpecies> {
        const { data } = await axios.get<Promise<PokemonSpecies>>(`https://pokeapi.co/api/v2/pokemon-species/${name}`);

        return data;
    }
}