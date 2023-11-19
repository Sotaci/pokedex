import  axios from 'axios'

export default class PokemonColorsService {
    
    constructor() {}

    async getPokemonColors(): Promise<void> {
        const data = await axios.get('https://pokeapi.co/api/v2/pokemon-color');
    }
}