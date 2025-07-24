"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";

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

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error("Failed to fetch Pokémon details");
        const data: PokemonData = await res.json();
        setPokemon(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonDetails();
  }, [id]);

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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md my-8 relative flex flex-col">
      {/* Pokémon Name */}
      <h1 className="text-4xl font-bold mb-4 capitalize text-center text-red-600">
        {name}
      </h1>

      {/* Pokémon Image with fallback */}
      <div className="flex justify-center mb-6">
        <img
          src={
            sprites.other?.["official-artwork"]?.front_default ||
            sprites.front_default ||
            "/logo_pokemon.png"
          }
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
      <div className="mt-6 flex justify-between">
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Add to Roster
        </button>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}