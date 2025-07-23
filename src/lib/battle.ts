// Pokemon Battle Logic Engine

import type { Pokemon, BattlePokemon, BattleState } from "@/types";

// Type effectiveness matrix
const TYPE_EFFECTIVENESS: { [key: string]: { [key: string]: number } } = {
  fire: {
    grass: 2,
    ice: 2,
    bug: 2,
    steel: 2,
    water: 0.5,
    fire: 0.5,
    rock: 0.5,
    dragon: 0.5,
  },
  water: { fire: 2, ground: 2, rock: 2, grass: 0.5, water: 0.5, dragon: 0.5 },
  grass: {
    water: 2,
    ground: 2,
    rock: 2,
    fire: 0.5,
    grass: 0.5,
    poison: 0.5,
    flying: 0.5,
    bug: 0.5,
    dragon: 0.5,
    steel: 0.5,
  },
  electric: {
    water: 2,
    flying: 2,
    ground: 0,
    grass: 0.5,
    electric: 0.5,
    dragon: 0.5,
  },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, steel: 0.5, dark: 0 },
  ice: {
    grass: 2,
    ground: 2,
    flying: 2,
    dragon: 2,
    fire: 0.5,
    water: 0.5,
    ice: 0.5,
    steel: 0.5,
  },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { psychic: 2, ghost: 2, fighting: 0.5, dark: 0.5, fairy: 0.5 },
  fairy: {
    fighting: 2,
    dragon: 2,
    dark: 2,
    fire: 0.5,
    poison: 0.5,
    steel: 0.5,
  },
  fighting: {
    normal: 2,
    ice: 2,
    rock: 2,
    dark: 2,
    steel: 2,
    poison: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    fairy: 0.5,
    ghost: 0,
  },
  poison: {
    grass: 2,
    fairy: 2,
    poison: 0.5,
    ground: 0.5,
    rock: 0.5,
    ghost: 0.5,
    steel: 0,
  },
  ground: {
    fire: 2,
    electric: 2,
    poison: 2,
    rock: 2,
    steel: 2,
    grass: 0.5,
    bug: 0.5,
    flying: 0,
  },
  flying: {
    electric: 2,
    ice: 2,
    rock: 2,
    grass: 0.5,
    fighting: 0.5,
    bug: 0.5,
    steel: 0.5,
  },
  bug: {
    grass: 2,
    psychic: 2,
    dark: 2,
    fire: 0.5,
    fighting: 0.5,
    poison: 0.5,
    flying: 0.5,
    ghost: 0.5,
    steel: 0.5,
    fairy: 0.5,
  },
  rock: {
    fire: 2,
    ice: 2,
    flying: 2,
    bug: 2,
    fighting: 0.5,
    ground: 0.5,
    steel: 0.5,
  },
  ghost: { psychic: 2, ghost: 2, dark: 0.5, normal: 0 },
  steel: {
    ice: 2,
    rock: 2,
    fairy: 2,
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    steel: 0.5,
  },
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
};

// Convert Pokemon from PokeAPI to BattlePokemon
export function convertToBattlePokemon(pokemon: Pokemon): BattlePokemon {
  const stats: { [key: string]: number } = pokemon.stats.reduce((acc, stat) => {
    const statName = stat.stat.name.replace("-", "_");
    acc[statName] = stat.base_stat;
    return acc;
  }, {} as { [key: string]: number });

  const hp = stats.hp || 100;

  return {
    id: pokemon.id,
    name: pokemon.name,
    maxHp: hp,
    currentHp: hp,
    attack: stats.attack || 50,
    defense: stats.defense || 50,
    speed: stats.speed || 50,
    types: pokemon.types.map((t) => t.type.name),
    image: pokemon.sprites.front_default,
  };
}

// Get type effectiveness multiplier
export function getTypeEffectiveness(
  attackerType: string,
  defenderTypes: string[]
): number {
  let multiplier = 1;

  for (const defenderType of defenderTypes) {
    const effectiveness = TYPE_EFFECTIVENESS[attackerType]?.[defenderType] ?? 1;
    multiplier *= effectiveness;
  }

  return multiplier;
}

