import axios from 'axios';
import { PokemonAbility, PokemonListResponse, PokemonStats, PokemonType } from '../models/Pokemon';

class PokemonService {
    private baseUrl = 'https://pokeapi.co/api/v2';

    public async getPokemonList(limit: number = 20, offset: number = 0): Promise<PokemonListResponse> {
        try {
            const response = await axios.get(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar lista de Pokémons:', error);
            throw new Error('Falha ao carregar Pokémons');
        }
    }


    public getPokemonImageUrl(pokemonId: number): string {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    }

    public getPokemonImageUrlShiny(pokemonId: number): string {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonId}.png`;
    }

    public async getPokemonTypes(pokemonId: number): Promise<PokemonType[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/pokemon/${pokemonId}`);
            return response.data.types.map((type: any) => ({
                name: type.type.name,
                url: type.type.url
            }));
        } catch (error) {
            console.error('Erro ao buscar tipos do Pokémon:', error);
            return [];
        }
    }

    public async getPokemonAbilities(pokemonId: number): Promise<PokemonAbility[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/pokemon/${pokemonId}`);
            return response.data.abilities.map((ability: any) => ({
                name: ability.ability.name,
                is_hidden: ability.is_hidden
            }));
        } catch (error) {
            console.error('Erro ao buscar habilidades do Pokémon:', error);
            return [];
        }
    }

    public async getPokemonDetails(pokemonId: number): Promise<{ height: number; weight: number }> {
        try {
            const response = await axios.get(`${this.baseUrl}/pokemon/${pokemonId}`);
            return {
                height: response.data.height,
                weight: response.data.weight
            };
        } catch (error) {
            console.error('Erro ao buscar detalhes do Pokémon:', error);
            return { height: 0, weight: 0 };
        }
    }

    public async getPokemonStats(pokemonId: number): Promise<PokemonStats> {
        try {
            const response = await axios.get(`${this.baseUrl}/pokemon/${pokemonId}`);
            const stats = response.data.stats;
            
            return {
                hp: stats[0].base_stat,
                attack: stats[1].base_stat,
                defense: stats[2].base_stat,
                speed: stats[5].base_stat,
                specialAttack: stats[3].base_stat,
                specialDefense: stats[4].base_stat
            };
        } catch (error) {
            console.error('Erro ao buscar estatísticas do Pokémon:', error);
            return {
                hp: 50,
                attack: 50,
                defense: 50,
                speed: 50,
                specialAttack: 50,
                specialDefense: 50
            };
        }
    }
}

export default new PokemonService();
