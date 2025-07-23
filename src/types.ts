// src/types.ts
// All TypeScript types for the Pokemon Battle Game

// Pokemon from PokeAPI
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    back_default?: string;
  };
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

// Simplified Pokemon for UI
export interface SimplePokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

// Battle System Types
export interface BattleState {
  playerRoster: BattlePokemon[]; // Player's 6 Pokemon team
  opponentRoster: BattlePokemon[]; // Opponent's 6 Pokemon team
  currentPlayerPokemon: BattlePokemon | null; // Currently fighting
  currentOpponentPokemon: BattlePokemon | null; // Currently fighting
  turn: "player" | "opponent";
  phase:
    | "player-selection"
    | "opponent-selection"
    | "battle"
    | "player-fainted"
    | "opponent-fainted"
    | "player-switch"
    | "result";
  battleLog: string[];
  result: "ongoing" | "win" | "lose";
  score: number;
  defeatedPlayerPokemon: string[];
  defeatedOpponentPokemon: string[];
}

export interface BattlePokemon {
  id: number;
  name: string;
  maxHp: number;
  currentHp: number;
  attack: number;
  defense: number;
  speed: number;
  types: string[];
  image: string;
}

// Database Types
export interface LeaderboardEntry {
  id: number;
  username: string;
  score: number;
  date: string;
}

// Form Types
export interface UsernameForm {
  username: string;
}

// API Response Types
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}