// Calculate damage
export function calculateDamage(
  attacker: BattlePokemon,
  defender: BattlePokemon,
  moveType?: string
): number {
  // Base damage calculation
  const baseDamage = Math.floor((attacker.attack / defender.defense) * 30);

  // Add some randomness (0.85 - 1.15)
  const randomFactor = 0.85 + Math.random() * 0.3;

  // Type effectiveness
  const attackType = moveType || attacker.types[0];
  const typeMultiplier = getTypeEffectiveness(attackType, defender.types);

  // Final damage
  const finalDamage = Math.floor(baseDamage * randomFactor * typeMultiplier);

  // Minimum 1 damage
  return Math.max(1, finalDamage);
}

// Execute a battle turn
export function executeBattleTurn(
  attacker: BattlePokemon,
  defender: BattlePokemon,
  moveType?: string
): {
  damage: number;
  effectiveness: string;
  newDefenderHp: number;
  battleMessage: string;
} {
  const damage = calculateDamage(attacker, defender, moveType);
  const newDefenderHp = Math.max(0, defender.currentHp - damage);

  // Determine effectiveness message
  const typeMultiplier = getTypeEffectiveness(
    moveType || attacker.types[0],
    defender.types
  );
  let effectiveness = "";

  if (typeMultiplier > 1) {
    effectiveness = "It's super effective!";
  } else if (typeMultiplier < 1) {
    effectiveness = "It's not very effective...";
  } else if (typeMultiplier === 0) {
    effectiveness = "It has no effect!";
  }

  const battleMessage =
    `${attacker.name} attacks ${defender.name} for ${damage} damage! ${effectiveness}`.trim();

  return {
    damage,
    effectiveness,
    newDefenderHp,
    battleMessage,
  };
}

// Check if Pokemon is fainted
export function isPokemonFainted(pokemon: BattlePokemon): boolean {
  return pokemon.currentHp <= 0;
}

// AI opponent move (simple)
export function getOpponentMove(opponent: BattlePokemon): string {
  // Simple AI: randomly choose from Pokemon's types
  return opponent.types[Math.floor(Math.random() * opponent.types.length)];
}

// Generate random opponent team (6 Pokemon)
export async function generateOpponentTeam(): Promise<BattlePokemon[]> {
  const teamSize = 6;
  const promises = [];

  for (let i = 0; i < teamSize; i++) {
    const randomId = Math.floor(Math.random() * 150) + 1;
    promises.push(
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
        .then((response) => response.json())
        .then((pokemon) => convertToBattlePokemon(pokemon))
    );
  }

  return Promise.all(promises);
}

// Initialize 6v6 battle state
export function initializeBattle(
  playerRoster: BattlePokemon[],
  opponentRoster: BattlePokemon[]
): BattleState {
  return {
    playerRoster: playerRoster.map((p) => ({ ...p })),
    opponentRoster: opponentRoster.map((p) => ({ ...p })),
    currentPlayerPokemon: null,
    currentOpponentPokemon: null,
    turn: "player",
    phase: "player-selection",
    battleLog: ["A Trainer appeared!", "Choose your first Pokemon!"],
    result: "ongoing",
    score: 0,
    defeatedPlayerPokemon: [],
    defeatedOpponentPokemon: [],
  };
}

