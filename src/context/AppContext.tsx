import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { Pokemon } from '../models/Pokemon';

export interface AppState {
    pokemons: Pokemon[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    offset: number;
    showStats: boolean;
    showTypes: boolean;
}

export type AppAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'SET_POKEMONS'; payload: Pokemon[] }
    | { type: 'ADD_POKEMONS'; payload: Pokemon[] }
    | { type: 'SET_HAS_MORE'; payload: boolean }
    | { type: 'SET_OFFSET'; payload: number }
    | { type: 'RESET_POKEMONS' };

const initialState: AppState = {
    pokemons: [],
    loading: false,
    error: null,
    hasMore: true,
    offset: 0,
    showStats: true,
    showTypes: true,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        
        case 'SET_POKEMONS':
            return { ...state, pokemons: action.payload };
        
        case 'ADD_POKEMONS':
            return { ...state, pokemons: [...state.pokemons, ...action.payload] };
        
        case 'SET_HAS_MORE':
            return { ...state, hasMore: action.payload };
        
        case 'SET_OFFSET':
            return { ...state, offset: action.payload };
        
        case 'RESET_POKEMONS':
            return { ...state, pokemons: [], offset: 0, hasMore: true };
        
        default:
            return state;
    }
};

interface AppContextType {
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext deve ser usado dentro de um AppProvider');
    }
    return context;
};

export default AppContext;
