import axios from '@/config/axios';
import { LIMIT } from '@/pokedex/pokedex';
import { Pokemon } from '@/types/pokemon';

const getPokemonsAPI = async (pokedex: string, offset: number): Promise<Pokemon[]> => {
    const url = (pokedex === "national") 
        ? `api/pokemons?offset=${offset}&limit=${LIMIT}`
        : `/api/pokemons/${pokedex}?offset=${offset}&limit=${LIMIT}`;
    
    try {
        const { data } = await axios.get<Pokemon[]>(url);
        return data;
    } catch(error) {
        return Promise.reject(error);
    }
}

export default getPokemonsAPI;