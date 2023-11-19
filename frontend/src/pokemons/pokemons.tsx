import React, { useMemo } from "react";
import { useQuery } from '@tanstack/react-query'
import getPokemonsAPI from "./pokemons.service";
import { v4 as uuidv4 } from "uuid";
import "./pokemons.css";

interface PokemonsProps {
    offset: number;
    pokedex: string;
}

const Pokemons: React.FC<PokemonsProps> = ({ offset, pokedex }) => {
    const { isFetching, data } = useQuery({ 
        queryKey: ['pokemons', pokedex, offset],
        queryFn: ({ queryKey }) => getPokemonsAPI(`${queryKey[1]}`, +queryKey[2])
    });

    return useMemo(() => (
        <div className="pokemons">
            {!isFetching && data && data.map(
                (pokemon) => (
                    <div key={uuidv4()} className={`pokemon-container ${pokemon.species?.color.name}`}>
                        <img src={pokemon.sprites.front_default} title={pokemon.name} alt={pokemon.name}/>
                    </div>)
            )}
        </div>
    ), [isFetching, data]);
}

export default Pokemons;