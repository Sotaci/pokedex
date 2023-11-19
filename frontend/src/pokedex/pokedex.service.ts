import { PokedexShort } from "@/types/pokedex";
import axios from '@/config/axios';

const getPokedex = async (): Promise<PokedexShort[]> => {
    const url = '/api/pokedex';

    try {
        const { data } = await axios.get<PokedexShort[]>(url);
        return data;
    } catch (error) {
        return Promise.reject(error)
    }
}

export default getPokedex;