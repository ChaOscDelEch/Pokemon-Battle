"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getRoster,
  removePokemonFromRoster,
  getRosterInfo,
} from "@/lib/roster";

// Basic Pokemon type
interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: { name: string };
  }>;
}

export default function RosterPage() {
  const [roster, setRoster] = useState<number[]>([]);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  // Load roster on component mount
  useEffect(() => {
    const currentRoster = getRoster();
    setRoster(currentRoster);

    // Fetch Pokemon data for each ID in roster
    if (currentRoster.length > 0) {
      fetchPokemonData(currentRoster);
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch Pokemon data from PokeAPI
  async function fetchPokemonData(pokemonIds: number[]) {
    try {
      const promises = pokemonIds.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
          res.json()
        )
      );

      const results = await Promise.all(promises);
      setPokemonData(results);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    } finally {
      setLoading(false);
    }
  }

  // Handle removing Pokemon
  function handleRemovePokemon(pokemonId: number) {
    const success = removePokemonFromRoster(pokemonId);
    if (success) {
      // Update local state
      const newRoster = roster.filter((id) => id !== pokemonId);
      setRoster(newRoster);
      setPokemonData(pokemonData.filter((p) => p.id !== pokemonId));
    }
  }

  const rosterInfo = getRosterInfo();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading your roster...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Roster</h1>
          <p className="text-lg text-gray-600">
            {rosterInfo.size}/6 Pokemon in your team
          </p>
        </div>

        {/* Empty State */}
        {roster.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Your roster is empty!
            </h2>
            <p className="text-gray-500 mb-8">
              Go catch some Pokemon to build your team.
            </p>
            <Link
              href="/"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Browse Pokemon
            </Link>
          </div>
        ) : (
          <>
            {/* Pokemon Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {pokemonData.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-blue-300 transition-all"
                >
                  {/* Pokemon Image */}
                  <div className="text-center mb-4">
                    <img
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      className="w-24 h-24 mx-auto"
                    />
                  </div>

                  {/* Pokemon Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold capitalize text-gray-800 mb-2">
                      {pokemon.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">#{pokemon.id}</p>

                    {/* Types */}
                    <div className="flex justify-center gap-2 mb-4">
                      {pokemon.types.map((type, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm capitalize"
                        >
                          {type.type.name}
                        </span>
                      ))}
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemovePokemon(pokemon.id)}
                      className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Remove from Roster
                    </button>
                  </div>
                </div>
              ))}

              {/* Empty Slots */}
              {Array.from({ length: rosterInfo.emptySlots }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-gray-400 min-h-[300px]"
                >
                  <div className="text-4xl mb-2">➕</div>
                  <p className="text-center">Empty Slot</p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Link
                href="/"
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Add More Pokemon
              </Link>

              {roster.length > 0 && (
                <Link
                  href="/battle"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Start Battle! ⚔️
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
