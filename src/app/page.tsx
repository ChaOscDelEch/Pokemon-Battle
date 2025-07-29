"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import LoadingSpinner from "../components/LoadingSpinner";
import PokemonCard from "../components/PokemonCard"; // Import your custom component

// Type definitions for raw API data
interface Type {
  name: string;
  url: string;
}

interface Pokemon {
  name: string;
  url: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string | null };
}

// Define a type for data passed to PokemonCard
interface PokemonForCard {
  name: string;
  sprites: { front_default: string };
  types: string[];
}

interface PokemonDetails {
  name: string;
  sprites: {
    front_default: string | null;
  };
  types: { type: { name: string } }[];
}

export default function Page() {
  const [types, setTypes] = useState<Type[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [pokemonMap, setPokemonMap] = useState<Map<number, PokemonDetails>>(
    new Map()
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchedIdsRef = useRef<Set<number>>(new Set());

  // Fetch Pokémon types once
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/type");
        if (!res.ok) throw new Error("Failed to fetch types");
        const data: { results: Type[] } = await res.json();
        setTypes(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
    };
    fetchTypes();
  }, []);

  // Fetch Pokémon list/details when type changes
  useEffect(() => {
    const fetchPokemonDetails = async (url: string) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch Pokémon details");
      const data: PokemonDetails = await res.json();
      return data;
    };

    const fetchPokemonList = async () => {
      setLoading(true);
      fetchedIdsRef.current.clear();
      setPokemonMap(new Map());

      try {
        let results: Pokemon[] = [];

        if (selectedType === "all") {
          const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=1000`
          );
          if (!res.ok) throw new Error("Failed to fetch Pokémon list");
          const data: { results: Pokemon[] } = await res.json();
          results = data.results;
        } else {
          const res = await fetch(
            `https://pokeapi.co/api/v2/type/${selectedType}`
          );
          if (!res.ok) throw new Error("Failed to fetch Pokémon by type");
          const data: { pokemon: { pokemon: Pokemon }[] } = await res.json();
          results = data.pokemon.map((entry) => entry.pokemon);
        }

        await Promise.all(
          results.map(async (p) => {
            const id = parseInt(p.url.split("/").filter(Boolean).pop() || "0");
            if (!fetchedIdsRef.current.has(id)) {
              fetchedIdsRef.current.add(id);
              const detailedData = await fetchPokemonDetails(p.url);
              setPokemonMap((prev) => new Map(prev).set(id, detailedData));
            }
          })
        );

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, [selectedType]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="py-10 text-center max-w-2xl mx-auto text-red-600">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p>{error}</p>
      </div>
    );

  // Convert the map to an array for rendering
  const pokemonArray = Array.from(pokemonMap.entries());

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-5xl font-bold mb-4 text-red-600 text-center">
        It&apos;s Pokémon Time!
      </h2>
      {/* Filter */}
      <div className="mb-6 flex items-center justify-center space-x-4">
        <label htmlFor="type" className="font-semibold">
          Filter by Type:
        </label>
        <select
          id="type"
          value={selectedType}
          onChange={handleTypeChange}
          className="border border-red-600 rounded px-3 py-2"
        >
          <option value="all">All</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      {/* Pokémon grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-red-600">
        {pokemonArray.map(([id, pokemon]) => {
          const pokemonForCard: PokemonForCard = {
            name: pokemon.name,
            sprites: { front_default: pokemon.sprites.front_default ?? "" },
            types: pokemon.types.map((t) => t.type.name),
          };
          return (
            <Link key={pokemon.name} href={`/pokemon/${id}`} className="block">
              <PokemonCard pokemon={pokemonForCard} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
