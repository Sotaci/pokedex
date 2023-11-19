import { Router } from "express";
import PokedexService from "../../services/pokedex-service";
import PokedexController from "./pokedex.controller";

const pokedexService = new PokedexService();
const pokedexController = new PokedexController(pokedexService);
const pokedexRouter = Router();

pokedexRouter
    .route("/api/pokedex")
    .get((req, res) => pokedexController.getPokedex(req, res))

export default pokedexRouter;
