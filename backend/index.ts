import express from 'express';
import cors from 'cors';
import { pokedexRouter, pokemonsRouter } from './src/api';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors())
app.use(pokemonsRouter)
app.use(pokedexRouter)
  
app.listen(port);