"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BattleArena from "@/components/BattleArena";
import { getRoster } from "@/lib/roster";
import {
  generateOpponentTeam,
  convertToBattlePokemon,
  initializeBattle,
} from "@/lib/battle";
import type { Pokemon, BattleState } from "@/types";

type PagePhase =
  | "loading"
  | "roster-empty"
  | "team-ready"
  | "opponent-loading"
  | "battle"
  | "result";

interface BattleResult {
  result: "win" | "lose";
  score: number;
  playerPokemon: string;
  opponentPokemon: string;
}

export default function BattlePage() {
  const router = useRouter();
  const [phase, setPhase] = useState<PagePhase>("loading");
  const [roster, setRoster] = useState<Pokemon[]>([]);
  const [battleState, setBattleState] = useState<BattleState | null>(null);
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null);
  const [lastBattleResult, setLastBattleResult] = useState<BattleResult | null>(
    null
  );

  // Load roster on mount
  useEffect(() => {
    loadRoster();
  }, []);

  async function loadRoster() {
    try {
      const rosterIds = getRoster();

      if (rosterIds.length === 0) {
        setPhase("roster-empty");
        return;
      }

      // Fetch Pokemon data
      const promises = rosterIds.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
          res.json()
        )
      );

      const pokemonData = await Promise.all(promises);
      setRoster(pokemonData);
      setPhase("team-ready");
    } catch (error) {
      console.error("Error loading roster:", error);
      setPhase("roster-empty");
    }
  }

  async function startTeamBattle() {
    setPhase("opponent-loading");

    try {
      // Generate opponent team of 6 Pokemon
      const opponentTeam = await generateOpponentTeam();

      // Convert entire roster to battle Pokemon
      const promises = roster.map((p) =>
        Promise.resolve(convertToBattlePokemon(p))
      );
      const playerRoster = await Promise.all(promises);

      // Initialize 6v6 battle
      const initialBattleState = initializeBattle(playerRoster, opponentTeam);

      setBattleState(initialBattleState);
      setPhase("battle");
    } catch (error) {
      console.error("Error starting battle:", error);
      setPhase("team-ready");
    }
  }

  function handleBattleEnd(result: "win" | "lose", score: number) {
    console.log("handleBattleEnd called:", { result, score });
    console.log("Current battleState:", battleState);

    // Try to get Pokemon names from defeated lists if current ones are null
    let playerPokemonName = "Unknown Pokemon";
    let opponentPokemonName = "Unknown Pokemon";

    if (battleState?.currentPlayerPokemon) {
      playerPokemonName = battleState.currentPlayerPokemon.name;
    } else if (
      battleState?.defeatedPlayerPokemon &&
      battleState.defeatedPlayerPokemon.length > 0
    ) {
      // Use last defeated player Pokemon if current is null
      playerPokemonName =
        battleState.defeatedPlayerPokemon[
          battleState.defeatedPlayerPokemon.length - 1
        ];
    }

    if (battleState?.currentOpponentPokemon) {
      opponentPokemonName = battleState.currentOpponentPokemon.name;
    } else if (
      battleState?.defeatedOpponentPokemon &&
      battleState.defeatedOpponentPokemon.length > 0
    ) {
      // Use last defeated opponent Pokemon if current is null
      opponentPokemonName =
        battleState.defeatedOpponentPokemon[
          battleState.defeatedOpponentPokemon.length - 1
        ];
    }

    const newBattleResult = {
      result,
      score,
      playerPokemon: playerPokemonName,
      opponentPokemon: opponentPokemonName,
    };

    console.log("Setting battle result:", newBattleResult);
    setBattleResult(newBattleResult);
    setLastBattleResult(newBattleResult);
    setPhase("result");
  }

  function handlePlayAgain() {
    setBattleState(null);
    setBattleResult(null);
    setPhase("team-ready");
  }

  function goToLeaderboard() {
    if (lastBattleResult) {
      // Instead of sessionStorage, pass the result through router state or context
      // For now, we'll just navigate - you might want to implement a context or state management
      console.log("Battle result for leaderboard:", lastBattleResult);
    }
    router.push("/leaderboard");
  }

  // Loading phase
  if (phase === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading battle system...</p>
        </div>
      </div>
    );
  }

  // Empty roster phase
  if (phase === "roster-empty") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 py-8">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4">⚔️</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            No Pokemon in Roster!
          </h1>
          <p className="text-gray-600 mb-8">
            You need at least one Pokemon in your roster to battle.
          </p>
          <div className="space-y-4">
            <Link
              href="/roster"
              className="block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Go to My Roster
            </Link>
            <Link
              href="/"
              className="block bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Catch Pokemon
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Team ready phase
  if (phase === "team-ready") {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Ready for Trainer Battle!
            </h1>
            <p className="text-lg text-gray-600">
              Your team vs rival trainer team
            </p>
          </div>

          <div className="rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
              Your Battle Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {roster.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className="bg-white rounded-xl shadow-md p-4 border-2 border-blue-200"
                >
                  <div className="text-center">
                    <img
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      className="w-20 h-20 mx-auto"
                    />
                    <h3 className="text-lg font-semibold capitalize text-gray-800 mt-2">
                      {pokemon.name}
                    </h3>
                    <div className="flex justify-center gap-1 mt-2">
                      {pokemon.types.map((type, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs capitalize"
                        >
                          {type.type.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startTeamBattle}
              className="bg-red-500 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-red-600 transition-colors transform hover:scale-105"
            >
              🔥 Challenge Rival Trainer! 🔥
            </button>
            <p className="text-sm text-gray-600 mt-2">
              6v6 Team Battle - Use your entire roster!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Opponent loading phase
  if (phase === "opponent-loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-bounce text-6xl mb-4">🎲</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Rival Trainer Approaches...
          </h2>
          <p className="text-gray-600">Preparing their team of 6 Pokemon...</p>
          <div className="mt-4 flex justify-center space-x-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-red-500 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Battle phase
  if (phase === "battle" && battleState) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Trainer Battle!
            </h1>
            <p className="text-lg text-gray-600">
              Defeat the rival trainer to earn victory points!
            </p>
          </div>

          <BattleArena
            initialBattleState={battleState}
            onBattleEnd={handleBattleEnd}
          />
        </div>
      </div>
    );
  }

  // Battle result phase
  if (phase === "result" && battleResult) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 py-8">
        <div className="max-w-2xl mx-auto px-4 text-center">
          {/* Result Header */}
          <div className="text-6xl mb-4">
            {battleResult.result === "win" ? "🏆" : "💔"}
          </div>

          <h1
            className={`text-4xl font-bold mb-4 ${
              battleResult.result === "win" ? "text-green-600" : "text-red-600"
            }`}
          >
            {battleResult.result === "win" ? "Victory!" : "Defeat!"}
          </h1>

          {/* Battle Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Trainer Battle Summary
            </h2>
            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Your Team Leader:</strong> {battleResult.playerPokemon}
              </p>
              <p>
                <strong>Rival&apos;s Pokemon:</strong>{" "}
                {battleResult.opponentPokemon}
              </p>
              <p>
                <strong>Battle Result:</strong>
                <span
                  className={`font-semibold ml-1 ${
                    battleResult.result === "win"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {battleResult.result === "win" ? "Victory!" : "Defeat!"}
                </span>
              </p>
              <p>
                <strong>Victory Points:</strong>
                <span className="text-green-600 font-bold ml-1">
                  {battleResult.score} points
                </span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {battleResult.result === "win" && (
              <button
                onClick={goToLeaderboard}
                className="w-full bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
              >
                Submit Score to Leaderboard 🏆
              </button>
            )}

            <button
              onClick={handlePlayAgain}
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Challenge Another Trainer
            </button>

            <Link
              href="/roster"
              className="block w-full bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Team Management
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <div>Loading...</div>;
}
