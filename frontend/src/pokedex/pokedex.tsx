import { useQuery } from '@tanstack/react-query'
import getPokedex from './pokedex.service';
import { useCallback, useMemo, useState } from 'react';
import "./pokedex.css";
import { Pokemons } from '@/pokemons';

export const LIMIT = 25;

const Pokedex: React.FC = () => {
    const { data = [] } = useQuery({ queryKey: ['pokedex'], queryFn: () => getPokedex() });

    const [offset, setOffset] = useState<number>(0);
    const [selectedPokedex, setSelectedPokedex] = useState<string>("national");

    const handleNavigation = useCallback((order: "left" | "right") => {
        setOffset((prev) => {
            if (prev === 0 && order === "left") {
                return prev;
            }
            return order === "left" ? prev - LIMIT : prev + LIMIT
        });
    }, []);

    return useMemo(() => (
        <div className="pokedex">
            <div className="header">
                <button className="icon-button" onClick={() => handleNavigation("left")} disabled={offset === 0}>
                    <img src="/icons/nav-arrow-left.svg" />
                </button>
                <select id="pokedex-select" name="pokedex" value={selectedPokedex} onChange={(event) => setSelectedPokedex(event.target.value)}>
                    {data.map(pokedex => (<option key={pokedex.name} value={pokedex.name}>{pokedex.name}</option>))}
                </select>
                <button className="icon-button" onClick={() => handleNavigation("right")}>
                    <img src="/icons/nav-arrow-right.svg" />
                </button>
            </div>
            <div className="content">
                <Pokemons pokedex={selectedPokedex} offset={offset}/>
            </div>
        </div>
    ), [data, offset, handleNavigation, selectedPokedex, setSelectedPokedex]);
}

export default Pokedex;