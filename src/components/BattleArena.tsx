"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { BattleState, BattlePokemon } from "@/types";
import {
  processBattleRound,
  selectPokemonForBattle,
  getAvailablePokemon,
  selectOpponentPokemon,
} from "@/lib/battle";

interface BattleArenaProps {
  initialBattleState: BattleState;
  onBattleEnd: (result: "win" | "lose", score: number) => void;
}

export default function BattleArena({
  initialBattleState,
  onBattleEnd,
}: BattleArenaProps) {
  const [battleState, setBattleState] =
    useState<BattleState>(initialBattleState);
  const [isAnimating, setIsAnimating] = useState(false);

  // Automatic opponent attack handler
  const executeOpponentAttack = useCallback(
    (currentState: BattleState) => {
      console.log("Executing opponent attack...");
      setIsAnimating(true);

      setTimeout(() => {
        const opponentState = processBattleRound(currentState);
        console.log("Opponent attack result:", opponentState);
        setBattleState(opponentState);
        setIsAnimating(false);

        // Check if battle ended
        if (opponentState.result !== "ongoing") {
          setTimeout(() => {
            onBattleEnd(
              opponentState.result as "win" | "lose",
              opponentState.score
            );
          }, 2000);
        }
      }, 1500);
    },
    [onBattleEnd]
  );

  // Handle battle end
  useEffect(() => {
    if (battleState.phase === "result") {
      const timer = setTimeout(() => {
        onBattleEnd(battleState.result as "win" | "lose", battleState.score);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [battleState.phase, battleState.result, battleState.score, onBattleEnd]);

  // Handle automatic opponent turns when battle starts and opponent is faster
  useEffect(() => {
    if (
      battleState.phase === "battle" &&
      battleState.turn === "opponent" &&
      battleState.result === "ongoing" &&
      !isAnimating &&
      battleState.currentPlayerPokemon &&
      battleState.currentOpponentPokemon
    ) {
      console.log("Opponent starts first (faster speed)");
      executeOpponentAttack(battleState);
    }
  }, [battleState, isAnimating, executeOpponentAttack]);

  // Handle Pokemon selection
  const handlePokemonSelect = (pokemonIndex: number) => {
    console.log("Pokemon selected:", pokemonIndex);

    const newState = selectPokemonForBattle(battleState, pokemonIndex);
    console.log("After Pokemon selection:", newState.phase, newState.turn);

    // Auto-select opponent Pokemon if needed
    if (newState.phase === "battle" && !newState.currentOpponentPokemon) {
      const finalState = selectOpponentPokemon(newState);
      console.log("Battle ready - Turn:", finalState.turn);
      setBattleState(finalState);
    } else {
      setBattleState(newState);
    }
  };

  // Handle keeping current Pokemon during optional switch
  const handleKeepCurrent = () => {
    if (
      battleState.phase === "player-switch" &&
      battleState.currentPlayerPokemon
    ) {
      setTimeout(() => {
        const opponentState = selectOpponentPokemon(battleState);
        setBattleState(opponentState);
      }, 500);
    }
  };

  // Handle player move
  const handlePlayerMove = (moveType: string) => {
    if (
      battleState.result !== "ongoing" ||
      isAnimating ||
      !battleState.currentPlayerPokemon ||
      battleState.turn !== "player" ||
      battleState.phase !== "battle"
    ) {
      return;
    }

    console.log("Player attacks with:", moveType);
    setIsAnimating(true);

    // Process player attack
    setTimeout(() => {
      const newState = processBattleRound(battleState, moveType);
      console.log("Player attack result:", newState);
      setBattleState(newState);

      // Handle different battle outcomes
      if (
        newState.phase === "opponent-fainted" &&
        newState.result === "ongoing"
      ) {
        // Opponent Pokemon fainted - give player option to switch
        setIsAnimating(false);
        setTimeout(() => {
          setBattleState({ ...newState, phase: "player-switch" as const });
        }, 2000);
      } else if (
        newState.turn === "opponent" &&
        newState.result === "ongoing"
      ) {
        // Opponent's turn - execute their attack
        setTimeout(() => {
          executeOpponentAttack(newState);
        }, 500);
      } else if (newState.result !== "ongoing") {
        // Battle ended
        setIsAnimating(false);
        setTimeout(() => {
          onBattleEnd(newState.result as "win" | "lose", newState.score);
        }, 2000);
      } else {
        // Player still has turn (shouldn't happen normally)
        setIsAnimating(false);
      }
    }, 1000);
  };

  // Render Pokemon selection phase
  if (
    battleState.phase === "player-selection" ||
    battleState.phase === "player-fainted" ||
    battleState.phase === "player-switch"
  ) {
    const availablePokemon = getAvailablePokemon(battleState.playerRoster);
    const isSwitch = battleState.phase === "player-fainted";
    const isOptionalSwitch = battleState.phase === "player-switch";

    return (
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {isSwitch
              ? "Choose Your Next Pokemon!"
              : isOptionalSwitch
              ? "Switch Pokemon?"
              : "Choose Your First Pokemon!"}
          </h2>
          <p className="text-lg text-gray-600">
            {isSwitch
              ? "Your Pokemon fainted! Send out another one!"
              : isOptionalSwitch
              ? "Opponent is switching! You can switch too or stay with current Pokemon."
              : "Select which Pokemon leads your team into battle"}
          </p>
        </div>

        {/* Fainted notification */}
        {isSwitch && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center">
              <div className="text-4xl mr-4">😵</div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-800 mb-2">
                  Your Pokemon Fainted!
                </h3>
                <p className="text-yellow-700">
                  {
                    battleState.defeatedPlayerPokemon[
                      battleState.defeatedPlayerPokemon.length - 1
                    ]
                  }{" "}
                  is unable to battle. Choose your next Pokemon to continue
                  fighting!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Optional switch notification */}
        {isOptionalSwitch && (
          <div className="bg-blue-100 border-l-4 border-blue-500 rounded-xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-4xl mr-4">🔄</div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">
                    Switch Pokemon?
                  </h3>
                  <p className="text-blue-700">
                    Your opponent is sending out a new Pokemon! This is your
                    chance to switch too.
                  </p>
                </div>
              </div>
              <button
                onClick={handleKeepCurrent}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Keep {battleState.currentPlayerPokemon?.name}
              </button>
            </div>
          </div>
        )}

        {/* Team overview */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <TeamOverview
            title="Your Team"
            roster={battleState.playerRoster}
            isPlayer={true}
          />
          <TeamOverview
            title="Opponent Team"
            roster={battleState.opponentRoster}
            isPlayer={false}
          />
        </div>

        {/* Available Pokemon selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {availablePokemon.map((pokemon, index) => {
            const rosterIndex = battleState.playerRoster.findIndex(
              (p) => p.id === pokemon.id
            );
            const isCurrent =
              battleState.currentPlayerPokemon?.id === pokemon.id;

            return (
              <PokemonSelectionCard
                key={`available-${pokemon.id}-${index}`}
                pokemon={pokemon}
                isCurrent={isCurrent}
                onSelect={() => !isCurrent && handlePokemonSelect(rosterIndex)}
              />
            );
          })}
        </div>

        <BattleLog battleLog={battleState.battleLog} />
      </div>
    );
  }

  // Render opponent selection phase
  if (battleState.phase === "opponent-fainted") {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Opponent is choosing next Pokemon...
          </h2>
          <p className="text-gray-600">Please wait...</p>
        </div>
        <BattleLog battleLog={battleState.battleLog} />
      </div>
    );
  }

  // Render main battle phase
  if (
    battleState.phase === "battle" &&
    battleState.currentPlayerPokemon &&
    battleState.currentOpponentPokemon
  ) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        {/* Battle field */}
        <div className="bg-gradient-to-b from-green-200 to-green-400 rounded-xl p-8 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-white bg-opacity-10 rounded-xl"></div>
          </div>

          <div className="grid grid-cols-2 gap-8 relative z-10">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Your Pokemon
              </h3>
              <PokemonBattleCard
                pokemon={battleState.currentPlayerPokemon}
                isPlayer={true}
                isAnimating={isAnimating && battleState.turn === "player"}
              />
            </div>

            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-xl shadow-lg">
                VS
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Opponent Pokemon
              </h3>
              <PokemonBattleCard
                pokemon={battleState.currentOpponentPokemon}
                isPlayer={false}
                isAnimating={isAnimating && battleState.turn === "opponent"}
              />
            </div>
          </div>
        </div>

        {/* Team status */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <TeamStatus
            title="Your Team"
            roster={battleState.playerRoster}
            currentPokemon={battleState.currentPlayerPokemon}
            isPlayer={true}
          />
          <TeamStatus
            title="Opponent Team"
            roster={battleState.opponentRoster}
            currentPokemon={battleState.currentOpponentPokemon}
            isPlayer={false}
          />
        </div>

        {/* Battle controls */}
        {battleState.result === "ongoing" &&
          battleState.phase === "battle" &&
          battleState.turn === "player" && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-center mb-4">
                Choose your move!
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {battleState.currentPlayerPokemon.types.map((type, index) => (
                  <button
                    key={index}
                    onClick={() => handlePlayerMove(type)}
                    disabled={isAnimating}
                    className={`px-6 py-3 rounded-lg font-semibold text-white transition-all transform hover:scale-105 ${getTypeColor(
                      type
                    )} ${
                      isAnimating
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:shadow-lg"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)} Attack
                  </button>
                ))}
              </div>

              {isAnimating && (
                <div className="text-center mt-4">
                  <div className="animate-pulse text-gray-600">
                    Battle in progress...
                  </div>
                </div>
              )}
            </div>
          )}

        {/* Opponent turn indicator */}
        {battleState.phase === "battle" &&
          battleState.turn === "opponent" &&
          battleState.result === "ongoing" && (
            <div className="bg-red-100 rounded-xl shadow-lg p-6 mb-6 text-center">
              <h3 className="text-xl font-semibold text-red-800 mb-2">
                Opponent&apos;s Turn
              </h3>
              <div className="animate-pulse text-red-600">
                {isAnimating
                  ? "Opponent is attacking..."
                  : "Opponent is thinking..."}
              </div>
            </div>
          )}

        <BattleLog battleLog={battleState.battleLog} />
      </div>
    );
  }

  // Render battle result phase
  if (battleState.phase === "result") {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="text-6xl mb-4">
          {battleState.result === "win" ? "🏆" : "💔"}
        </div>
        <h2 className="text-3xl font-bold mb-4">
          {battleState.result === "win" ? "Victory!" : "Defeat!"}
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          {battleState.result === "win"
            ? `You won the battle! Score: ${battleState.score} points`
            : "Better luck next time!"}
        </p>
        <div className="animate-pulse text-gray-500">
          Returning to results...
        </div>
        <BattleLog battleLog={battleState.battleLog.slice(-5)} />
      </div>
    );
  }

  // Error state
  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <div className="text-red-500">
        <h2 className="text-2xl font-bold mb-2">Battle System Error</h2>
        <p>Phase: {battleState.phase}</p>
        <p>
          Player Pokemon:{" "}
          {battleState.currentPlayerPokemon ? "Available" : "Missing"}
        </p>
        <p>
          Opponent Pokemon:{" "}
          {battleState.currentOpponentPokemon ? "Available" : "Missing"}
        </p>
      </div>
    </div>
  );
}

// Component: Pokemon Battle Card
function PokemonBattleCard({
  pokemon,
  isPlayer,
  isAnimating,
}: {
  pokemon: BattlePokemon;
  isPlayer: boolean;
  isAnimating: boolean;
}) {
  const hpPercentage = (pokemon.currentHp / pokemon.maxHp) * 100;

  return (
    <div
      className={`bg-white rounded-xl p-4 shadow-lg border-2 ${
        isPlayer ? "border-blue-300" : "border-red-300"
      } ${isAnimating ? "animate-pulse" : ""}`}
    >
      <div className="relative">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={80}
          height={80}
          className={`w-32 h-32 mx-auto ${isAnimating ? "animate-bounce" : ""}`}
        />
        {isAnimating && (
          <div className="absolute inset-0 bg-yellow-400 opacity-30 rounded-lg animate-ping"></div>
        )}
      </div>

      <h4 className="text-xl font-bold text-center capitalize mt-2 mb-3">
        {pokemon.name}
      </h4>

      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>HP</span>
          <span>
            {pokemon.currentHp}/{pokemon.maxHp}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              hpPercentage > 50
                ? "bg-green-500"
                : hpPercentage > 25
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{ width: `${hpPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-center gap-1">
        {pokemon.types.map((type, index) => (
          <span
            key={index}
            className={`px-2 py-1 rounded-full text-xs text-white ${getTypeColor(
              type
            )}`}
          >
            {type}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3 text-xs text-gray-600">
        <div className="text-center">
          <div className="font-semibold">ATK</div>
          <div>{pokemon.attack}</div>
        </div>
        <div className="text-center">
          <div className="font-semibold">DEF</div>
          <div>{pokemon.defense}</div>
        </div>
        <div className="text-center">
          <div className="font-semibold">SPD</div>
          <div>{pokemon.speed}</div>
        </div>
      </div>
    </div>
  );
}

// Component: Pokemon Selection Card
function PokemonSelectionCard({
  pokemon,
  isCurrent,
  onSelect,
}: {
  pokemon: BattlePokemon;
  isCurrent: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all ${
        isCurrent
          ? "border-green-500 bg-green-50 cursor-not-allowed opacity-75"
          : "border-blue-300 hover:border-blue-500 cursor-pointer transform hover:scale-105"
      }`}
    >
      <div className="text-center">
        {isCurrent && (
          <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full mb-2 inline-block">
            CURRENT
          </div>
        )}
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={80}
          height={80}
          className="w-24 h-24 mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold capitalize text-gray-800 mb-2">
          {pokemon.name}
        </h3>

        <div className="mb-3">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>HP</span>
            <span>
              {pokemon.currentHp}/{pokemon.maxHp}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                pokemon.currentHp / pokemon.maxHp > 0.5
                  ? "bg-green-500"
                  : pokemon.currentHp / pokemon.maxHp > 0.25
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${(pokemon.currentHp / pokemon.maxHp) * 100}%` }}
            ></div>
          </div>
        </div>

        <button
          disabled={isCurrent}
          className={`w-full py-2 rounded-lg transition-colors font-semibold ${
            isCurrent
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isCurrent ? "Currently Fighting" : `Send out ${pokemon.name}!`}
        </button>
      </div>
    </div>
  );
}

// Component: Team Overview (for selection phase)
function TeamOverview({
  title,
  roster,
  isPlayer,
}: {
  title: string;
  roster: BattlePokemon[];
  isPlayer: boolean;
}) {
  return (
    <div className={`rounded-xl p-6 ${isPlayer ? "bg-blue-50" : "bg-red-50"}`}>
      <h3
        className={`text-xl font-semibold mb-4 text-center ${
          isPlayer ? "text-blue-800" : "text-red-800"
        }`}
      >
        {title}
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {roster.map((pokemon, index) => (
          <div
            key={`${isPlayer ? "player" : "opponent"}-${pokemon.id}-${index}`}
            className={`text-center p-2 rounded-lg border-2 ${
              pokemon.currentHp > 0
                ? isPlayer
                  ? "border-green-300 bg-white"
                  : "border-red-300 bg-white"
                : "border-gray-300 bg-gray-50 opacity-50"
            }`}
          >
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={80}
              height={80}
              className="w-12 h-12 mx-auto mb-1"
            />
            <div className="text-xs font-medium capitalize">{pokemon.name}</div>
            <div className="text-xs text-gray-600">
              {pokemon.currentHp > 0
                ? `${pokemon.currentHp}/${pokemon.maxHp} HP`
                : "Fainted"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Component: Team Status (for battle phase)
function TeamStatus({
  title,
  roster,
  currentPokemon,
  isPlayer,
}: {
  title: string;
  roster: BattlePokemon[];
  currentPokemon: BattlePokemon | null;
  isPlayer: boolean;
}) {
  return (
    <div
      className={`rounded-xl shadow-lg p-4 ${
        isPlayer ? "bg-blue-50" : "bg-red-50"
      }`}
    >
      <h3
        className={`text-lg font-semibold text-center mb-3 ${
          isPlayer ? "text-blue-800" : "text-red-800"
        }`}
      >
        {title}
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {roster.map((pokemon, index) => (
          <div
            key={`battle-${isPlayer ? "player" : "opponent"}-${
              pokemon.id
            }-${index}`}
            className={`relative rounded-lg border-2 flex flex-col items-center justify-center p-2 ${
              pokemon.currentHp > 0
                ? pokemon.id === currentPokemon?.id
                  ? isPlayer
                    ? "border-blue-500 bg-blue-200"
                    : "border-red-500 bg-red-200"
                  : isPlayer
                  ? "border-green-500 bg-green-100"
                  : "border-orange-500 bg-orange-100"
                : "border-gray-500 bg-gray-100 opacity-50"
            }`}
            title={`${pokemon.name}: ${pokemon.currentHp}/${pokemon.maxHp} HP`}
          >
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width={80}
              height={80}
              className="w-12 h-12 object-contain mb-1"
            />

            {pokemon.currentHp <= 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                <span className="text-2xl">💀</span>
              </div>
            )}

            {pokemon.id === currentPokemon?.id && pokemon.currentHp > 0 && (
              <div
                className={`absolute -top-1 -right-1 text-white text-xs px-1 py-0.5 rounded-full ${
                  isPlayer ? "bg-blue-500" : "bg-red-500"
                }`}
              >
                {isPlayer ? "⚔️" : "🔥"}
              </div>
            )}

            <div className="text-xs truncate w-full text-center font-semibold">
              {pokemon.name.slice(0, 6)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Component: Battle Log
function BattleLog({ battleLog }: { battleLog: string[] }) {
  return (
    <div className="bg-gray-900 text-green-400 rounded-xl p-6 font-mono text-sm max-h-48 overflow-y-auto">
      <h3 className="text-white font-semibold mb-2">Battle Log:</h3>
      {battleLog.map((message, index) => (
        <div key={index} className="mb-1">
          &gt; {message}
        </div>
      ))}
    </div>
  );
}

// Utility: Get Pokemon type color
function getTypeColor(type: string): string {
  const colors: { [key: string]: string } = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-500",
    psychic: "bg-pink-500",
    ice: "bg-blue-300",
    dragon: "bg-purple-600",
    dark: "bg-gray-800",
    fairy: "bg-pink-300",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    bug: "bg-green-400",
    rock: "bg-yellow-800",
    ghost: "bg-purple-700",
    steel: "bg-gray-500",
    normal: "bg-gray-400",
  };

  return colors[type] || "bg-gray-400";
}
