import PokemonsService from "../../services/pokemons.service";
import { Request, Response } from "express";

export default class PokemonsController {
    
    private pokemonsService: PokemonsService;
    
    constructor(readonly service: PokemonsService) {
        this.pokemonsService = service;
    }

    async getRawPokemons(req: Request, res: Response) {
        try {
            const pokemons = await this.pokemonsService.getRawPokemons();
            res.status(200).json(pokemons);
        } catch(error: any) {
            res.status(500).json({
                message: error.toString()
            });
        }
    }

    async getPokemons(req: Request, res: Response) {
        try {
            const pokemons = await this.pokemonsService.getPokemons(+(req.query.offset ?? 0), +(req.query.limit ?? 20));
            res.status(200).json(pokemons);
        } catch(error: any) {
            res.status(500).json({
                message: error.toString()
            });
        }
    }

    async getPokemonsByPokedex(req: Request, res: Response) {
        try {
            const pokemons = await this.pokemonsService.getPokemonsByPokedex(req.params.pokedex, +(req.query.offset ?? 0), +(req.query.limit ?? 20));
            res.status(200).json(pokemons);
        } catch(error: any) {
            res.status(500).json({
                message: error.toString()
            })
        }
    }
}