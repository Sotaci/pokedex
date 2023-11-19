import PokedexService from "../../services/pokedex-service";
import { Request, Response } from "express";

export default class PokedexController {

    private pokedexService: PokedexService;

    constructor(readonly service: PokedexService) {
        this.pokedexService = service;
    }

    async getPokedex(req: Request, res: Response) {
        try {
            const pokedex = await this.pokedexService.getAllPokedex();
            return res.status(200).json(pokedex);
        } catch(error: any) {
            return res.status(500).json({
                message: error.toString()
            });
        }
    }
}