import axios from "axios";
import { Pokedex, PokedexShort } from "../models/pokedex";
import { PaginatedResult } from "../models/paginated-result";
import { cached } from "../decorators/cached.decorator";

export default class PokedexService {
    constructor() {}

    @cached('pokedex')
    async getAllPokedex(): Promise<PokedexShort[]> {
        const { data } = await axios.get<PaginatedResult<PokedexShort>>('https://pokeapi.co/api/v2/pokedex?offset=0&limit=40');
        const page = await data;
        
        return page.results;
    }

    @cached('pokedex')
    async getPokedexByName(name: string): Promise<Pokedex> {
        const { data } = await axios.get<Pokedex>(`https://pokeapi.co/api/v2/pokedex/${name}`);
        const pokedex = await data;
        
        return pokedex;
    }
}
