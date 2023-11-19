import { Router } from "express";
import PokemonsController from "./pokemons.controller";
import PokemonsService from "../../services/pokemons.service";
import PokemonSpeciesService from "../../services/pokemon-species.service";
import PokedexService from "../../services/pokedex-service";

const pokemonSpeciesService = new PokemonSpeciesService();
const pokedexService = new PokedexService();
const pokemonsService = new PokemonsService(pokemonSpeciesService, pokedexService);
const pokemonsController = new PokemonsController(pokemonsService)
const pokemonsRouter: Router = Router();

pokemonsRouter.get("/api/pokemons", (req, res) => pokemonsController.getPokemons(req, res))
pokemonsRouter.get("/api/pokemons-raw", (req, res) => pokemonsController.getRawPokemons(req, res))
pokemonsRouter.get("/api/pokemons/:pokedex", (req, res) => pokemonsController.getPokemonsByPokedex(req, res))

export default pokemonsRouter;