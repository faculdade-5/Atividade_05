import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Pokemon } from '../models/Pokemon';
import PokemonService from '../service/PokemonService';

export const PokemonController = () => {
    const { state, dispatch } = useAppContext();
    const { pokemons, loading, error, hasMore, offset, showStats, showTypes, showAbilities } = state;

    const loadPokemons = async (reset: boolean = false) => {
        if (loading) return;

        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });

        try {
            const currentOffset = reset ? 0 : offset;
            const response = await PokemonService.getPokemonList(20, currentOffset);
            
            // Enriquecer dados dos Pokémons com informações da PokeAPI
            const enrichedPokemons = await Promise.all(
                response.results.map(async (pokemon) => {
                    const pokemonId = parseInt(pokemon.url.split('/').slice(-2, -1)[0]);
                    const enrichedPokemon: Pokemon = {
                        ...pokemon,
                        id: pokemonId,
                        image: PokemonService.getPokemonImageUrl(pokemonId)
                    };

                    // Adicionar estatísticas se habilitado
                    if (showStats) {
                        enrichedPokemon.stats = await PokemonService.getPokemonStats(pokemonId);
                    }

                    // Adicionar tipos se habilitado
                    if (showTypes) {
                        enrichedPokemon.types = await PokemonService.getPokemonTypes(pokemonId);
                    }

                    // Adicionar habilidades se habilitado
                    if (showAbilities) {
                        enrichedPokemon.abilities = await PokemonService.getPokemonAbilities(pokemonId);
                    }

                    // Adicionar detalhes básicos (altura e peso)
                    const details = await PokemonService.getPokemonDetails(pokemonId);
                    enrichedPokemon.height = details.height;
                    enrichedPokemon.weight = details.weight;

                    return enrichedPokemon;
                })
            );

            if (reset) {
                dispatch({ type: 'SET_POKEMONS', payload: enrichedPokemons });
            } else {
                dispatch({ type: 'ADD_POKEMONS', payload: enrichedPokemons });
            }

            dispatch({ type: 'SET_OFFSET', payload: currentOffset + 20 });
            dispatch({ type: 'SET_HAS_MORE', payload: !!response.next });
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err instanceof Error ? err.message : 'Erro desconhecido' });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const refreshPokemons = () => {
        dispatch({ type: 'RESET_POKEMONS' });
        loadPokemons(true);
    };

    const loadMorePokemons = () => {
        if (hasMore && !loading) {
            loadPokemons(false);
        }
    };


    useEffect(() => {
        loadPokemons(true);
    }, []);

    return {
        pokemons,
        loading,
        error,
        hasMore,
        refreshPokemons,
        loadMorePokemons,
        showStats,
        showTypes,
        showAbilities
    };
};

export default PokemonController;