// Select Pokemon from roster for battle
export function selectPokemonForBattle(
  battleState: BattleState,
  pokemonIndex: number
): BattleState {
  const selectedPokemon = battleState.playerRoster[pokemonIndex];

  if (!selectedPokemon || selectedPokemon.currentHp <= 0) {
    return battleState; // Invalid selection
  }

  // Determine turn based on speed comparison with current opponent
  let newTurn: "player" | "opponent" = "player";

  if (battleState.currentOpponentPokemon) {
    // If there's an active opponent, compare speeds
    newTurn =
      selectedPokemon.speed >= battleState.currentOpponentPokemon.speed
        ? "player"
        : "opponent";
  } else {
    // If no opponent Pokemon active, player goes first
    newTurn = "player";
  }

  console.log("Pokemon selection:", {
    selectedPokemon: selectedPokemon.name,
    opponentPokemon: battleState.currentOpponentPokemon?.name || "none",
    newTurn,
    phase: battleState.phase,
  });

  return {
    ...battleState,
    currentPlayerPokemon: selectedPokemon,
    turn: newTurn,
    phase: "battle",
    battleLog: [...battleState.battleLog, `Go ${selectedPokemon.name}!`],
  };
}

// AI selects Pokemon for opponent
export function selectOpponentPokemon(battleState: BattleState): BattleState {
  const availableOpponentPokemon = getAvailablePokemon(
    battleState.opponentRoster
  );

  console.log(
    "Available opponent Pokemon:",
    availableOpponentPokemon.map(
      (p) => `${p.name} (${p.currentHp}/${p.maxHp} HP)`
    )
  );

  if (availableOpponentPokemon.length === 0) {
    return {
      ...battleState,
      result: "win",
      phase: "result",
      battleLog: [
        ...battleState.battleLog,
        "All opponent Pokemon fainted! You win!",
      ],
    };
  }

  // Simple AI: choose first available Pokemon that's not already selected
  const selectedPokemon =
    availableOpponentPokemon.find(
      (p) => p.id !== battleState.currentOpponentPokemon?.id && p.currentHp > 0
    ) || availableOpponentPokemon[0];

  console.log(
    "Opponent selects:",
    selectedPokemon.name,
    `(${selectedPokemon.currentHp}/${selectedPokemon.maxHp} HP)`
  );

  // Determine turn: if player just switched, opponent goes first
  let newTurn: "player" | "opponent" = "player";
  if (battleState.currentPlayerPokemon) {
    newTurn =
      battleState.currentPlayerPokemon.speed >= selectedPokemon.speed
        ? "player"
        : "opponent";
  }

  console.log("New turn after opponent selection:", newTurn);

  return {
    ...battleState,
    currentOpponentPokemon: selectedPokemon,
    turn: newTurn,
    phase: "battle",
    battleLog: [
      ...battleState.battleLog,
      `Opponent sends out ${selectedPokemon.name}!`,
    ],
  };
}

// Check if team has any usable Pokemon left
export function hasUsablePokemon(roster: BattlePokemon[]): boolean {
  return roster.some((pokemon) => pokemon.currentHp > 0);
}

// Get available Pokemon for selection
export function getAvailablePokemon(roster: BattlePokemon[]): BattlePokemon[] {
  return roster.filter((pokemon) => pokemon.currentHp > 0);
}

