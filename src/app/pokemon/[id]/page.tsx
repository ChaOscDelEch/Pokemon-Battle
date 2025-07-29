"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { addPokemonToRoster, getRoster } from "@/lib/roster";

// Define interfaces
interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokemonSprites {
  front_default: string | null;
  other?: {
    "official-artwork"?: {
      front_default: string | null;
    };
  };
}

interface PokemonData {
  id: number;
  name: string;
  height?: number;
  weight?: number;
  base_experience?: number;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  abilities: PokemonAbility[];
}

export default function PokemonDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInRoster, setIsInRoster] = useState(false);
  const [isAddingToRoster, setIsAddingToRoster] = useState(false);
  const [addToRosterFeedback, setAddToRosterFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error("Failed to fetch Pokémon details");
        const data: PokemonData = await res.json();
        setPokemon(data);

        // Check if Pokemon is already in roster
        const roster = getRoster();
        setIsInRoster(roster.includes(data.id));
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonDetails();
  }, [id]);

  const handleAddToRoster = async () => {
    if (!pokemon || isInRoster || isAddingToRoster) return;

    setIsAddingToRoster(true);
    setAddToRosterFeedback(null);

    try {
      // Check roster limit (max 6 Pokemon)
      const currentRoster = getRoster();
      if (currentRoster.length >= 6) {
        setAddToRosterFeedback({
          type: "error",
          message: "Roster is full! You can only have 6 Pokemon maximum.",
        });
        return;
      }

      // Add Pokemon to roster
      addPokemonToRoster(pokemon.id);

      // Update state
      setIsInRoster(true);
      setAddToRosterFeedback({
        type: "success",
        message: `${pokemon.name} has been added to your roster!`,
      });

      // Clear feedback after 3 seconds
      setTimeout(() => {
        setAddToRosterFeedback(null);
      }, 3000);
    } catch (err) {
      console.error("Failed to add to roster:", err);
      setAddToRosterFeedback({
        type: "error",
        message: "Failed to add Pokemon to roster. Please try again.",
      });
    } finally {
      setIsAddingToRoster(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="py-10 text-center max-w-2xl mx-auto text-red-600">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p>{error}</p>
      </div>
    );

  if (!pokemon) return null;

  const { name, sprites, stats, types, abilities } = pokemon;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md my-8 relative">
      {/* Feedback Message */}
      {addToRosterFeedback && (
        <div
          className={`mb-6 p-4 rounded-lg border-l-4 ${
            addToRosterFeedback.type === "success"
              ? "bg-green-50 border-green-500 text-green-800"
              : "bg-red-50 border-red-500 text-red-800"
          }`}
        >
          <div className="flex items-center">
            <div className="text-2xl mr-3">
              {addToRosterFeedback.type === "success" ? "✅" : "❌"}
            </div>
            <p className="font-semibold">{addToRosterFeedback.message}</p>
          </div>
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4 capitalize text-center text-red-600">
        {name}
      </h1>

      {/* Pokémon Image with fallback */}
      <div className="flex justify-center mb-6">
        <Image
          src={
            sprites.other?.["official-artwork"]?.front_default ||
            sprites.front_default ||
            "/logo_pokemon.png"
          }
          width={180}
          height={180}
          alt={name}
          className="h-48 w-48 object-contain"
        />
      </div>

      {/* Stats */}
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">Stats</h2>
      <ul className="mb-4">
        {stats.map((stat) => (
          <li key={stat.stat.name} className="mb-1">
            <span className="capitalize font-medium">{stat.stat.name}:</span>{" "}
            {stat.base_stat}
          </li>
        ))}
      </ul>

      {/* Types */}
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">Types</h2>
      <div className="flex justify-center mb-4 space-x-2">
        {types.map((type) => (
          <span
            key={type.type.name}
            className="px-3 py-1 bg-yellow-300 text-red-600 rounded-full capitalize"
          >
            {type.type.name}
          </span>
        ))}
      </div>

      {/* Abilities */}
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">Abilities</h2>
      <ul className="mb-4">
        {abilities.map((ability) => (
          <li key={ability.ability.name} className="mb-1 capitalize">
            {ability.ability.name}
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <button
          onClick={handleAddToRoster}
          disabled={isInRoster || isAddingToRoster}
          className={`px-4 py-2 rounded font-semibold transition-all transform hover:scale-105 ${
            isInRoster
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : isAddingToRoster
              ? "bg-green-400 text-white cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {isAddingToRoster ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Adding...
            </div>
          ) : isInRoster ? (
            "Already in Roster"
          ) : (
            "Add to Roster"
          )}
        </button>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/roster")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View Roster
          </button>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