// Complete 6v6 battle turn with proper turn management
export function processBattleRound(
  battleState: BattleState,
  playerMoveType?: string
): BattleState {
  const newState = { ...battleState };
  const newLog = [...battleState.battleLog];

  if (!newState.currentPlayerPokemon || !newState.currentOpponentPokemon) {
    return newState;
  }

  if (battleState.turn === "player" && playerMoveType) {
    // Player attacks
    const playerAttack = executeBattleTurn(
      newState.currentPlayerPokemon,
      newState.currentOpponentPokemon,
      playerMoveType
    );

    // Update opponent Pokemon HP in roster
    const opponentIndex = newState.opponentRoster.findIndex(
      (p) => p.id === newState.currentOpponentPokemon!.id
    );
    if (opponentIndex !== -1) {
      newState.opponentRoster[opponentIndex] = {
        ...newState.opponentRoster[opponentIndex],
        currentHp: playerAttack.newDefenderHp,
      };
      newState.currentOpponentPokemon = newState.opponentRoster[opponentIndex];
    }

    newLog.push(playerAttack.battleMessage);

    // Check if opponent Pokemon fainted
    if (isPokemonFainted(newState.currentOpponentPokemon)) {
      newState.defeatedOpponentPokemon.push(
        newState.currentOpponentPokemon.name
      );
      newLog.push(`${newState.currentOpponentPokemon.name} fainted!`);

      console.log(
        "Opponent Pokemon fainted:",
        newState.currentOpponentPokemon.name
      );
      console.log(
        "Opponent roster after faint:",
        newState.opponentRoster.map(
          (p) => `${p.name} (${p.currentHp}/${p.maxHp})`
        )
      );

      // Check if opponent has more Pokemon
      if (hasUsablePokemon(newState.opponentRoster)) {
        newState.phase = "opponent-fainted";
        newState.currentOpponentPokemon = null;
        newState.turn = "player";
        newLog.push(
          "Opponent's Pokemon fainted! They will send out a new Pokemon..."
        );
        newLog.push("You can also switch Pokemon if you want!");
      } else {
        // All opponent Pokemon fainted - player wins!
        newState.result = "win";
        newState.score = calculateTeamBattleScore(newState);
        newState.phase = "result";
        newLog.push("All opponent Pokemon fainted! You win the battle!");
      }
    } else {
      // Switch to opponent turn
      newState.turn = "opponent";
    }
  } else if (battleState.turn === "opponent") {
    // Opponent attacks automatically
    const opponentMoveType = getOpponentMove(newState.currentOpponentPokemon);
    const opponentAttack = executeBattleTurn(
      newState.currentOpponentPokemon,
      newState.currentPlayerPokemon,
      opponentMoveType
    );

    // Update player Pokemon HP in roster
    const playerIndex = newState.playerRoster.findIndex(
      (p) => p.id === newState.currentPlayerPokemon!.id
    );
    if (playerIndex !== -1) {
      newState.playerRoster[playerIndex] = {
        ...newState.playerRoster[playerIndex],
        currentHp: opponentAttack.newDefenderHp,
      };
      newState.currentPlayerPokemon = newState.playerRoster[playerIndex];
    }

    newLog.push(opponentAttack.battleMessage);

    // Check if player Pokemon fainted
    if (isPokemonFainted(newState.currentPlayerPokemon)) {
      newState.defeatedPlayerPokemon.push(newState.currentPlayerPokemon.name);
      newLog.push(`${newState.currentPlayerPokemon.name} fainted!`);

      // Check if player has more Pokemon
      if (hasUsablePokemon(newState.playerRoster)) {
        newState.phase = "player-fainted";
        newState.currentPlayerPokemon = null;
        newState.turn = "player";
        newLog.push("Choose your next Pokemon!");
      } else {
        // All player Pokemon fainted - player loses!
        newState.result = "lose";
        newState.phase = "result";
        newLog.push("All your Pokemon fainted! You lose the battle!");
      }
    } else {
      // Switch back to player turn
      newState.turn = "player";
    }
  }

  newState.battleLog = newLog;
  return newState;
}

// Calculate score for 6v6 team battle
function calculateTeamBattleScore(battleState: BattleState): number {
  let score = 0;

  // Base score for winning
  score += 200;

  // Bonus for each opponent Pokemon defeated
  score += battleState.defeatedOpponentPokemon.length * 50;

  // Bonus for surviving Pokemon
  const survivingPlayerPokemon = battleState.playerRoster.filter(
    (p) => p.currentHp > 0
  );
  score += survivingPlayerPokemon.length * 30;

  // Bonus for total remaining HP percentage
  const totalPlayerHp = battleState.playerRoster.reduce(
    (sum, p) => sum + p.currentHp,
    0
  );
  const totalPlayerMaxHp = battleState.playerRoster.reduce(
    (sum, p) => sum + p.maxHp,
    0
  );
  const hpBonus = Math.floor((totalPlayerHp / totalPlayerMaxHp) * 100);
  score += hpBonus;

  // Penalty for Pokemon lost
  score -= battleState.defeatedPlayerPokemon.length * 20;

  return Math.max(0, score);
}
